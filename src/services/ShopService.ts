import { IProduct } from "../http/models/IProduct";
import { AxiosResponse } from "axios";
import $api from "../http";
import { ResponseError } from "../http/models/auth-response";
import { IType } from "../http/models/IType";

class ShopService {
  static async getProducts(): Promise<
    AxiosResponse<IProduct[] & ResponseError>
  > {
    return $api.get<IProduct[] & ResponseError>("/products");
  }

  static async getProduct(
    id: string
  ): Promise<AxiosResponse<IProduct & ResponseError>> {
    return $api.get<IProduct & ResponseError>(`/product/${id}`);
  }

  static async getTypes(): Promise<AxiosResponse<IType[] & ResponseError>> {
    return $api.get<IType[] & ResponseError>("/type");
  }

  static async getTypedProducts(type: string): Promise<
    AxiosResponse<IProduct[] & ResponseError>
  > {
    return $api.post<IProduct[] & ResponseError>("/products", {type: type});
  }
}

export default ShopService;
