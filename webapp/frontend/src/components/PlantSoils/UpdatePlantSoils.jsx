import { useState, useEffect } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import axios from "axios";

import { PlantSelectorOption, PlantSelectorDefaultOption } from "./PlantsDropdownSelectorPlantSoils";
import { SoilSelectorOption, SoilSelectorDefaultOption } from "./SoilDropdownSelectorPlantSoils";

// Bootstrap components
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

const UpdatePlantSoil = () => {
    const [Plants, setPlants] = useState([]);
    const [SoilTypes, setSoilTypes] = useState([]);

    const { id } = useParams();
    const navigate = useNavigate();
    const location = useLocation();
    const prevPlantSoil = location.state.PlantSoil;

    const [formData, setFormData] = useState({
        plantID: prevPlantSoil.plantID || '',
        soilID: prevPlantSoil.soilID || '',
    });

    const fetchPlants = async () => {
        try {
            const URL = import.meta.env.VITE_API_URL + "Plants";
            const response = await axios.get(URL);
            setPlants(response.data);
        } catch (error) {
            alert("Error fetching Plants from the server.");
            console.error("Error fetching Plants:", error);
        }
    };

    const fetchSoilTypes = async () => {
        try {
            const URL = import.meta.env.VITE_API_URL + "SoilTypes";
            const response = await axios.get(URL);
            setSoilTypes(response.data);
        } catch (error) {
            alert("Error fetching Soil Types from the server.");
            console.error("Error fetching Soil Types:", error);
        }
    };

    useEffect(() => {
        fetchPlants();
        fetchSoilTypes();
    }, []);

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setFormData((prevFormData) => ({
            ...prevFormData,
            [name]: value,
        }));
    };

    const isUpdate = () => {
        if (JSON.stringify(formData) === JSON.stringify({
            plantID: prevPlantSoil.plantID || '',
            soilID: prevPlantSoil.soilID || '',
        })) {
            alert("No changes made.");
            return false;
        }
        return true;
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (isUpdate()) {
            try {
                const URL = `${import.meta.env.VITE_API_URL}PlantSoils/${id}`;
                const response = await axios.put(URL, formData);
                if (response.status !== 200) {
                    alert("Error updating plant soils relationship!");
                } else {
                    alert(response.data.message);
                    navigate("/PlantSoils");
                }
            } catch (err) {
                console.log("Error updating plant soil relationship:", err);
            }
        }
    };

    const nonDefaults = (items, IDToMatch) => {
        let dontSelectMe = [];
        let SelectDefault = [];
        for (let i = 0; i < items.length; i++) {
            let temp = items[i];
            let key = temp["plantID"] || temp["soilID"];
            if (key === IDToMatch) {
                SelectDefault.push(temp);
            } else {
                dontSelectMe.push(temp);
            }
        }
        return [SelectDefault, dontSelectMe];
    };

    const processDropdowns = nonDefaults(Plants, prevPlantSoil.plantID);
    const selectorDefault = processDropdowns[0];
    const selectorNonDefaults = processDropdowns[1];

    const processDropdownsSoils = nonDefaults(SoilTypes, prevPlantSoil.soilID);
    const selectorDefaultSoils = processDropdownsSoils[0];
    const selectorNonDefaultsSoils = processDropdownsSoils[1];

    return (
        <div>
            <h2>Update Plant Soils Relationship</h2>
            <br />

            <Form onSubmit={handleSubmit}>
                <Row>
                    <Col>
                        <Form.Label htmlFor="plantID">Plant</Form.Label>
                        <Form.Select
                            name="plantID"
                            onChange={handleInputChange}
                            required
                            autoFocus
                        >
                            {selectorDefault.map((Plant) => (
                                <PlantSelectorDefaultOption key={Plant.plantID} Plant={Plant} fetchPlants={fetchPlants} />
                            ))}
                            {selectorNonDefaults.map((Plant) => (
                                <PlantSelectorOption key={Plant.plantID} Plant={Plant} fetchPlants={fetchPlants} />
                            ))}
                        </Form.Select>
                    </Col>
                    <br />
                    <Col>
                        <Form.Label htmlFor="soilID">Soil</Form.Label>
                        <Form.Select
                            name="soilID"
                            onChange={handleInputChange}
                            required
                            autoFocus
                        >
                            {selectorDefaultSoils.map((SoilType) => (
                                <SoilSelectorDefaultOption key={SoilType.soilID} SoilType={SoilType} fetchSoilTypes={fetchSoilTypes} />
                            ))}
                            {selectorNonDefaultsSoils.map((SoilType) => (
                                <SoilSelectorOption key={SoilType.soilID} SoilType={SoilType} fetchSoilTypes={fetchSoilTypes} />
                            ))}
                        </Form.Select>
                    </Col>
                </Row>
                <br />
                <Container>
                    <Row>
                        <Col>
                            <Button variant="secondary" type="button" onClick={() => navigate("/PlantSoils")}>Cancel</Button>
                        </Col>
                        <Col>
                            <Button variant="success" type="submit">Update</Button>
                        </Col>
                    </Row>
                </Container>
            </Form>
        </div>
    );
};

export default UpdatePlantSoil;
