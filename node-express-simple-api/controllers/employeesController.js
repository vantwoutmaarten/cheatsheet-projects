const data = {
  employee: require("../model/employees.json"),
  setEmployees: (employees) => {
    this.employees = employees;
  },
};
data.employee = require("../model/employees.json");

const getAllEmployees = (req, res) => {
  res.json(data.employee);
};

const getEmployeeById = (req, res) => {
  const employee = data.employee.find(
    (employee) => employee.id === parseInt(req.params.id)
  );
  if (!employee) {
    res
      .status(404)
      .json({ msg: `Employee with id ${req.params.id} not found` });
  }
  res.json(employee);
};

const createNewEmployee = (req, res) => {
  const maxId = data.employee.reduce(
    (max, item) => (item.id > max ? item.id : max),
    0
  );

  if (!req.body.firstName || !req.body.lastName) {
    return res
      .status(400)
      .json({ msg: "Please include a first name and last name" });
  }

  const newEmployee = {
    ...req.body,
    id: maxId + 1,
  };
  data.employee.push(newEmployee);
  data.setEmployees(data.employee);
  res.status(201).json(data.employee);
};

const updateEmployee = (req, res) => {
  const employee = data.employees.find(
    (emp) => emp.id === parseInt(req.params.id)
  );
  if (!employee) {
    return res
      .status(404)
      .json({ msg: `Employee with id ${req.params.id} not found` });
  }

  const filteredArr = data.employess.filter(
    (emp) => emp.id !== parseInt(req.body.id)
  );
  const unsortedArr = [...filteredArr, req.body];
  //   With sorting you also need the 0 if there is any
  data.setEmployees(
    unsortedArr.sort((a, b) => (a.id > b.id ? 1 : a.id < b.id ? -1 : 0))
  );
  data.employee = req.body;
  res.json(data.employee);
};

const deleteAllEmployees = (req, res) => {
  data.employee = [];
  res.json(data.employee);
};

module.exports = {
  getAllEmployees,
  getEmployeeById,
  createNewEmployee,
  updateEmployee,
  deleteAllEmployees,
};
