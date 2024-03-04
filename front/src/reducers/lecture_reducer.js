import { QUESTIONLIST, CHECKENROLL, CHECKCOUNT } from "../_actions/types";

export default function lectureReducer(state = {}, action) {
  switch (action.type) {
    case QUESTIONLIST:
      return { ...state, questionList: action.payload };
      break;
    case CHECKENROLL:
      return { ...state, checkEnroll: action.payload };
      break;
    case CHECKCOUNT:
      return { ...state, checkCount: action.payload };
      break;

    default:
      return state;
  }
}
