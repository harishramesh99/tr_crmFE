// components/Requests.js

import React, { useState } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Input, Label } from 'reactstrap';
import '../../styles/global.css';

const Requests = () => {
  const [isModalOpen, setModalOpen] = useState(false);
  const [isStatusModalOpen, setStatusModalOpen] = useState(false);
  const [requestData, setRequestData] = useState({
    description: '',
    attachment: null,
    status: 'Pending',
  });

  const [selectedRequest, setSelectedRequest] = useState(null);
  const [statusChangeData, setStatusChangeData] = useState({
    status: 'Pending',
    description: ''
  });

  // Dummy data for requests
  const [requests, setRequests] = useState([
    { id: 1, request: 'Fix Hull Damage', status: 'Pending', description: '' },
    { id: 2, request: 'Install New Radar', status: 'Approved', description: '' },
    { id: 3, request: 'Replace Engine', status: 'Rejected', description: '' }
  ]);

  const toggleModal = () => setModalOpen(!isModalOpen);
  const toggleStatusModal = () => setStatusModalOpen(!isStatusModalOpen);

  const handleInputChange = (e, isFile = false) => {
    const { name, value, files } = e.target;
    setRequestData((prevData) => ({
      ...prevData,
      [name]: isFile ? files[0] : value
    }));
  };

  const handleStatusChange = (e) => {
    const { name, value } = e.target;
    setStatusChangeData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleSubmit = () => {
    console.log('Request Data:', requestData);
    const newRequest = {
      id: requests.length + 1,
      request: requestData.description,
      status: requestData.status,
    };
    setRequests([...requests, newRequest]);
    toggleModal();
  };

  const handleStatusSubmit = () => {
    const updatedRequests = requests.map((req) =>
      req.id === selectedRequest.id
        ? { ...req, status: statusChangeData.status, description: statusChangeData.description }
        : req
    );
    setRequests(updatedRequests);
    toggleStatusModal();
  };

  const openStatusModal = (request) => {
    setSelectedRequest(request);
    setStatusChangeData({ status: request.status, description: request.description });
    toggleStatusModal();
  };

  return (
    <div className="content-view">
      <Button className="btn" color="primary" onClick={toggleModal}>Add New Request</Button>

      <table className="table mt-4">
        <thead className="thead-primary">
          <tr>
            <th>#</th>
            <th>Request</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {requests.map(item => (
            <tr key={item.id}>
              <td>{item.id}</td>
              <td>{item.request}</td>
              <td>{item.status}</td>
              <td>
                <Button
                  color="primary"
                  onClick={() => openStatusModal(item)}
                >
                  Update Status
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Modal to create new request */}
      <Modal isOpen={isModalOpen} toggle={toggleModal}>
        <ModalHeader toggle={toggleModal}>Add New Request</ModalHeader>
        <ModalBody>
          <Label>Description</Label>
          <Input
            type="textarea"
            name="description"
            value={requestData.description}
            onChange={handleInputChange}
          />
          <Label className="mt-3">Attachment</Label>
          <Input
            type="file"
            name="attachment"
            onChange={(e) => handleInputChange(e, true)}
          />
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={handleSubmit}>Submit</Button>
          <Button color="secondary" onClick={toggleModal}>Cancel</Button>
        </ModalFooter>
      </Modal>

      {/* Modal for approving/rejecting the request */}
      {selectedRequest && (
        <Modal isOpen={isStatusModalOpen} toggle={toggleStatusModal}>
          <ModalHeader toggle={toggleStatusModal}>Update Request Status</ModalHeader>
          <ModalBody>
            <Label>Status</Label>
            <Input
              type="select"
              name="status"
              value={statusChangeData.status}
              onChange={handleStatusChange}
            >
              <option value="Pending">Pending</option>
              <option value="Approved">Approved</option>
              <option value="Rejected">Rejected</option>
            </Input>

            <Label className="mt-3">Description</Label>
            <Input
              type="textarea"
              name="description"
              value={statusChangeData.description}
              onChange={handleStatusChange}
            />
          </ModalBody>
          <ModalFooter>
            <Button color="primary" onClick={handleStatusSubmit}>Submit</Button>
            <Button color="secondary" onClick={toggleStatusModal}>Cancel</Button>
          </ModalFooter>
        </Modal>
      )}
    </div>
  );
};

export default Requests;
