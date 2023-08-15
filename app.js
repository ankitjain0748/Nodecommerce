const express = require("express")
const app = express()
app.use(express.json());
const mongoose = require("mongoose")
const signup = require('./Routes/User')
require('dotenv').config()
const cors = require("cors");
app.use(cors());
app.use('/user', signup)
const DB = process.env.DB_URL
console.log("DB", DB)
mongoose.connect('mongodb://127.0.0.1:27017/commerces', { useNewUrlParser: true, useUnifiedTopology: true });



const PORT = process.env.PORT;
console.log("Port", PORT)
app.listen(PORT, () => { console.log(`server is run, ${PORT}`) })