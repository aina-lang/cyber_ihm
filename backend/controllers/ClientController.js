// clientController.js

const Client = require("../models/Client");
const arpScanner = require('arpscan/promise');

// Récupérer tous les clients depuis la base de données
exports.getAllClients = async (req, res) => {
  try {
    const clients = await Client.find();
    res.json(clients);
  } catch (error) {
    console.error("Erreur lors de la récupération des clients :", error);
    res.status(500).json({ message: "Erreur du serveur" });
  }
};

// Rafraîchir les clients en utilisant ARP et mettre à jour la base de données
exports.refreshClients = async (req, res) => {
  try {
    const options = {
      interface: 'eth0',
      command: '/usr/sbin/arp-scan', 
      args: ['--localnet'],
      limit: 10, 
      timeout: 5000 
    };

    const devices = await arpScanner(options);

    // Mettre à jour la base de données avec les nouveaux clients trouvés
    await Client.deleteMany({}); // Supprimer tous les clients existants
    const clients = await Client.create(devices); // Ajouter les nouveaux clients à partir du résultat de arpScanner

    res.json(clients);
  } catch (error) {
    console.error('Erreur lors du rafraîchissement des clients avec ARP et de la mise à jour de la base de données :', error);
    res.status(500).json({ message: 'Erreur du serveur' });
  }
};

exports.blockAllClient = async (req, res) => {
  try {
    // Mettre à jour l'état de blocage de tous les clients
    await Client.updateMany({}, { $set: { isBlocked: true } });

    // Récupérer tous les clients bloqués
    const blockedClients = await Client.find({ isBlocked: true });

    // Exécuter une attaque pour chaque client bloqué
    blockedClients.forEach(async (client) => {
      await arp.poison(client.ipAddress, client.gatewayIP); 
    });

    res.json({
      message:
        "Tous les clients ont été bloqués avec succès et une attaque a été lancée",
    });

  } catch (error) {
    console.error(
      "Erreur lors du blocage de tous les clients et de lancement de l'attaque :",
      error
    );
    res.status(500).json({ message: "Erreur du serveur" });
  }
};

// Débloquer tous les clients
exports.unblockAllClients = async (req, res) => {
  try {
    // Mettre à jour l'état de blocage de tous les clients
    await Client.updateMany({}, { $set: { isBlocked: false } });
    res.json({ message: "Tous les clients ont été débloqués avec succès" });
  } catch (error) {
    console.error("Erreur lors du déblocage de tous les clients :", error);
    res.status(500).json({ message: "Erreur du serveur" });
  }
};
