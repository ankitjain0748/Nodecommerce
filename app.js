const express = require('express')
const app = express()
app.use(express.json())
const apiroute = require("./Routes/ContactUs")

app.use("/api", apiroute);


app.get('/', (req, res) => {
    res.json({ message: 'API data response' });
});

const mongoose = require('mongoose')
mongoose.connect("mongodb://localhost:27017/contact")

app.listen(5000, () => {
    console.log("Server is running on port 5000")
})