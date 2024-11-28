import React from 'react';

const UserRow = ({ user, handleEdit, handleDelete }) => {
  return (
    <tr
      className="bg-[#f0fdfa] hover:bg-gray-100 transition duration-200"
    >
      <td className="border border-gray-300 px-4 py-2">{user.id}</td>
      <td className="border border-gray-300 px-4 py-2">{user.firstName}</td>
      <td className="border border-gray-300 px-4 py-2">{user.lastName}</td>
      <td className="border border-gray-300 px-4 py-2">{user.email}</td>
      <td className="border border-gray-300 px-4 py-2">{user.department}</td>
      <td className="border border-gray-300 px-4 py-2">
        <button
          onClick={() => handleEdit(user.id)}
          className="bg-yellow-500 text-white px-4 py-2 rounded mr-2 hover:bg-yellow-600"
        >
          Edit
        </button>
        <button
          onClick={() => handleDelete(user.id)}
          className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
        >
          Delete
        </button>
      </td>
    </tr>
  );
};

export default UserRow;
