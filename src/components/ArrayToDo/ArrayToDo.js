import React from 'react';

import ToDoItem from './ToDoItem';
import './ArrayToDo.scss';

function ArrayToDo({ tasks }) {
  console.log(tasks);

  return (
    <div className="array-todo-wrapper">
      <header className="array-todo-title">Đang làm</header>
      <div className="array-todo">
        {tasks.map((item, idx) => {
          return <ToDoItem key={idx} data={item} />;
        })}
      </div>
    </div>
  );
}

export default ArrayToDo;
