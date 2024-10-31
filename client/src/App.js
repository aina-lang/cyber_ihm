import React, { useState, useEffect } from "react";
import { LogOut } from "lucide-react";
import { MdComputer } from "react-icons/md";
import ConfirmationModal from "./components/ConfirmModal";
import clip from "./assets/video.mp4";
import axios from "axios";

function App({ clients, logo }) {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [actionType, setActionType] = useState(null);
  const [clientData, setClientData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [elapsedTime, setElapsedTime] = useState(null);
  const [cost, setCost] = useState(0);

  const storeClientData = (clientData) => {
    localStorage.setItem("clientData", JSON.stringify(clientData));
  };

  const getClientData = () => {
    const data = localStorage.getItem("clientData");
    return data ? JSON.parse(data) : null;
  };

  const handleStopSession = async () => {
    try {
      if (clientData) {
        await axios.put("http://localhost:8000/api/clients/block", {
          selectedClientIp: clientData.ipAddress,
        });
        await axios.put(
          `http://localhost:8000/api/clients/${clientData._id}/session/stop`
        );
      }
    } catch (error) {
      console.error(
        "Erreur lors de l'arrêt des sessions et du blocage des connexions :",
        error
      );
    }
  };

  const handleConfirmAction = async () => {
    if (actionType === "quit") {
      await handleStopSession();
    }
    setIsModalVisible(false);
    setActionType(null);
  };

  const handleCancelAction = () => {
    setIsModalVisible(false);
    setActionType(null);
  };

  const handleQuit = () => {
    setActionType("quit");
    setIsModalVisible(true);
  };


  const notifyUser = (message) => {
    if (Notification.permission === "granted") {
      new Notification("Notification", { body: message });
    } else if (Notification.permission !== "denied") {
      Notification.requestPermission().then((permission) => {
        if (permission === "granted") {
          new Notification("Notification", { body: message });
        }
      });
    }
  };

  const fetchClientData = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        "http://localhost:8000/api/clients/get/192.168.88.168"
      );
      setClientData(response.data);
      setError(null);
    } catch (error) {
      console.error(
        "Erreur lors de la récupération des données des clients :",
        error
      );
      setError("Erreur lors de la récupération des données.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // Fetch initial data
    fetchClientData();

    // Set an interval to check for changes every 5 seconds
    const interval = setInterval(() => {
      fetchClientData();
    }, 5000); // 5000ms = 5 seconds

    return () => clearInterval(interval); // Clear interval on component unmount
  }, []);

  useEffect(() => {
    if (clientData && clientData.isRunning && clientData.startTime) {
      const elapsedInterval = setInterval(() => {
        const now = new Date();
        const elapsedMilliseconds = now - new Date(clientData.startTime);
        const elapsed = new Date(elapsedMilliseconds)
          .toISOString()
          .substr(11, 8); // HH:MM:SS
        const totalMinutes = Math.floor(elapsedMilliseconds / (1000 * 60));
        const calculatedCost = totalMinutes * 20;

        setElapsedTime(elapsed);
        setCost(calculatedCost);
      }, 1000);

      return () => clearInterval(elapsedInterval);
    }
  }, [clientData]);



  // Sending notification every 2 minutes with the current cost
  useEffect(() => {
    const notificationInterval = setInterval(() => {
      if (clientData && clientData.isRunning) {
        notifyUser(`Le coût actuel est de ${cost} Ariary.`);
      }
    }, 120000); // 120000ms = 2 minutes

    return () => clearInterval(notificationInterval);
  }, [cost, clientData]);

  return (
    <div className="h-screen flex">
      <div className="w-2/3 p-10 h-full flex flex-col rounded-lg bg-white shadow-lg">
        <div className="flex w-full bg-[#e4edf4] rounded-md py-3 items-center justify-between mx-auto px-12">
          <div className="flex gap-4 items-start">
            <MdComputer className="h-24 w-24 text-[#4183bb]" />
            <div className="flex flex-col p-3">
              <h2 className="font-semibold text-2xl text-[#4183bb]">
                {clientData ? clientData.name : "Chargement..."}
              </h2>
              <span className="px-2 text-base text-gray-700 rounded-md border w-fit">
                {clientData ? clientData.ipAddress : "Chargement..."}
              </span>
            </div>
          </div>
          <div className="flex items-center gap-4">
            {clientData?.isRunning && (
              <button
                className="p-2 rounded-full hover:bg-gray-200 transition duration-300"
                onClick={handleQuit}
              >
                <LogOut size={20} />
              </button>
            )}
          </div>
        </div>

        <div className="grid grid-cols-2 gap-8 mt-8">
          {["Heure de début", "Heure de fin", "Temps écoulé"].map(
            (label, index) => (
              <div
                key={index}
                className="flex bg-white items-center justify-center min-h-fit border rounded-lg relative px-8 py-4"
              >
                <span className="absolute -top-5 left-4 bg-white text-gray-700 shadow-md px-3 py-2 rounded-lg">
                  {label}
                </span>
                <span className="text-5xl text-gray-800">
                  {label === "Temps écoulé"
                    ? elapsedTime || "N/A"
                    : label === "Heure de début"
                    ? clientData && clientData.startTime
                      ? `${new Date(clientData.startTime)
                          .getUTCHours()
                          .toString()
                          .padStart(2, "0")}:${new Date(clientData.startTime)
                          .getUTCMinutes()
                          .toString()
                          .padStart(2, "0")}:${new Date(clientData.startTime)
                          .getUTCSeconds()
                          .toString()
                          .padStart(2, "0")}`
                      : "N/A"
                    : clientData && clientData.endTime
                    ? `${new Date(clientData.endTime)
                        .getUTCHours()
                        .toString()
                        .padStart(2, "0")}:${new Date(clientData.endTime)
                        .getUTCMinutes()
                        .toString()
                        .padStart(2, "0")}:${new Date(clientData.endTime)
                        .getUTCSeconds()
                        .toString()
                        .padStart(2, "0")}`
                    : "N/A"}
                </span>
              </div>
            )
          )}

          <div className="flex bg-[#e4edf4] items-center justify-center min-h-fit border rounded-lg relative px-8 py-4">
            <span className="absolute -top-5 left-4 bg-[#4183bb] text-white shadow-md px-3 py-2 rounded-lg">
              Payer
            </span>
            <span className="text-5xl text-[#4183bb]">{cost} Ariary</span>
          </div>
        </div>
      </div>

      <div className="w-1/3 h-full bg-[#4183bb] relative flex items-center justify-center">
        <h1 className="text-[80px] p-5 absolute z-50 text-white shadow-md font-bold">
          Cyber <span className="text-[#e4edf4]">Diamond</span>
        </h1>
        <video
          id="background-video"
          loop
          autoPlay
          muted
          className="top-0 left-0 w-full h-full z-0 object-cover"
        >
          <source src={clip} type="video/mp4" />
          <source src={clip} type="video/ogg" />
          Votre navigateur ne supporte pas la balise vidéo.
        </video>
      </div>

      <ConfirmationModal
        isVisible={isModalVisible}
        onConfirm={handleConfirmAction}
        onCancel={handleCancelAction}
        message={`Êtes-vous sûr de vouloir ${
          actionType === "pause" ? "mettre en pause" : "quitter"
        }?`}
      />
    </div>
  );
}

export default App;
