const Produit = require('../models/modeleProduits');

// Récupérer tous les produits
exports.getAllProduits = async (req, res) => {
  try {
    const produits = await Produit.find();
    res.status(200).json(produits);
  } catch (error) {
    res.status(500).json({ message: "Erreur lors de la récupération des produits", error: error.message });
  }
};

// Récupérer un produit par ID
exports.getProduitById = async (req, res) => {
  const { id } = req.params;
  try {
    const produit = await Produit.findOne({ id });
    if (!produit) {
      return res.status(404).json({ message: "Produit non trouvé" });
    }
    res.status(200).json(produit);
  } catch (error) {
    res.status(500).json({ message: "Erreur lors de la récupération du produit", error: error.message });
  }
};

// Ajouter un nouveau produit
exports.createProduit = async (req, res) => {
  const { id, title, price, description, category, image, rating } = req.body;
  
  const produit = new Produit({
    
    title,
    price,
    description,
    category,
    image,
    rating,
  });

  try {
    await produit.save();
    res.status(201).json({ message: "Produit créé avec succès", produit });
  } catch (error) {
    res.status(400).json({ message: "Erreur lors de la création du produit", error: error.message });
  }
};

// Mettre à jour un produit existant
exports.updateProduit = async (req, res) => {
  const { id } = req.params;
  const { title, price, description, category, image, rating } = req.body;

  try {
    const produit = await Produit.findOneAndUpdate(
      { id },
      { title, price, description, category, image, rating },
      { new: true }
    );

    if (!produit) {
      return res.status(404).json({ message: "Produit non trouvé" });
    }

    res.status(200).json({ message: "Produit mis à jour avec succès", produit });
  } catch (error) {
    res.status(400).json({ message: "Erreur lors de la mise à jour du produit", error: error.message });
  }
};

// Supprimer un produit
exports.deleteProduit = async (req, res) => {
  const { id } = req.params;

  try {
    const produit = await Produit.findOneAndDelete({ id });

    if (!produit) {
      return res.status(404).json({ message: "Produit non trouvé" });
    }

    res.status(200).json({ message: "Produit supprimé avec succès" });
  } catch (error) {
    res.status(500).json({ message: "Erreur lors de la suppression du produit", error: error.message });
  }
};
