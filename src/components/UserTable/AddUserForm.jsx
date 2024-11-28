import React, { useState } from 'react';

const AddUserForm = ({ newUser, handleChange, handleAddUser }) => {
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};

    // Check if all fields are filled
    Object.keys(newUser).forEach((field) => {
      if (!newUser[field]) {
        newErrors[field] = `${field.charAt(0).toUpperCase() + field.slice(1)} is required`;
      }
    });

    // Check if email is valid
    if (newUser.email && !/\S+@\S+\.\S+/.test(newUser.email)) {
      newErrors.email = 'Please enter a valid email';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (validateForm()) {
      handleAddUser();
    }
  };

  return (
    <div className="mb-16">
      <h3 className="text-lg font-medium mb-2">Add New User</h3>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {Object.keys(newUser).map((field) => (
          <div key={field} className="relative">
            <input
              type="text"
              placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
              value={newUser[field]}
              onChange={(e) => handleChange(field, e.target.value)}
              className={`border rounded px-3 py-2 w-full ${errors[field] ? 'border-red-500' : ''}`}
            />
            {errors[field] && <span className="text-red-500 text-sm absolute right-3 bottom-2">{errors[field]}</span>}
          </div>
        ))}
      </div>
      
      <button
        onClick={handleSubmit}
        className="bg-green-500 text-white px-4 py-2 rounded mt-4"
      >
        Add User
      </button>
    </div>
  );
};

export default AddUserForm;
