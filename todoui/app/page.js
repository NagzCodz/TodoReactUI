'use client';

import './globals.css'; // Adjust path as needed
import { useState, useEffect } from 'react';
import TodoTable from '../components/TodoTable'; // adjust path accordingly

export default function Page() {
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    fetch('http://localhost:8080/api/todos')
      .then((res) => res.json())
      .then((data) => setTodos(data))
      .catch((err) => console.error('Failed to fetch todos:', err));
  }, []);

  const toggleComplete = async (id, title, completed) => {
    try {
      await fetch(`http://localhost:8080/api/todos/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ title, completed }),
      });

      // update local state to reflect UI changes immediately
      setTodos((prev) =>
        prev.map((todo) =>
          todo.id === id ? { ...todo, completed } : todo
        )
      );
    } catch (err) {
      console.error('Failed to toggle todo:', err);
    }
  };

  const addTodo = async () => {
    const newTodo = { title: 'New Todo', completed: false };
    try {
      const response = await fetch('http://localhost:8080/api/todos', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newTodo),
      });
      const addedTodo = await response.json();
      setTodos((prev) => [...prev, addedTodo]);
    } catch (err) {
      console.error('Failed to add todo:', err);
    }
  };

  const deleteTodo = async (id) => {
    try {
      await fetch(`http://localhost:8080/api/todos/${id}`, { method: 'DELETE' });
      setTodos((prev) => prev.filter((todo) => todo.id !== id));
    } catch (err) {
      console.error('Failed to delete todo:', err);
    }
  };

  const editTodo = async (id, title) => {
    try {
      await fetch(`http://localhost:8080/api/todos/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title }),
      });
      setTodos((prev) =>
        prev.map((todo) => (todo.id === id ? { ...todo, title } : todo))
      );
    } catch (err) {
      console.error('Failed to update todo:', err);
    }
  };

  return (
    <TodoTable
      todos={todos}
      onToggleComplete={toggleComplete}
      onAddTodo={addTodo}
      onDeleteTodo={deleteTodo}
      onEditTodo={editTodo}
    />
  );
}
