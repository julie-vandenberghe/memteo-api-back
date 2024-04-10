// Importation du module express et cors
const express = require('express');
const cors = require('cors');

// Création de l'instance de l'application
const app = express();

// MIDDLEWARE POUR PERMETTRE AU SERVEUR DE RÉPONDRE AUX REQUÊTES PROVENANT D'UN DOMAINE DIFFÉRENT
// en effet, notre API est consommée par une application front-end JavaScript qui s'exécute sur un domaine différent
server.use(cors());

app.use((req, res) => {
   res.json({ message: 'Requête reçue !' }); 
});

module.exports = app;