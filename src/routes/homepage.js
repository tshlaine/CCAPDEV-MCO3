const fs = require("fs");
const { getUserByUsername } = require("../models/User");
const rawCafe = fs.readFileSync("src/models/cafes.metadata.json");
const cafes = JSON.parse(rawCafe);
const cafesSorted = cafes.sort((a, b) => b.averageRating - a.averageRating);

const budgetFriendlyCafes = cafes.filter(
  (cafe) => cafe.category && cafe.category.includes("Budget-Friendly")
);

const studyFriendlyCafes = cafes.filter(
  (cafe) => cafe.category && cafe.category.includes("Study-Friendly")
);

// Select the top three cafes
const topThreeCafes = cafesSorted.slice(0, 3);

// Route handler for /index
const homepage = async (req, res) => {
  const uname = req.cookies["apdev-mco-user"];
  const user = await getUserByUsername(uname);

  if (user) {
    const {
      fullname: { lastname, firstname },
      username,
      profilepicture,
      bio,
    } = user;
    const pic = profilepicture ?? "/images/user.png";

    return res.render("index", {
      studyFriendlyCafes: studyFriendlyCafes,
      budgetFriendlyCafes: budgetFriendlyCafes,
      cafes: cafes, // Pass all cafes
      topThreeCafes: topThreeCafes, // Pass the top three cafes
      username,
      pic,
    });
  }

  res.render("index", {
    studyFriendlyCafes: studyFriendlyCafes,
    budgetFriendlyCafes: budgetFriendlyCafes,
    cafes: cafes, // Pass all cafes
    topThreeCafes: topThreeCafes, // Pass the top three cafes
    pic: "/images/usericon.png",
  });
};

module.exports = (router) => {
  router.get("/index", homepage);
};
