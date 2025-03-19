const express = require("express");
const { login} = require("../controllers/contolleurAdmin.js");
// const { protect } = require("../middlewares/authMiddleware.js");

const router = express.Router();

router.post("/connexion-utilisateur", login); 
router.get("/profil");

module.exports = router;
