var express = require("express");
var router = express.Router();

router.get("/", (_, res) => res.render("index", { title: "Express" }));
router.get("/help", (_, res) => res.render("help"));
router.get("/generator", (_, res) => res.render("generator"));

const getUrl = (url) => {
  try {
    return new URL(url);
  } catch (e) {
    return new URL(`https://${url}`);
  }
};

router.get("/login", function (req, res, next) {
  const { query } = req;
  const params = Object.keys(query).find((key) => key.startsWith("web+auth:"));

  if (!params && (!query.challenge || !query.callback)) {
    return next(new Error("Invalid params"));
  }

  const [challenge, callback] = params
    ? params.replace(/^web\+auth:/, "").split("@")
    : [query.challenge, query.callback];

  if (challenge.startsWith("//")) {
    return next(new Error("Invalid challenge: Don't put // after web+auth:"));
  }

  res.render("login", { challenge, callback: getUrl(callback) });
});

module.exports = router;
