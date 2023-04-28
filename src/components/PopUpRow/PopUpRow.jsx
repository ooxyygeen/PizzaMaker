import "./PopUpRow.css";
import { PropTypes } from "prop-types";

function PopUpRow(props) {
  const { isCheckBox, optionText, optionPrice } = props;

  return (
    <div className="row">
      {isCheckBox ? <input type="checkbox" /> : <input type="radio" />}
      <p>{optionText}</p>
      <p>+{optionPrice} UAH</p>
    </div>
  );
}

PopUpRow.propTypes = {
  isCheckBox: PropTypes.bool,
  optionText: PropTypes.string,
  optionPrice: PropTypes.number,
};
