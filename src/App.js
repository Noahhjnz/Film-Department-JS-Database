// src/App.js
import React, { useEffect, useState } from "react";
import { db } from "./firebase.js"; 
import {
  collection,
  getDocs,
  updateDoc,
  doc,
} from "firebase/firestore";
import "ag-grid-community/styles/ag-theme-alpine.css";
import { AgGridReact } from "ag-grid-react";
import { ModuleRegistry, AllCommunityModule } from 'ag-grid-community';

ModuleRegistry.registerModules([AllCommunityModule]);

function App() {
  const [rowData, setRowData] = useState([]);
  const [selectedRow, setSelectedRow] = useState(null);

  const columnDefs = [
    { headerName: "Name", field: "name", flex: 1, minWidth: 120 },
    { headerName: "Reserved", field: "reserved", flex: 2, minWidth: 250, wrapText: true, autoHeight: true },
  ];

  useEffect(() => {
    const fetchData = async () => {
      const snapshot = await getDocs(collection(db, "devices"));
      const data = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
      }));
      setRowData(data);
    };
    fetchData();
  }, []);

  const handleReserve = async () => {
    if (!selectedRow) return alert("Select a device first.");

    const start = prompt("Enter start date (DD-MM-YYYY):");
    const days = prompt("How many days? (1-7):");

    // Validate date format DD-MM-YYYY or DD/MM/YYYY
    const dateRegex = /^(0[1-9]|[12][0-9]|3[01])[/-](0[1-9]|1[0-2])[/-](\d{4})$/;
    if (!start || !dateRegex.test(start)) {
      alert("Invalid date format. Please use DD-MM-YYYY or DD/MM/YYYY.");
      return;
    }

    
    const [day, month, year] = start.replace(/\//g, '-').split('-').map(Number);
    const startDate = new Date(year, month - 1, day);
    if (startDate.getDate() !== day || startDate.getMonth() !== month - 1 || startDate.getFullYear() !== year) {
      alert("Invalid date. Please enter a real calendar date.");
      return;
    }

    // Validate days
    const daysNum = parseInt(days);
    if (!days || isNaN(daysNum) || daysNum < 1 || daysNum > 7) {
      alert("Number of days must be a number between 1 and 7.");
      return;
    }

    const endDate = new Date(startDate);
    endDate.setDate(startDate.getDate() + daysNum);
    const endStr = `${endDate.getDate().toString().padStart(2, "0")}-${(endDate.getMonth()+1).toString().padStart(2, "0")}-${endDate.getFullYear()}`;
    const reservedStr = `Reserved from ${start} to ${endStr}`;

    const deviceRef = doc(db, "devices", selectedRow.id);
    await updateDoc(deviceRef, { reserved: reservedStr });

    setRowData(prev =>
      prev.map(item =>
        item.id === selectedRow.id ? { ...item, reserved: reservedStr } : item
      )
    );
  };

  return (
    <div style={{ padding: 20 }}>
      <h2 style={{ fontFamily: 'Inter, system-ui, sans-serif', fontWeight: 600, fontSize: 24, color: '#000000', marginBottom: 20 }}>
        AG Grid with Firestore
      </h2>
      <div className="ag-theme-alpine" style={{ height: 400, width: 600 }}>
        <AgGridReact
          rowData={rowData}
          columnDefs={columnDefs}
          onRowClicked={(e) => {
            if (!e.data.is_divider) setSelectedRow(e.data);
          }}
          getRowStyle={(params) =>
            params.data.is_divider
              ? { fontWeight: "bold", background: "#f0f0f0" }
              : {}
          }
        />
      </div>
      <style>{`
        .reserve-btn {
          font-family: Inter, system-ui, sans-serif;
          font-weight: 600;
          font-size: 16px;
          color: #222F3E;
          background: #fff;
          border: 1px solid #b5bec6;
          border-radius: 8px;
          padding: 8px 20px;
          cursor: pointer;
          transition: background 0.2s;
        }
        .reserve-btn:hover {
          background: #e3f0fb;
        }
      `}</style>
      <button className="reserve-btn" style={{ marginTop: 10 }} onClick={handleReserve}>
        RESERVE
      </button>
    </div>
  );
}

export default App;