// app.js (ou votre point d'entrée principal)

const express = require('express');
const clientRoutes = require('./routes/ClientRoutes');

const app = express();

// Utilisation des routes pour les clients
app.use('/api', clientRoutes);

// Autres middlewares et configurations...

// Lancement du serveur
const port = process.env.PORT || 8000;
app.listen(port, () => {
  console.log(`Serveur en cours d'exécution sur le port ${port}`);
});
