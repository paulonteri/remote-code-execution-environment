import axios from "axios";
import { RUN_CODE_SUCCESS, RUN_CODE_FAILED, RUN_CODE_RUNNING } from "./types";

const headers = {
  "Content-Type": "multipart/form-data",
};

export const runCode = (code, func) => {
  axios
    .post(`http://localhost:6500/python`, code, {
      headers: headers,
    })
    .then((res) => {
      console.log(res.data);
      func(res.data, false);
    })
    .catch((err) => {
      console.log(err);
      if (err.data) {
        func(err.data, true);
      } else {
        func("", true);
      }
    });
};

export const runCodeTest = (code) => (dispatch, getState) => {
  dispatch({ type: RUN_CODE_RUNNING });
  axios
    .post(`http://localhost:6500/python`, code, {
      headers: headers,
    })
    .then((res) => {
      dispatch({
        type: RUN_CODE_SUCCESS,
      });
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: RUN_CODE_FAILED,
      });
    });
};
