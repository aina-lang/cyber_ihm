// clientRoutes.js

const express = require('express');
const router = express.Router();
const clientController = require('../controllers/ClientController');

router.get('/clients', clientController.getAllClients);

router.put('/clients/block', clientController.runBlockAllClientsOnce);

router.put('/clients/unblock', clientController.unblockAllClients);

router.get('/clients/refresh', clientController.refreshClients);

router.post('/clients', clientController.addClient);

router.put('/clients/:clientId/unblock', clientController.unblockClientById);

module.exports = router;
