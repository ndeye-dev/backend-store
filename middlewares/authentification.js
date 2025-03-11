const jwt = require("jsonwebtoken");
const Utilisateurs = require("../models/modeleUtilisateurs"); // Assurez-vous que le modèle est bien importé

const verifierToken = async (req, res, next) => {
    // Récupère le token à partir de l'en-tête Authorization
    const token = req.headers.authorization?.split(" ")[1];

    if (!token) {
        console.log("Aucun token fourni dans les en-têtes.");
        return res.status(401).json({ message: "Accès non autorisé : token manquant." });
    }

    try {
        // Vérifie ,et décode le token avec la clé secrète
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        // Récupère l'utilisateur à partir de l'ID extrait du token
        const utilisateur = await Utilisateurs.findById(decoded.id);

        if (!utilisateur) {
            return res.status(404).json({ message: "Utilisateur non trouvé." });
        }

        // Associe l'utilisateur à la requête pour l'utiliser dans les routes suivantes
        req.utilisateur = utilisateur;

        // Passe à la suite (next middleware ou route)
        next();
    } catch (err) {
        console.error("Erreur lors de la vérification du token :", err.message);

        // Gère les erreurs spécifiques
        if (err.name === "TokenExpiredError") {
            return res.status(401).json({ message: "Token expiré. Veuillez vous reconnecter." });
        } else if (err.name === "JsonWebTokenError") {
            return res.status(401).json({ message: "Token invalide." });
        } else {
            return res.status(500).json({ message: "Erreur interne lors de la vérification du token." });
        }
    }
};

module.exports = { verifierToken };
