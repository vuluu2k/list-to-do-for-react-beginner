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
  const [job, setJob] = useState('');
  const [jobEdit, setJobEdit] = useState({});
  const [isEdit, setIsEdit] = useState(false);
  const [isLogOut, setIsLogOut] = useState(false);
  const [spinning, setSpinning] = useState(false);

  useEffect(() => {
    const featchData = async () => {
      setSpinning(true);
      try {
        let res = await axios.get('task');
        let data = res && res.data.tasks.length > 0 ? res.data.tasks : [];
        setJobs(data);
      } catch (error) {
        console.log(error);
      }
      setSpinning(false);
    };
    featchData();
  }, []);

  const handleInput = e => {
    setJob(e.target.value);
  };

  let token = localStorage.getItem('jwt-token');

  const handleAddJob = async description => {
    let newJob = {
      name: description,
      completed: false,
      content: 'CRUD FastAPI , ReactJs, MongoDB',
      image_url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQb-oKFFYpkJj1_6vGlDVlKFjuRIfcDIa4qhbFlDHA3TA&s',
    };
    axios.defaults.headers.common = { Authorization: `bearer ${token}` };

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
    setJob('');
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

  const handleEditJob = item => {
    console.log(item._id);
    setIsEdit(true);
    setJobEdit(item);
  };

  const handleInputEdit = e => {
    let jobEditCopy = { ...jobEdit };
    jobEditCopy.name = e.target.value;
    setJobEdit(jobEditCopy);
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
      setIsEdit(false);
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
        <ArrayToDo handleDelete={handleDelete} handleSaveJob={handleSaveJob} tasks={jobs} />
        <ArrayToDo tasks={jobs} />
        <ArrayToDo tasks={jobs} />
        <ArrayToDo tasks={jobs} />
        <ArrayToDo tasks={jobs} />
        <ArrayToDo tasks={jobs} />

        {/* fixed */}
        <button className="logout" onClick={handleLogOut}>
          <AiOutlineLogout />
        </button>

        <AddJob handleAddJob={handleAddJob} />
      </div>
    </Spin>
  );
}
