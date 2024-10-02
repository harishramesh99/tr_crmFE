import React, { useState } from 'react';
import { Button } from 'reactstrap';
import axios from 'axios';
import ModalFormComponent from './modal.mjs';
import '../../styles/global.css';

const Inventory = () => {
    const [isModalOpen, setModalOpen] = useState(false);
    const [inventoryData, setInventoryData] = useState({
        itemName: '',
        quantity: 0,
        status: 'Available'
    });

    const toggleModal = () => setModalOpen(!isModalOpen);

    const handleInputChange = (e, isFile = false) => {
        const { name, value, files } = e.target;
        setInventoryData((prevData) => ({
            ...prevData,
            [name]: isFile ? files[0] : value
        }));
    };

    const handleSubmit = () => {
        const apiUrl = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';
        axios.post(`${apiUrl}/inventory`, inventoryData)  // Use environment variable for the API URL
          .then((response) => {
            console.log('Inventory Data Submitted:', response.data);
            toggleModal();
          })
          .catch((error) => {
            console.error('Error submitting inventory:', error);
          });
      };

    return (
        <div className="content-view">
            <Button className="btn" color="primary" onClick={toggleModal}>Add New Inventory Item</Button>

            <table className="table mt-4">
                <thead className="thead-primary">
                    <tr>
                        <th>#</th>
                        <th>Item Name</th>
                        <th>Quantity</th>
                        <th>Status</th>
                    </tr>
                </thead>
                <tbody>
                    {/* Example inventory data */}
                    <tr>
                        <td>1</td>
                        <td>Wrench</td>
                        <td>10</td>
                        <td>Available</td>
                    </tr>
                </tbody>
            </table>

            <ModalFormComponent
                isOpen={isModalOpen}
                toggle={toggleModal}
                fields={fields}
                formData={inventoryData}
                handleInputChange={handleInputChange}
                handleSubmit={handleSubmit}
            />
        </div>
    );
};

export default Inventory;
