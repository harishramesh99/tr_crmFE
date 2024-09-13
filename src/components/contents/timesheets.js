import React, { useState } from 'react';
import { Button } from 'reactstrap';
import ModalFormComponent from './modal.js';
import '../../styles/global.css';

const Timesheets = () => {
    const [isModalOpen, setModalOpen] = useState(false);
    const [timesheetData, setTimesheetData] = useState({
        employee: '',
        hours: 0,
        status: 'Pending'
    });

    const fields = [
        { label: 'Employee Name', name: 'employee', type: 'text' },
        { label: 'Hours Worked', name: 'hours', type: 'number' },
        { label: 'Status', name: 'status', type: 'dropdown', options: ['Pending', 'Approved', 'Rejected'] }
    ];

    const toggleModal = () => setModalOpen(!isModalOpen);

    const handleInputChange = (e, isFile = false) => {
        const { name, value, files } = e.target;
        setTimesheetData((prevData) => ({
            ...prevData,
            [name]: isFile ? files[0] : value
        }));
    };

    const handleSubmit = () => {
        // Add logic to submit the data, e.g., API call
        console.log('Timesheet Data:', timesheetData);
        toggleModal();
    };

    return (
        <div className="content-view">
            <Button className="btn" color="primary" onClick={toggleModal}>Add New Timesheet</Button>

            <table className="table mt-4">
                <thead className="thead-primary">
                    <tr>
                        <th>#</th>
                        <th>Employee</th>
                        <th>Hours</th>
                        <th>Status</th>
                    </tr>
                </thead>
                <tbody>
                    {/* Example timesheets data */}
                    <tr>
                        <td>1</td>
                        <td>John Doe</td>
                        <td>8</td>
                        <td>Pending</td>
                    </tr>
                </tbody>
            </table>

            <ModalFormComponent
                isOpen={isModalOpen}
                toggle={toggleModal}
                fields={fields}
                formData={timesheetData}
                handleInputChange={handleInputChange}
                handleSubmit={handleSubmit}
            />
        </div>
    );
};

export default Timesheets;
