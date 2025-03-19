const multer = require("multer");
const path = require("path");

// Configuration du stockage avec Multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    // Définir le dossier où les images seront stockées
    cb(null, "public/uploads");  // Ce dossier doit exister sur ton serveur
  },
  filename: (req, file, cb) => {
    // Créer un nom de fichier unique pour chaque image
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

// Créer l'instance de Multer
const upload = multer({
  storage: storage,
  limits: { fileSize: 10 * 1024 * 1024 }, // Limiter la taille des fichiers à 10 Mo
  fileFilter: (req, file, cb) => {
    // Vérifier le type de fichier
    const filetypes = /jpeg|jpg|png|gif/;
    const mimetype = filetypes.test(file.mimetype);
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());

    if (mimetype && extname) {
      return cb(null, true);  // Fichier valide
    } else {
      cb(new Error("Seules les images JPEG, PNG, et GIF sont autorisées"), false);
    }
  },
});

module.exports = upload;
