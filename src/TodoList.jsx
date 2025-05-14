import React from "react";

const TodoList = ({ todos, onDelete, onToggle }) => {
  if (todos.length === 0) {
    return <p className="no-tasks">No hay tareas, añadir tareas</p>;
  }

  return (
    <ul className="todo-list">
      {todos.map((todo) => (
        <li key={todo.id} className={`task-item ${todo.completed ? "completed" : ""}`}>
          <div className="view">
            <label>
              <input
                type="checkbox"
                checked={todo.completed}
                onChange={() => onToggle(todo.id)}
              />
              {todo.title}
            </label>
            <button
              className="destroy"
              onClick={() => onDelete(todo.id)}
              aria-label={`Eliminar ${todo.title}`}
            >
              🗑️
            </button>
          </div>
        </li>
      ))}
    </ul>
  );
};

export default TodoList;
