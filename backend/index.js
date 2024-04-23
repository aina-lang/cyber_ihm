
const express = require('express');
const clientRoutes = require('./routes/ClientRoutes');
const { default: mongoose } = require('mongoose');
var cors = require('cors')
const app = express();

app.use(cors())

mongoose.connect('mongodb://127.0.0.1:27017/ihm');

app.use('/api', clientRoutes);

const port = process.env.PORT || 8000;
app.listen(port, () => {
  console.log(`Serveur en cours d'exécution sur le port ${port}`);
});
