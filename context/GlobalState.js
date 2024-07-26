import React, { createContext, useReducer } from "react";
import AppReducer from "./AppReducer";

// *Initial state
const initialState = {
  netOrGross: "net",
  salaryInput: 0,
  currency: "vnd",
  exchangeRate: 25400,
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

  function exchangeRateSet(rate) {
    dispatch({
      type: "EXCHANGE_RATE_SET",
      payload: rate,
    });
  }

  function dependentsSet(dependentsNum) {
    dispatch({
      type: "DEPENDENTS_SET",
      payload: dependentsNum,
    });
  }

  function insuranceSelect(option) {
    dispatch({
      type: "INSURANCE_SELECT",
      payload: option,
    });
  }

  function insuranceSet(amount) {
    dispatch({
      type: "INSURANCE_SET",
      payload: amount,
    });
  }

  function regionSelect(region) {
    dispatch({
      type: "REGION_SELECT",
      payload: region,
    });
  }

  return (
    <GlobalContext.Provider
      value={{
        state,
        netOrGrossSelect,
        currencySelect,
        salarySet,
        exchangeRateSet,
        dependentsSet,
        insuranceSelect,
        insuranceSet,
        regionSelect,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};
