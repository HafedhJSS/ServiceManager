const dotenv = require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const userRoute = require("./routes/userRoute");
const errorHandler = require("./middleWare/errorMiddleware");
const cookieParser = require("cookie-parser");
const path = require("path");

const app = express();

// Middlewares
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(
    cors({
        origin: ["http://localhost:3000"],
        credentials: true,
    })
);

app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// Routes Middleware
app.use("/api/users", userRoute);

// Routes
app.get("/", (req, res) => {
    res.send("Home Page");
});

// Error Middleware
app.use(errorHandler);
// Connect to DB and start server
const PORT = process.env.PORT || 5000;
mongoose
    .connect(
        "ALOOO IHEBB 7OT STRING CONNECTION MTAA LATLAS LENA"
    )
    .then(() => {
        console.log(`DataBase Connected`);
    })
    .catch((err) => console.log(err));
app.listen(PORT, () => {
    console.log(`Server Running on port ${PORT}`);
});
