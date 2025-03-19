const express = require('express');
const {
    inscriptionUtilisateurs,
    connexionUtilisateurs,
} = require('../controllers/controlleurUtilisateurs');
const {verifierToken} = require('../middlewares/authentification');

const router = express.Router();

const { profilUtilisateur } = require("../controllers/controlleurUtilisateurs");

// Route pour inscrire et connecter un nouveau Utilisateurs
router.post('/inscription-utilisateur', (req, res) => {
    console.log("Requête reçue:", req.body); 
    inscriptionUtilisateurs(req, res);
});

router.post('/connexion-utilisateur', (req, res) => {
    console.log("Requête reçue:", req.body);
    if (!req.body || !req.body.email || !req.body.motDePasse) {
        return res.status(400).json({ message: "Email et mot de passe requis" });
    }
    connexionUtilisateurs(req, res);
});


router.get("/profil", verifierToken, profilUtilisateur);


module.exports = router;