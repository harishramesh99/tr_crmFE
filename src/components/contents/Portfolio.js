import React, { useState, useEffect } from 'react';
import { Table, Button } from 'reactstrap';
import axios from 'axios';
import DynamicFormModal from './modal.mjs';  // Assuming modal.js is named DynamicFormModal
import '../../styles/portfolio.css';
import '../../styles/global.css';

const Portfolio = () => {
  const [vessels, setVessels] = useState([]);
  const [isVesselModalOpen, setIsVesselModalOpen] = useState(false);
  const [isProjectModalOpen, setIsProjectModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    vesselName: '',
    projectName: '',
    locations: [''],
    description: '',
    attachment: null,
  });
  const [currentVesselId, setCurrentVesselId] = useState('');

  // Fetch vessels dynamically from the backend
  useEffect(() => {
    const apiUrl = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';
    axios.get(`${apiUrl}/vessels`)
      .then(response => setVessels(response.data))
      .catch(error => console.error('Error fetching vessels:', error));
  }, []);

  const toggleVesselModal = () => {
    setIsVesselModalOpen(!isVesselModalOpen);
    setFormData({ ...formData, vesselName: '' });
  };

  const toggleProjectModal = (vesselId = '') => {
    setCurrentVesselId(vesselId);
    setIsProjectModalOpen(!isProjectModalOpen);
    if (!isProjectModalOpen) {
      setFormData({ ...formData, projectName: '', locations: [''], description: '', attachment: null });
    }
  };

  const handleInputChange = (e, isFile = false) => {
    const { name, value, files } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: isFile ? files[0] : value,
    }));
  };

  const addVessel = () => {
    const apiUrl = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';
    const vesselData = { vesselName: formData.vesselName };
    axios.post(`${apiUrl}/vessels`, vesselData)
      .then(response => {
        setVessels([...vessels, response.data]);
        toggleVesselModal();
      })
      .catch(error => console.error('Error adding vessel:', error));
  };

  const addProject = () => {
    const apiUrl = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';
    const projectData = {
      projectName: formData.projectName,
      locations: formData.locations,
      description: formData.description,
      vesselId: currentVesselId,
    };

    axios.post(`${apiUrl}/projects`, projectData)
      .then(response => {
        const updatedVessels = vessels.map(vessel =>
          vessel._id === currentVesselId ? { ...vessel, projects: [...vessel.projects, response.data] } : vessel
        );
        setVessels(updatedVessels);
        toggleProjectModal();
      })
      .catch(error => console.error('Error adding project:', error));
  };

  return (
    <div className="portfolio-view">
      <h1>Vessels</h1>
      <Button color="primary" onClick={toggleVesselModal}>Add New Vessel</Button>

      <Table className="table table-text-small mb-0">
        <thead className="thead-primary table-sorting">
          <tr>
            <th>Vessel Name</th>
            <th>Projects</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {vessels.map((vessel) => (
            <tr key={vessel._id}>
              <td>{vessel.vesselName}</td>
              <td>
                <ul>
                  {vessel.projects.map((project) => (
                    <li key={project._id}>
                      {project.projectName} - {project.description} <br />
                      Locations: {project.locations ? project.locations.join(', ') : 'No locations available'} <br />
                      Attachment: {project.attachment ? project.attachment : 'No file attached'}
                    </li>
                  ))}
                </ul>
              </td>
              <td>
                <Button color="secondary" onClick={() => toggleProjectModal(vessel._id)}>Add Project</Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      {/* Vessel Modal using modal.js */}
      <DynamicFormModal
        isOpen={isVesselModalOpen}
        toggle={toggleVesselModal}
        fields={[
          { label: 'Vessel Name', name: 'vesselName', type: 'text' },
        ]}
        formData={formData}
        handleInputChange={handleInputChange}
        handleSubmit={addVessel}
      />

      {/* Project Modal using modal.js */}
      <DynamicFormModal
        isOpen={isProjectModalOpen}
        toggle={toggleProjectModal}
        fields={[
          { label: 'Project Name', name: 'projectName', type: 'text' },
          { label: 'Locations', name: 'locations', type: 'text' },
          { label: 'Description', name: 'description', type: 'textarea' },
          { label: 'Attachment', name: 'attachment', type: 'file' },  // No validation on attachment
        ]}
        formData={formData}
        handleInputChange={handleInputChange}
        handleSubmit={addProject}
      />
    </div>
  );
};

export default Portfolio;
