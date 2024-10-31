// seed.js
const mongoose = require("mongoose");
const Client = require("./models/Client");

mongoose.connect("mongodb://localhost:27017/ihm", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const seedClients = async () => {
  try {
    await Client.deleteMany({}); // Efface les anciennes données si nécessaire

    const clients = Array.from({ length: 20 }).map((_, i) => ({
      ipAddress: `192.168.1.${i + 1}`,
      macAddress: `00:0a:95:9d:68:${(i + 1).toString().padStart(2, "0")}`,
      name: `Device ${i + 1}`,
      isLocal: Math.random() < 0.5,
      startTime: new Date(),
      endTime: null,
      elapsedTime: "0",
      isRunning: Math.random() < 0.5,
      isBlocked: Math.random() < 0.5,
    }));

    await Client.insertMany(clients);
    console.log("20 clients insérés avec succès !");
    mongoose.connection.close();
  } catch (error) {
    console.error("Erreur lors de l'insertion des clients :", error);
    mongoose.connection.close();
  }
};

seedClients();
