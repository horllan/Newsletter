const express = require("express");
const bodyParser = require("body-parser");
const https = require("https");

const app = express();
app.use(express.static("../../"));

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/signup.html");
});

app.post("/fail", (req, res) => {
  res.redirect("/");

  const email = req.body.email;
  const fName = req.body.firstName;
  const lName = req.body.lastName;

  const url = "https://us2.api.mailchimp.com/3.0/lists/4e8271d779";
  const option = {
    auth: "olanrewaju:d9b46c65d07fa7e01238c5f761f0916d-us2",
    method: "POST",
  };

  const data = {
    members: [
      {
        status: "subscribed",
        email_address: email,
        merge_field: {
          FNAME: fName,
          LNAME: lName,
        },
      },
    ],
  };

  const jsonData = JSON.stringify(data);

  const request = https.request(url, option, (response) => {
    response.on("data", (data) => {
      response.statusCode === 200
        ? res.sendFile(__dirname + "/success.html")
        : res.sendFile(__dirname + "/fail");
    });
  });

  request.write(jsonData)
  request.end()
});

app.post("/success", (req, res) => {
  res.redirect("/");
});
app.post("/fail", (req, res) => {
  res.redirect("/");
});
app.listen(process.env.PORT || 3888, (req, res) => {
  console.log("server is running @ port 3888!");
});
