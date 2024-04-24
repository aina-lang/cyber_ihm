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

  const handleSelectionChanged = (event) => {
    const selectedNodes = event.api.getSelectedNodes();
    const selectedData = selectedNodes.map((node) => node.data);
    setSelectedRows(selectedData);
  };

  useEffect(() => {
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
      headerName: "Etat",
      field: "isRunning",
      // resizable: false,
      width: 100,
      cellRenderer: (params) => (
        <div className="flex items-center justify-center">
          {params.value ? (
            <span className="text-green-500">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </span>
          ) : (
            <span className="text-red-500">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </span>
          )}
        </div>
      ),
    },
    {
      headerName: "Bloqué",
      field: "isBlocked",
      // resizable: false,
      width: 120,
      cellRenderer: (params) => (
        <div className="flex items-center justify-center">
          {params.value ? (
            <span className="text-red-500">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </span>
          ) : (
            <span className="text-green-500">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </span>
          )}
        </div>
      ),
    },

    {
      headerName: "Actions",
      field: "id",
      cellRenderer: (params) => (
        <div className="flex items-center justify-around h-full text-gray-600">
          <button className=" p-3 rounded flex items-center justify-center ">
            <FaEdit onClick={() => handleEditSession()} className="" />
          </button>
          <button
            onClick={() => handleRefreshSession()}
            className="p-3 rounded flex items-center justify-center "
          >
            <FaTrashAlt className="" />
          </button>
          <button
            onClick={() => handleViewSession()}
            className=" p-3 rounded flex items-center justify-center"
          >
            <FaEye className="" />
          </button>
        </div>
      ),
    },
  ];

  const defaultColDef = {
    filter: "agTextColumnFilter",
    floatingFilter: true,
  };

  const handlePauseSession = () => {
    // Gérer la pause de la session WiFi
  };

  const handleStopSession = async () => {
    try {
      // Envoyer une requête au backend pour bloquer les clients sélectionnés
      const response = await axios.put(
        "http://localhost:8000/api/clients/block",
        {
          selectedClientIps: selectedRows.map((client) => client.ipAddress),
        }
      );

      // Mettre à jour l'état des clients sélectionnés dans la grille
      const updatedRowData = rowData.map((client) => {
        if (
          selectedRows.some(
            (selectedClient) => selectedClient.ipAddress === client.ipAddress
          )
        ) {
          return { ...client, isBlocked: true };
        }
        return client;
      });
      setRowData(updatedRowData);

      // Afficher une notification de succès
      MySwal.fire({
        icon: "success",
        title: response.data.message,
      });
    } catch (error) {
      console.error("Erreur lors du blocage des connexions :", error);
      // Afficher une notification d'erreur
      MySwal.fire({
        icon: "error",
        title: "Erreur lors du blocage des connexions",
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

  return (
    <div className="ag-theme-quartz" style={{ height: 300 }}>
      <BreadCumb
        title={"actifs"}
        root={"Dashboard"}
        subtitle={"Postes actifs"}
      />
      <AddClientModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
      <div className="w-full flex justify-between">
        <Tooltip content="Ajouter un nouveau client" animation="duration-150">
          <button
            onClick={() => setIsModalOpen(true)}
            className="bg-orange-500 hover:bg-orange-700  text-white font-bold py-2 px-4 rounded flex items-center mb-3 shadow-md"
          >
            <FaPlus className="mr-2" />
            Nouveau poste
          </button>
        </Tooltip>
        <Tooltip content="Actualiser la table" animation="duration-150">
          {" "}
          <button
            onClick={handleRefreshAllClients}
            className="bg-orange-500 hover:bg-orange-700  text-white font-bold py-2 px-4 rounded flex items-center mb-3 shadow-md"
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
            disabled={!selectedRows.length}
            className={`bg-${
              selectedRows.length ? "blue" : "gray"
            }-500 hover:bg-${
              selectedRows.length ? "blue" : ""
            }-700 text-white font-bold py-2 px-4 rounded flex items-center`}
          >
            <FaPause className="mr-2" />
            Pause
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
        <Tooltip
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
        </Tooltip>
      </div>

      {/* <div className="absolute right-5 bottom-5">
        <Tooltip content="Ajouter un nouveau client" animation="duration-150">
          <button
            onClick={() => setIsModalOpen(true)}
            className="bg-orange-500 hover:bg-orange-700  text-white font-bold py-2 px-4 rounded flex items-center"
          >
            <FaPlus className="mr-2" />
            Nouveau poste
          </button>
        </Tooltip>
      </div> */}
    </div>
  );
};

export default ActivePost;
