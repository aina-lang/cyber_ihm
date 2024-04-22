import React, { useState } from "react";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-quartz.css";
import { FloatButton } from "antd";
import { FaEdit, FaTrashAlt, FaEye } from "react-icons/fa";
import BreadCumb from "../components/BreadCumb";
import { AG_GRID_LOCALE_FR } from "../config/local.js";
import { FaPause, FaStop, FaPlus, FaMoneyBillWave } from "react-icons/fa";
import FloatingButton from "../components/FloatingButton.jsx";
const CableUsersList = () => {
  const [rowData, setRowData] = useState([
    {
      id: 1,
      username: "John Doe",
      startTime: "09:00 AM",
      endTime: "10:30 AM",
      duration: "1h 30m",
      amountCharged: "5",
    },
    {
      id: 2,
      username: "Jane Smith",
      startTime: "10:30 AM",
      endTime: "11:45 AM",
      duration: "1h 15m",
      amountCharged: "4",
    },
  ]);

  const columnDefs = [
    {
      headerName: "Nom de l'appareil",
      field: "username",
      headerCheckboxSelection: true,
      checkboxSelection: true,
      showDisabledCheckboxes: true,
    },
    { headerName: "Heure de début", field: "startTime" },
    { headerName: "Heure de fin", field: "endTime" },
    { headerName: "Durée", field: "duration" },
    { headerName: "Montant facturé", field: "amountCharged" },
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
