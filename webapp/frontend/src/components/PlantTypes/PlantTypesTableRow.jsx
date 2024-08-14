// Code in this function adapted from the CS340 starter code.
// Date Accessed: 4 August 2024
// URL: https://github.com/osu-cs340-ecampus/react-starter-app

import axios from "axios";

import { useNavigate } from "react-router-dom";
import Button from 'react-bootstrap/Button';

/* eslint-disable react/prop-types */
const TableRow = ({ PlantType, fetchPlantTypes }) => {

  // Hook that allows us to navigate programmatically
  const navigate = useNavigate();

  // code to handle the edit of a plant type - uses a redirect to have Router render the update component
  const handleEdit = () => {
    // We can access the id (and query the PlantType) with useParams() in the UpdatePlantType component
    navigate("/PlantTypes/edit/" + PlantType.plantTypeID, { state: { PlantType } });
  };


  // code to handle the deletion of a plant
  const deleteRow = async () => {
    try {
      const URL = import.meta.env.VITE_API_URL + "plantTypes/" + PlantType.plantTypeID;

      const response = await axios.delete(URL);
      // Ensure that the PlantType was deleted successfully
      if (response.status === 204) {
        alert("PlantType deleted successfully");
      }
    } catch (err) {
      alert(err.response.data.error || "Error deleting PlantType");
      console.log(err);
    }
    fetchPlantTypes();
  };

  // code to actually display table rows
  return (
    <tr key={PlantType.plantTypeID}>
      <td>{PlantType.plantTypeID}</td>
      <td>{PlantType.commonName}</td>
      <td>{PlantType.latinName}</td>
      {/* use ternary to display boolean in user friendly manner; 1=yes 0=no */}
      <td>{((PlantType.toxicCat === 1) ? <p>Yes</p> : <p>No</p>)}</td> 
      <td>{((PlantType.toxicDog === 1) ? <p>Yes</p> : <p>No</p>)}</td>
      <td>{PlantType.preferredLight}</td>
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
