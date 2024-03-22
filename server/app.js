const express = require("express")
const dotenv = require("dotenv")
const cors = require("cors")
dotenv.config();
const connectDB = require("./Config/db");
const app = express();
app.use(express.json());
const UserRoutes = require("./routes/userRoutes");
const EmployeeRoute = require("./routes/employeeRoute")
app.use(cors());
let port = process.env.PORT || 7300;
//db connection
connectDB();
//routes config
app.use("/api/user", UserRoutes);
app.use("/api/employee",EmployeeRoute)
app.listen(port, () => {
  console.log(`App is listening on ${port}`);
});