import { useState, useEffect } from 'react';

const API_URL = 'https://api.example.com/todos/Nacho';

export const useTodos = () => {
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');

  const fetchTodos = async () => {
    setLoading(true);
    try {
      const res = await fetch(API_URL);
      if (res.status === 404) {
        // No existe la agenda → crearla
        await fetch('https://api.example.com/todos', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ user: 'Nacho', todos: [] }),
        });
        setTodos([]);
      } else if (res.ok) {
        const data = await res.json();
        setTodos(data.todos);
      } else {
        throw new Error('Error al obtener tareas');
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  const syncTodos = async (newTodos) => {
    setTodos(newTodos);
    await fetch(API_URL, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ todos: newTodos }),
    });
  };

  const addTodo = async (title) => {
    if (title.trim() === '') return;
    const newTodos = [...todos, { id: Date.now(), title, completed: false }];
    await syncTodos(newTodos);
  };

  const deleteTodo = async (id) => {
    const newTodos = todos.filter(todo => todo.id !== id);
    await syncTodos(newTodos);
  };

  const toggleTodo = async (id) => {
    const newTodos = todos.map(todo =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    );
    await syncTodos(newTodos);
  };

  const clearCompleted = async () => {
    const newTodos = todos.filter(todo => !todo.completed);
    await syncTodos(newTodos);
  };

  const filteredTodos = todos.filter(todo => {
    if (filter === 'active') return !todo.completed;
    if (filter === 'completed') return todo.completed;
    return true;
  });

  const activeCount = todos.filter(t => !t.completed).length;

  return {
    todos: filteredTodos,
    addTodo,
    deleteTodo,
    toggleTodo,
    clearCompleted,
    filter,
    setFilter,
    activeCount,
    totalCount: todos.length,
    loading,
  };
};
