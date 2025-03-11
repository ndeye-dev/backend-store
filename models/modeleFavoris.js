//models/modeleFavoris.js
const mongoose = require("mongoose");

const FavorisSchema = new mongoose.Schema({
    utilisateur: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Utilisateurs", 
        required: true,
    },
    produit: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Produits",
        required: true,
    },
    dateAjout: {
        type: Date,
        default: Date.now,
    },
});

module.exports = mongoose.model("Favoris", FavorisSchema);
