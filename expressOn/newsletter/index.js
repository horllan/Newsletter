const express = require("express");
const bodyParser = require("body-parser");
const https = require("https");

const app = express();
app.use(express.static("../../"));

app.get("/", (req, res) => {
	res.sendFile(__dirname + "/signup.html");
});


app.post("/fail", (req, res) => {
	res.redirect("/")
})

app.post("/success", (req, res) => {
	res.redirect("/")
})
app.listen(process.env.PORT || 3888, (req, res) => {
	console.log("server is running @ port 3888!");
});
