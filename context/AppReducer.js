const AppReducer = (state, action) => {
  switch (action.type) {
    case "NET_OR_GROSS_SELECT":
      return {
        ...state,
        netOrGross: action.payload,
      };
    case "ADD_TRANSACTION":
      return {
        ...state,
        transactions: [action.payload, ...state.transactions],
      };
    default:
      return state;
  }
};

export default AppReducer;
