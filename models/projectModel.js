const mongoose = require ("mongoose");

const projectSchema = mongoose.Schema({
    titre: String,
    description: String,
    image: String
});

const Project = mongoose.model("project", projectSchema );

module.exports = Project;

