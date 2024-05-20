import React, { createContext, useReducer } from "react";

// 5. The reducer - this is used to update the state, based on the action
export const AppReducer = (state, action) => {
  switch (action.type) {
    case "ADD_EXPENSE":
      const newTotalBudget =
        state.expenses.reduce((total, expense) => total + expense.cost, 0) +
        action.payload.cost;

      if (newTotalBudget <= state.budget) {
        const updatedExpenses = state.expenses.map((expense) => {
          if (expense.name === action.payload.name) {
            return { ...expense, cost: expense.cost + action.payload.cost };
          }
          return expense;
        });

        const isExistingExpense = state.expenses.some(
          (expense) => expense.name === action.payload.name
        );

        return {
          ...state,
          expenses: isExistingExpense
            ? updatedExpenses
            : [...state.expenses, action.payload],
        };
      } else {
        alert("Cannot increase the allocation! Out of funds");
        return state;
      }

    case "RED_EXPENSE":
      const reducedExpenses = state.expenses.map((expense) => {
        if (expense.name === action.payload.name) {
          const newCost = expense.cost - action.payload.cost;
          return { ...expense, cost: newCost >= 0 ? newCost : expense.cost };
        }
        return expense;
      });

      return {
        ...state,
        expenses: reducedExpenses,
      };

    case "MINUS_EXPENSE":
      const decreasedExpenses = state.expenses.map((expense) => {
        if (expense.name === action.payload) {
          const newCost = expense.cost - 10;
          return { ...expense, cost: newCost >= 0 ? newCost : 0 };
        }
        return expense;
      });

      return {
        ...state,
        expenses: decreasedExpenses,
      };

    case "DELETE_EXPENSE":
      // Find the expense to delete
      const expenseToDelete = state.expenses.find(
        (expense) => expense.name === action.payload
      );

      // Calculate the updated budget by adding the cost of the deleted expense
      const updatedBudget = state.budget + expenseToDelete.cost;

      // Update the cost of the deleted expense to 0
      const updatedExpenses = state.expenses.map((expense) => {
        if (expense.name === action.payload) {
          return { ...expense, cost: 0 };
        }
        return expense;
      });

      return {
        ...state,
        expenses: updatedExpenses,
        budget: updatedBudget,
      };

    case "SET_BUDGET":
      return {
        ...state,
        budget: action.payload,
      };

    case "CHG_CURRENCY":
      return {
        ...state,
        currency: action.payload,
      };

    default:
      return state;
  }
};

// 1. Sets the initial state when the app loads
const initialState = {
  budget: 2000,
  expenses: [
    { id: "Marketing", name: "Marketing", cost: 50 },
    { id: "Finance", name: "Finance", cost: 300 },
    { id: "Sales", name: "Sales", cost: 70 },
    { id: "Human Resource", name: "Human Resource", cost: 40 },
    { id: "IT", name: "IT", cost: 500 },
  ],
  currency: "£",
};

// 2. Creates the context this is the thing our components import and use to get the state
export const AppContext = createContext();

// 3. Provider component - wraps the components we want to give access to the state
// Accepts the children, which are the nested(wrapped) components
export const AppProvider = (props) => {
  // 4. Sets up the app state. takes a reducer, and an initial state
  const [state, dispatch] = useReducer(AppReducer, initialState);

  const remaining =
    state.budget - state.expenses.reduce((total, item) => total + item.cost, 0);

  return (
    <AppContext.Provider
      value={{
        expenses: state.expenses,
        budget: state.budget,
        remaining: remaining,
        dispatch,
        currency: state.currency,
      }}
    >
      {props.children}
    </AppContext.Provider>
  );
};
