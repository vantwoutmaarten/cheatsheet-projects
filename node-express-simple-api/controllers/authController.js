const userDB = {
  users: require("../model/users.json"),
  setUsers: function (users) {
    this.users = users;
  },
};

const bcrypt = require("bcrypt");

const jwt = require("jsonwebtoken");
require("dotenv").config();
const fsPromises = require("fs").promises;
const path = require("path");

const handleLogin = async (req, res) => {
  const { user, password } = req.body;
  if (!user || !password) {
    res.status(400).send("User and password required");
    return;
  }

  const foundUser = userDB.users.find((u) => u.userName === user);

  if (!foundUser) {
    return res.sendStatus(401);
  }
  const match = await bcrypt.compare(password, foundUser.password);
  if (match) {
    const roles = Object.values(foundUser.roles);
    console.log("auth roles", roles);
    const accessToken = jwt.sign(
      {
        UserInfo: {
          user: foundUser.userName,
          roles: roles,
        },
      },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: "30s" }
    );
    const refreshToken = jwt.sign(
      { user: foundUser.userName },
      process.env.REFRESH_TOKEN_SECRET,
      { expiresIn: "1d" }
    );
    foundUser.refreshToken = refreshToken;
    // Saving refreshToken with current user.
    const otherUsers = userDB.users.filter((u) => u.userName !== user);
    const updatedUsers = [...otherUsers, foundUser];
    userDB.setUsers(updatedUsers);

    await fsPromises.writeFile(
      path.join(__dirname, "../model/users.json"),
      JSON.stringify(updatedUsers)
    );

    res.cookie("jwt", refreshToken, {
      httpOnly: true,
      maxAge: 1000 * 60 * 60 * 24,
    });
    res.json({
      accessToken,
      user: { userName: foundUser.userName },
    });
  } else {
    res.sendStatus(401);
  }
};

module.exports = { handleLogin };
