const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Utilisateurs = require('../models/modeleUtilisateurs');
const Admin = require("../models/modeleAdmin");

// **Inscription d'un utilisateur**
const inscriptionUtilisateurs = async (req, res) => {
    // Log des données reçues
    console.log("Données reçues dans la requête :", req.body);
    
    const { nom, prenom, email, motDePasse } = req.body;

    try {
        // Vérifier si un utilisateur avec cet email existe déjà
        const utilisateurExist = await Utilisateurs.findOne({ email });
        if (utilisateurExist) {
            return res.status(400).json({ message: "Un utilisateur avec cet email existe déjà." });
        }

        // Vérifier si tous les champs sont bien définis
        if (!nom || !prenom || !email || !motDePasse) {
            return res.status(400).json({ message: "Tous les champs doivent être remplis." });
        }

        // Hash du mot de passe
        const motDePasseHashe = await bcrypt.hash(motDePasse, 10);

        // Création du nouvel utilisateur
        const nouveauUtilisateur = new Utilisateurs({
            nom,
            prenom,
            email,
            motDePasse: motDePasseHashe,
        });

        // Sauvegarde du client dans la base de données
        await nouveauUtilisateur.save();
//
        // Générer un token JWT
        const token = jwt.sign(
            { id: nouveauUtilisateur._id, email: nouveauUtilisateur.email },
            process.env.JWT_SECRET,
            { expiresIn: '1h' }
        );

        res.status(201).json({
            message: "Utilisateur inscrit avec succès.",
            utilisateur: {
                id: nouveauUtilisateur._id,
                nom: nouveauUtilisateur.nom,
                prenom: nouveauUtilisateur.prenom,
                email: nouveauUtilisateur.email,
            },
            token, // Envoi du token au frontend
        });
    } catch (error) {
        console.error("Erreur lors de l'inscription de l'utilisateur :", error.message);
        res.status(500).json({ message: "Erreur interne du serveur." });
    }
};
// connexion de l'utiilisateur 
const connexionUtilisateurs = async (req, res) => {
    try {
        console.log("Données reçues:", req.body); // Vérifier les données reçues côté serveur
        const { email, motDePasse } = req.body;

        if (!email || !motDePasse) {
            return res.status(400).json({ message: "Email et mot de passe requis" });
        }

        // Vérifier si c'est un administrateur
        let utilisateur = await Admin.findOne({ email });
        let role = "admin";

        if (!utilisateur) {
            // Si ce n'est pas un admin, vérifier si c'est un utilisateur normal
            utilisateur = await Utilisateurs.findOne({ email });
            role = "utilisateur";
        }

        if (!utilisateur) {
            return res.status(401).json({ message: "Email ou mot de passe incorrect." });
        }

        // Vérification du mot de passe
        const isMatch = await bcrypt.compare(motDePasse, utilisateur.motDePasse);
        if (!isMatch) {
            return res.status(401).json({ message: "Email ou mot de passe incorrect." });
        }

        // Génération du token
        const token = jwt.sign(
            { id: utilisateur._id, role },
            process.env.JWT_SECRET,
            { expiresIn: "1h" }
        );

        res.json({ token, utilisateur, role });
    } catch (error) {
        console.error("Erreur serveur:", error);
        res.status(500).json({ message: "Erreur interne du serveur" });
    }
};



 //profil utilisateur conecter
const profilUtilisateur = async (req, res) => {
    try {
        const utilisateur = await Utilisateurs.findById(req.utilisateur.id).select("-motDePasse");
        // const admin = await Admin.findById(req.admin.id).select("-motDePasse");

        if (!utilisateur) {
            return res.status(404).json({ message: "Utilisateur non trouvé." });
        }

        res.status(200).json(utilisateur);
    } catch (error) {
        console.error("Erreur lors de la récupération du profil :", error.message);
        res.status(500).json({ message: "Erreur interne du serveur." });
    }
};

module.exports = {
    inscriptionUtilisateurs,
    connexionUtilisateurs,
    profilUtilisateur
};
