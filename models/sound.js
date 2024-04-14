// IMPORTATION DU MODULE MONGOOSE
const mongoose = require("mongoose");

// RÉCUPÉRATION DE LA CLASSE SCHÉMA DE MONGOOSE
const Schema = mongoose.Schema;

const SoundSchema = new Schema({
    name: { type: String, required: true },
    link: { type: String, required: true },
});

//CRÉATION DU MODÈLE
// 2 params = nom du model + schéma SoundSchema
const SoundModel = mongoose.model("sound", SoundSchema);

// EXPORT DU MODÈLE
module.exports = SoundModel;