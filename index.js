const express = require("express");
const app = express();
const dotenv = require('dotenv');
const mongoose = require("mongoose");
const authRoute = require("./routes/auth"); 
const profile = require("./routes/profile")

dotenv.config();

// Connect to DB
mongoose.connect(process.env.DB_CONNECT) 
app.use(express.json());

app.use("/api/user", authRoute); 
app.use("/api/user", profile)
app.listen(5000, () => console.log("Server Up and running"));

// GDNjrR2QcoAZvhM9