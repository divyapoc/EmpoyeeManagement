const asyncHandler = require("express-async-handler");
const Employee = require("../models/employeeModel");

const createEmployee = asyncHandler(async (req, res) => {
  const { name, address, role, mobileNumber, email } = req.body;
  if (!name || !address || !role || !mobileNumber || !email) {
    return res.status(400).json({
      status: "fail",
      message: "Please provide all required fields",
    });
  }
  try {
    const employee = await Employee.create({
      name,
      address,
      role,
      mobileNumber,
      email,
    });
   return res.status(201).json({
      status: "success",
      message: "Employee created successfully",
      result: {
        _id: employee._id,
        name: employee.name,
        address: employee.address,
        role: employee.role,
        mobileNumber: employee.mobileNumber,
        email: employee.email,
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
});

const updateEmployee = asyncHandler(async (req, res) => {
  const { id } = req.params;
  try {
    let employee = await Employee.findById({ _id: id });
    if (!employee) {
      res.status(404);
      throw new Error("Employee not found");
    }
    for (const [key, value] of Object.entries(req.body)) {
      // Skip updating the employee ID
      if (key === "employee_Id") continue;

      // Update the employee field
      employee[key] = value;
    }
    await employee.save();

    res.status(200).json({
      status: "success",
      message: "Employee data updated successfully",
      result: {
        _id: employee._id,
        ...employee.toObject(),
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
});

// To get all employee data
const getEmployeesData = asyncHandler(async (req, res) => {
  try {
    const employees = await Employee.find();
    res.status(200).json({ status: "success", data: employees });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
});



// Route to get single employee detail
const getEmployee = asyncHandler(async (req, res) => {
  const { id } = req.params;
  try {
    const employee = await Employee.findById({ _id: id });
    if (!employee) {
      res.status(404).json({ message: "Employee not found" });
    } else {
      res.status(200).json({ status: "success", data: employee });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
});
const search = asyncHandler(async (req, res) => {
  // console.log("--------req.params.key----------------", req.params.key, req.params.address);
  // console.log(JSON.stringify(req.params.key));
  // console.log(JSON.stringify(req.params.address));
  try {
    const name = req.params.key?.toString();
    const address = req.params.address?.toString();
    let data;
    let query = {};
    if (name && address) {
      data = await Employee.find({
        $or: [
          { name: { $regex: req.params.key, $options: "i" } },
          { address: { $regex: req.params.address, $options: "i" } },
        ],
      });
    } else if (name) {
      data = await Employee.find({
        $or: [{ name: { $regex: req.params.key, $options: "i" } }],
      });
    } else if (address) {
      data = await Employee.find({
        $or: [{ address: { $regex: req.params.address, $options: "i" } }],
      });
    } else {
      return res
        .status(400)
        .json({ status: "failure", message: "Provide either name or address" });
    }

    if (data.length > 0) {
      return res
        .status(200)
        .json({
          status: "success",
          message: "Data fetched",
          result: data,
        });
    } else {
      return res
        .status(404)
        .json({ status: "failure", message: "No dat available" });
    }
  } catch (error) {
    return res.status(500).json({ status: "failure", message: error.message });
  }
});

// delete employee
const deleteEmployee = asyncHandler(async (req, res) => {
  const { id } = req.params;
  try {
    const employee = await Employee.findByIdAndDelete({ _id: id });
    if (!employee) {
      res.status(404);
      throw new Error("Employee not found");
    }
    res.status(200).json({
      status: "success",
      message: "Employee deleted successfully",
      result: {
        _id: employee._id,
        ...employee.toObject(),
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
});

module.exports = {
  createEmployee,
  updateEmployee,
  getEmployeesData,
  getEmployee,
  search,
  deleteEmployee,
};
