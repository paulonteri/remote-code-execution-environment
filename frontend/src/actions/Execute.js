import axios from "axios";

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
