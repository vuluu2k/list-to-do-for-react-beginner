import React, { useState } from 'react';
import { AiFillPlusCircle } from 'react-icons/ai';

import './AddJob.scss';

function AddJob({ handleAddJob }) {
  const [showForm, setShowForm] = useState(false);

  const [description, setDescription] = useState('');

  const onSubmit = event => {
    event.preventDefault();
    handleAddJob(description);
    setDescription('');
  };

  return (
    <div className="add-job">
      {showForm && (
        <div className="modal-add-job">
          <form onSubmit={onSubmit}>
            <input
              type="text"
              name="description"
              placeholder="Nhập mô tả"
              value={description}
              onChange={event => setDescription(event.target.value)}
            />

            <input style={{ marginTop: 8 }} type="submit" value="Lưu" />
          </form>
        </div>
      )}

      <AiFillPlusCircle className="plus-btn" onClick={() => setShowForm(true)} />
    </div>
  );
}

export default AddJob;
