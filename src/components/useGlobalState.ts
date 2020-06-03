import { useReducer } from "react";

const reducer = (state, action) => {
  switch (action.type) {
    case "TOGGLE_DARK_MODE":
      return {
        ...state,
        darkMode: !state.darkMode
      };
    default:
      return state;
  }
};

const useGlobalState = () => {
  const [state, dispatch] = useReducer(reducer, {
    darkMode: false
  });

  return { state, dispatch };
};

export default useGlobalState;
