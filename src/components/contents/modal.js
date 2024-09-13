// src/components/contents/DynamicFormModal.js

import React from 'react';
import { Modal, ModalHeader, ModalBody, Button, Input } from 'reactstrap';

const DynamicFormModal = ({ isOpen, toggle, fields, formData, handleInputChange, handleSubmit, customButtons }) => {
  return (
    <Modal isOpen={isOpen} toggle={toggle}>
      <ModalHeader toggle={toggle}>Create New Entry</ModalHeader>
      <ModalBody>
        {fields.map((field, index) => (
          <div key={index} className="mb-3">
            <label>{field.label}</label>
            {field.type === 'textarea' ? (
              <Input
                type="textarea"
                name={field.name}
                value={formData[field.name]}
                onChange={(e) => handleInputChange(e)}
              />
            ) : field.type === 'file' ? (
              <Input
                type="file"
                name={field.name}
                onChange={(e) => handleInputChange(e, true)}  // File field
              />
            ) : (
              <Input
                type="text"
                name={field.name}
                value={formData[field.name]}
                onChange={(e) => handleInputChange(e)}
              />
            )}
          </div>
        ))}
        {customButtons ? (
          customButtons
        ) : (
          <>
            <Button color="primary" onClick={handleSubmit}>Submit</Button>
            <Button color="secondary" onClick={toggle}>Cancel</Button>
          </>
        )}
      </ModalBody>
    </Modal>
  );
};

export default DynamicFormModal;
