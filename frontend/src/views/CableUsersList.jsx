import React, { useEffect, useState } from "react";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-quartz.css";
import { FloatButton } from "antd";
import { FaEdit, FaTrashAlt, FaEye } from "react-icons/fa";
import BreadCumb from "../components/BreadCumb";
import { AG_GRID_LOCALE_FR } from "../config/local.js";
import { FaPause, FaStop, FaPlus, FaMoneyBillWave } from "react-icons/fa";
import FloatingButton from "../components/FloatingButton.jsx";
import axios from "axios";

const CableUsersList = () => {
  const [rowData, setRowData] = useState([]);

  useEffect(() => {
    // Fonction pour charger les données des clients depuis l'API
    const fetchClientsData = async () => {
      try {
        const response = await axios.get("http://localhost:8000/api/clients/"); // Faites une requête GET à votre API pour récupérer les données des clients
        console.log(response);
        setRowData(response.data); // Mettez à jour l'état des données des clients avec les données reçues de l'API
      } catch (error) {
        console.error(
          "Erreur lors de la récupération des données des clients :",
          error
        );
      }
    };

    fetchClientsData();
  }, []);

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
            onClick={() => handleDeleteSession()}
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

  const handleStopSession = () => {
    // Gérer l'arrêt de la session WiFi
  };

  const handleEditSession = () => {
    // Gérer l'édition de la session WiFi
  };

  const handleDeleteSession = () => {
    // Gérer la suppression de la session WiFi
  };

  const handleViewSession = () => {
    // Gérer la visualisation de la session WiFi
  };

  return (
    <div className="ag-theme-quartz" style={{ height: 350 }}>
      <BreadCumb
        title={"cable"}
        root={"Dashboard"}
        subtitle={"Postes par cable"}
      />
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
      />
      <div className="flex justify-start space-x-4 mt-4">
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded flex items-center">
          <FaPause className="mr-2" />
          Pause
        </button>
        <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded flex items-center">
          <FaStop className="mr-2" />
          Stop
        </button>
        <button className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded flex items-center">
          <FaMoneyBillWave className="mr-2" />
          Facturer
        </button>
      </div>

      <FloatButton
        icon={<FaPlus color="white" />}
        className="h-[70px] w-[70px] bg-orange-500"
        tooltip={<div> Nouveau postes</div>}
        type="primary"
      />
    </div>
  );
};

export default CableUsersList;
