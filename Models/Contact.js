const mongoose = require("mongoose");

const contactSchema = mongoose.Schema({
    name: String,
    message: String,
    phone: Number,
    email: String  // Corrected: Use "String" instead of "email"
});

module.exports = mongoose.model("Contact", contactSchema);
