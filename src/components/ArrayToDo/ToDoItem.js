import React from 'react';

function ToDoItem({ data }) {
  return (
    <div className="todo-item">
      <div>{data.name}</div>
      <img src={data.image_url} alt={data.name} />
      <div>{data.content}</div>
    </div>
  );
}

export default ToDoItem;
