import "./PopUpRow.css";
import { PropTypes } from "prop-types";

function PopUpRow(props) {
  const {
    isCheckBox,
    optionText,
    optionPrice,
    id,
    isChecked,
    onChangeFunc,
    modCounter,
    decFunc,
    incFunc,
  } = props;

  const handleRadioChange = () => {
    onChangeFunc(id);
  };

  const handleCheckBoxChange = () => {
    onChangeFunc(id);
  };

  const handleDecrement = () => {
    decFunc(id);
  };

  const handleIncrement = () => {
    incFunc(id);
  };

  return (
    <div className="row">
      {isCheckBox ? (
        <input
          type="checkbox"
          checked={isChecked}
          onChange={handleCheckBoxChange}
        />
      ) : (
        <input type="radio" checked={isChecked} onChange={handleRadioChange} />
      )}
      <div className="row-info">
        <span>{optionText}</span>
        {isCheckBox && isChecked ? (
          <>
            <div className="counter">
              <button
                className="button-row"
                onClick={handleDecrement}
                disabled={modCounter < 2}
              >
                -
              </button>
              <span>{modCounter}</span>
              <button className="button-row" onClick={handleIncrement}>
                +
              </button>
            </div>
          </>
        ) : (
          <>
            <span>+{optionPrice} UAH</span>
          </>
        )}
      </div>
    </div>
  );
}

PopUpRow.propTypes = {
  isCheckBox: PropTypes.bool,
  optionText: PropTypes.string,
  optionPrice: PropTypes.number,
  id: PropTypes.string,
  isChecked: PropTypes.bool,
  onChangeFunc: PropTypes.func,
  modCounter: PropTypes.number,
  decFunc: PropTypes.func,
  incFunc: PropTypes.func,
};

export default PopUpRow;
