import { FC, memo } from "react";
import { IImage } from "../../http/models/IProduct";
import { Link } from "react-router-dom";

interface productProps {
  name: string;
  price: string;
  image: IImage;
  id: string;
}

const url = "http://localhost:5000/";

const ProductItem: FC<productProps> = ({ name, price, image, id }) => {

  return (
    <>
      <Link className="text-decoration-none w-25" to={`/shop/${id}`}>
        <div
          className="card border border-0 mb-3 mx-2 overflow-hidden bg-transparent"
          
        >
          <div className="rounded overflow-hidden"><img src={url + image.img} className="card-img-top" alt={name} /></div>
          <div className="card-body text-center p-2">
            <h5 className=" font-monospace card-title mb-0 fs-6 text-truncate text-dark">{name}</h5>

            <span className="font-monospace text-white bg-black bg-gradient py-0 px-2">{price}$</span>
          </div>
        </div>
      </Link>
    </>
  );
};

export default memo(ProductItem);
