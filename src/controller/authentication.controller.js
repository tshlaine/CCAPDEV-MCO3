const { getUserByUsername, createUser, User } = require("../models/User");

const register = async (req, res) => {
  const { avatar, fullName, userName, password, description } = req.body;
  // const { file } = req;
  // console.log(req.file);
  if (!avatar) {
    return res.status(200).json({
      success: false,
      message: "Please provide a profile picture.",
    });
  }

  if (!fullName || !userName || !password)
    return res.status(200).json({
      success: false,
      message: "Please provide all required credentials.",
    });

  const user = await getUserByUsername(userName);
  if (user)
    return res.status(200).json({
      success: false,
      message: "The username you provided is already taken.",
    });

  const nameParts = fullName.split(" ");
  const firstname = nameParts[0];
  const lastname = nameParts[nameParts.length - 1];

  await createUser({
    fullname: {
      firstname,
      lastname,
    },
    username: userName,
    password,
    bio: description,
    profilepicture: avatar,
  });

  return res.status(200).json({
    success: true,
    message: "The user is successfully registered.",
  });
};

const login = async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password)
    return res.status(200).json({ success: false, message: "Username or Password is empty!" });

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

  res.cookie("mydatabase-users", username, {
    maxAge: 24 * 60 * 60 * 1000, //equivalent to one day
    path: "/",
  });

  res.status(200).json({ success: true }).end();
  // return res.redirect("/index");
};

const logout = (req, res) => {
  res.clearCookie("mydatabase-users");

  res.redirect("/index");
};

module.exports = { register, login, logout };
