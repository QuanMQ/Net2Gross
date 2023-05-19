import React, { createContext, useReducer } from "react";
import AppReducer from "./AppReducer";

// *Initial state
const initialState = {
  netOrGross: "net",
  salaryInput: 0,
  currency: "vnd",
  exchangeRate: 23300,
  dependents: 0,
  insurance: "full",
  insuranceInput: 0,
  region: "region1",
};

// *Create context
export const GlobalContext = createContext(initialState);

// *Provider component
export const GlobalProvider = ({ children }) => {
  const [state, dispatch] = useReducer(AppReducer, initialState);

  // *Actions
  function netOrGrossSelect(str) {
    dispatch({
      type: "NET_OR_GROSS_SELECT",
      payload: str,
    });
  }

  function currencySelect(cur) {
    dispatch({
      type: "CURRENCY_SELECT",
      payload: cur,
    });
  }

  function salarySet(salary) {
    dispatch({
      type: "SALARY_SET",
      payload: salary,
    });
  }

  return (
    <GlobalContext.Provider
      value={{
        state,
        netOrGrossSelect,
        currencySelect,
        salarySet
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};
