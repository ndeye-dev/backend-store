
const Favoris = require("../models/modeleFavoris");

//  Ajouter un produit aux favoris
const ajouterFavori = async (req, res) => {
    try {
        const { produitId } = req.body;

        if (!produitId) {
            return res.status(400).json({ message: "Produit ID requis." });
        }

        const favoriExiste = await Favoris.findOne({
            utilisateur: req.utilisateur.id,
            produit: produitId
        });

        if (favoriExiste) {
            return res.status(400).json({ message: "Ce produit est déjà dans vos favoris." });
        }

        const nouveauFavori = new Favoris({
            utilisateur: req.utilisateur.id,
            produit: produitId
        });

        await nouveauFavori.save();

        res.status(201).json({
            message: "Produit ajouté aux favoris.",
            favori: nouveauFavori
        });
    } catch (error) {
        console.error("Erreur lors de l'ajout aux favoris :", error);
        res.status(500).json({ message: "Erreur serveur." });
    }
};

// Supprimer un produit des favoris
const supprimerFavori = async (req, res) => {
    try {
        const { produitId } = req.params;

        const favori = await Favoris.findOneAndDelete({
            utilisateur: req.utilisateur.id,
            produit: produitId
        });

        if (!favori) {
            return res.status(404).json({ message: "Produit non trouvé dans les favoris." });
        }

        res.status(200).json({ message: "Produit supprimé des favoris." });
    } catch (error) {
        console.error("Erreur lors de la suppression du favori :", error);
        res.status(500).json({ message: "Erreur serveur." });
    }
};

//  Récupérer les favoris de l'utilisateur
const getFavoris = async (req, res) => {
    try {
        const favoris = await Favoris.find({ utilisateur: req.utilisateur.id }).populate("produit");

        res.status(200).json(favoris);
    } catch (error) {
        console.error("Erreur lors de la récupération des favoris :", error);
        res.status(500).json({ message: "Erreur serveur." });
    }
};

module.exports = { ajouterFavori, supprimerFavori, getFavoris
};
