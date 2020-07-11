var express = require("express");
var formidable = require("express-formidable");
var cors = require("cors");
var app = express();
var port = process.env.PORT || 6500;
var python = require("./services/python");
app.use(formidable());
var corsOptions = {
  // origin: "http://example.com",
  optionsSuccessStatus: 200,
};
app.use(cors(corsOptions));

// ROUTES
app.get("/", (req, res) => res.send("Hi There!"));

app.post("/python", (req, res) => {
  var text = req.fields.text;
  var language = req.fields.language;
  python.run(text, function (data) {
    res.status(200).json(data);
  });
});

app.listen(port, () =>
  console.log(`Backend listening at http://localhost:${port}`)
);
