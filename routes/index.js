const MemeController = require("../controllers/meme.js");
const SoundController = require("../controllers/sound.js");
const memesTest = require("../datas/memes.js");

module.exports = server => {
    server.get("/", (req, res) => { 
        console.log("Hello. Bienvenue sur la page d'accueil de l'API memeteo");
        //res.send("Coucou petite perruche !"); // si on n'envoie pas res via send, page tourne en boucle

        res.send({
            // ici, on reformule la réponse de l'api comme on le souhaite
            message: "Hello. Bienvenue sur la page d'accueil de l'API memeteo. Je retourne du JSON"
        })
    });

    // route pour tester si tout est ok
    server.get("/welcome", (req, res) => { 
        res.status(200)
        .send({
            message: "Hello. Bienvenue sur la page d'accueil de l'API memeteo."
        })
    });

    // Récupérer les memes de la bdd de test
    server.get('/test', (req, res) => {
        res.send({
            // ici, on reformule la réponse de l'api comme on le souhaite
            memesTest
        });
    })


        /* ROUTES DES MEMES */
        // Route pour tous les memes
        server.get("/memes", (req, res) => {
            MemeController.getAll(req, res);
        })
    
        // Route pour le détail d'un meme
        server.get("/memes/:id", (req, res) => {
            MemeController.get(req, res);
        })
    
        // Route pour l'ajout d'un meme
        server.post("/memes", (req, res) => {
            MemeController.create(req, res);
        })
    
        // Route pour la suppression d'un meme
        server.delete("/memes/:id", (req, res) => {
            MemeController.delete(req, res);
        })



        /* ROUTES DES SONS */
        // Route pour tous les sons
        server.get("/sounds", (req, res) => {
            SoundController.getAll(req, res);
        })
    
         // Route pour le détail d'un son
        server.get("/sounds/:id", (req, res) => {
            SoundController.get(req, res);
        })
    
        // Route pour l'ajout d'un son
        server.post("/sounds", (req, res) => {
            SoundController.create(req, res);
        })
    
        // Route pour la suppression d'un son
        server.delete("/sounds/:id", (req, res) => {
            SoundController.delete(req, res);
        })
}
