var express = require("express");
var formidable = require("express-formidable");
var cors = require("cors");
var app = express();
var port = process.env.PORT || 6500;
var frontend = process.env.FRONTEND || "https://runcode.paulonteri.com";
const python = require("./services/python");
const java = require("./services/java");
const javascript = require("./services/javascript");
const cSharp = require("./services/cSharp");
const golang = require("./services/golang");

app.use(formidable());

const corsOptions = () => {
  if (process.env.NODE_ENV === "production") {
    return {
      origin: frontend,
      optionsSuccessStatus: 200,
      methods: "GET,POST",
    };
  } else {
    return {
      optionsSuccessStatus: 200,
    };
  }
};

app.use(cors(corsOptions()));

// ROUTES
app.get("/", (req, res) =>
  res.send(
    "Hi There! You shouldn't be seeing this. 🙂 Try:{https://runcode.paulonteri.com/#/} or {https://github.com/paulonteri/remote-code-execution-environment}"
  )
);

app.post("/code", (req, res) => {
  var text = req.fields.text;
  var language = req.fields.language;

  if (!text || !(text.length > 1)) {
    res.status(422).send("Write some code!");
  }

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
    case "csharp":
      cSharp.run(text, function (data) {
        res.status(200).json(data);
      });
      break;
    case "java":
      java.run(text, function (data) {
        res.status(200).json(data);
      });
      break;
     case "golang":
			golang.run(text, function (data) {
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

// end
