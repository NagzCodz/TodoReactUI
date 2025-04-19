import React, { useState } from 'react';

const TodoTable = ({ todos, onToggleComplete, onAddTodo, onDeleteTodo, onEditTodo }) => {
  const [isEditing, setIsEditing] = useState(null); // To track which todo is being edited
  const [editedTitle, setEditedTitle] = useState('');

  const handleEdit = (todo) => {
    setIsEditing(todo.id);
    setEditedTitle(todo.title);
  };

  const handleSave = (id) => {
    if (editedTitle.trim() !== '') {
      onEditTodo(id, editedTitle);
      setIsEditing(null);
      setEditedTitle('');
    }
  };

  return (
    <div className="flex flex-col items-center mt-10">
      <div className="relative flex flex-col w-3/4"> {/* Set width to 75% */}
        <table className="min-w-full border-collapse border border-gray-300 shadow-lg">
          <thead>
            <tr className="bg-gray-100">
              <th className="border px-4 py-2 text-left">Title</th>
              <th className="border px-4 py-2 text-left">Completed</th>
              <th className="border px-4 py-2 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {todos.map((todo) => (
              <tr key={todo.id} className="hover:bg-gray-50">
                <td className="border px-4 py-2">
                  {isEditing === todo.id ? (
                    <input
                      type="text"
                      value={editedTitle}
                      onChange={(e) => setEditedTitle(e.target.value)}
                      className="border px-2 py-1"
                    />
                  ) : (
                    todo.title || <i>(No title)</i>
                  )}
                </td>
                <td className="border px-4 py-2">
                  <input
                    type="checkbox"
                    checked={todo.completed}
                    onChange={() => onToggleComplete(todo.id, todo.title, !todo.completed)}
                  />
                </td>
                <td className="border px-4 py-2 space-x-2">
                  {isEditing === todo.id ? (
                    <button
                      onClick={() => handleSave(todo.id)}
                      className="bg-green-500 text-white px-3 py-1 rounded"
                    >
                      Save
                    </button>
                  ) : (
                    <button
                      onClick={() => handleEdit(todo)}
                      className="bg-blue-500 text-white px-3 py-1 rounded"
                    >
                      Edit
                    </button>
                  )}
                  <button
                    onClick={() => onDeleteTodo(todo.id)}
                    className="bg-red-500 text-white px-3 py-1 rounded"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Add Todo Button positioned at the bottom-left of the table */}
        <div className="absolute bottom-[-80px] left-0 p-4">
          <button
            onClick={onAddTodo}
            className="bg-green-500 text-white px-4 py-2 rounded-full"
          >
            Add Todo
          </button>
        </div>
      </div>
    </div>
  );
};

export default TodoTable;
