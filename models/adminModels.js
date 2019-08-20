const mongoose = require ("mongoose");

const AdminSchema = mongoose.Schema({
    name: String,
    password: String,
    email: String
});

const Admin = mongoose.model("admin", AdminSchema );

module.exports = Admin;

