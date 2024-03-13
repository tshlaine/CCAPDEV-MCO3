const { Router } = require("express");
const authentication = require("./authentication");
const profile = require("./profile");
const homepage = require("./homepage");

const router = Router();

module.exports = () => {
  homepage(router);
  authentication(router);
  profile(router);
  return router;
};
