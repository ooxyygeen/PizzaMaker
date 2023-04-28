import "./Card.css";
import { PropTypes } from "prop-types";

function Card(props) {
  const { imageURI, pizzaName, pizzaParts, pizzaPrice } = props;
  const ingredients = Array.isArray(pizzaParts) ? pizzaParts.join(", ") : "";

  return (
    <div className="card-container">
      <div className="pizza-wrapper">
        <img src={imageURI} alt="pizza pic" />
      </div>
      <div className="pizza-info">
        <h2>{pizzaName}</h2>
        <span className="pizza-ingridients">{ingredients}</span>
        <div className="pizza-bottom-container">
          <span className="pizza-price">{pizzaPrice} UAH</span>
          <button className="cart-button">
            <span>Додати</span>
          </button>
        </div>
      </div>
    </div>
  );
}

Card.propTypes = {
  imageURI: PropTypes.string,
  pizzaName: PropTypes.string,
  pizzaParts: PropTypes.array,
  pizzaPrice: PropTypes.number,
};

export default Card;
