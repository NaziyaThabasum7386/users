  import React from 'react';
  import logo from '../../assets/logo.jpg'; // Existing logo
  import tacniqueLogo from '../../assets/tacnique-logo.svg'; // New logo

  const UserTableHeader = ({ showAddUserForm, toggleAddUserForm }) => (
    <div className="overflow-x-auto bg-cyan-100 shadow-md rounded-lg h-full w-full max-w-5xl mx-auto">
      <div className="flex flex-col min-w-full md:flex-row justify-center md:justify-between items-center p-4 md:p-2 bg-[#ecfeff] space-y-4 md:space-y-0">
        {/* Logos Section */}
        <div className="flex items-center space-x-2">
          <img src={logo} alt="Logo" className="h-9 w-10 rounded-full" />
          <img src={tacniqueLogo} alt="Tacnique Logo" className="h-9 w-20 rounded-full" />
        </div>

        {/* Title */}
        <h2 className="text-center text-xl md:text-2xl font-bold text-[rgb(23,143,157)]">
          Employee Info Sheet
        </h2>

        {/* Button to toggle Add User Form */}
        <button
          onClick={toggleAddUserForm}
          className="bg-blue-500 text-white w-full md:w-32 h-8 rounded-md"
        >
          {showAddUserForm ? 'Cancel' : 'Add User'}
        </button>
      </div>
    </div>
  );

  export default UserTableHeader;
