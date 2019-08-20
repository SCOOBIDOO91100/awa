const mongoose = require ("mongoose");

const categorieSchema = mongoose.Schema({
    name: String,
    type: Schema.Type

});

const Categorie = mongoose.model("project", categorieSchema );

module.exports = Categorie;

