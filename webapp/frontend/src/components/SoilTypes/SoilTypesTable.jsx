// Code in this function adapted from the CS340 starter code.
// Date Accessed: 4 August 2024
// URL: https://github.com/osu-cs340-ecampus/react-starter-app

import { useState, useEffect } from "react";
import TableRow from "./SoilTypesTableRow";
import axios from "axios";

// bootstrap components
import Table from 'react-bootstrap/Table';


const SoilTypesTable = () => {
  const [SoilTypes, setSoilTypes] = useState([]);

  const fetchSoilTypes = async () => {
    try {
      const URL = import.meta.env.VITE_API_URL + "soilTypes";
      const response = await axios.get(URL);
      setSoilTypes(response.data);
    } catch (error) {
      alert("Error fetching SoilTypes from the server.");
      console.error("Error fetching SoilTypes:", error);
    }
  };

  useEffect(() => {
    fetchSoilTypes();
  }, []);

  return (
    <div>

      {/* if SoilTypes table is empty, throw an error */}
      {SoilTypes.length === 0 ? (
        <div>
          <p>There are currently no types of soil in the database. Why don't you add one?</p>
        </div>
        
      ) : (   
        // otherwise if SoilTypes table has rows, display them nicely with bootstrap
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Soil ID</th>
              <th>Soil Name</th>
              <th>Soil Description</th>
              <th colSpan={2}>Modify</th>
            </tr>
          </thead>

          <tbody>
            {/* use the map function to generate each row within the table */}
            {SoilTypes.map((SoilType) => (
              <TableRow key={SoilType.soilID} SoilType={SoilType} fetchSoilTypes={fetchSoilTypes} />
            ))}
          </tbody>
        </Table>
      )}
    </div>
  );
};

export default SoilTypesTable;
