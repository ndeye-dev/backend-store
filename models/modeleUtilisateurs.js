

// backendClothStore/models/modeleUtilisateurs.js
const mongoose = require('mongoose');

const utilisateurSchema = new mongoose.Schema({
    nom: {
        type: String,
        required: true, 
        trim: true,
    },
    prenom: {
        type: String,
        required: true, 
        trim: true,
    },
    email: {
        type: String,
        required: true, 
        unique: true, 
        trim: true,
        lowercase: true, 
    },
    motDePasse: {
        type: String,
        required: true,
    },
   
    // Champ pour le code de réinitialisation
    codeReset: {
        type: String,
        default: null,
    },
    // Champ pour la date d'expiration du code
    codeResetExpire: {
        type: Date,
        default: null,
    },

}, {
    timestamps: true, 
});

const Utilisateurs = mongoose.model('Utilisateurs', utilisateurSchema);

module.exports = Utilisateurs;
