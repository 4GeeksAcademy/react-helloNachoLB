import React from "react";

const TodoList = ({ todos, onDelete }) => {
  if (todos.length === 0) {
    return <p className="no-tasks">No hay tareas, añadir tareas</p>;
  }

  return (
    <ul className="todo-list">
      {todos.map((todo) => (
        <li key={todo.id} className="task-item">
          <div className="view">
            <label>{todo.title}</label>
            <button className="destroy" onClick={() => onDelete(todo.id)}>🗑️</button>
          </div>
        </li>
      ))}
    </ul>
  );
};

export default TodoList;