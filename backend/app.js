var express = require("express");
var app = express();
let formidable = require("express-formidable");
var python = require("./services/python");
const port = process.env.PORT || 6500;
app.use(formidable());

// ROUTES
app.get("/", (req, res) => res.send("Hi There!"));

app.post("/python", (req, res) => {
  var data = req.fields.text;
  var language = req.fields.language;
  python.run(data, function (data) {
    res.send(data);
  });
});

app.listen(port, () =>
  console.log(`Backend listening at http://localhost:${port}`)
);
