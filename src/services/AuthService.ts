import $api from "../http/index";
import { AxiosResponse } from "axios";
import { AuthResponse, AuthError } from "../http/auth-response";

class AuthService {
  static async login(email: string, password: string): Promise<AxiosResponse<AuthResponse & AuthError>> {
    return $api.post<AuthResponse & AuthError>("/login", {email, password});
  }

  static async registration(email: string, password: string): Promise<AxiosResponse<AuthResponse & AuthError>> {
    return $api.post<AuthResponse & AuthError>("/registration", {email, password});
  }

  static async logout(): Promise<void> {
    return $api.post("/logout");
  }
}

export default AuthService;