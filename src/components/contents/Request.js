import React, { useState } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Input, Label } from 'reactstrap';
import axios from 'axios';

const Requests = () => {
  const [isModalOpen, setModalOpen] = useState(false);
  const [requestData, setRequestData] = useState({
    description: '',
    attachment: null,
    status: 'Pending',
  });

  const toggleModal = () => setModalOpen(!isModalOpen);

  const handleInputChange = (e, isFile = false) => {
    const { name, value, files } = e.target;
    setRequestData((prevData) => ({
      ...prevData,
      [name]: isFile ? files[0] : value,
    }));
  };

  const handleSubmit = () => {
    const formData = new FormData();
    formData.append('description', requestData.description);
    if (requestData.attachment) {
      formData.append('attachment', requestData.attachment);
    }
    formData.append('status', requestData.status);

    const apiUrl = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';  // Use environment variable for the API URL

    axios.post(`${apiUrl}/requests`, formData)
      .then((response) => {
        console.log('Request submitted:', response.data);
        toggleModal();
      })
      .catch((error) => {
        console.error('Error submitting request:', error);
      });
  };

  return (
    <div>
      <Button className="btn" color="primary" onClick={toggleModal}>Submit Request</Button>

      <Modal isOpen={isModalOpen} toggle={toggleModal}>
        <ModalHeader toggle={toggleModal}>Submit Request</ModalHeader>
        <ModalBody className="form-container">
          <Label>Description</Label>
          <Input type="textarea" name="description" value={requestData.description} onChange={handleInputChange} className="form-input" />
          <Label>Attachment</Label>
          <Input type="file" name="attachment" onChange={(e) => handleInputChange(e, true)} className="form-input" />
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={handleSubmit}>Submit</Button>
          <Button color="secondary" onClick={toggleModal}>Cancel</Button>
        </ModalFooter>
      </Modal>
    </div>
  );
};

export default Requests;
