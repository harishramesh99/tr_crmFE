import React, { useState, useEffect } from 'react';
import { Button, Input } from 'reactstrap';
import axios from 'axios';

const Timesheets = () => {
  const [workerName, setWorkerName] = useState('');
  const [date, setDate] = useState('');
  const [hoursWorked, setHoursWorked] = useState('');
  const [projectId, setProjectId] = useState('');
  const [manpower, setManpower] = useState([]);

  // Fetch manpower list when component mounts
  useEffect(() => {
    axios.get('http://localhost:5000/api/manpower')
      .then(response => {
        setManpower(response.data);
      })
      .catch(error => {
        console.error('Error fetching manpower:', error);
      });
  }, []);

  const handleSubmit = () => {
    axios.post('http://localhost:5000/api/timesheets', {
      workerName,
      date,
      hoursWorked,
      projectId
    })
    .then(response => {
      console.log('Timesheet submitted:', response.data);
    })
    .catch(error => {
      console.error('Error submitting timesheet:', error);
    });
  };

  return (
    <div>
      <h1>Add Timesheet</h1>
      <Input
        type="select"
        value={workerName}
        onChange={(e) => setWorkerName(e.target.value)}
      >
        <option value="">Select Worker</option>
        {manpower.map(worker => (
          <option key={worker._id} value={worker.workerName}>
            {worker.workerName} - {worker.role}
          </option>
        ))}
      </Input>
      <Input
        type="date"
        placeholder="Date"
        value={date}
        onChange={(e) => setDate(e.target.value)}
      />
      <Input
        type="number"
        placeholder="Hours Worked"
        value={hoursWorked}
        onChange={(e) => setHoursWorked(e.target.value)}
      />
      <Input
        type="text"
        placeholder="Project ID"
        value={projectId}
        onChange={(e) => setProjectId(e.target.value)}
      />
      <Button color="primary" onClick={handleSubmit}>Submit Timesheet</Button>
    </div>
  );
};

export default Timesheets;
