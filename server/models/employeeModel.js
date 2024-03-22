const mongoose = require("mongoose");
const crypto= require("crypto");
const employeeSchema = mongoose.Schema(
  {
    name: { type: String, require: true,trim:true },
    employee_Id: { type: String },
    address: {
        type: String,
        required: true
      },
      role: {
        type: String,
        required: true
      },
      mobileNumber: {
        type: String,
        required: true
      },
      email:{
        type:String, required:true ,trim:true
      }
  },
  {
    timestamps: true,
  }
);
employeeSchema.pre('save',function(next){
    this.employee_Id='EMP'+crypto.pseudoRandomBytes(4).toString('hex').toUpperCase()
    console.log(this.employee_Id);
    next();
});
const Employee = mongoose.model("employee", employeeSchema);
module.exports = Employee;