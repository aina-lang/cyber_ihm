import React, { useEffect, useState } from "react";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-quartz.css";
import { FloatButton } from "antd";
import { FaEdit, FaTrashAlt, FaEye } from "react-icons/fa";
import { IoReload } from "react-icons/io5";
import BreadCumb from "../components/BreadCumb";
import { AG_GRID_LOCALE_FR } from "../config/local.js";
import { FaPause, FaStop, FaPlus, FaMoneyBillWave } from "react-icons/fa";
import FloatingButton from "../components/FloatingButton.jsx";
import axios from "axios";
import AddClientModal from "../components/AddClientModal.jsx";
import { Tooltip } from "flowbite-react";

import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

const MySwal = withReactContent(Swal);

const ActivePost = () => {
  const [rowData, setRowData] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedRows, setSelectedRows] = useState([]);
  const [elapsedTimes, setElapsedTimes] = useState({});

  const handleSelectionChanged = (event) => {
    const selectedNodes = event.api.getSelectedNodes();
    const selectedData = selectedNodes.map((node) => node.data);
    setSelectedRows(selectedData);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setElapsedTimes((prev) => {
        const updatedTimes = rowData.reduce((acc, client) => {
          if (client.isRunning && client.startTime) {
            const now = new Date();
            const elapsedMilliseconds = now - new Date(client.startTime);

            // Calculer le temps écoulé au format HH:MM:SS
            const elapsed = new Date(elapsedMilliseconds)
              .toISOString()
              .substr(11, 8); // Format HH:MM:SS

            // Calculer le coût (20 euros par minute, ajustez selon vos besoins)
            const totalMinutes = Math.floor(elapsedMilliseconds / (1000 * 60));
            const cost = totalMinutes * 20; // Exemple de coût de 20 euros par minute

            acc[client._id] = {
              elapsed,
              cost, // Ajoutez le coût ici
            };
          }
          return acc;
        }, {});

        return updatedTimes;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [rowData]);

  const handleStopSession = async () => {
    try {
      // Envoyer une requête au backend pour bloquer les connexions des clients sélectionnés
      const response = await axios.put(
        "http://localhost:8000/api/clients/block",
        {
          selectedClientIps: selectedRows.map((client) => client.ipAddress),
        }
      );

      // Envoyer une requête au backend pour stopper les sessions des clients sélectionnés
      await Promise.all(
        selectedRows.map((client) =>
          axios.put(
            `http://localhost:8000/api/clients/${client._id}/session/stop`
          )
        )
      );
      // selectedRows.map((client) =>{console.log(client)} );
      // Mettre à jour l'état des clients dans la grille

      fetchClientsData();

      // setRowData(updatedRowData);

      // Afficher une notification de succès
      MySwal.fire({
        icon: "success",
        title: "Sessions arrêtées et connexions bloquées avec succès",
      });
    } catch (error) {
      console.error(
        "Erreur lors de l'arrêt des sessions et du blocage des connexions :",
        error
      );
      // Afficher une notification d'erreur
      MySwal.fire({
        icon: "error",
        title:
          "Erreur lors de l'arrêt des sessions et du blocage des connexions",
        text: "Veuillez réessayer plus tard.",
      });
    }
  };

  // Fonction pour démarrer une session
  const handleStartSession = async () => {
    try {
      await Promise.all(
        selectedRows.map((client) =>
          axios.put(
            `http://localhost:8000/api/clients/${client._id}/session/start`
          )
        )
      );

      console.log("Sessions démarrées avec succès");

      // Mettre à jour l'état local si nécessaire pour refléter le changement

      fetchClientsData();

      // setRowData(updatedRowData);

      // Afficher une notification de succès
      MySwal.fire({
        icon: "success",
        title: "Sessions démarrées avec succès",
      });
    } catch (error) {
      console.error("Erreur lors du démarrage des sessions :", error);

      // Afficher une notification d'erreur
      MySwal.fire({
        icon: "error",
        title: "Erreur lors du démarrage des sessions",
        text: "Veuillez réessayer plus tard.",
      });
    }
  };

  const handleEditSession = () => {
    // Gérer l'édition de la session WiFi
  };

  const handleRefreshSession = () => {
    // Gérer la suppression de la session WiFi
  };

  const handleViewSession = () => {
    // Gérer la visualisation de la session WiFi
  };

  const fetchClientsData = async () => {
    try {
      const response = await axios.get("http://localhost:8000/api/clients/");
      console.log(response);
      setRowData(response.data);
    } catch (error) {
      console.error(
        "Erreur lors de la récupération des données des clients :",
        error
      );
    }
  };

  useEffect(() => {
    fetchClientsData();
  }, []);

  const handleRefreshAllClients = () => {
    // Afficher la boîte de dialogue de confirmation
    Swal.fire({
      title: "Êtes-vous sûr ?",
      text: "Cela effacera tous les clients ajoutés manuellement !",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Oui, effacer tout !",
    }).then((result) => {
      if (result.isConfirmed) {
        RefreshAllClients();
      }
    });
  };

  const RefreshAllClients = async () => {
    try {
      const response = await axios.get(
        "http://localhost:8000/api/clients/refresh"
      );
      console.log(response);
      setRowData(response.data);
    } catch (error) {
      console.error(
        "Erreur lors de la récupération des données des clients :",
        error
      );
    }
  };

  const hourlyRate = 20; // Tarif horaire en euros

  const columnDefs = [
    {
      headerName: "Nom de l'appareil",
      field: "name",
      headerCheckboxSelection: true,
      checkboxSelection: true,
      showDisabledCheckboxes: true,
    },
    { headerName: "Adresse IP", field: "ipAddress" },
    { headerName: "Adresse MAC", field: "macAddress" },
    {
      headerName: "Statut",
      field: "isRunning",
      cellRenderer: (params) => (
        <div className="flex items-center justify-center">
          {params.value ? (
            <span className="text-blue-500">En cours</span>
          ) : (
            <span className="text-red-500">Arrêté</span>
          )}
        </div>
      ),
    },
    {
      headerName: "Heure de début",
      field: "startTime",
      valueFormatter: (params) =>
        params.value ? new Date(params.value).toLocaleString("fr-FR") : "N/A",
    },
    {
      headerName: "Heure de fin",
      field: "endTime",
      valueFormatter: (params) =>
        params.value ? new Date(params.value).toLocaleString("fr-FR") : "N/A",
    },
    {
      headerName: "Temps écoulé",
      field: "elapsedTime",
      valueGetter: (params) => {
        // console.log(elapsedTimes[params.data._id]);
        // Afficher en temps réel pour les clients en cours de session
        return params.data.isRunning && elapsedTimes[params.data._id]
          ? elapsedTimes[params.data._id].elapsed || "00:00:00" // Accéder directement à elapsedTimes pour le client actif
          : params.data.elapsedTime || "00:00:00"; // Utiliser elapsedTime pour les clients non actifs
      },
    },
    {
      headerName: "Coût total",
      field: "spentCost",
      valueGetter: (params) => {
        if (params.data.isRunning && elapsedTimes[params.data._id]) {
          const elapsed = elapsedTimes[params.data._id];
          // console.log(elapsed);
          return `${elapsed.cost} Ar`;
        }
        return "0 Ar";
      },
    },
  ];

  const updateCost = (data) => {
    console.log("Données pour mettre à jour le coût :", data);

    const newCost = calculateNewCost(data.elapsedTime);
  };

  // Exemple de fonction de calcul de coût
  const calculateNewCost = (elapsedTime) => {
    const timeParts = elapsedTime.split(":");
    const hours = parseInt(timeParts[0]) || 0;
    const minutes = parseInt(timeParts[1]) || 0;
    const totalMinutes = hours * 60 + minutes;

    return (totalMinutes / 60) * hourlyRate;
  };

  const defaultColDef = {
    filter: "agTextColumnFilter",
    floatingFilter: true,
  };

  return (
    <div className="ag-theme-quartz" style={{ height: 300 }}>
      <BreadCumb
        title={"Postes "}
        root={"Tableau de bord"}
        subtitle={"Postes "}
      />
      <AddClientModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
      <div className="w-full flex justify-between">
        <Tooltip content="Actualiser la table" animation="duration-150">
          {" "}
          <button
            onClick={handleRefreshAllClients}
            className="bg-[#4183bb]  text-white font-bold py-2 px-4 rounded flex items-center mb-3 shadow-md"
          >
            <IoReload />
          </button>
        </Tooltip>
      </div>
      <AgGridReact
        localeText={AG_GRID_LOCALE_FR}
        rowData={rowData}
        columnDefs={columnDefs}
        defaultColDef={defaultColDef}
        pagination={true}
        paginationPageSize={10}
        paginationPageSizeSelector={[10, 25, 50]}
        enableRangeSelection={true}
        rowSelection={"multiple"}
        onSelectionChanged={handleSelectionChanged}
      />
      <div className="flex justify-start space-x-4 mt-4">
        <Tooltip
          aria-disabled={!selectedRows.length}
          content="Mettre en pause le compteur"
          animation="duration-150"
        >
          <button
            onClick={handleStartSession}
            disabled={!selectedRows.length}
            className={`bg-${
              selectedRows.length ? "blue" : "gray"
            }-500 hover:bg-${
              selectedRows.length ? "blue" : ""
            }-700 text-white font-bold py-2 px-4 rounded flex items-center`}
          >
            {/* < className="mr-2" /> */}
            Demarrer
          </button>
        </Tooltip>
        <Tooltip
          aria-disabled={!selectedRows.length}
          content="Stop le compteur"
          animation="duration-150"
        >
          <button
            disabled={!selectedRows.length}
            className={`bg-${
              selectedRows.length ? "red" : "gray"
            }-500 hover:bg-${
              selectedRows.length ? "red" : ""
            }-700 text-white font-bold py-2 px-4 rounded flex items-center`}
            onClick={handleStopSession}
          >
            <FaStop className="mr-2" />
            Stop
          </button>
        </Tooltip>
        {/* <Tooltip
          aria-disabled={!selectedRows.length}
          content="Générer une facture PDF"
          animation="duration-150"
        >
          <button
            disabled={!selectedRows.length}
            className={`bg-${
              selectedRows.length ? "green" : "gray"
            }-500 hover:bg-${
              selectedRows.length ? "green" : ""
            }-700 text-white font-bold py-2 px-4 rounded flex items-center`}
          >
            <FaMoneyBillWave className="mr-2" />
            Facturer
          </button>
        </Tooltip> */}
      </div>
    </div>
  );
};

export default ActivePost;
