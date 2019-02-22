const express = require("express");
const request = require("request");
const puppeteer = require("puppeteer");

const app = express();

const membership = "basic";
switch (membership) {
  case "basic":
    request.get(
      {
        url: "http://google.com",
        time: true
      },
      function(err, response) {
        console.log("error:", err);
        console.log("statusCode:", response && response.statusCode);
        console.log("Request time in ms:", response.elapsedTime);
        if (response.elapsedTime < 1000) {
          console.log("Good Response");
        } else {
          console.log("Bad Response");
        }
      }
    );
    break;
  case "screenshot":
    (async () => {
      const browser = await puppeteer.launch();
      const page = await browser.newPage();
      await page.goto("https://www.google.com");
      await page.screenshot({ path: `./screenshots/${Date().toString()}.png` });

      await browser.close();
    })();
    break;
}
