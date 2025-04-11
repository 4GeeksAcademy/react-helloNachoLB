import React, { useState } from "react";
import TodoInput from "./TodoInput";
import TodoList from "./TodoList";

const App = () => {
  const [todos, setTodos] = useState([
    { title: "Make the bed", id: Date.now() + 1 },
    { title: "Wash my hands", id: Date.now() + 2 },
    { title: "Eat", id: Date.now() + 3 },
    { title: "Walk the dog", id: Date.now() + 4 }
  ]);

  const addTodo = (text) => {
    if (text.trim() !== "") {
      setTodos([...todos, { title: text, id: Date.now() }]);
    }
  };

  const deleteTodo = (id) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  return (
    <div className="todoapp">
      <h1>todos</h1>
      <TodoInput onAdd={addTodo} />
      <TodoList todos={todos} onDelete={deleteTodo} />
      <footer className="footer">
        <span className="todo-count">
          <strong>{todos.length}</strong> item{todos.length !== 1 ? "s" : ""} left
        </span>
      </footer>
    </div>
  );
};

export default App;