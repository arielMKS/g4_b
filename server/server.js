var express = require("express");
var app = express();
var fs = require("fs");
var data = fs.readFileSync("customers.json", "utf8");
var customers = JSON.parse(data);
var routes = require("./app/routes");

var bodyParser = require("body-parser");
// const cookieParser = require("cookie-parser");
const dotenv = require("dotenv");
dotenv.config();
var cors = require("cors"); // use cors to solve issue when using fetch() with api running on different server

var port = process.env.PORT || 8080;

app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: false }));
// app.use(cookieParser());

app.use(cors()); // tell my express server to use the cors()

app.use("/", routes);

app.use((req, res) => {
  res.status(404).send("<h2>The path is not valid</h2>");
});

app.listen(port, () => {
  console.log(`Magic happens on port ${port}`);
});
