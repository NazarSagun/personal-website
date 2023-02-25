import { IUser } from "../../../../http/models/IUser";

export interface AuthModel {
  isAuth: boolean;
  user: IUser;
  status: string;
  message: any;
}