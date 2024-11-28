import React, { useState, useEffect } from "react";
import axios from "axios";
import UserTableHeader from "./UserTableHeader";
import AddUserForm from "./AddUserForm";
import EditUserForm from "./EditUserForm";
import UserRow from "./UserRow";
import Pagination from "./Pagination";
import SnackbarAlert from "./SnackbarAlert";

const UserTable = () => {
  const [users, setUsers] = useState([]);
  const [showAddUserForm, setShowAddUserForm] = useState(false);
  const [newUser, setNewUser] = useState({
    firstName: "",
    lastName: "",
    email: "",
    department: "",
  });
  const [editedUser, setEditedUser] = useState(null);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [error, setError] = useState(""); // State to hold the error message
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 9;

  const [nextUserId, setNextUserId] = useState(1); // To keep track of the next sequential ID

  // Fetch user data with error handling
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get("https://jsonplaceholder.typicode.com/users");
        const userData = response.data.map((user) => {
          const [firstName, ...lastName] = user.name.split(" ");
          return {
            id: user.id,
            firstName,
            lastName: lastName.join(" "),
            email: user.email,
            department: user.id % 2 === 0 ? "Sales" : "Marketing",
          };
        });
        setUsers(userData);

        // Set the next sequential user ID based on the highest current ID
        const maxId = userData.reduce((max, user) => (user.id > max ? user.id : max), 0);
        setNextUserId(maxId + 1);
      } catch (error) {
        setError("Failed to load users. Please try again later.");
        setSnackbarMessage("Error fetching user data");
        setSnackbarOpen(true); // Open the Snackbar alert on error
      }
    };

    fetchUsers();
  }, []);

  const toggleAddUserForm = () => setShowAddUserForm(!showAddUserForm);

  const handleAddUserChange = (field, value) => {
    setNewUser((prev) => ({ ...prev, [field]: value }));
  };

  const handleAddUser = () => {
    if (newUser.firstName && newUser.email) {
      const userToAdd = { ...newUser, id: nextUserId };
      setUsers([...users, userToAdd]);
      setNewUser({ firstName: "", lastName: "", email: "", department: "" });
      setNextUserId(nextUserId + 1); // Increment the next user ID
      setSnackbarMessage("User added successfully!");
      setSnackbarOpen(true);
      setShowAddUserForm(false);
    }
  };

  const handleEdit = (id) => {
    const userToEdit = users.find((user) => user.id === id);
    setEditedUser(userToEdit);
  };

  const handleEditInputChange = (field, value) => {
    setEditedUser((prev) => ({ ...prev, [field]: value }));
  };

  const handleSaveEdit = () => {
    setUsers(users.map((user) => (user.id === editedUser.id ? editedUser : user)));
    setEditedUser(null);
    setSnackbarMessage("User updated successfully!");
    setSnackbarOpen(true);
  };

  const handleDelete = (id) => {
    setUsers(users.filter((user) => user.id !== id));
    setSnackbarMessage("User deleted successfully!");
    setSnackbarOpen(true);
  };

  const paginate = (page) => setCurrentPage(page);

  const closeSnackbar = () => setSnackbarOpen(false);

  const indexOfLastUser = currentPage * itemsPerPage;
  const indexOfFirstUser = indexOfLastUser - itemsPerPage;
  const currentUsers = users.slice(indexOfFirstUser, indexOfLastUser);

  return (
    <div className="flex justify-center items-center flex-col w-full">
      <div className=" w-[100%] bg-cyan-100 p-4 rounded shadow-md">
        {/* Header */}
        <UserTableHeader
          showAddUserForm={showAddUserForm}
          toggleAddUserForm={toggleAddUserForm}
        />

        {/* Add User Form */}
        {showAddUserForm && (
          <AddUserForm
            newUser={newUser}
            handleChange={handleAddUserChange}
            handleAddUser={handleAddUser}
          />
        )}

        {/* Edit User Form */}
        {editedUser && (
          <EditUserForm
            editedUser={editedUser}
            handleEditInputChange={handleEditInputChange}
            handleSaveEdit={handleSaveEdit}
          />
        )}

        {/* User Table */}
        <table className="table-auto border-collapse border border-gray-300 w-full max-w-5xl mx-auto">
          <thead>
            <tr className="bg-[#99f6e4]">
              <th className="border border-gray-300 px-4 py-2">ID</th>
              <th className="border border-gray-300 px-4 py-2">First Name</th>
              <th className="border border-gray-300 px-4 py-2">Last Name</th>
              <th className="border border-gray-300 px-4 py-2">Email</th>
              <th className="border border-gray-300 px-4 py-2">Department</th>
              <th className="border border-gray-300 px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {currentUsers.map((user) => (
              <UserRow
                key={user.id}
                user={user}
                handleEdit={handleEdit}
                handleDelete={handleDelete}
              />
            ))}
          </tbody>
        </table>

        {/* Pagination */}
        {users.length > itemsPerPage && (
          <Pagination
            currentPage={currentPage}
            totalPages={Math.ceil(users.length / itemsPerPage)}
            paginate={paginate}
          />
        )}

        {/* Snackbar for success or error message */}
        <SnackbarAlert
          open={snackbarOpen}
          message={error || snackbarMessage} // Display error message or success message
          severity={error ? "error" : "success"} // Set severity to "error" for error messages
          onClose={closeSnackbar}
        />
      </div>
    </div>
  );
};

export default UserTable;
