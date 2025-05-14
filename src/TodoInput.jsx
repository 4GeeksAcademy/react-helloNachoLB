import React, { useState } from "react";

const TodoInput = ({ onAdd }) => {
  const [input, setInput] = useState("");

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      onAdd(input);
      setInput("");
    }
  };

  return (
    <input
      autoFocus
      className="new-todo"
      placeholder="What needs to be done?"
      value={input}
      onChange={(e) => setInput(e.target.value)}
      onKeyDown={handleKeyDown}
    />
  );
};

export default TodoInput;