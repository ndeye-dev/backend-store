const Product = require ("../models/modeleProduits");

// Lister tous les produits
 const getProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: "Erreur serveur" });
  }
};

// Récupérer un produit par ID
const getProductById = async (req, res) => {
  console.log("Params reçus :", req.params);
  try {
    if (!req.params.id) {
      return res.status(400).json({ message: "ID manquant" });
    }

    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ message: "Produit non trouvé" });
    }

    res.json(product);
  } catch (error) {
    console.error("Erreur dans getProductById :", error);
    res.status(500).json({ message: "Erreur serveur", error: error.message });
  }
};


// Ajouter un produit
const addProduct = async (req, res) => {
  console.log("Données reçues:", req.body);

  const { name, description, price, stock, image } = req.body;

 if (!name || !price) {
  return res.status(400).json({ message: "Le nom et le prix sont requis." });
}
  try {
    const product = new Product({ name, description, price, stock, image });
    await product.save();
    res.status(201).json(product);
  } catch (error) {
    console.error("Erreur lors de l'ajout du produit:", error);
    res.status(500).json({ message: "Erreur serveur", error: error.message });
  }
};

// Supprimer un produit
 const deleteProduct = async (req, res) => {
  try {
    await Product.findByIdAndDelete(req.params.id);
    res.json({ message: "Produit supprimé" });
  } catch (error) {
    res.status(500).json({ message: "Erreur serveur" });
  }
};
module.exports = {getProducts, addProduct, deleteProduct, getProductById }