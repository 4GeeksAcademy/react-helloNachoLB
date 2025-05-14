import React, { useState } from 'react';
import { useTodos } from '../hooks/useTodos';
import '../styles/todo.css';

const Home = () => {
  const [input, setInput] = useState('');
  const {
    todos,
    addTodo,
    deleteTodo,
    toggleTodo,
    clearCompleted,
    filter,
    setFilter,
    activeCount,
    totalCount,
    FILTERS,
  } = useTodos();

  const handleSubmit = (e) => {
    e.preventDefault();
    addTodo(input);
    setInput('');
  };

  return (
    <section className="todoapp">
      <header>
        <h1>todos</h1>
        <form onSubmit={handleSubmit}>
          <input
            className="new-todo"
            placeholder="What needs to be done?"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            autoFocus
          />
        </form>
      </header>

      <ul className="todo-list">
        {todos.length === 0 ? (
          <li className="no-tasks">No hay tareas</li>
        ) : (
          todos.map((todo) => (
            <li key={todo.id} className={`task-item ${todo.completed ? 'completed' : ''}`}>
              <div className="view">
                <label>
                  <input
                    type="checkbox"
                    checked={todo.completed}
                    onChange={() => toggleTodo(todo.id)}
                  />
                  {todo.title}
                </label>
                <button className="destroy" onClick={() => deleteTodo(todo.id)}>
                  🗑️
                </button>
              </div>
            </li>
          ))
        )}
      </ul>

      <footer className="footer">
        <span className="todo-count">
          <strong>{activeCount}</strong> item{activeCount !== 1 ? 's' : ''} left
        </span>

        <div className="filters">
          {Object.values(FILTERS).map((f) => (
            <button
              key={f}
              className={filter === f ? 'selected' : ''}
              onClick={() => setFilter(f)}
            >
              {f}
            </button>
          ))}
        </div>

        <button className="clear-completed" onClick={clearCompleted}>
          Clear completed
        </button>
      </footer>
    </section>
  );
};

export default Home;