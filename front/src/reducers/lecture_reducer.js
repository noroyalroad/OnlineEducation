import { QUESTIONLIST } from "../_actions/types";

export default function lectureReducer(state = {}, action) {
  switch (action.type) {
    case QUESTIONLIST:
      return { ...state, questionList: action.payload };
      break;

    default:
      return state;
  }
}
