import React, { useEffect, useState } from 'react';
import axios from 'axios';
import UserTable from '../components/UserTable/UserTable';

const Home = () => {
  const [users, setUsers] = useState([]);
  const [isFormVisible, setIsFormVisible] = useState(false);

  useEffect(() => {
    axios
      .get('https://jsonplaceholder.typicode.com/users')
      .then((response) => setUsers(response.data))
      .catch((error) => console.error('Error fetching users:', error));
  }, []);
  return (
    <div className="p-8 bg-teal-200 min-h-screen">

   {/* Conditionally Render Add User Form */}
   {isFormVisible && <UserTable users={users} setUsers={setUsers} />}

{/* User Table */}
<UserTable users={users} setUsers={setUsers} />
   
    </div>
  );
};



export default Home;
