// in controllers/stuff.js

const Meme = require('../models/meme.js');

  /* ÉCRITURE DANS LA BDD (CREATE) */
  exports.createMeme = (req, res, next) => {
    const meme = new Meme({ // on crée une instance de notre modèle Meme 
      ...req.body // on lui passe un objet JavaScript contenant toutes les informations requises du corps de requête
      // on utilise le spread operator, raccourci nous permtettant d'avoir l'équivalent de :
      // title: req.body.title;
      // description: req.body.description;
    });
    meme.save() // on enregistre notre instance Meme dans la bdd 
    // La base de données MongoDB est fractionnée en collections : le nom de la collection est défini par défaut sur le pluriel du nom du modèle. Ici, ce sera Memes
    // la méthode save() renvoie une promise
      .then(() => res.status(201).json({ message: 'Meme enregistré !'})) // on renvoie une réponse de réussite avec un code 201 de réussite
      .catch(error => res.status(400).json({ error })); // on renvoie une réponse avec l'erreur générée par Mongoose ainsi qu'un code d'erreur 400

  };

  /* LECTURE D'UN THING DANS LA BDD (READ "one") */
  exports.getOneMeme = (req, res, next) => { // :id indique à Express que cette partie de route est dynamique
    Meme.findOne({ _id: req.params.id }) // on passe à la méthode findOne un objet de comparaison donc au même id que le param de requête
    // on veut que le param _id dans la bdd corresponde à req.params.id
      .then(meme => res.status(200).json(meme)) // on va retourner le code 200 avec le meme dedans
      .catch(error => res.status(404).json({ error })); // si aucun Meme n'est trouvé ou si une erreur se produit, on retourne le code 404
  };

  /* LECTURE DE TOUS LES THING DANS LA BDD (READ "all") */
  exports.getAllMeme = (req, res, next) => {
    // La méthode find() dans notre modèle Mongoose permet de renvoyer un tableau contenant tous les Memes dans notre base de données
    // Comme pour save(), cela revoie une promise (then).
    Meme.find()
    .then(memes => res.status(200).json(memes))
    .catch(error => res.status(400).json({ error }));
  };

  /* MISE À JOUR D'UN THING DANS LA BDD (UPDATE "one") */
  exports.modifyMeme = (req, res, next) => {
    Meme.updateOne({ _id: req.params.id }, { ...req.body, _id: req.params.id }) // en params, on passe en #1 l'objet de comparaison (comme pour findOne) et en #2 le nouvel objet (on utilise encore le spread operator comme raccourci) et on précise également que l'id correspond à celui passé en param de la requête (car celui dans le corps de le requête ne sera pas forcément le bon)
      .then(() => res.status(200).json({ message: 'Meme modifié !'}))
      .catch(error => res.status(400).json({ error }));
  };

  /* SUPPRESION D'UN THING DANS LA BDD (DELETE "one") */
  exports.deleteMeme = (req, res, next) => {
    Meme.deleteOne({ _id: req.params.id })
      .then(() => res.status(200).json({ message: 'Meme supprimé !'}))
      .catch(error => res.status(400).json({ error }));
  };