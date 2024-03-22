const express = require("express");
const { verify } = require("../middleware/authmiddleware");
const router = express.Router();
const {
    createEmployee, updateEmployee, getEmployeesData, getEmployee,search,deleteEmployee
} = require("../controllers/employeeController");
router.route("/").post(verify,createEmployee);
router.route("/update/:id").put(verify,updateEmployee);
router.route("/employees/getdata").get(verify,getEmployeesData)
router.route("/get-employee-data/:id").get(verify,getEmployee)
router.route("/searchemployee/:key:address").get(verify,search)
router.route("/delete/:id").delete(verify,deleteEmployee)
module.exports = router;