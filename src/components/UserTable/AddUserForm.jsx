import React, { useState } from 'react';

const AddUserForm = ({ onAddUser, onClose }) => {
  const [user, setUser] = useState({ name: '', email: '', phone: '' });

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onAddUser(user);
    setUser({ name: '', email: '', phone: '' });
  };

  return (
    <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-6 rounded shadow-lg">
        <h2 className="text-2xl font-bold mb-4">Add User</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="name"
            value={user.name}
            onChange={handleChange}
            className="border px-4 py-2 w-full mb-4"
            placeholder="Name"
            required
          />
          <input
            type="email"
            name="email"
            value={user.email}
            onChange={handleChange}
            className="border px-4 py-2 w-full mb-4"
            placeholder="Email"
            required
          />
          <input
            type="text"
            name="phone"
            value={user.phone}
            onChange={handleChange}
            className="border px-4 py-2 w-full mb-4"
            placeholder="Phone"
            required
          />
          <div className="flex justify-between">
            <button type="submit" className="bg-green-500 text-white py-2 px-4 rounded">
              Add User
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

export default AddUserForm;
