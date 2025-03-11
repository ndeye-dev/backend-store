const express = require('express');
const {
    inscriptionUtilisateurs,
    connexionUtilisateurs,
} = require('../controllers/controlleurUtilisateurs');
const {verifierToken} = require('../middlewares/authentification');

const router = express.Router();

const { profilUtilisateur } = require("../controllers/controlleurUtilisateurs");

// Route pour inscrire et connecter un nouveau Utilisateurs
// router.post('/inscription-utilisateur', inscriptionUtilisateurs);
router.post('/inscription-utilisateur', (req, res) => {
    console.log("Requête reçue:", req.body); 
    inscriptionUtilisateurs(req, res);
});

router.post('/connexion-utilisateur', connexionUtilisateurs);
router.get("/profil", verifierToken, profilUtilisateur);


module.exports = router;