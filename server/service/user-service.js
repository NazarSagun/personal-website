const UserModel = require("../models/user-model");
const MailService = require("./mail-service");
const TokenService = require("./token-service");
const bcrypt = require("bcrypt");
const uuid = require("uuid");
const ApiError = require("../exeptions/api-error");
const tokenService = require("./token-service");

class UserService {
  async registration(email, password, role) {
    const candidate = await UserModel.findOne({ email });

    if (candidate) {
      throw ApiError.BadRequest(`User with email ${email} already exists.`);
    }
    const hashPassword = await bcrypt.hash(password, 3);
    const activationLink = uuid.v4();

    const user = await UserModel.create({
      email,
      password: hashPassword,
      activationLink,
      role
    });
    await MailService.sendActivationMail(
      email,
      `${process.env.API_URL}/api/activate/${activationLink}`
    );
    const userDto = {
      id: user._id,
      email: user.email,
      isActivated: user.isActivated,
      role: user.role
    };

    const tokens = TokenService.generateTokens(userDto);
    await TokenService.saveToken(userDto.id, tokens.refreshToken);

    return { ...tokens, user: userDto };
  }

  async activate(activationLink) {
    const user = await UserModel.findOne({ activationLink });
    if (!user) {
      throw ApiError.BadRequest("Incorrect activation link.");
    }
    user.isActivated = true;
    await user.save();
  }

  async login(email, password) {
    const user = await UserModel.findOne({ email });
    if (!user) {
      throw ApiError.BadRequest("There is no user with such email");
    }
    const isPassIquals = await bcrypt.compare(password, user.password);
    if (!isPassIquals) {
      throw ApiError.BadRequest("Incorrect password");
    }

    const userDto = {
      id: user._id,
      email: user.email,
      isActivated: user.isActivated,
    };

    const tokens = TokenService.generateTokens(userDto);
    await TokenService.saveToken(userDto.id, tokens.refreshToken);

    return { ...tokens, user: userDto };
  }

  async logout(refreshToken) {
    const token = await TokenService.removeToken(refreshToken);
    return token;
  }

  async refresh(refreshToken) {
    if (!refreshToken) {
      throw ApiError.UnauthorizedError();
    }
    const userData = tokenService.validateRefreshToken(refreshToken);
    const tokenFromDB = await tokenService.findToken(refreshToken);
    if (!userData || !tokenFromDB) {
      throw ApiError.UnauthorizedError();
    }
    const user = await UserModel.findById(userData.id);
    const userDto = {
      id: user._id,
      email: user.email,
      isActivated: user.isActivated,
    };

    const tokens = TokenService.generateTokens(userDto);
    await TokenService.saveToken(userDto.id, tokens.refreshToken);

    return { ...tokens, user: userDto };
  }

  async getUsers() {
    const userData = await UserModel.find();
    return userData;
  }
}

module.exports = new UserService();
