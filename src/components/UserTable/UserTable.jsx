import React, { useState, useEffect } from 'react';
import axios from 'axios';
import logo from '../../assets/logo.jpg';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';

const UserTable = () => {
  const [users, setUsers] = useState([]);
  const [newUser, setNewUser] = useState({ firstName: '', lastName: '', email: '', department: '' });
  const [editingUserId, setEditingUserId] = useState(null);
  const [editedUser, setEditedUser] = useState({ firstName: '', lastName: '', email: '', department: '' });
  const [showAddUserForm, setShowAddUserForm] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const usersPerPage = 10;
  const [error, setError] = useState('');
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');

  // Fetch user data
  useEffect(() => {
    axios
      .get('https://jsonplaceholder.typicode.com/users')
      .then((response) => {
        const userData = response.data.map((user) => {
          const [firstName, ...lastName] = user.name.split(' ');
          return {
            id: user.id,
            firstName,
            lastName: lastName.join(' '),
            email: user.email,
            department: user.id % 2 === 0 ? 'Sales' : 'Marketing',
          };
        });
        setUsers(userData);
      })
      .catch((error) => console.error('Error fetching users:', error));
  }, []);

  // Handle add user
  const handleAddUser = () => {
    if (!newUser.firstName || !newUser.lastName || !newUser.email || !newUser.department) {
      setError('Please fill out all fields!');
      return;
    }

    // Email validation
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailRegex.test(newUser.email)) {
      setError('Please enter a valid email address!');
      return;
    }

    const id = Math.max(...users.map((user) => user.id), 0) + 1;
    setUsers([...users, { id, ...newUser }]);
    setNewUser({ firstName: '', lastName: '', email: '', department: '' });
    setShowAddUserForm(false);
    setError('');
    setSnackbarMessage('User added successfully!');
    setSnackbarOpen(true);
  };

  // Handle edit action
  const handleEdit = (id) => {
    const userToEdit = users.find((user) => user.id === id);
    setEditedUser(userToEdit);
    setEditingUserId(id);
  };

  // Handle edit form input changes
  const handleEditInputChange = (field, value) => {
    setEditedUser({ ...editedUser, [field]: value });
  };

  // Handle save edited user
  const handleSaveEdit = () => {
    if (!editedUser.firstName || !editedUser.lastName || !editedUser.email || !editedUser.department) {
      setError('Please fill out all fields!');
      return;
    }

    // Email validation
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailRegex.test(editedUser.email)) {
      setError('Please enter a valid email address!');
      return;
    }

    setUsers(users.map((user) => (user.id === editingUserId ? editedUser : user)));
    setEditingUserId(null);
    setError('');
    setSnackbarMessage('User updated successfully!');
    setSnackbarOpen(true);
  };

  // Handle delete action
  const handleDelete = (id) => {
    if (window.confirm(`Are you sure you want to delete user with ID: ${id}?`)) {
      setUsers(users.filter((user) => user.id !== id));
      setSnackbarMessage('User deleted successfully!');
      setSnackbarOpen(true);
    }
  };

  // Get current users based on pagination
  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = users.slice(indexOfFirstUser, indexOfLastUser);

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // Calculate total number of pages
  const totalPages = Math.ceil(users.length / usersPerPage);

  // Snackbar close handler
  const handleCloseSnackbar = () => {
    setSnackbarOpen(false);
  };

  return (
    <div className="overflow-x-auto bg-cyan-100 shadow-md rounded-lg h-full w-full mx-auto">
      <div className="flex justify-between min-w-full p-2 bg-violet-300 h-12">
        <img src={logo} alt="Logo" className="h-9 w-10 mr-4 rounded-full" />
        <h2 className="text-2xl font-bold mb-4 h-9 w-full text-center">User Table</h2>
        <button
          onClick={() => setShowAddUserForm(!showAddUserForm)}
          className="bg-blue-500 text-white w-32 h-8 rounded-md"
        >
          {showAddUserForm ? 'Cancel' : 'Add User'}
        </button>
      </div>

      {error && <p className="text-red-500 text-center">{error}</p>}

      {showAddUserForm && (
        <div className="mb-6">
          <h3 className="text-lg font-medium mb-2">Add New User</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <input
              type="text"
              placeholder="First Name"
              value={newUser.firstName}
              onChange={(e) => setNewUser({ ...newUser, firstName: e.target.value })}
              className="border rounded px-3 py-2"
            />
            <input
              type="text"
              placeholder="Last Name"
              value={newUser.lastName}
              onChange={(e) => setNewUser({ ...newUser, lastName: e.target.value })}
              className="border rounded px-3 py-2"
            />
            <input
              type="email"
              placeholder="Email"
              value={newUser.email}
              onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
              className="border rounded px-3 py-2"
            />
            <input
              type="text"
              placeholder="Department"
              value={newUser.department}
              onChange={(e) => setNewUser({ ...newUser, department: e.target.value })}
              className="border rounded px-3 py-2"
            />
          </div>
          <button onClick={handleAddUser} className="bg-green-500 text-white px-4 py-2 rounded mt-4">
            Add User
          </button>
        </div>
      )}

      {editingUserId && (
        <div className="mb-6">
          <h3 className="text-lg font-medium mb-2">Edit User</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <input
              type="text"
              placeholder="First Name"
              value={editedUser.firstName}
              onChange={(e) => handleEditInputChange('firstName', e.target.value)}
              className="border rounded px-3 py-2"
            />
            <input
              type="text"
              placeholder="Last Name"
              value={editedUser.lastName}
              onChange={(e) => handleEditInputChange('lastName', e.target.value)}
              className="border rounded px-3 py-2"
            />
            <input
              type="email"
              placeholder="Email"
              value={editedUser.email}
              onChange={(e) => handleEditInputChange('email', e.target.value)}
              className="border rounded px-3 py-2"
            />
            <input
              type="text"
              placeholder="Department"
              value={editedUser.department}
              onChange={(e) => handleEditInputChange('department', e.target.value)}
              className="border rounded px-3 py-2"
            />
          </div>
          <button onClick={handleSaveEdit} className="bg-blue-500 text-white px-4 py-2 rounded mt-4">
            Save Changes
          </button>
        </div>
      )}

      <table className="min-w-full table-auto">
        <thead>
          <tr className="bg-gray-100">
            <th className="py-2 px-4 text-left">ID</th>
            <th className="py-2 px-4 text-left">First Name</th>
            <th className="py-2 px-4 text-left">Last Name</th>
            <th className="py-2 px-4 text-left">Email</th>
            <th className="py-2 px-4 text-left">Department</th>
            <th className="py-2 px-4 text-left">Actions</th>
          </tr>
        </thead>
        <tbody>
          {currentUsers.map((user) => (
            <tr key={user.id} className="bg-white">
              <td className="py-2 px-4">{user.id}</td>
              <td className="py-2 px-4">{user.firstName}</td>
              <td className="py-2 px-4">{user.lastName}</td>
              <td className="py-2 px-4">{user.email}</td>
              <td className="py-2 px-4">{user.department}</td>
              <td className="py-2 px-4">
                <button
                  onClick={() => handleEdit(user.id)}
                  className="bg-yellow-500 text-white px-4 py-2 rounded mr-2"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(user.id)}
                  className="bg-red-500 text-white px-4 py-2 rounded"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
{/* Pagination */}
<div className="flex justify-center mt-4">
  <button
    onClick={() => paginate(currentPage - 1)}
    disabled={currentPage === 1}
    className={`px-4 py-2 rounded-l ${currentPage === 1 ? 'bg-gray-500' : 'bg-blue-500'}`}
  >
    Previous
  </button>
  <span className="px-4 py-2">{currentPage} / {totalPages}</span>
  <button
    onClick={() => paginate(currentPage + 1)}
    disabled={currentPage === totalPages}
    className={`px-4 py-2 rounded-r ${currentPage === totalPages ? 'bg-gray-500' : 'bg-blue-500'}`}
  >
    Next
  </button>
</div>

      {/* Snackbar */}
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
      >
        <MuiAlert elevation={6} variant="filled" severity="success">
          {snackbarMessage}
        </MuiAlert>
      </Snackbar>
    </div>
  );
};

export default UserTable;