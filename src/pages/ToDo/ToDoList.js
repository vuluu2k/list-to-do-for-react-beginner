import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Navigate } from 'react-router-dom';
import { AiOutlineLogout } from 'react-icons/ai';

import './TodoList.scss';
import Spin from 'components/Spin';
import AddJob from 'components/AddJob';
import ArrayToDo from 'components/ArrayToDo';

export default function ToDoList() {
  const [jobs, setJobs] = useState([]);
  const [isLogOut, setIsLogOut] = useState(false);
  const [spinning, setSpinning] = useState(false);
  const [groups, setGroups] = useState([]);

  useEffect(() => {
    loadToken();
    loadListGroups();
  }, []);

  const loadToken = () => {
    const token = localStorage.getItem('jwt-todo');
    axios.defaults.headers.common = { Authorization: `bearer ${token}` };
  };

  const loadListGroups = async () => {
    setSpinning(true);
    try {
      const { data } = await axios.get('task/group');
      if (data.success) setGroups(data.groups);
    } catch (error) {
      console.log(error);
      return error;
    }
    setSpinning(false);
  };

  const handleAddJob = async description => {
    let newJob = {
      name: description,
      completed: false,
      content: 'CRUD FastAPI , ReactJs, MongoDB',
      image_url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQb-oKFFYpkJj1_6vGlDVlKFjuRIfcDIa4qhbFlDHA3TA&s',
    };

    if (!newJob.name) {
      alert('Please enter a job name!');
      return;
    } else {
      setSpinning(true);
      let res = await axios.post('task/', newJob);
      if (res) {
        setJobs([...jobs, newJob]);
      }
    }
    setSpinning(false);
  };

  const handleDelete = async id => {
    let currentJob = [...jobs];
    setSpinning(true);
    let res = await axios.delete(`task/${id}`);
    if (res) {
      currentJob = currentJob.filter(item => item._id !== id);
      setJobs(currentJob);
    }
    setSpinning(false);
  };

  const handleSaveJob = async ({ _id, name, content, image_url, completed }) => {
    const jobEdit = { name, content, image_url, completed };
    let isEmpty = Object.keys(jobEdit).length === 0;
    setSpinning(true);

    let res = await axios.patch(`task/${_id}`, jobEdit);
    if (res && !isEmpty) {
      let currentJob = [...jobs];
      let editIndex = currentJob.findIndex(item => item._id === _id);
      currentJob[editIndex].name = jobEdit.name;
      setJobs(currentJob);
    }

    setSpinning(false);
  };

  const handleLogOut = () => {
    setIsLogOut(true);
  };

  return (
    <Spin spinning={spinning}>
      {isLogOut && <Navigate to="/" replace={true} />}

      <div className="container-todo">
        {groups.map((group, idx) => {
          return <ArrayToDo key={idx} group={group} handleDelete={handleDelete} handleSaveJob={handleSaveJob} tasks={jobs} />;
        })}
        {/* fixed */}
        <button className="logout" onClick={handleLogOut}>
          <AiOutlineLogout />
        </button>

        <AddJob handleAddJob={handleAddJob} />
      </div>
    </Spin>
  );
}
