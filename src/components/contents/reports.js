import React, { useState } from 'react';
import { Button, Input } from 'reactstrap';
import axios from 'axios';

const Reports = () => {
  const [reportTitle, setReportTitle] = useState('');
  const [description, setDescription] = useState('');
  const [attachment, setAttachment] = useState(null);
  const [createdBy, setCreatedBy] = useState('');

  const handleSubmit = () => {
    const formData = new FormData();
    formData.append('reportTitle', reportTitle);
    formData.append('description', description);
    formData.append('createdBy', createdBy);
    if (attachment) {
      formData.append('attachment', attachment);
    }

    const apiUrl = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';  // Use environment variable

    axios.post(`${apiUrl}/reports`, formData, {
      headers: { 'Content-Type': 'multipart/form-data' }
    })
    .then(response => {
      console.log('Report submitted:', response.data);
    })
    .catch(error => {
      console.error('Error submitting report:', error);
    });
  };

  return (
    <div className="form-container">
      <h1>Add Report</h1>
      <Input
        type="text"
        placeholder="Report Title"
        value={reportTitle}
        onChange={(e) => setReportTitle(e.target.value)}
        className="form-input"
      />
      <Input
        type="textarea"
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        className="form-input"
      />
      <Input
        type="text"
        placeholder="Created By"
        value={createdBy}
        onChange={(e) => setCreatedBy(e.target.value)}
        className="form-input"
      />
      <Input
        type="file"
        onChange={(e) => setAttachment(e.target.files[0])}
        className="form-input"
      />
      <Button className="btn" color="primary" onClick={handleSubmit}>Submit Report</Button>
    </div>
  );
};

export default Reports;
