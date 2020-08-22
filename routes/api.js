const { exec } = require("child_process");
const express = require("express");
const config = require("config");
const router = express.Router();

const dig = config.get("dig");

const getTXT = (domain) =>
  new Promise((resolve, reject) => {
    console.log(`dig ${dig && `@${dig}`} ${domain} TXT +short`);
    exec(`dig ${dig && `@${dig}`} ${domain} TXT +short`, (error, out) => {
      if (error) {
        return reject(error);
      }

      const txt = out
        .split("\n")
        .map((line) => line.substring(1, line.length - 1)) // remove "quotes"
        .find((line) => line.indexOf("auth=") === 0);

      if (!txt) {
        return reject(new Error("auth TXT not found"));
      }

      resolve(txt.substring(5));
    });
  });

router.post("/", async (req, res) => {
  const { domain } = req.body;

  getTXT(encodeURIComponent(domain))
    .then((key) => res.json({ key }))
    .catch((e) => res.status(400).json({ error: e.message }));
});

module.exports = router;
