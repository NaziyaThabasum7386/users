import React from 'react';

const UserActions = ({ user, onEdit, onDelete }) => {
  return (
    <div className="flex space-x-2">
      <button
        onClick={() => onEdit(user)}
        className="bg-yellow-500 text-white py-1 px-3 rounded"
      >
        Edit
      </button>
      <button
        onClick={() => onDelete(user.id)}
        className="bg-red-500 text-white py-1 px-3 rounded"
      >
        Delete
      </button>
    </div>
  );
};

export default UserActions;
