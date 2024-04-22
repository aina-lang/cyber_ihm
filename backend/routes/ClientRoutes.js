// clientRoutes.js

const express = require('express');
const router = express.Router();
const clientController = require('../controllers/ClientController');

// Liste de tous les clients
router.get('/clients', clientController.getAllClients);

// Bloquer tous les clients
router.put('/clients/block', clientController.blockAllClient);

// Débloquer tous les clients
router.put('/clients/unblock', clientController.unblockAllClients);

module.exports = router;
