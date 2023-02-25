 export interface IImage {
  _id: string;
  img: string;
}

 export interface IDetail {
  _id: string;
  detail: string;
}

export interface ISize {
  _id: string;
  size: string;
}

export interface IProduct {
  id: string;
  type: string;
  name: string;
  price: string;
  description: string;
  amount: number;
  images: IImage[];
  details: IDetail[] | [];
  sizes: ISize[] | [];
}
