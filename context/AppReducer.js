const AppReducer = (state, action) => {
  switch (action.type) {
    case "NET_OR_GROSS_SELECT":
      return {
        ...state,
        netOrGross: action.payload,
      };
    case "CURRENCY_SELECT":
      return {
        ...state,
        currency: action.payload,
      };
    case "SALARY_SET":
      return {
        ...state,
        salaryInput: action.payload,
      };
    case "EXCHANGE_RATE_SET":
      return {
        ...state,
        exchangeRate: action.payload,
      };
    case "DEPENDENTS_SET":
      return {
        ...state,
        dependents: action.payload,
      };
    case "INSURANCE_SELECT":
      return {
        ...state,
        insurance: action.payload,
      };
    case "INSURANCE_SET":
      return {
        ...state,
        insuranceInput: action.payload,
      };
    default:
      return state;
  }
};

export default AppReducer;
