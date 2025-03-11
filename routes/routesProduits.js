const express = require('express');
const router = express.Router();
const controlleurProduits = require('../controllers/controlleurProduits');

// Route pour récupérer tous les produits
router.get('/all-produits', controlleurProduits.getAllProduits);

// Route pour récupérer un produit par ID
router.get('/:id', controlleurProduits.getProduitById);

// Route pour ajouter un nouveau produit
router.post('/ajouter', controlleurProduits.createProduit);

// Route pour mettre à jour un produit existant
router.put('/:id', controlleurProduits.updateProduit);

// Route pour supprimer un produit
router.delete('/:id', controlleurProduits.deleteProduit);

module.exports = router;
