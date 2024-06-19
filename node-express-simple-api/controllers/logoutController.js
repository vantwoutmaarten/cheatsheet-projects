const userDB = {
  users: require("../model/users.json"),
  setUsers: function (users) {
    this.users = users;
  },
};

const fsPromises = require("fs").promises;
const cookieParser = require("cookie-parser");
const path = require("path");

const handleLogout = async (req, res) => {
  const cookies = req.cookies;
  console.log("cookies.jwt", cookies.jwt);
  if (!cookies?.jwt) {
    return res.sendStatus(401);
  }

  const refreshToken = cookies.jwt;
  const foundUser = userDB.users.find((u) => u.refreshToken === refreshToken);
  if (!foundUser) {
    res.clearCookie("jwt", {
      httpOnly: true,
      maxAge: 1000 * 60 * 60 * 24,
    });
    return res.sendStatus(401);
  }
  const otherUsers = userDB.users.filter(
    (u) => u.userName !== foundUser.userName
  );
  const updatedUsers = [...otherUsers, { ...foundUser, refreshToken: "" }];
  userDB.setUsers(updatedUsers);
  await fsPromises.writeFile(
    path.join(__dirname, "../model/users.json"),
    JSON.stringify(updatedUsers)
  );
  res.clearCookie("jwt", {
    httpOnly: true,
    maxAge: 1000 * 60 * 60 * 24,
  });
  res.sendStatus(204);
};

module.exports = { handleLogout };
