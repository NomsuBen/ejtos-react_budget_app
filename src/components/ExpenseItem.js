import React, { useContext } from "react";
import { AppContext } from "../context/AppContext";

const ExpenseItem = (props) => {
  const { dispatch, currency } = useContext(AppContext);

  const handleDeleteExpense = () => {
    dispatch({
      type: "DELETE_EXPENSE",
      payload: props.id,
    });
  };

  const decreasedExpenses = () => {
    dispatch({
      type: "MINUS_EXPENSE",
      payload: props.id,
    });
  };

  const increaseAllocation = (name) => {
    const expense = {
      name: name,
      cost: 10,
    };

    dispatch({
      type: "ADD_EXPENSE",
      payload: expense,
    });
  };

  return (
    <tr>
      <td>{props.name}</td>
      <td>
        {currency}
        {props.cost}
      </td>
      <td>
        <button
          className="btn btn-success btn-sm"
          onClick={() => increaseAllocation(props.name)}
        >
          +
        </button>
      </td>
      <td>
        <button
          className="btn btn-danger btn-sm"
          onClick={() => decreasedExpenses(props.name)}
        >
          -
        </button>
      </td>
      <td>
        <button
          className="btn btn-outline-danger btn-sm"
          onClick={() => handleDeleteExpense(props.name)}
        >
          x
        </button>
      </td>
    </tr>
  );
};

export default ExpenseItem;
