import fetch from "node-fetch";
import { load } from "cheerio";
import twilio from "twilio";
import config from "./config.js";
import "dotenv/config";
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

const main = async () => {
  let timer=0;
  const cron = setInterval(() => {
    fetchData();
    timer++;
    console.log(`Attempt ${timer} -> ${success}`);
    if (success == true) {
      clearInterval(cron);
    }
  }, 1000 * 2);
};

main();
