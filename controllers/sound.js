const SoundModel = require("../models/sound");

module.exports = {
    getAll(req, res) {
        SoundModel.find().then(sounds => {
            res.send(sounds);
        });
    },
    get(req, res) {
        const id = req.params.id;
        SoundModel.findById(id).then(sound => {
            res.send(sound);
        });
    },
    create(req, res) {
        // const sound = new Sound(req.body);
        const sound = new SoundModel({ // on crée une instance de notre modèle Sound 
            ...req.body // on lui passe un objet JavaScript contenant toutes les informations requises du corps de requête
            // on utilise le spread operator, raccourci nous permtettant d'avoir l'équivalent de :
            // title: req.body.title;
            // description: req.body.description;
          });
        sound.save().then(() => {
            res.send({ result: `Création du son ${sound.name}` });
        });
    },
    update(req, res) {
        const id = req.params.id;
        if (id) {
            SoundModel.findByIdAndUpdate(id, req.body).then(sound => {
                res.send({ result: `Mise à jour du son ${sound.name}` });
            });
        } else {
            res.status(401);
            res.send({ error: "Un id est nécessaire pour mettre à jour un son" });
        }
    },
    delete(req, res) {
        const id = req.params.id;
        SoundModel.findByIdAndDelete(id).then(() => {
            res.send({ result: `Suppression du son ${id}` });
        });
    }
}