import axios from "axios";

const headers = {
  "Content-Type": "multipart/form-data",
};

export const runCode = (code) => {
  axios
    .post(`http://localhost:6500/python`, code, {
      headers: headers,
    })
    .then((res) => {
      console.log(res.data);
    })
    .catch((err) => {
      console.log(err);
    });
};
