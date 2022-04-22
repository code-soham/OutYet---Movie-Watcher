import fetch from "node-fetch";
import { load } from "cheerio";
import twilio from "twilio";
import "dotenv/config";
import config from "./config.js";
import "dotenv/config";
import request from "request";
const URL =
  "https://in.bookmyshow.com/jalpaiguri/movies/doctor-strange-in-the-multiverse-of-madness/ET00310791";
// const URL = "https://in.bookmyshow.com/jalpaiguri/movies/the-eken/ET00323465"
const getRawData = (URL) => {
  return fetch(URL)
    .then((response) => response.text())
    .then((data) => {
      return data;
    });
};
var success = false;
const callup = (loc) => {
  var client = new twilio(config.accountSid, config.authToken);
  var message = " Tickets Out for " + loc + "!! . Book now @ " + URL;
  client.messages
    .create({
      to: config.agentNumber,
      from: config.twilioNumber,
      body: message,
    })
    .then(() => {
      response.status(200).send("Alerted Successfully");
    })
    .catch((err) => {
      response.status(500).send();
    });
};
const fetchData = async () => {
  const data = await getRawData(URL);
  const $ = load(data);
  let ct = 0;
  //   console.log(typeof data);
  $("span").each((i, title) => {
    if (title.children[0].data == "Book tickets") ct++;
  });
  if (ct != 0) {
    callup("Jalpaiguri");
    success = true;
  }
};
const ping = () =>
  request(
    "https://frozen-tundra-11970.herokuapp.com/",
    (error, response, body) => {
      console.log("Error: ", error);
      console.log("Status Code: ", response && response.statusCode);
      console.log("Body: ", body);
    }
  );

const main = async () => {
  console.log(config);
  let timer = 0;
  setInterval(ping, 20 * 60 * 1000);
  const cron = setInterval(() => {
    fetchData();
    timer++;
    console.log(`Attempt ${timer} -> ${success}`);
    if (success == true) {
      clearInterval(cron);
    }
  }, 1000 * 30);
};
main();

import express from "express";
const app = express();

app.get("/", (req, res) => {
  res.send(
    new Date().toLocaleDateString("en-GB", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
      second: "numeric",
    })
  );
});

app.listen(process.env.PORT || 3000, () => {
  console.log(`Server started at port ${config.port}`);
});
