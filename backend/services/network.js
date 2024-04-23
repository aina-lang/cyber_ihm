const { exec } = require("child_process");

exports.getNettworkInfo = () => {
  return new Promise((resolve, reject) => {
    exec(
      "traceroute -m1 -n 8.8.8.8 | awk '{print $2}'",
      (error, stdout, stderr) => {
        if (error) {
          console.error(
            "Erreur lors de l'exécution de la commande traceroute:",
            error
          );
          reject(error);
          return;
        }
        // console.log("Sortie de traceroute :", stdout);
        const gatewayIPMatch = stdout.match(
          /(\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3})/
        );
        if (gatewayIPMatch) {
          const gatewayIP = gatewayIPMatch[0]
          resolve(gatewayIP);
        } else {
          reject(
            new Error(
              "Adresse IP de la passerelle introuvable dans la sortie de traceroute"
            )
          );
        }
        // // Exécuter arp avec l'adresse IP de la passerelle pour obtenir les informations ARP
        // exec(
        //   `arp -n ${gatewayIP}`,
        //   (arpError, arpStdout, arpStderr) => {
        //     if (arpError) {
        //       console.error(
        //         "Erreur lors de l'exécution de la commande arp :",
        //         arpError
        //       );
        //       reject(arpError);
        //       return;
        //     }
        //     console.log("Sortie de arp :", arpStdout);
        //     // Analyser la sortie pour extraire les informations ARP
        //     // (remarque : cela peut nécessiter un traitement supplémentaire)
        //     const arpInfo = arpStdout.split("\n").map(line => {
        //       const [ipAddress, macAddress] = line.trim().split(/\s+/);
        //       return { ipAddress, macAddress };
        //     });
        //     resolve(arpInfo);
        //   }
        // );
      }
    );
  });
};
