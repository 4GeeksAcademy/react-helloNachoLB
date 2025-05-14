import React, { useEffect, useState } from "react";
import TodoInput from "./TodoInput";
import TodoList from "./TodoList";

const FILTERS = {
  ALL: "all",
  ACTIVE: "active",
  COMPLETED: "completed",
};

const App = () => {
  const [todos, setTodos] = useState(() => {
    const saved = localStorage.getItem("todos");
    return saved ? JSON.parse(saved) : [];
  });

  const [filter, setFilter] = useState(FILTERS.ALL);

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  const addTodo = (text) => {
    if (text.trim() !== "") {
      setTodos([
        ...todos,
        { id: Date.now(), title: text, completed: false },
      ]);
    }
  };

  const deleteTodo = (id) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  const toggleCompleted = (id) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const filteredTodos = todos.filter((todo) => {
    if (filter === FILTERS.ACTIVE) return !todo.completed;
    if (filter === FILTERS.COMPLETED) return todo.completed;
    return true;
  });

  return (
    <div className="todoapp">
      <h1>todos</h1>
      <TodoInput onAdd={addTodo} />
      <TodoList
        todos={filteredTodos}
        onDelete={deleteTodo}
        onToggle={toggleCompleted}
      />

      <footer className="footer">
        <span className="todo-count">
          <strong>{todos.filter((t) => !t.completed).length}</strong>{" "}
          item{todos.length !== 1 ? "s" : ""} left
        </span>

        <div className="filters">
          {Object.entries(FILTERS).map(([key, value]) => (
            <button
              key={key}
              onClick={() => setFilter(value)}
              className={filter === value ? "selected" : ""}
            >
              {value}
            </button>
          ))}
        </div>
      </footer>
    </div>
  );
};

export default App;
