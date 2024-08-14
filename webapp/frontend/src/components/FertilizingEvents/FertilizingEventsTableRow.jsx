// Code in this function adapted from the CS340 starter code.
// Date Accessed: 4 August 2024
// URL: https://github.com/osu-cs340-ecampus/react-starter-app

import axios from "axios";

import { useNavigate } from "react-router-dom";
import Button from 'react-bootstrap/Button';

/* eslint-disable react/prop-types */
const TableRow = ({ FertilizingEvent, fetchFertilizingEvents }) => {
  // Hook that allows us to navigate programmatically
  const navigate = useNavigate();
  // Redirect to edit FertilizingEvent page
  const handleEdit = () => {
    // We can access the id (and query the FertilizingEvent) with useParams() in the UpdateFertilizingEvent component
    navigate("/FertilizingEvents/edit/" + FertilizingEvent.eventID, { state: { FertilizingEvent } });
  };

  const deleteRow = async () => {
    try {
      const URL = import.meta.env.VITE_API_URL + "FertilizingEvents/" + FertilizingEvent.eventID;

      const response = await axios.delete(URL);
      // Ensure that the FertilizingEvent was deleted successfully
      if (response.status === 204) {
        alert("FertilizingEvent deleted successfully");
      }
    } catch (err) {
      alert(err.response.data.error || "Error deleting FertilizingEvent");
      console.log(err);
    }
    fetchFertilizingEvents();
  };

  return (
    <tr key={FertilizingEvent.eventID}>
      <td>{FertilizingEvent.eventID}</td>
      <td>{FertilizingEvent.fertilizingDate.slice(0,10)}</td>
      <td>{FertilizingEvent.displayName}</td>
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
