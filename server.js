
const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/baseDeDonnees');
const cors = require('cors');
const createAdmin = require('./config/creatAmin'); 
const app = express();

const bodyParser = require('body-parser');

// Charger les variables d'environnement
dotenv.config();

// Connexion à la base de données MongoDB
connectDB().then(() => {
  // Créer l'administrateur si nécessaire
  createAdmin();
}).catch((err) => {
  console.error("Erreur de connexion à MongoDB :", err);
  process.exit(1);
});

app.use(express.json());
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));

// Routes
const utilisateursRoute = require('./routes/routesUtilisateurs');
const productRoutes = require('./routes/routesProduits');
const favorisRoute = require('./routes/routesFavoris');
// const adminRoutes = require('./routes/routesAdmin');

app.use('/api/utilisateurs', utilisateursRoute);
app.use("/api/products", productRoutes);
// app.use("/api/utilisateurs", adminRoutes);
app.use('/api/favoris', favorisRoute);

// Démarrage du serveur
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Serveur en cours d'exécution sur le port ${PORT}`);
});
//