const MemeModel = require("../models/meme.js");

module.exports = {
    getAll(req, res) {
        MemeModel.find().then(memes => {
            res.send(memes);
        })
        .catch(error => res.status(400).json({ error }));
    },
    get(req, res) {
        const id = req.params.id;
        MemeModel.findById(id).then(meme => {
            res.send(meme);
        })
        .catch(error => res.status(400).json({ error }));
    },
    create(req, res) {
        const meme = new MemeModel({
            name:req.body.name,
            link:req.body.link
        });
        meme.save().then(() => {
            res.send({result: `Création du meme ${meme.name}` });
        })
        .catch(error => res.status(400).json({ error }));   
    },
    createMany(req, res) {
        const memesData = req.body.memes;
    
        MemeModel.insertMany(memesData)
            .then((memes) => {
                res.status(200).json({ result: `Création de ${memes.length} memes avec succès` });
            })
            .catch((error) => {
                res.status(400).json({ error: error.message });
            });
    },
    update(req, res) {
        const id = req.params.id;
        if (id) {
            MemeModel.findByIdAndUpdate(id, req.body)
            .then(meme => {
                res.send({ result: `Mise à jour du meme ${meme.name}` });
            })
            .catch(error => res.status(400).json({ error }));
        } else {
            res.status(401);
            res.send({ error: "Un id est nécessaire pour mettre à jour un meme" });
        }
    },
    delete(req, res) {
        const id = req.params.id;
        MemeModel.findByIdAndDelete(id)
        .then(() => {
            res.send({ result: `Suppression du meme ${id}` });
        })
        .catch(error => res.status(400).json({ error }));
    }
}