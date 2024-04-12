// IMPORTATION DU MODULE MONGOOSE
const mongoose = require("mongoose");

// RÉCUPÉRATION DE LA CLASSE SCHÉMA DE MONGOOSE
const Schema = mongoose.Schema;

const MemeSchema = new Schema({
    name: String,
    link: String,
});

//CRÉATION DU MODÈLE
// 2 params = nom du model + schéma MemeSchema
const MemeModel = mongoose.model("meme", MemeSchema);

// EXPORT DU MODÈLE
module.exports = MemeModel;