const { getProductById,getProducts, addProduct, deleteProduct } = require ("../controllers/controlleurProduits.js");
// const { protect } = require ("../middlewares/authMiddleware.js");
const express = require("express");

// const upload = require("../middlewares/uploadMiddleware"); 

const router = express.Router();

router.get("/", getProducts);
router.get("/:id", getProductById);


router.post("/ajouter", addProduct); 
router.delete("/:id",  deleteProduct);

module.exports = router;
