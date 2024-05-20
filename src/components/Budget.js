import React, { useContext, useState } from "react";
import { AppContext } from "../context/AppContext";

const Budget = () => {
  const { budget, expenses, dispatch, currency } = useContext(AppContext);
  const [newBudget, setNewBudget] = useState(budget);

  const totalExpenses = expenses.reduce(
    (total, expense) => total + expense.cost,
    0
  );

  const handleBudgetChange = (event) => {
    const value = parseInt(event.target.value, 10);
    if (!isNaN(value)) {
      setNewBudget(value);
    }
  };

  const handleBudgetSubmit = () => {
    if (newBudget >= totalExpenses && newBudget <= 20000) {
      dispatch({
        type: "SET_BUDGET",
        payload: newBudget,
      });
    } else if (newBudget < totalExpenses) {
      alert(
        `Budget cannot be less than the total allocated expenses (${currency}${totalExpenses})`
      );
    } else {
      alert("Budget must be between the total expenses and 20,000");
    }
  };

  return (
    <div className="alert alert-secondary">
      <div className="d-flex justify-content-between align-items-center">
        <span>Budget: {currency}</span>
        <div className="input-group" style={{ width: "150px" }}>
          <input
            type="number"
            className="form-control"
            value={newBudget}
            onChange={handleBudgetChange}
            step="10"
            min={totalExpenses} // Ensures the minimum budget is not less than total expenses
          />
          <div className="input-group-append">
            <button
              onClick={handleBudgetSubmit}
              className="btn btn-primary"
              type="button"
            >
              Set
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Budget;
