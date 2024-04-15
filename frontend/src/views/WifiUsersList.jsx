import React, { useState } from "react";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-quartz.css";

const WifiUsersList = () => {
  const [rowData, setRowData] = useState([
    {
      username: "John Doe",
      startTime: "09:00 AM",
      endTime: "10:30 AM",
      duration: "1h 30m",
      amountCharged: "$5",
    },
    {
      username: "Jane Smith",
      startTime: "10:30 AM",
      endTime: "11:45 AM",
      duration: "1h 15m",
      amountCharged: "$4",
    },
  ]);

  const columnDefs = [
    { headerName: "Username", field: "username" },
    { headerName: "Start Time", field: "startTime" },
    { headerName: "End Time", field: "endTime" },
    { headerName: "Duration", field: "duration" },
    { headerName: "Amount Charged", field: "amountCharged" },
    {
      headerName: "Actions",
      field: "actions",
      cellRendererFramework: () => (
        <div>
          hello
          {/* <button onClick={() => handlePauseSession()}>Pause</button>
          <button onClick={() => handleStopSession()}>Stop</button>
          <button onClick={() => handleEditSession()}>Edit</button>
          <button onClick={() => handleDeleteSession()}>Delete</button>
          <button onClick={() => handleViewSession()}>View</button> */}
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
    <div className="ag-theme-quartz" style={{ height: 400 }}>
      <AgGridReact
        rowData={rowData}
        columnDefs={columnDefs}
        defaultColDef={defaultColDef}
        pagination={true}
        paginationPageSize={10}
        paginationPageSizeSelector={[10, 25, 50]}
        enableRangeSelection={true}
      />
    </div>
  );
};

export default WifiUsersList;
