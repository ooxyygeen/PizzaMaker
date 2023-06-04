import "./PopUp.css";
import { PropTypes } from "prop-types";
import { useState } from "react";
import PopUpRow from "../PopUpRow/PopUpRow";
import { sizes, borders, modifications } from "../../mock/optionsMock.js";

function PopUp(props) {
  const { onClose, imageURI, pizzaName, pizzaParts, pizzaPrice } = props;
  const ingredients = Array.isArray(pizzaParts) ? pizzaParts.join(", ") : "";
  const [pizzaCount, setPizzaCount] = useState(1);
  const [selectedSizeOption, setSelectedSizeOption] = useState(sizes[0].id);
  const [selectedBorderOption, setSelectedBorderOption] = useState(
    borders[0].id
  );
  const [modificationsMap, setModificationsMap] = useState(new Map());
  const [phoneNumber, setPhoneNumber] = useState(undefined);

  let sizePrice = sizes.find(
    (item) => item.id === selectedSizeOption
  ).optionPrice;
  let borderPrice = borders.find(
    (item) => item.id === selectedBorderOption
  ).optionPrice;
  let modificationsPrice = Array.from(modificationsMap.entries()).reduce(
    (total, [id, count]) => {
      const modification = modifications.find((m) => m.id === id);
      return total + modification.optionPrice * count;
    },
    0
  );
  let totalPrice =
    (pizzaPrice + sizePrice + borderPrice + modificationsPrice) * pizzaCount;

  const handleExitClick = () => {
    onClose();
  };

  const incrementCount = () => {
    setPizzaCount(pizzaCount + 1);
  };

  const decrementCount = () => {
    if (pizzaCount > 1) {
      setPizzaCount(pizzaCount - 1);
    }
  };

  const handleSizeChange = (aID) => {
    setSelectedSizeOption(aID);
  };

  const handleBorderChange = (aID) => {
    setSelectedBorderOption(aID);
  };

  const validatePhoneNumber = () => {
    const phoneRegex = /^\d{10}$/;
    return phoneRegex.test(phoneNumber);
  };

  const isNumberProvided = () => {
    return validatePhoneNumber() && phoneNumber != undefined;
  };

  const handleBuyClick = () => {
    const orderDetails = {
      phoneNumber,
      pizzaName,
      pizzaCount,
      selectedSizeOption,
      selectedBorderOption,
      totalPrice,
      modificationsMap: JSON.stringify([...modificationsMap]),
      status: "Прийнято",
    };
    localStorage.setItem(Date.now().toString(), JSON.stringify(orderDetails));
  };

  const handleModificationChange = (aID) => {
    setModificationsMap((prevMap) => {
      const newMap = new Map(prevMap);
      if (prevMap.get(aID)) {
        newMap.delete(aID);
      } else {
        newMap.set(aID, 1);
      }
      return newMap;
    });
  };

  const decrementModCounter = (aID) => {
    setModificationsMap((prevMap) => {
      let oldValue = prevMap.get(aID);
      const newMap = new Map(prevMap);
      newMap.set(aID, oldValue - 1);
      return newMap;
    });
  };

  const incrementModCounter = (aID) => {
    setModificationsMap((prevMap) => {
      let oldValue = prevMap.get(aID);
      const newMap = new Map(prevMap);
      newMap.set(aID, oldValue + 1);
      return newMap;
    });
  };

  return (
    <div className="PopUp-container">
      <div className="PopUp">
        <button className="exit-button" onClick={handleExitClick}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 30 30"
            width="30px"
            height="30px"
          >
            {" "}
            <path d="M 7 4 C 6.744125 4 6.4879687 4.0974687 6.2929688 4.2929688 L 4.2929688 6.2929688 C 3.9019687 6.6839688 3.9019687 7.3170313 4.2929688 7.7070312 L 11.585938 15 L 4.2929688 22.292969 C 3.9019687 22.683969 3.9019687 23.317031 4.2929688 23.707031 L 6.2929688 25.707031 C 6.6839688 26.098031 7.3170313 26.098031 7.7070312 25.707031 L 15 18.414062 L 22.292969 25.707031 C 22.682969 26.098031 23.317031 26.098031 23.707031 25.707031 L 25.707031 23.707031 C 26.098031 23.316031 26.098031 22.682969 25.707031 22.292969 L 18.414062 15 L 25.707031 7.7070312 C 26.098031 7.3170312 26.098031 6.6829688 25.707031 6.2929688 L 23.707031 4.2929688 C 23.316031 3.9019687 22.682969 3.9019687 22.292969 4.2929688 L 15 11.585938 L 7.7070312 4.2929688 C 7.5115312 4.0974687 7.255875 4 7 4 z" />
          </svg>
        </button>
        <div className="image-wrapper">
          <img src={imageURI} alt="pizza pic" />
        </div>
        <div className="info-wrapper">
          <div className="popUp-info">
            <h2>{pizzaName}</h2>
            <span className="popUp-price">{pizzaPrice} UAH</span>
            <span className="popUp-ingridients">{ingredients}</span>
          </div>
          <div className="popUp-info">
            <p>Розмір</p>
            {sizes.map((popUpProps) => (
              <PopUpRow
                key={popUpProps.id}
                {...popUpProps}
                isCheckBox={false}
                isChecked={selectedSizeOption === popUpProps.id}
                onChangeFunc={handleSizeChange}
              />
            ))}
          </div>
          <div className="popUp-info">
            <p>Бортик</p>
            {borders.map((popUpProps) => (
              <PopUpRow
                key={popUpProps.id}
                {...popUpProps}
                isCheckBox={false}
                isChecked={selectedBorderOption === popUpProps.id}
                onChangeFunc={handleBorderChange}
              />
            ))}
          </div>
          <div className="popUp-info">
            <p>Модифікатори</p>
            {modifications.map((popUpProps) => (
              <PopUpRow
                key={popUpProps.id}
                {...popUpProps}
                isCheckBox={true}
                isChecked={modificationsMap.get(popUpProps.id) > 0}
                onChangeFunc={handleModificationChange}
                modCounter={modificationsMap.get(popUpProps.id) ?? 0}
                decFunc={decrementModCounter}
                incFunc={incrementModCounter}
              />
            ))}
          </div>
        </div>
        <div className="popUp-footer">
          <div className="upper">
            <label htmlFor="phone">Введіть номер телефону:</label>

            <input
              type="tel"
              id="phone"
              name="phone"
              pattern="[0-9]{3}-[0-9]{3}-[0-9]{2}-[0-9]{2}"
              placeholder="(097)123-45-67"
              required
              onChange={(e) => setPhoneNumber(e.target.value)}
            ></input>
          </div>
          <div className="bottom">
            <div className="counter">
              <button
                className="minus"
                onClick={decrementCount}
                disabled={pizzaCount < 2 ? true : false}
              >
                -
              </button>
              <span>{pizzaCount}</span>
              <button className="plus" onClick={incrementCount}>
                +
              </button>
            </div>
            <div>
              <button
                className="buy-button"
                onClick={handleBuyClick}
                disabled={!isNumberProvided()}
              >
                <span>Додати: </span>
                <span>{totalPrice} UAH</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

PopUp.propTypes = {
  onClose: PropTypes.func,
  imageURI: PropTypes.string,
  pizzaName: PropTypes.string,
  pizzaParts: PropTypes.array,
  pizzaPrice: PropTypes.number,
};

export default PopUp;
