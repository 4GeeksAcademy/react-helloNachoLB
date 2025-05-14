import React, { useState } from 'react';

const Home = () => {
  const [todos, setTodos] = useState([
    { title: 'Make the bed', id: Date.now() + 1 },
    { title: 'Wash my hands', id: Date.now() + 2 },
    { title: 'Eat', id: Date.now() + 3 },
    { title: 'Walk the dog', id: Date.now() + 4 }
  ]);

  const [taskInput, setTaskInput] = useState('');

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (taskInput.trim() === '') return;

    setTodos([
      ...todos,
      { title: taskInput, id: Date.now() }
    ]);
    setTaskInput('');
  };

  const deleteTask = (taskId) => {
    setTodos(todos.filter(task => task.id !== taskId));
  };

  return (
    <section className="todoapp">
      <header className="header">
        <h1>todos</h1>
        <form onSubmit={handleFormSubmit}>
          <input
            autoFocus
            className="new-todo"
            placeholder="What needs to be done?"
            value={taskInput}
            onChange={(e) => setTaskInput(e.target.value)}
          />
        </form>
      </header>

      <section className="main">
        <ul className="todo-list">
          {todos.length === 0 ? (
            <li className="no-tasks">No hay tareas, añadir tareas</li>
          ) : (
            todos.map(task => (
              <li key={task.id}>
                <div className="view">
                  <label>{task.title}</label>
                  <button className="destroy" onClick={() => deleteTask(task.id)}></button>
                </div>
              </li>
            ))
          )}
        </ul>
      </section>

      <footer className="footer">
        <span className="todo-count">
          <strong>{todos.length}</strong> item{todos.length !== 1 ? 's' : ''} left
        </span>
      </footer>
    </section>
  );
};

export default Home;
