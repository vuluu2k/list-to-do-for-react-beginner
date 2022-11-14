import React, { useState } from 'react';
import { AiFillPlusCircle } from 'react-icons/ai';

import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import './AddJob.scss';

function AddJob({ handleAddJob }) {
  const [showForm, setShowForm] = useState(false);

  const [description, setDescription] = useState('');

  return (
    <div className="add-job">
      <Modal show={showForm}>
        <Modal.Header closeButton>
          <Modal.Title>Sửa thông tin</Modal.Title>
        </Modal.Header>
        <Modal.Body className="text-center">
          <InputGroup className="mb-3">
            <InputGroup.Text id="basic-addon1">Mô tả</InputGroup.Text>
            <Form.Control placeholder="Mô tả" aria-label="Username" aria-describedby="basic-addon1" name="name" />
          </InputGroup>

          <InputGroup className="mb-3">
            <InputGroup.Text id="basic-addon1">Nội dung</InputGroup.Text>
            <Form.Control placeholder="Nội dung" aria-label="Username" aria-describedby="basic-addon1" name="content" />
          </InputGroup>

          <InputGroup className="mb-3">
            <InputGroup.Text id="basic-addon1">Hình ảnh</InputGroup.Text>
            <Form.Control placeholder="Hình ảnh" aria-label="Username" aria-describedby="basic-addon1" name="image_url" />
          </InputGroup>
        </Modal.Body>

        <Modal.Footer>
          <Button variant="secondary">Quay lại</Button>
          <Button variant="primary">Sửa!</Button>
        </Modal.Footer>
      </Modal>

      <AiFillPlusCircle className="plus-btn" onClick={() => setShowForm(true)} />
    </div>
  );
}

export default AddJob;
