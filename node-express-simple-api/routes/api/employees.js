const express = require("express");

const {
  getAllEmployees,
  getEmployeeById,
  createNewEmployee,
  updateEmployee,
  deleteAllEmployees,
} = require("../../controllers/employeesController");
const verifyJWT = require("../../middleware/verifyJWT");
const verifyRoles = require("../../middleware/verifyRoles");
const ROLES_LIST = require("../../config/rolesList");
const router = express.Router();

router
  .route("/")
  .get(getAllEmployees)
  .post(verifyRoles(ROLES_LIST.Admin), createNewEmployee)
  .put(verifyRoles(ROLES_LIST.Editor, ROLES_LIST.Admin), updateEmployee)
  .delete(deleteAllEmployees);

router.route("/:id").get(getEmployeeById);

module.exports = router;
