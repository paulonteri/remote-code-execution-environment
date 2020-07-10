var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var python = require("./services/python");
const port = process.env.PORT || 6500;
app.use(bodyParser.json());

// ROUTES
app.get("/", (req, res) => res.send("Hi There!"));

app.get("/test", (req, res) => {
  python.run('print("Hello World")', function (data) {
    console.log(data);
    res.send(data);
  });
});

app.listen(port, () =>
  console.log(`Backend listening at http://localhost:${port}`)
);

var fs = require("fs");
