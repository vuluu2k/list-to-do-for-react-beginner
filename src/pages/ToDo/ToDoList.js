import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './TodoList.scss';
import { Navigate } from 'react-router-dom';
import Spin from 'components/Spin';

export default function ToDoList() {
  const [jobs, setJobs] = useState([]);
  const [job, setJob] = useState('');
  const [jobEdit, setJobEdit] = useState({});
  const [isEdit, setIsEdit] = useState(false);
  const [isLogOut, setIsLogOut] = useState(false);
  const [spinning, setSpinning] = useState(false);

  useEffect(() => {
    const featchData = async () => {
      let res = await axios.get('task');
      let data = res && res.data.tasks.length > 0 ? res.data.tasks : [];
      setJobs(data);
    };
    featchData();
  }, []);

  const handleInput = e => {
    setJob(e.target.value);
  };

  let token = localStorage.getItem('jwt-token');

  const handleAddJob = async () => {
    let newJob = {
      _id: Math.floor(Math.random() * 1000),
      name: job,
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

  const handleSaveJob = async id => {
    let isEmpty = Object.keys(jobEdit).length === 0;
    setSpinning(true);

    let res = await axios.patch(`task/${id}`, jobEdit);
    if (res && !isEmpty) {
      let currentJob = [...jobs];
      let editIndex = currentJob.findIndex(item => item._id === id);
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
        <div>
          <button className="logout" onClick={handleLogOut}>
            LogOut
          </button>
        </div>
        <div className="title-todo">ToDoList</div>
        <div className="todo-task-add">
          <input type="text" onChange={handleInput} value={job} />
          &nbsp;
          <span onClick={handleAddJob}>Add</span>
        </div>
        <div className="task-list container">
          {jobs &&
            jobs.length > 0 &&
            jobs.map((item, index) => {
              return (
                <div key={index}>
                  <div className="task-todo ">
                    <span>Task{index + 1}:</span>
                    {item.name} &nbsp; &nbsp;
                    {isEdit && item._id === jobEdit._id ? (
                      <>
                        <div className="task-edit">
                          <input type="text" onChange={handleInputEdit} value={jobEdit.name} />
                        </div>
                        <div className="btn-save" onClick={() => handleSaveJob(item._id)}>
                          Save
                        </div>{' '}
                        &nbsp; &nbsp;
                      </>
                    ) : (
                      <>
                        <div className="btn-edit" onClick={() => handleEditJob(item)}>
                          Edit
                        </div>{' '}
                        &nbsp; &nbsp;
                      </>
                    )}
                    <div className="btn-delete" onClick={() => handleDelete(item._id)}>
                      Delete
                    </div>
                  </div>
                </div>
              );
            })}
        </div>
      </div>
    </Spin>
  );
}
