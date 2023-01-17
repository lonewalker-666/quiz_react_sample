import { QUESTION, RESULT } from "./action";
import { defaultGlobalState } from "./defaultGlobalState";

const reducer = (state = defaultGlobalState, action: any) => {
  switch (action.type) {
    case QUESTION:
      return {
        ...state,
        question: action.payload,
      };
    case RESULT:
      return {
        ...state,
        result: action.payload,
      };
    default:
      return state;
  }
};

export default reducer;
