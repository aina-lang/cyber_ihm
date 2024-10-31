const NetworkInfo = require("../models/NetworkInfo");
const { getNettworkInfo } = require("../services/network");

exports.saveNetworkInfo = async () => {
  try {
    // Récupérer les informations réseau
    const { gatewayIP, arpInfo } = await getNettworkInfo();

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




exports.getNettworkInfo = async (req, res) => {
  try {
    // Récupérer toutes les informations réseau de la base de données
    const networkInfos = await NetworkInfo.find(); // Vous pouvez ajouter des filtres si nécessaire

    if (networkInfos.length === 0) {
      return res.status(404).send("Aucune information réseau trouvée.");
    }

    res.status(200).json(networkInfos);
  } catch (error) {
    console.error("Erreur lors de la récupération des informations réseau :", error);
    res.status(500).send("Erreur lors de la récupération des informations réseau");
  }
};
