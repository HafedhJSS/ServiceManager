const dotenv = require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const userRoute = require("./routes/userRoute");
const contactRoute = require("./routes/contactRoute");
const errorHandler = require("./middleWare/errorMiddleware");
const cookieParser = require("cookie-parser");
const path = require("path");
const requestController = require("./controllers/requestController");

const app = express();

const { request } = require("http");
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
app.use("/api/contactus", contactRoute);

// Routes
app.get("/", (req, res) => {
    res.send("Home Page");
});
app.get("/requests",requestController.fetchRequests )
app.get("/request/:id",requestController.fetchRequest )
app.post("/request",requestController.createRequest)
app.put("/request/:id", requestController.updateRequest)
app.delete("/request/:id" , requestController.deleteRequest)
// Error Middleware
app.use(errorHandler);
// Connect to DB and start server
const PORT = process.env.PORT || 5000;
mongoose
    .connect(
        "mongodb+srv://oussema:x1sM9H4x4kKDyVAR@cluster0.cspwo.mongodb.net/serviceManager?retryWrites=true&w=majority&appName=Cluster0"
    )
    .then(() => {
        console.log(`DataBase Connected`);
    })
    .catch((err) => console.log(err));
app.listen(PORT, () => {
    console.log(`Server Running on port ${PORT}`);
});
