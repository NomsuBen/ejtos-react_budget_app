import React, { useContext } from "react";
import { AppContext } from "../context/AppContext";

const CurrencySelector = () => {
  const { dispatch } = useContext(AppContext);

  const handleCurrencyChange = (event) => {
    dispatch({
      type: "CHG_CURRENCY",
      payload: event.target.value,
    });
  };

  return (
    <div className="input-group mb-3" style={{ width: "auto" }}>
      <div className="input-group-prepend">
        <label className="input-group-text" htmlFor="inputGroupSelectCurrency">
          Currency
        </label>
      </div>
      <select
        className="custom-select"
        id="inputGroupSelectCurrency"
        onChange={handleCurrencyChange}
      >
        <option value="£">£ Pound</option>
        <option value="$">$ Dollar</option>
        <option value="€">€ Euro</option>
        <option value="₹">₹ Rupee</option>
      </select>
    </div>
  );
};

export default CurrencySelector;
