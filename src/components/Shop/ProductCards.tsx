import { Link } from "react-router-dom";
import "./Shop.css";

const cards = [
  {
    id: "1",
    img: "card1.jpg",
    link: "funny_life",
  },
  {
    id: "2",
    img: "card2.jpg",
    link: "vilv_trowsers",
  },
  {
    id: "3",
    img: "card3.jpg",
    link: "funny_t-shirt",
  },
];

const ProductCards = () => {
  return (
    <div className="container">
      <div className="d-flex justify-content-center">
        {cards.map((card) => (
          <Link key={card.id} to={`/shop/${card.link}`}>
            <div
              className="card me-1 pe-auto overflow-hidden"
              style={{ width: "17rem" }}
            >
              <img alt={`${card.link}`} src={`images/${card.img}`} />
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default ProductCards;
