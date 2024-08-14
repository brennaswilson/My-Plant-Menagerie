// Code in this function adapted from the CS340 starter code.
// Date Accessed: 4 August 2024
// URL: https://github.com/osu-cs340-ecampus/react-starter-app

import axios from "axios";

import { useNavigate } from "react-router-dom";
import Button from 'react-bootstrap/Button';

/* eslint-disable react/prop-types */
const TableRow = ({ PlantSoil, fetchPlantSoils }) => {
  // Hook that allows us to navigate programmatically
  const navigate = useNavigate();
  // Redirect to edit PlantSoil page
  const handleEdit = () => {
    // We can access the id (and query the PlantSoil) with useParams() in the UpdatePlantSoil component
    navigate("/PlantSoils/edit/" + PlantSoil.plantSoilID, { state: { PlantSoil } });
  };

  const deleteRow = async () => {
    try {
      const URL = import.meta.env.VITE_API_URL + "PlantSoils/" + PlantSoil.plantSoilID;

      const response = await axios.delete(URL);
      // Ensure that the PlantSoil was deleted successfully
      if (response.status === 204) {
        alert("PlantSoil deleted successfully");
      }
    } catch (err) {
      alert(err.response.data.error || "Error deleting PlantSoil");
      console.log(err);
    }
    fetchPlantSoils();
  };

  return (
    <tr key={PlantSoil.plantSoilID}>
      <td>{PlantSoil.plantSoilID}</td>
      <td>{PlantSoil.displayName}</td>
      <td>{PlantSoil.soilType}</td>
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
