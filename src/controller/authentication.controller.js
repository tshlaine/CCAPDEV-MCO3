const { getUserByUsername, createUser } = require("../models/User");

const register = async (req, res) => {
  const { fullname, username, password, description } = req.body;
  const { file } = req;
  if (!file) {
    return res.status(200).json({
      success: false,
      message: "Please provide a profile picture.",
    });
  }
  const profilepicture = "/uploads/" + req.file.filename;

  if (!fullname || !username || !password)
    return res.status(200).json({
      success: false,
      message: "Please provide all required credentials.",
    });

  const user = await getUserByUsername(username);
  if (user)
    return res.status(200).json({
      success: false,
      message: "The username you provided is already taken.",
    });

  // Split fullname
  const nameParts = fullname.split(" ");
  const firstname = nameParts[0];
  const lastname = nameParts[nameParts.length - 1];

  await createUser({
    fullname: {
      firstname,
      lastname,
    },
    username,
    password,
    bio: description,
    profilepicture,
  });

  return res.status(200).json({
    success: true,
    message: "The user is successfully registered.",
  });
};

const login = async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password)
    return res
      .status(200)
      .json({ success: false, message: "Username or Password is empty!" });

  const user = await getUserByUsername(username);

  // User not found
  if (!user)
    return res.status(200).json({
      success: false,
      message: "Please provide a valid credentials that matched your account!",
    });

  // Wrong password
  if (user.password !== password)
    return res.status(200).json({
      success: false,
      message: "Please provide a valid credentials that matched your account!",
    });

  res.cookie("apdev-mco-user", username, {
    maxAge: 24 * 60 * 60 * 1000, //equivalent to one day
    path: "/",
  });

  // Send success status code.
  res.status(200).json({ success: true }).end();
};

const logout = (req, res) => {
  res.clearCookie("apdev-mco-user");

  res.redirect("/index");
};

module.exports = { register, login, logout };
