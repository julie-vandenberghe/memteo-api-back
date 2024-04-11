module.exports = server => {
    server.get("/", (req, res) => { 
        console.log("Hello. Bienvenue sur la page d'accueil de l'API memeteo");
        res.send("Coucou petite perruche !"); // si on n'envoie pas res via send, page tourne en boucle

        /* res.send({
            // ici, on reformule la réponse de l'api comme on le souhaite
            message: "Hello. Bienvenue sur la page d'accueil de l'API cars. Je retourne du JSON"
        }) */
    });
}
