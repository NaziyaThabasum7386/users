import React, { useState, useEffect } from 'react';

const EditUserForm = ({ user, onSave, onClose }) => {
  const [editedUser, setEditedUser] = useState(user);

  useEffect(() => {
    setEditedUser(user);
  }, [user]);

  const handleChange = (e) => {
    setEditedUser({ ...editedUser, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(editedUser);
  };

  return (
    <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-6 rounded shadow-lg">
        <h2 className="text-2xl font-bold mb-4">Edit User</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="name"
            value={editedUser.name}
            onChange={handleChange}
            className="border px-4 py-2 w-full mb-4"
            placeholder="Name"
            required
          />
          <input
            type="email"
            name="email"
            value={editedUser.email}
            onChange={handleChange}
            className="border px-4 py-2 w-full mb-4"
            placeholder="Email"
            required
          />
          <input
            type="text"
            name="phone"
            value={editedUser.phone}
            onChange={handleChange}
            className="border px-4 py-2 w-full mb-4"
            placeholder="Phone"
            required
          />
          <div className="flex justify-between">
            <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded">
              Save Changes
            </button>
            <button type="button" onClick={onClose} className="bg-red-500 text-white py-2 px-4 rounded">
              Close
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditUserForm;
