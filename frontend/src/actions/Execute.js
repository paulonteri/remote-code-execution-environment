import axios from "axios";
import { RUN_CODE_SUCCESS, RUN_CODE_FAILED, RUN_CODE_RUNNING } from "./types";
var server = "https://api.runcode.proj.paulonteri.com";

const addr = () => {
  if (!process.env.NODE_ENV || process.env.NODE_ENV === "development") {
    return "http://localhost:6500/code";
  } else {
    return server + "/code";
  }
};

const headers = {
  "Content-Type": "multipart/form-data",
};

export const runCode = (code) => (dispatch, getState) => {
  dispatch({ type: RUN_CODE_RUNNING });
  axios
    .post(addr(), code, {
      headers: headers,
    })
    .then((res) => {
      dispatch({
        type: RUN_CODE_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: RUN_CODE_FAILED,
      });
    });
};
