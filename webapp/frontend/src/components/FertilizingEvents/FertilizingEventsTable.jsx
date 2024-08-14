// Code in this function adapted from the CS340 starter code.
// Date Accessed: 4 August 2024
// URL: https://github.com/osu-cs340-ecampus/react-starter-app

import { useState, useEffect } from "react";
import TableRow from "./FertilizingEventsTableRow";
import axios from "axios";

// bootstrap components
import Table from 'react-bootstrap/Table';


const FertilizingEventsTable = () => {
  const [FertilizingEvents, setFertilizingEvents] = useState([]);

  const fetchFertilizingEvents = async () => {
    try {
      const URL = import.meta.env.VITE_API_URL + "FertilizingEvents";
      const response = await axios.get(URL);
      setFertilizingEvents(response.data);
    } catch (error) {
      alert("Error fetching FertilizingEvents from the server.");
      console.error("Error fetching FertilizingEvents:", error);
    }
  };

  useEffect(() => {
    fetchFertilizingEvents();
  }, []);

  return (
    <div>

      {/* if FertilizingEvents table is empty, throw an error */}
      {FertilizingEvents.length === 0 ? (
        <div>
          <p>There are currently no logged fertilizing events. Are any of your plants hungry?</p>
        </div>
        
      ) : (   
        // otherwise if FertilizingEvents table has rows, display them nicely with bootstrap
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Event ID</th>
              <th>Fertilizing Date</th>
              <th>Plant</th>
              <th colSpan={2}>Modify</th>
            </tr>
          </thead>

          <tbody>
            {/* use the map function to generate each row within the table */}
            {FertilizingEvents.map((FertilizingEvent) => (
              <TableRow key={FertilizingEvent.eventID} FertilizingEvent={FertilizingEvent} fetchFertilizingEvents={fetchFertilizingEvents} />
            ))}
          </tbody>
        </Table>
      )}
    </div>
  );
};

export default FertilizingEventsTable;
