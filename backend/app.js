var express = require("express");
var app = express();
var bodyParser = require("body-parser");
const port = process.env.PORT || 6500;
app.use(bodyParser.json());

// ROUTES
app.get("/", (req, res) => res.send("Hi There!"));

app.listen(port, () =>
  console.log(`Backend listening at http://localhost:${port}`)
);
