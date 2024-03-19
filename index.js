const express = require("express")
const app = express();
const dotenv = require('dotenv')
const mongoose = require("mongoose")
const authRouth = require("./routes/auth")

dotenv.config();

// connect to DB
mongoose.connect(process.env.DB_CONNECT)

app.use(express.json())

app.use("/api/user",authRouth)
app.listen(5000,()=>console.log("Server Up and running"))

// GDNjrR2QcoAZvhM9