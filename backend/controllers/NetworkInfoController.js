const NetworkInfo = require("../models/NetworkInfo");
const { getNetworkInfo } = require("../services/network");

exports.saveNetworkInfo = async () => {
  try {
    // Récupérer les informations réseau
    const { gatewayIP, arpInfo } = await getNetworkInfo();

    // Créer un nouvel objet NetworkInfo avec les données récupérées
    const networkInfo = new NetworkInfo({
      gatewayIP: gatewayIP,
      arpInfo: arpInfo,
    });

    // Enregistrer les informations dans la base de données
    await networkInfo.save();

    console.log("Informations réseau enregistrées avec succès :", networkInfo);
  } catch (error) {
    console.error("Erreur lors de la récupération et de l'enregistrement des informations réseau :", error);
  }
};
