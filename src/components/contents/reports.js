import React, { useState } from 'react';
import { Button } from 'reactstrap';
import ModalFormComponent from './modal.js';
import '../../styles/global.css';

const Reports = () => {
    const [isModalOpen, setModalOpen] = useState(false);
    const [reportData, setReportData] = useState({
        reportName: '',
        status: 'Pending'
    });

    const fields = [
        { label: 'Report Name', name: 'reportName', type: 'text' },
        { label: 'Status', name: 'status', type: 'dropdown', options: ['Pending', 'Approved', 'Rejected'] }
    ];

    const toggleModal = () => setModalOpen(!isModalOpen);

    const handleInputChange = (e, isFile = false) => {
        const { name, value, files } = e.target;
        setReportData((prevData) => ({
            ...prevData,
            [name]: isFile ? files[0] : value
        }));
    };

    const handleSubmit = () => {
        // Add logic to submit the data, e.g., API call
        console.log('Report Data:', reportData);
        toggleModal();
    };

    return (
        <div className="content-view">
            <Button className="btn" color="primary" onClick={toggleModal}>Add New Report</Button>

            <table className="table mt-4">
                <thead className="thead-primary">
                    <tr>
                        <th>#</th>
                        <th>Report</th>
                        <th>Status</th>
                    </tr>
                </thead>
                <tbody>
                    {/* Example report data */}
                    <tr>
                        <td>1</td>
                        <td>Quarterly Report</td>
                        <td>Pending</td>
                    </tr>
                </tbody>
            </table>

            <ModalFormComponent
                isOpen={isModalOpen}
                toggle={toggleModal}
                fields={fields}
                formData={reportData}
                handleInputChange={handleInputChange}
                handleSubmit={handleSubmit}
            />
        </div>
    );
};

export default Reports;
