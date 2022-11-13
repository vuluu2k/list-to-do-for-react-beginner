import React from 'react';

import ToDoItem from './ToDoItem';
import './ArrayToDo.scss';

function ArrayToDo({ tasks, handleDelete, handleSaveJob }) {
  console.log(tasks);

  return (
    <div className="array-todo-wrapper">
      <header className="array-todo-title">Đang làm ({tasks.length})</header>
      <div className="array-todo">
        {tasks.map((item, idx) => {
          return <ToDoItem key={idx} data={item} onDelete={() => handleDelete(item._id)} onEdit={handleSaveJob} />;
        })}
      </div>
    </div>
  );
}

export default ArrayToDo;
