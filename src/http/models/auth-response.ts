import { IUser } from "./IUser";

export interface AuthResponse {
  accessToken: string;
  refreshToken: string;
  user: IUser;
}

export interface ResponseError {
  errors: string[] | [];
  message: string;
  status: number;
}
