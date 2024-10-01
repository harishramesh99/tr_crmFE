import React, { useState, useEffect } from 'react';
import { Table, Button, Modal, ModalHeader, ModalBody, Input } from 'reactstrap';
import axios from 'axios';
import '../../styles/portfolio.css';
import '../../styles/global.css';

const Portfolio = () => {
  const [vessels, setVessels] = useState([]);
  const [isVesselModalOpen, setIsVesselModalOpen] = useState(false);
  const [isProjectModalOpen, setIsProjectModalOpen] = useState(false);
  const [vesselName, setVesselName] = useState('');
  const [projectNumber, setProjectNumber] = useState('');
  const [locations, setLocations] = useState(['']);
  const [description, setDescription] = useState('');
  const [attachment, setAttachment] = useState(null);
  const [currentVesselId, setCurrentVesselId] = useState('');

  // Fetch vessels dynamically from the backend
  useEffect(() => {
    axios.get('http://localhost:5000/api/vessels')
      .then(response => setVessels(response.data))
      .catch(error => console.error('Error fetching vessels:', error));
  }, []);

  const toggleVesselModal = () => setIsVesselModalOpen(!isVesselModalOpen);
  const toggleProjectModal = (vesselId = '') => {
    setCurrentVesselId(vesselId);
    setIsProjectModalOpen(!isProjectModalOpen);
    if (!isProjectModalOpen) {
      setProjectNumber('');
      setLocations(['']);
      setDescription('');
      setAttachment(null);
    }
  };

  const addVessel = () => {
    axios.post('http://localhost:5000/api/vessels', { vesselName })
      .then(response => {
        setVessels([...vessels, response.data]);
        toggleVesselModal();
      })
      .catch(error => console.error('Error adding vessel:', error));
  };

  const addProject = () => {
    axios.post('http://localhost:5000/api/projects', { projectNumber, locations, description, attachment })
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
      <Button className="btn" color="primary" onClick={toggleVesselModal}>Add New Vessel</Button>
      <Table className="table table-text-small mb-0">
        <thead className="thead-primary table-sorting">
          <tr>
            <th>Vessel Name</th>
            <th>Projects</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {vessels.map(vessel => (
            <tr key={vessel._id}>
              <td>{vessel.vesselName}</td>
              <td>
                <ul>
                  {vessel.projects.map(project => (
                    <li key={project._id}>
                      {project.projectNumber} - {project.description} <br />
                      Locations: {project.locations.join(', ')} <br />
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

      <Modal isOpen={isVesselModalOpen} toggle={toggleVesselModal}>
        <ModalHeader toggle={toggleVesselModal}>Add Vessel</ModalHeader>
        <ModalBody>
          <div>
            <label>Vessel Name:</label>
            <Input type="text" value={vesselName} onChange={e => setVesselName(e.target.value)} />
          </div>
          <Button className="btn" color="primary" onClick={addVessel}>Add Vessel</Button>
          <Button color="secondary" onClick={toggleVesselModal}>Cancel</Button>
        </ModalBody>
      </Modal>

      <Modal isOpen={isProjectModalOpen} toggle={toggleProjectModal}>
        <ModalHeader toggle={toggleProjectModal}>Add Project</ModalHeader>
        <ModalBody>
          <div>
            <label>Project Number:</label>
            <Input type="text" value={projectNumber} onChange={e => setProjectNumber(e.target.value)} />
          </div>
          <div>
            <label>Locations:</label>
            {locations.map((location, index) => (
              <Input key={index} type="text" value={location} onChange={e => setLocations(prev => {
                const newLocations = [...prev];
                newLocations[index] = e.target.value;
                return newLocations;
              })} />
            ))}
            <Button color="secondary" onClick={() => setLocations([...locations, ''])}>Add Another Location</Button>
          </div>
          <div>
            <label>Description:</label>
            <Input type="textarea" value={description} onChange={e => setDescription(e.target.value)} />
          </div>
          <div>
            <label>Attachment:</label>
            <Input type="file" onChange={e => setAttachment(e.target.files[0])} />
          </div>
          <Button className="btn" color="primary" onClick={addProject}>Add Project</Button>
          <Button color="secondary" onClick={toggleProjectModal}>Cancel</Button>
        </ModalBody>
      </Modal>
    </div>
  );
};

export default Portfolio;
