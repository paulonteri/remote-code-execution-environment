var express = require("express");
var formidable = require("express-formidable");
var cors = require("cors");
var app = express();
var port = process.env.PORT || 6500;
const python = require("./services/python");
const java = require("./services/java");
const javascript = require("./services/javascript");

app.use(formidable());
var corsOptions = {
  // origin: "http://example.com",
  optionsSuccessStatus: 200,
};
app.use(cors(corsOptions));

// ROUTES
app.get("/", (req, res) =>
  res.send(
    "Hi There! You shouldn't be seeing this. 🙂 Try:{https://runcode.paulonteri.com/#/} or {https://github.com/paulonteri/remote-code-execution-environment}"
  )
);

app.post("/python", (req, res) => {
  var text = req.fields.text;
  var language = req.fields.language;

  switch (language) {
    case "python":
      python.run(text, function (data) {
        res.status(200).json(data);
      });
      break;
    case "javascript":
      javascript.run(text, function (data) {
        res.status(200).json(data);
      });
      break;
    case "java":
      java.run(text, function (data) {
        res.status(200).json(data);
      });
      break;
    default:
      res.status(422).send("Invalid programming language!");
  }
});

app.listen(port, () =>
  console.log(`Backend listening at http://localhost:${port}`)
);
