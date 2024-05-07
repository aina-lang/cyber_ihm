const express = require("express");
const { default: mongoose } = require("mongoose");
const cors = require("cors");
const socketIo = require("socket.io");
const http = require("http");
const Client = require("./models/Client");
const webpush= require("web-push");
const clientRouter=require('./routes/ClientRoutes')
const app = express();
app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use("/api", clientRouter);

const vapidKeys = {
  publicKey: "BLuQ_pKHORVpPPMSup1LYuc4RJm0t1car6O4p_m5GiOmEsZso_QBwWc-CF_JDaFEJVD--U9u543N_hR0IV9p32Y",
  privateKey:"TFlHoFSBCrU7lxoEkjfo8FtyBCNhFAJFAY-v_097A7k",
};

// webpush.setVapidDetails(
//   "merciaaina@gmail.com",
//   vapidKeys.publicKey,
//   vapidKeys.privateKey
// )

mongoose.connect("mongodb://127.0.0.1:27017/ihm");

const port = process.env.PORT || 8000;
const server = http.createServer(app);

const io = socketIo(server);

let clientIps = [];

io.on("connection", (socket) => {
  console.log("New client connected");

  // Recevoir l'adresse IP du client et lui envoyer les informations initiales
  socket.on("connectClient", async (clientIp) => {
    console.log(`Client connected with IP: ${clientIp}`);
    // Votre logique pour gérer les clients par leur IP
    clientIps.push(clientIp);
    // Envoyer un message au client avec son compteur initial
    try {
      const client = await Client.findOne({ ipAddress: clientIp });
      console.log(client);
      if (client) {
        socket.emit("compteurChanged", {
          clientIp,
          elapsedTime: client.elapsedTime,
        });
      } else {
        console.log(`Client not found with IP: ${clientIp}`);
      }
    } catch (error) {
      console.error("Error fetching client from database:", error);
    }
  });

  socket.on("disconnect", () => {
    console.log("Client disconnected");
  });
});

setInterval(async () => {
  try {
    const clients = await Client.find({ isRunning: true });
    clients.forEach(async (client) => {
      // Calculer le temps écoulé depuis startTime
      const startTime = new Date(client.startTime);
      const currentTime = new Date();
      const elapsedTime = currentTime - startTime;

      // Convertir le temps écoulé en format hh:mm:ss
      const hours = Math.floor((elapsedTime / (1000 * 60 * 60)) % 24);
      const minutes = Math.floor((elapsedTime / (1000 * 60)) % 60);
      const seconds = Math.floor((elapsedTime / 1000) % 60);
      const formattedElapsedTime = `${hours}:${minutes}:${seconds}`;

      // Mettre à jour le champ elapsedTime du client
      client.elapsedTime = formattedElapsedTime;
      await client.save();

      for (const ipAddress of clientIps) {
        if (ipAddress === client.ipAddress) {
          // if (seconds === 0) {
          //   // if (Notification.permission === "granted") {
          //   //   new Notification("Nouveau compteur", {
          //   //     body: `Le compteur est maintenant à ${formattedElapsedTime}`,
          //   //   });
          //   // }
          // }
          io.emit("compteurChanged", {
            clientIp: client.ipAddress,
            elapsedTime: formattedElapsedTime,
          });
          break;
        }
      }
    });
  } catch (error) {
    console.error("Error updating elapsed time:", error);
  }
}, 1000);

server.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
