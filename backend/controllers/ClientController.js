// clientController.js

const Client = require("../models/Client");
const arpScanner = require("arpscan/promise");
const arp = require("arpjs");
const { getNettworkInfo } = require("../services/network");
const BlockStatus = require("../models/BlockStatus");
let gatewayIP;
const { exec } = require("child_process");
const { saveNetworkInfo } = require("./NetworkInfoController");

async function reloadGateway() {
  try {
    gatewayIP = await getNettworkInfo();
    // await saveNetworkInfo();
    console.log(gatewayIP);
  } catch (error) {
    console.error(
      "Erreur lors de la récupération de l'adresse IP de la passerelle :",
      error
    );
  }
}

reloadGateway();

exports.getAllClients = async (req, res) => {
  try {
    const clients = await Client.find({});
    // console.log(clients);
    res.json(clients);
  } catch (error) {
    console.error("Erreur lors de la récupération des clients :", error);
    res.status(500).json({ message: `Erreur du serveur ${error} ` });
  }
};

// Rafraîchir les clients en utilisant ARP et mettre à jour la base de données
exports.refreshClients = async (req, res) => {
  try {
    const options = {
      interface: "eth0",
      command: "/usr/sbin/arp-scan",
      args: ["--localnet"],
      limit: 10,
      timeout: 5000,
    };

    const devices = await arpScanner(options);

    console.log(devices);

    await Client.deleteMany({});
    const formattedClients = devices.map((device) => ({
      ipAddress: device.ip,
      macAddress: device.mac,
      name: device.vendor,
      isRunning: false,
      isBlocked: false,
    }));

    const clients = await Client.create(formattedClients);
    res.json(clients);
  } catch (error) {
    console.error(
      "Erreur lors du rafraîchissement des clients avec ARP et de la mise à jour de la base de données :",
      error
    );
    res.status(500).json({ message: "Erreur du serveur" });
  }
};


const blockAllClients = async () => {
  try {
    // Récupérer tous les clients avec isBlocked true et isRunning false
    const clientsToBlock = await Client.find({
      isBlocked: true,
      isRunning: false,
    });

    // Mettre à jour l'état de blocage de ces clients
    await Client.updateMany(
      { _id: { $in: clientsToBlock.map(client => client._id) } },
      { $set: { isBlocked: true } }
    );

    // Liste des promesses d'attaques pour chaque client bloqué
    const attackPromises = clientsToBlock.map(async (client) => {
      try {
        await arp.poison(client.ipAddress, gatewayIP);
        console.log(`Attaque lancée pour l'IP ${client.ipAddress}`);
      } catch (error) {
        console.error("Erreur lors du blocage de l'adresse IP :", error);
      }
    });

    await Promise.all(attackPromises);

    console.log(
      "Tous les clients bloqués avec isRunning false ont été traités."
    );
  } catch (error) {
    console.error(
      "Erreur lors du blocage des clients :",
      error
    );
  }
};


// const blockAllClients = async () => {
//   try {
//     // Récupérer l'adresse IP de la passerelle

//     // Mettre à jour l'état de blocage de tous les clients
//     await Client.updateMany(
//       { ipAddress: { $ne: gatewayIP } },
//       { $set: { isBlocked: true } }
//     );

//     // Récupérer tous les clients bloqués
//     const blockedClients = await Client.find({
//       isBlocked: true,
//       ipAddress: { $ne: gatewayIP },
//     });

//     // Liste des promesses d'attaques pour chaque client bloqué
//     const attackPromises = blockedClients.map(async (client) => {
//       try {
//         await arp.poison(client.ipAddress, gatewayIP);
//       } catch (error) {
//         console.error("Erreur lors du blocage de l'adresse IP :", error);
//       }
//     });

//     await Promise.all(attackPromises);

//     // console.log(
//     //   "Tous les clients ont été bloqués avec succès et une attaque a été lancée"
//     // );
//   } catch (error) {
//     console.error(
//       "Erreur lors du blocage de tous les clients et de lancement de l'attaque :",
//       error
//     );
//   }
// };



exports.runBlockAllClientsOnce = async (req, res) => {
  try {
    // Récupérer les adresses IP des clients à bloquer
    const { selectedClientIps } = req.body;

    console.log("PARAMETRE  ", req.body);

    const blockStatus = await BlockStatus.findOne();

    if (!blockStatus) {
      // Créer un nouvel enregistrement s'il n'existe pas
      console.log("yesss");
      await BlockStatus.create({ blockAllClientsCalled: true });
    } else {
      // Mettre à jour l'état de blocage existant
      blockStatus.blockAllClientsCalled = true;
      await blockStatus.save();
    }

    // Marquer tous les clients comme bloqués dans la base de données
    await Client.updateMany(
      { ipAddress: { $in: selectedClientIps } },
      { isBlocked: true }
    );

    // Exécuter les commandes iptables pour bloquer les clients
    const blockedClients = await Client.find({
      ipAddress: { $in: selectedClientIps },
    });

    console.log(blockedClients);
    // return;
    blockedClients.forEach(async (client) => {
      exec(
        `iptables -t filter -A FORWARD -s ${client.ipAddress} -j DROP`,
        (error, stdout, stderr) => {
          if (error) {
            console.error(
              "Erreur lors de l'exécution de la commande iptables pour bloquer en provenance :",
              error
            );
            return;
          }
          console.log(
            `Trafic en provenance de l'adresse IP ${client.ipAddress} bloqué avec succès`
          );
        }
      );

      exec(
        `iptables -t filter -A FORWARD -d ${client.ipAddress} -j DROP`,
        (error, stdout, stderr) => {
          if (error) {
            console.error(
              "Erreur lors de l'exécution de la commande iptables pour bloquer à destination :",
              error
            );
            return;
          }
          console.log(
            `Trafic à destination de l'adresse IP ${client.ipAddress} bloqué avec succès`
          );
        }
      );
    });

    res.json({
      message:
        "Tous les clients ont été marqués comme bloqués dans la base de données et les attaques ont été lancées avec succès",
    });
  } catch (error) {
    console.error("Erreur lors de l'exécution de blockAllClientsOnce :", error);
    res.status(500).json({ message: "Erreur du serveur" });
  }
};

// Exécute blockAllClients toutes les 1000 millisecondes (1 seconde)
setInterval(async () => {
  try {
    // Récupérer l'état de blocage depuis la base de données
    const blockStatus = await BlockStatus.findOne();
    // console.log(blockStatus);
    // Vérifier si blockAllClients doit être appelée
    if (blockStatus && blockStatus.blockAllClientsCalled) {
      await blockAllClients();
    }
  } catch (error) {
    console.error(
      "Erreur lors de l'exécution périodique de blockAllClients :",
      error
    );
  }
}, 1000);
// Débloquer tous les clients
exports.unblockAllClients = async (req, res) => {
  try {
    // Mettre à jour l'état de blocage de tous les clients
    await Client.updateMany({}, { $set: { isBlocked: false } });

    const blockStatus = await BlockStatus.findOne();
    if (!blockStatus) {
      console.log("Aucun enregistrement de statut de blocage trouvé.");
    } else {
      // Mettre à jour l'état de blocage existant
      blockStatus.blockAllClientsCalled = false;
      await blockStatus.save();
      console.log("Le statut de blocage a été mis à false avec succès.");
    }

    res.json({ message: "Tous les clients ont été débloqués avec succès" });
  } catch (error) {
    console.error("Erreur lors du déblocage de tous les clients :", error);
    res.status(500).json({ message: "Erreur du serveur" });
  }
};

exports.addClient = async (req, res) => {
  try {
    // Récupérer les données du client à partir du corps de la requête
    const { ipAddress, macAddress, name } = req.body;

    // Vérifier si les champs requis sont présents
    if (!ipAddress || !macAddress || !name) {
      return res.status(400).json({
        message: "Les champs ipAddress, macAddress et name sont requis",
      });
    }

    // Vérifier si le client existe déjà dans la base de données
    const existingClient = await Client.findOne({ ipAddress });
    if (existingClient) {
      return res
        .status(400)
        .json({ message: "Le client existe déjà dans la base de données" });
    }

    // Créer un nouveau client
    const newClient = new Client({
      ipAddress,
      macAddress,
      name,
      isRunning: true,
      isBlocked: false,
    });

    // Enregistrer le nouveau client dans la base de données
    await newClient.save();

    res
      .status(201)
      .json({ message: "Client ajouté avec succès", client: newClient });
  } catch (error) {
    console.error("Erreur lors de l'ajout du client :", error);
    res.status(500).json({ message: "Erreur du serveur" });
  }
};

exports.unblockClientById = async (req, res) => {
  try {
    // Récupérer l'ID du client depuis les paramètres de la requête
    const { clientId } = req.params;

    // Vérifier si l'ID du client est valide
    if (!clientId) {
      return res.status(400).json({ message: "L'ID du client est requis" });
    }

    // Rechercher le client par son ID dans la base de données
    const client = await Client.findById(clientId);
    if (!client) {
      return res.status(404).json({ message: "Client non trouvé" });
    }

    // Vérifier si le client est déjà débloqué
    if (!client.isBlocked) {
      return res.status(400).json({ message: "Le client est déjà débloqué" });
    }

    // Débloquer le client
    client.isBlocked = false;
    await client.save();

    res.json({ message: "Client débloqué avec succès", client });
  } catch (error) {
    console.error("Erreur lors du déblocage du client par ID :", error);
    res.status(500).json({ message: "Erreur du serveur" });
  }
};

// Démarrer la session pour un client
exports.startSession = async (req, res) => {
  try {
    const { clientId } = req.params;
    console.log("yESS", clientId);
    if (!clientId) {
      return res.status(400).json({ message: "L'ID du client est requis" });
    }

    const client = await Client.findById(clientId);
    if (!client) {
      return res.status(404).json({ message: "Client non trouvé" });
    }

    // if (client.isRunning) {
    //   return res.status(400).json({ message: "La session du client est déjà en cours" });
    // }

    client.startTime = Date.now();
    client.endTime = null;
    client.isRunning = true;
    client.isBlocked = false;
    await client.save();
    console.log("yESS", client);
    res.json({ message: "Session démarrée avec succès", client });
  } catch (error) {
    console.error("Erreur lors du démarrage de la session :", error);
    res.status(500).json({ message: "Erreur du serveur" });
  }
};


// exports.getClientById = async (req, res) => {
//   try {
//     const { clientId } = req.params;

//     if (!clientId) {
//       return res.status(400).json({ message: "L'ID du client est requis" });
//     }

//     const client = await Client.findById(clientId);
//     if (!client) {
//       return res.status(404).json({ message: "Client non trouvé" });
//     }

//     res.status(200).json(client);
//   } catch (error) {
//     console.error("Erreur lors de la récupération des informations du client :", error);
//     res.status(500).json({ message: "Erreur du serveur" });
//   }
// };


exports.getClientByIp = async (req, res) => {
  try {
    const { ipAddress } = req.params;

    
    if (!ipAddress) {
      return res.status(400).json({ message: "L'adresse IP est requise" });
    }

    const client = await Client.findOne({ ipAddress });
    if (!client) {
      return res.status(404).json({ message: "Client non trouvé" });
    }

    res.status(200).json(client);
  } catch (error) {
    console.error("Erreur lors de la récupération des informations du client :", error);
    res.status(500).json({ message: "Erreur du serveur" });
  }
};

// Stopper la session pour un client
exports.stopSession = async (req, res) => {
  try {
    const { clientId } = req.params;

    console.log("yESS", clientId);
    if (!clientId) {
      return res.status(400).json({ message: "L'ID du client est requis" });
    }

    const client = await Client.findById(clientId);
    if (!client ) {
      return res
        .status(404)
        .json({ message: "Client non trouvé ou session déjà arrêtée" });
    }

    client.endTime = Date.now();
    client.isRunning = false;
    client.isBlocked = true;
    // const elapsedTime = Math.floor((client.endTime - client.startTime) / 1000); // Temps en secondes
    // client.elapsedTime = elapsedTime;

    await client.save();

    res.json({ message: "Session stoppée avec succès", client });
  } catch (error) {
    console.error("Erreur lors de l'arrêt de la session :", error);
    res.status(500).json({ message: "Erreur du serveur" });
  }
};

exports.getDashboardData = async (req, res) => {
  try {
    const totalClients = await Client.countDocuments();
    const blockedClients = await Client.countDocuments({
      isBlocked: true,
      isRunning: false,
    });
    const activeSessions = await Client.countDocuments({ isRunning: true });
    const totalElapsedTime = await Client.aggregate([
      { $match: { isRunning: true } },
      { $group: { _id: null, totalTime: { $sum: "$elapsedTime" } } },
    ]);

    res.status(200).json({
      totalClients,
      blockedClients,
      activeSessions,
      totalElapsedTime: totalElapsedTime[0] ? totalElapsedTime[0].totalTime : 0,
    });
  } catch (error) {
    res
      .status(500)
      .json({
        message:
          "Erreur lors de la récupération des données du tableau de bord",
        error,
      });
  }
};


const calculateElapsedTime = (startTime) => {
  const now = new Date();
  const diff = now - new Date(startTime);

  const hours = Math.floor(diff / (1000 * 60 * 60));
  const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((diff % (1000 * 60)) / 1000);

  return { hours, minutes, seconds }; // Retourne un objet avec heures, minutes et secondes
};

const updateElapsedTimeInDatabase = async () => {
  const runningClients = await Client.find({ isRunning: true });

  for (const client of runningClients) {
    const { hours, minutes, seconds } = calculateElapsedTime(client.startTime);

    // Calculez le coût en fonction du temps écoulé (ex: 20 euros par minute)
    const totalMinutes = hours * 60 + minutes;
    const cost = totalMinutes * 20; // Exemple de coût de 20 euros par minute

    // Mettez à jour l'élapsed time et le coût dans la base de données
    await Client.findByIdAndUpdate(client._id, {
      elapsedTime: `${hours}:${minutes}:${seconds}`, // Format HH:MM:SS
      spentCost: cost, // Mettez à jour le coût dépensé
    });
  }
};




// Mettre à jour chaque 10 secondes (ou ajustez l'intervalle selon vos besoins)
setInterval(updateElapsedTimeInDatabase, 10000);


// ClientController.js
