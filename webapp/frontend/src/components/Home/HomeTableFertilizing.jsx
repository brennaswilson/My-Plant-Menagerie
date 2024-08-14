// Code in this function adapted from the CS340 starter code.
// Date Accessed: 4 August 2024
// URL: https://github.com/osu-cs340-ecampus/react-starter-app

import { useState, useEffect } from "react";
import TableRow from "./HomeTableRowFertilizing";
import axios from "axios";

// bootstrap components
import Table from 'react-bootstrap/Table';


const HomeTableFertilizing = () => {
  const [PlantsDueFertilizing, setPlantsDueFertilizing] = useState([]);

  const fetchPlantsDueFertilizing = async () => {
    try {
      const URL = import.meta.env.VITE_API_URL + "NextFertilizingDate";
      const response = await axios.get(URL);
      setPlantsDueFertilizing(response.data);
    } catch (error) {
      alert("Error fetching Plants from the server.");
      console.error("Error fetching Plants:", error);
    }
  };

  useEffect(() => {
    fetchPlantsDueFertilizing();
  }, []);

  return (
    <div> 

      {/* if Plants table is empty, throw an error */}
      {PlantsDueFertilizing.length === 0 ? (
        <div>
          <p>There are currently no plants due for fertilizing.</p>
        </div>
        
      ) : (   
        // otherwise if Plants table has rows, display them nicely with bootstrap
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Plant</th>
              <th>Last Fertilized Date</th>
              <th>Next Fertilizing Date</th>
            </tr>
          </thead>

          <tbody>
            {/* use the map function to generate each row within the table */}
            {PlantsDueFertilizing.map((PlantsDueFertilizing) => (
              <TableRow key={PlantsDueFertilizing.plantID} PlantsDueFertilizing={PlantsDueFertilizing} fetchPlantsDueFertilizing={fetchPlantsDueFertilizing} />
            ))}
          </tbody>
        </Table>
      )}
    </div>
  );
};

export default HomeTableFertilizing;
