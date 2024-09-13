import React, { useState } from 'react';
import { Table, Button, Modal, ModalHeader, ModalBody, Input } from 'reactstrap';
import '../../styles/portfolio.css';
import '../../styles/global.css';

const Portfolio = () => {
  const dummyVessels = [
    {
      _id: 'vessel1',
      vesselName: 'Vessel Alpha',
      projects: [
        { _id: 'proj1', projectNumber: 'P1001', locations: ['Port A', 'Port B'], description: 'Project 1 description', attachment: 'file1.pdf' },
        { _id: 'proj2', projectNumber: 'P1002', locations: ['Port C'], description: 'Project 2 description', attachment: 'file2.pdf' }
      ]
    },
    {
      _id: 'vessel2',
      vesselName: 'Vessel Beta',
      projects: [
        { _id: 'proj3', projectNumber: 'P2001', locations: ['Port D'], description: 'Project 3 description', attachment: 'file3.pdf' }
      ]
    },
  ];

  const [vessels, setVessels] = useState(dummyVessels);
  const [isVesselModalOpen, setIsVesselModalOpen] = useState(false);
  const [isProjectModalOpen, setIsProjectModalOpen] = useState(false);
  const [vesselName, setVesselName] = useState('');
  const [projectNumber, setProjectNumber] = useState('');
  const [locations, setLocations] = useState(['']);
  const [description, setDescription] = useState('');
  const [attachment, setAttachment] = useState(null);
  const [currentVesselId, setCurrentVesselId] = useState('');

  const toggleVesselModal = () => {
    setIsVesselModalOpen(!isVesselModalOpen);
  };

  const toggleProjectModal = (vesselId) => {
    setCurrentVesselId(vesselId);
    setIsProjectModalOpen(!isProjectModalOpen);
  };

  const addVessel = () => {
    const newVessel = {
      _id: `vessel${vessels.length + 1}`,
      vesselName: vesselName,
      projects: []
    };
    setVessels([...vessels, newVessel]);
    setVesselName('');
    toggleVesselModal();
  };

  const addProject = () => {
    const newProject = {
      _id: `proj${Math.random().toString(36).substr(2, 9)}`,
      projectNumber,
      locations: [...locations],
      description,
      attachment: attachment ? attachment.name : null
    };

    const updatedVessels = vessels.map(vessel => 
      vessel._id === currentVesselId ? { ...vessel, projects: [...vessel.projects, newProject] } : vessel
    );

    setVessels(updatedVessels);
    setProjectNumber('');
    setLocations(['']);
    setDescription('');
    setAttachment(null);
    toggleProjectModal('');
  };

  const handleLocationChange = (index, value) => {
    const updatedLocations = [...locations];
    updatedLocations[index] = value;
    setLocations(updatedLocations);
  };

  const addLocationField = () => {
    setLocations([...locations, '']);
  };

  const handleFileChange = (event) => {
    setAttachment(event.target.files[0]);
  };

  return (
    <div className="portfolio-view">
      <h1>Vessels</h1>

      <Button color="primary" onClick={toggleVesselModal}>
        Add New Vessel
      </Button>

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

      {/* Modal for adding new vessel */}
      <Modal isOpen={isVesselModalOpen} toggle={toggleVesselModal}>
        <ModalHeader toggle={toggleVesselModal}>Add Vessel</ModalHeader>
        <ModalBody>
          <div>
            <label>Vessel Name:</label>
            <Input
              type="text"
              value={vesselName}
              onChange={(e) => setVesselName(e.target.value)}
            />
          </div>
          <div>
            <label>Attachment:</label>
            <Input
              type="file"
              onChange={handleFileChange}
            />
          </div>
          <Button color="primary" onClick={addVessel}>Add Vessel</Button>
          <Button color="secondary" onClick={toggleVesselModal}>Cancel</Button>
        </ModalBody>
      </Modal>

      {/* Modal for adding new project */}
      <Modal isOpen={isProjectModalOpen} toggle={toggleProjectModal}>
        <ModalHeader toggle={toggleProjectModal}>Add Project</ModalHeader>
        <ModalBody>
          <div>
            <label>Project Number:</label>
            <Input
              type="text"
              value={projectNumber}
              onChange={(e) => setProjectNumber(e.target.value)}
            />
          </div>
          <div>
            <label>Locations:</label>
            {locations.map((location, index) => (
              <Input
                key={index}
                type="text"
                value={location}
                onChange={(e) => handleLocationChange(index, e.target.value)}
                placeholder="Enter location"
                className="mb-2"
              />
            ))}
            <Button color="secondary" onClick={addLocationField}>Add Another Location</Button>
          </div>
          <div>
            <label>Description:</label>
            <Input
              type="textarea"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
          <div>
            <label>Attachment:</label>
            <Input
              type="file"
              onChange={handleFileChange}
            />
          </div>
          <Button color="primary" onClick={addProject}>Add Project</Button>
          <Button color="secondary" onClick={toggleProjectModal}>Cancel</Button>
        </ModalBody>
      </Modal>
    </div>
  );
};

export default Portfolio;
