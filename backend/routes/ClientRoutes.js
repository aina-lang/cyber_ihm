// clientRoutes.js

const express = require('express');
const router = express.Router();
const clientController = require('../controllers/ClientController');
const NetworkInfoController= require('../controllers/NetworkInfoController');
const Client = require('../models/Client');

router.get('/clients', clientController.getAllClients);

router.get('/clients/get/:ipAddress', clientController.getClientByIp);

router.put('/clients/block', clientController.runBlockAllClientsOnce);

router.put('/clients/unblock', clientController.unblockAllClients);

router.get('/clients/refresh', clientController.refreshClients);

router.post('/clients', clientController.addClient);

router.put('/clients/:clientId/unblock', clientController.unblockClientById);

router.put('/clients/:clientId/session/start', clientController.startSession);

router.put('/clients/:clientId/session/stop', clientController.stopSession);

router.get('/dashboard', clientController.getDashboardData);

router.get("/network-info", NetworkInfoController.getNettworkInfo);

router.put('/api/clients/:id/reset-cost', async (req, res) => {
    const { cost } = req.body; // Cela devrait être zéro
    try {
      const client = await Client.findByIdAndUpdate(req.params.id, { spentCost: cost }, { new: true });
      res.status(200).json(client);
    } catch (error) {
      res.status(500).json({ message: "Erreur lors de la réinitialisation du coût" });
    }
  });

  
module.exports = router;
