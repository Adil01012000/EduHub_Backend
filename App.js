require("dotenv").config();
const express = require("express");
const app = express();
const connectDB = require("./db/connect");
app.use(express.json());
const PORT = process.env.PORT || 5000;
const user_routes = require("./routes/users");

app.use("/api/user", user_routes);

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