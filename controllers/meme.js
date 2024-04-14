const MemeModel = require("../models/meme.js");

module.exports = {
    getAll(req, res) {
        MemeModel.find().then(memes => {
            res.send(memes);
        });
    },
    get(req, res) {
        const id = req.params.id;
        MemeModel.findById(id).then(meme => {
            res.send(meme);
        });
    },
    create(req, res) {
        // const meme = new Meme(req.body);
        /* const meme = new MemeModel({ // on crée une instance de notre modèle Meme 
            ...req.body // on lui passe un objet JavaScript contenant toutes les informations requises du corps de requête
            // on utilise le spread operator, raccourci nous permettant d'avoir l'équivalent de :
            // title: req.body.title;
            // description: req.body.description;
          });
        meme.save().then(() => {
            res.send({ result: `Création du meme ${meme.name}` });
        }); */
        const meme = new MemeModel({
            name:req.body.name,
            link:req.body.link
        });
        meme.save().then(() => {
            res.send({result: `Création du meme ${meme.name}` });
        })
        
    },
    update(req, res) {
        const id = req.params.id;
        if (id) {
            MemeModel.findByIdAndUpdate(id, req.body).then(meme => {
                res.send({ result: `Mise à jour du meme ${meme.name}` });
            });
        } else {
            res.status(401);
            res.send({ error: "Un id est nécessaire pour mettre à jour un meme" });
        }
    },
    delete(req, res) {
        const id = req.params.id;
        MemeModel.findByIdAndDelete(id).then(() => {
            res.send({ result: `Suppression du meme ${id}` });
        });
    }
}