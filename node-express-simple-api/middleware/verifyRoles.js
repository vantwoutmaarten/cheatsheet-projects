const verifyRoles = (...allowedRoles) => {
  return (req, res, next) => {
    const rolesArr = [...allowedRoles];
    console.log("allowed", rolesArr);
    const roles = req.roles;
    console.log("roles", roles);
    if (!roles) {
      return res.sendStatus(403);
    }
    if (!allowedRoles.some((role) => roles.includes(role))) {
      return res.sendStatus(403);
    }
    next();
  };
};

module.exports = verifyRoles;
