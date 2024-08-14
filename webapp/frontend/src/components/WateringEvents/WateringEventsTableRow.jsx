// Code in this function adapted from the CS340 starter code.
// Date Accessed: 4 August 2024
// URL: https://github.com/osu-cs340-ecampus/react-starter-app

import axios from "axios";

import { useNavigate } from "react-router-dom";
import Button from 'react-bootstrap/Button';

/* eslint-disable react/prop-types */
const TableRow = ({ WateringEvent, fetchWateringEvents }) => {
  // Hook that allows us to navigate programmatically
  const navigate = useNavigate();
  // Redirect to edit WateringEvent page
  const handleEdit = () => {
    // We can access the id (and query the WateringEvent) with useParams() in the UpdateWateringEvent component
    navigate("/WateringEvents/edit/" + WateringEvent.eventID, { state: { WateringEvent } });
  };

  const deleteRow = async () => {
    try {
      const URL = import.meta.env.VITE_API_URL + "WateringEvents/" + WateringEvent.eventID;

      const response = await axios.delete(URL);
      // Ensure that the WateringEvent was deleted successfully
      if (response.status === 204) {
        alert("WateringEvent deleted successfully");
      }
    } catch (err) {
      alert(err.response.data.error || "Error deleting WateringEvent");
      console.log(err);
    }
    fetchWateringEvents();
  };

  return (
    <tr key={WateringEvent.eventID}>
      <td>{WateringEvent.eventID}</td>
      <td>{WateringEvent.wateringDate.slice(0,10)}</td>
      <td>{WateringEvent.displayName}</td>
      <td>
        <Button onClick={handleEdit} variant="warning">Edit</Button>
      </td>
      <td>
        <Button onClick={deleteRow} variant="danger">Delete</Button>
      </td>
    </tr>
  );
};

export default TableRow;
