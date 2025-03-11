
const express = require("express");
const { verifierToken } = require("../middlewares/authentification");
const { ajouterFavori, supprimerFavori, getFavoris } = require("../controllers/controlleurFavoris");

const router = express.Router();

router.post("/ajout-favori", verifierToken, ajouterFavori);
router.delete("suprime-favori/:produitId", verifierToken, supprimerFavori);
router.get("/", verifierToken, getFavoris);

module.exports = router;
