const initialState = null;

const user = (state = initialState, action) => {
  switch (action.type) {
    case "SET_USER":
      return {
        ...state,
        ...action.user
      };
    default:
      return state;
  }
}

export default user;
