import "./Card.css";
import { PropTypes } from "prop-types";
import { useState } from "react";
import PopUp from "../PopUp/PopUp";

function Card(props) {
  const { imageURI, pizzaName, pizzaParts, pizzaPrice } = props;
  const ingredients = Array.isArray(pizzaParts) ? pizzaParts.join(", ") : "";
  const [showPopup, setShowPopup] = useState(false);

  const handleButtonClick = () => {
    setShowPopup(true);
  };

  const handleClosePopup = () => {
    setShowPopup(false);
  };

  return (
    <div className="card-container">
      <div className="pizza-wrapper">
        <img src={imageURI} alt="pizza pic" />
      </div>
      <div className="pizza-info">
        <h3>{pizzaName}</h3>
        <span className="pizza-ingridients">{ingredients}</span>
        <div className="pizza-bottom-container">
          <span className="pizza-price">{pizzaPrice} UAH</span>
          <button className="cart-button" onClick={handleButtonClick}>
            <span>Додати</span>
          </button>
        </div>
      </div>
      {showPopup && <PopUp onClose={handleClosePopup} />}
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
