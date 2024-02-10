require("dotenv").config();
const express = require("express");
const app = express();
const connectDB = require("./db/connect");
app.use(express.json());
const PORT = process.env.PORT || 5000;

const user_routes = require("./routes/users");
const organization_routes = require("./routes/organizations");
const campuses_routes = require("./routes/campuses");
const employee_routes = require("./routes/employees");
const role_routes = require("./routes/roles");
const permission_routes = require("./routes/permissions");
const student_routes = require("./routes/students");
const class_routes = require("./routes/classes");

app.use("/api/user", user_routes);
app.use("/api/organization", organization_routes);
app.use("/api/campus", campuses_routes);
app.use("/api/employee", employee_routes);
app.use("/api/role", role_routes);
app.use("/api/permission", permission_routes);
app.use("/api/student", student_routes);
app.use("/api/class", class_routes);

const start = async() => {
    try {
        await connectDB(process.env.MONGODB_URL);
        app.listen(PORT, () => {
            console.log(`Node is running at ${PORT}`);
        })
    } catch (error) {
        console.log(error);
    }
};

start();