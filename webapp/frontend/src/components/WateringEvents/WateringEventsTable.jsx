// Code in this function adapted from the CS340 starter code.
// Date Accessed: 4 August 2024
// URL: https://github.com/osu-cs340-ecampus/react-starter-app

import { useState, useEffect } from "react";
import TableRow from "./WateringEventsTableRow";
import axios from "axios";

// bootstrap components
import Table from 'react-bootstrap/Table';


const WateringEventsTable = () => {
  const [WateringEvents, setWateringEvents] = useState([]);

  const fetchWateringEvents = async () => {
    try {
      const URL = import.meta.env.VITE_API_URL + "WateringEvents";
      const response = await axios.get(URL);
      setWateringEvents(response.data);
    } catch (error) {
      alert("Error fetching WateringEvents from the server.");
      console.error("Error fetching WateringEvents:", error);
    }
  };

  useEffect(() => {
    fetchWateringEvents();
  }, []);

  return (
    <div>

      {/* if WateringEvents table is empty, throw an error */}
      {WateringEvents.length === 0 ? (
        <div>
          <p>There are currently no logged watering events. Are any of your plants thirsty?</p>
        </div>
        
      ) : (   
        // otherwise if WateringEvents table has rows, display them nicely with bootstrap
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Event ID</th>
              <th>Watering Date</th>
              <th>Plant</th>
              <th colSpan={2}>Modify</th>
            </tr>
          </thead>

          <tbody>
            {/* use the map function to generate each row within the table */}
            {WateringEvents.map((WateringEvent) => (
              <TableRow key={WateringEvent.eventID} WateringEvent={WateringEvent} fetchWateringEvents={fetchWateringEvents} />
            ))}
          </tbody>
        </Table>
      )}
    </div>
  );
};

export default WateringEventsTable;
