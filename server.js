const express = require('express')
const dotenv = require('dotenv');
const connectDB = require('./config/baseDeDonnees');
const cors = require('cors');
const app = express()



dotenv.config();

connectDB();


app.use(express.json());
app.use(cors());

const utilisateursRoute = require('./routes/routesUtilisateurs');
const produitsRoute = require('./routes/routesProduits');
const favorisRoute = require('./routes/routesFavoris');

app.use('/api/utilisateurs', utilisateursRoute);
app.use('/api/produits', produitsRoute);
app.use('/api/favoris', favorisRoute);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Serveur en cours d'exécution sur le port ${PORT}`);
});