const mongoose = require('mongoose');

const utilisateurSchema = new mongoose.Schema({
    nom: { type: String, required: true },
    prenom: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    motDePasse: { type: String, required: true },
    role: { type: String, default: 'utilisateur', enum: ['utilisateur', 'admin'] }, // rôle par défaut 'utilisateur'
});

module.exports = mongoose.model('Utilisateur', utilisateurSchema);
