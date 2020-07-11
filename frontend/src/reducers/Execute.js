import {
  RUN_CODE_SUCCESS,
  RUN_CODE_FAILED,
  RUN_CODE_RUNNING,
} from "../actions/types";

const initialState = {
  output: null,
  runCodeLoading: false,
  runCodeFail: false,
  runCodeOk: false,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case RUN_CODE_SUCCESS:
      return {
        ...state,
        output: action.payload,
        runCodeLoading: false,
        runCodeFail: false,
        runCodeOk: true,
      };
    case RUN_CODE_RUNNING:
      return {
        ...state,
        output: null,
        runCodeLoading: true,
        runCodeFail: false,
        runCodeOk: false,
      };
    case RUN_CODE_FAILED:
      return {
        ...state,
        output: null,
        runCodeLoading: false,
        runCodeFail: true,
        runCodeOk: false,
      };
    default:
      return state;
  }
}
