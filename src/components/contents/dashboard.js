import React, { useState } from 'react';
import '../../styles/global.css';

const Dashboard = () => {
    const [data, setData] = useState([
        { id: 1, project: 'Project Alpha', status: 'Ongoing' },
        { id: 2, project: 'Project Beta', status: 'Completed' }
    ]);
    const [showModal, setShowModal] = useState(false);
    const toggleModal = () => setShowModal(!showModal);

    const handleSubmit = (event) => {
        event.preventDefault();
        const newEntry = {
            id: data.length + 1,
            project: event.target.project.value,
            status: event.target.status.value,
        };
        setData([...data, newEntry]);
        toggleModal();
    };

    return (
        <div className="content-view">
            <button className="btn" onClick={toggleModal}>Add New Project</button>

            <table className="table mt-4">
                <thead className="thead-primary">
                    <tr>
                        <th>#</th>
                        <th>Project</th>
                        <th>Status</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map(item => (
                        <tr key={item.id}>
                            <td>{item.id}</td>
                            <td>{item.project}</td>
                            <td>{item.status}</td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {showModal && (
                <div className="modal">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title">Add New Project</h5>
                            <button className="close" onClick={toggleModal}>×</button>
                        </div>
                        <form onSubmit={handleSubmit}>
                            <div className="modal-body">
                                <label htmlFor="project">Project Name</label>
                                <input type="text" name="project" required />
                                <label htmlFor="status">Status</label>
                                <input type="text" name="status" required />
                            </div>
                            <div className="modal-footer">
                                <button type="submit" className="btn">Add</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Dashboard;
