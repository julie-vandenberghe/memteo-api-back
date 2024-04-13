// Chargement des modules express, mongoose et cors
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

//Import de la variable d'environnement (grâce à dotenv)
const dotenv = require('dotenv');
dotenv.config();
const MONGODB_URI = process.env.MONGODB_URI;

// Chargement des routes
const routes = require("./routes");

// Création de l'instance de l'application (création du serveur)
const server = express();

// MIDDLEWARE POUR LA GESTION DES DONNÉES JSON (utile pour les requêtes POST)
server.use(express.json());

// MIDDLEWARE POUR PERMETTRE AU SERVEUR DE RÉPONDRE AUX REQUÊTES PROVENANT D'UN DOMAINE DIFFÉRENT
// en effet, notre API est consommée par une application front-end JavaScript qui s'exécute sur un domaine différent
server.use(cors());

//la fonction normalizePort renvoie un port valide, qu'il soit fourni sous la forme d'un numéro ou d'une chaîne ;
const normalizePort = val => {
   const port = parseInt(val, 10);
 
   if (isNaN(port)) {
     return val;
   }
   if (port >= 0) {
     return port;
   }
   return false;
 };
const port = normalizePort(process.env.PORT || '5501');
server.set('port', port); //on définit le port

//ÉCOUTE DU SERVEUR
server.listen(port, () => {
   console.log('Serveur lancé et écoute sur le port ' + port);
   mongoose.connect(MONGODB_URI); 
    const db = mongoose.connection;
    db.once("open", () => console.log("Connexion à la base MongoDB ok"))
    .on("error", error => console.warn("Problème durant la connexion à la base : ", error));
}) 

// Externalisation des routes (dans routes/index.js)
routes(server);