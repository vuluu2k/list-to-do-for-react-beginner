import React, { useState } from 'react';
import { BsPencil } from 'react-icons/bs';
import { BsTrash } from 'react-icons/bs';
import { AiOutlineArrowRight, AiOutlineArrowLeft } from 'react-icons/ai';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';

function ToDoItem({ data, onDelete, onEdit }) {
  const [show, setShow] = useState('');
  const [fieldAdd, setFieldAdd] = useState({
    name: data.name,
    completed: false,
    content: data.content,
    image_url: data.image_url,
  });

  const { name, completed, content, image_url } = fieldAdd;

  const handleClose = type => setShow('');
  const handleShow = type => setShow(type);

  const handleOnChangeInputAdd = event => setFieldAdd({ ...fieldAdd, [event.target.name]: event.target.value });

  return (
    <div className="todo-item">
      <div>{data.name}</div>
      <img src={data.image_url} alt={data.name} width="100%" />
      <div>{data.content}</div>
      <div className="todo-item-wrapper-action">
        <div className="todo-item-action" onClick={() => handleShow('edit')}>
          <BsPencil />
        </div>
        <div className="todo-item-action" onClick={() => handleShow('delete')}>
          <BsTrash />
        </div>
        <div className="todo-item-action" onClick={() => {}}>
          <AiOutlineArrowRight />
        </div>
        <div className="todo-item-action" onClick={() => {}}>
          <AiOutlineArrowLeft />
        </div>
      </div>

      <Modal show={show === 'delete'} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Thông báo</Modal.Title>
        </Modal.Header>
        <Modal.Body className="text-center">
          Bạn chắc chắn xoá <strong>{data.name}</strong>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Quay lại
          </Button>
          <Button variant="danger" onClick={onDelete}>
            Xoá ngay!
          </Button>
        </Modal.Footer>
      </Modal>

      <Modal show={show === 'edit'} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Sửa thông tin</Modal.Title>
        </Modal.Header>
        <Modal.Body className="text-center">
          <InputGroup className="mb-3">
            <InputGroup.Text id="basic-addon1">Mô tả</InputGroup.Text>
            <Form.Control
              placeholder="Mô tả"
              aria-label="Username"
              aria-describedby="basic-addon1"
              name="name"
              value={name}
              onChange={handleOnChangeInputAdd}
            />
          </InputGroup>

          <InputGroup className="mb-3">
            <InputGroup.Text id="basic-addon1">Nội dung</InputGroup.Text>
            <Form.Control
              placeholder="Nội dung"
              aria-label="Username"
              aria-describedby="basic-addon1"
              name="content"
              value={content}
              onChange={handleOnChangeInputAdd}
            />
          </InputGroup>

          <InputGroup className="mb-3">
            <InputGroup.Text id="basic-addon1">Hình ảnh</InputGroup.Text>
            <Form.Control
              placeholder="Hình ảnh"
              aria-label="Username"
              aria-describedby="basic-addon1"
              name="image_url"
              value={image_url}
              onChange={handleOnChangeInputAdd}
            />
          </InputGroup>
          <img src={fieldAdd.image_url} alt={fieldAdd.name} />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Quay lại
          </Button>
          <Button variant="danger" onClick={() => onEdit({ _id: data._id, ...fieldAdd })}>
            Sửa!
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default ToDoItem;
