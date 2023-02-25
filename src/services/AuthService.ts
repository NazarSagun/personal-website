import $api from "../http/index";
import { AxiosResponse } from "axios";
import { AuthResponse, ResponseError } from "../http/models/auth-response";

class AuthService {
  static async login(email: string, password: string): Promise<AxiosResponse<AuthResponse & ResponseError>> {
    return $api.post<AuthResponse & ResponseError>("/login", {email, password});
  }

  static async registration(email: string, password: string): Promise<AxiosResponse<AuthResponse & ResponseError>> {
    return $api.post<AuthResponse & ResponseError>("/registration", {email, password});
  }

  static async logout(): Promise<void> {
    return $api.post("/logout");
  }
}

export default AuthService;