import { FC, useState } from "react";
import { IImage } from "../../../http/models/IProduct";

import "./ProductSlider.css";

interface SliderProps {
  images: IImage[];
}

const PUBLIC_URL = "http://localhost:5000/";

const ProductSlider: FC<SliderProps> = ({ images }) => {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <div className="position-relative">
      <div>
        {images.map((img, index) => (
          <div key={img._id}>
            <img
              onClick={() => setActiveIndex(index)}
              className={`slider-img rounded ${index + 1 === images.length ? "mb-0" : "mb-2"}`}
              src={PUBLIC_URL + img.img}
              alt={img.img}
            />
          </div>
        ))}
      </div>
     
      <div className="slider-container">
        {images.map((img, index) => (
          <img
            key={img._id}
            className={activeIndex === index ? "show rounded" : "hide rounded"}
            src={PUBLIC_URL + img.img}
            alt={img.img}
          />
        ))}
      </div>
    </div>
  );
};

export default ProductSlider;
