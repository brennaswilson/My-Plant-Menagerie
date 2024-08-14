// Code in this function adapted from the CS340 starter code.
// Date Accessed: 4 August 2024
// URL: https://github.com/osu-cs340-ecampus/react-starter-app

import axios from "axios";

import { useNavigate } from "react-router-dom";
import Button from 'react-bootstrap/Button';

/* eslint-disable react/prop-types */
const TableRow = ({ SoilType, fetchSoilTypes }) => {
  // Hook that allows us to navigate programmatically
  const navigate = useNavigate();
  // Redirect to edit SoilType page
  const handleEdit = () => {
    // We can access the id (and query the SoilType) with useParams() in the UpdateSoilType component
    navigate("/soilTypes/edit/" + SoilType.soilID, { state: { SoilType } });
  };

  const deleteRow = async () => {
    try {
      const URL = import.meta.env.VITE_API_URL + "soilTypes/" + SoilType.soilID;

      const response = await axios.delete(URL);
      // Ensure that the SoilType was deleted successfully
      if (response.status === 204) {
        alert("SoilType deleted successfully");
      }
    } catch (err) {
      alert(err.response.data.error || "Error deleting SoilType");
      console.log(err);
    }
    fetchSoilTypes();
  };

  return (
    <tr key={SoilType.soilID}>
      <td>{SoilType.soilID}</td>
      <td>{SoilType.soilType}</td>
      <td>{SoilType.soilDescription}</td>
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
