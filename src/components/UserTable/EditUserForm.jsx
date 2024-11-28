import React, { useState } from 'react';

const EditUserForm = ({ editedUser, handleEditInputChange, handleSaveEdit }) => {
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};

    // Check if all fields are filled
    Object.keys(editedUser).forEach((field) => {
      if (!editedUser[field]) {
        newErrors[field] = `${field.charAt(0).toUpperCase() + field.slice(1)} is required`;
      }
    });

    // Check if email is valid
    if (editedUser.email && !/\S+@\S+\.\S+/.test(editedUser.email)) {
      newErrors.email = 'Please enter a valid email';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (validateForm()) {
      handleSaveEdit();
    }
  };

  return (
    <div className="mb-6">
      <h3 className="text-lg font-medium mb-2">Edit User</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {Object.keys(editedUser).map((field) => (
          <div key={field} className="relative">
            <input
              type="text"
              placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
              value={editedUser[field]}
              onChange={(e) => handleEditInputChange(field, e.target.value)}
              className={`border rounded px-3 py-2 w-full ${errors[field] ? 'border-red-500' : ''}`}
            />
            {errors[field] && <span className="text-red-500 text-sm absolute right-3 bottom-2">{errors[field]}</span>}
          </div>
        ))}
      </div>
      <button
        onClick={handleSubmit}
        className="bg-blue-500 text-white px-4 py-2 rounded mt-4"
      >
        Save Changes
      </button>
    </div>
  );
};

export default EditUserForm;
