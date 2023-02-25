import $api from "../http/index";
import { AxiosResponse } from "axios";
import { IUser } from "../http/models/IUser";

class UserService {
  static async getUsers(): Promise<AxiosResponse<IUser[]>> {
    return $api.get<IUser[]>("/users");
  }
}

export default UserService;
