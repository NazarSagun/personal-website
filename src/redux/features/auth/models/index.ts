import { IUser } from "../../../../http/IUser";

export interface AuthModel {
  isAuth: boolean;
  user: IUser;
  status: string;
  message: any;
}