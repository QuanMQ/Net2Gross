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
    default:
      return state;
  }
};

export default AppReducer;
