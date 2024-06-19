const userDB = {
  users: require("../model/users.json"),
  setUsers: function (users) {
    this.users = users;
  },
};

const fsPromises = require("fs").promises;
const path = require("path");
const bcrypt = require("bcrypt");

const handleNewUser = async (req, res) => {
  const { user, password } = req.body;
  if (!user || !password) {
    res.status(400).send("User and password required");
    return;
  }
  // Check if user already exists
  const duplicate = userDB.users.find((u) => u.userName === user);
  if (duplicate) {
    res.status(409).send("User already exists");
    return;
  }

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = {
      userName: user,
      roles: { User: 2001 },
      password: hashedPassword,
    };
    userDB.setUsers([...userDB.users, newUser]);

    await fsPromises.writeFile(
      path.join(__dirname, "..", "model", "users.json"),
      JSON.stringify(userDB.users)
    );

    console.log(userDB.users);
    res.status(201).json({
      success: `${user} user created`,
    });
  } catch (error) {
    res.status(500).send("Error creating user");
  }
};

module.exports = { handleNewUser };
