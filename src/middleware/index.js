const { merge } = require("lodash");
const { getUserByUsername } = require("../models/User");

const isGuest = async (req, res, next) => {
  try {
    const username = req.cookies["mydatabase-users"];
    if (!username) return next();

    const existingUser = await getUserByUsername(username);
    if (!existingUser) return next();

    return res.redirect("/");
  } catch (error) {
    console.log(error);
    return res.status(500);
  }
};

const isAuthenticated = async (req, res, next) => {
  try {
    const username = req.cookies["mydatabase-users"];
    if (!username) return res.redirect("/login");

    const existingUser = await getUserByUsername(username);
    if (!existingUser) return res.redirect("/login");

    merge(req, { identity: existingUser });
    return next();
  } catch (error) {
    console.log(error);
    return res.status(500);
  }
};

module.exports = { isAuthenticated, isGuest };
