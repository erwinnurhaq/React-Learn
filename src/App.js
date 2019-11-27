import React, { useState } from 'react';
import './App.css';
import Axios from 'axios';
import { Button } from 'reactstrap';
import UsersTable from './UsersTable';
import CardList from './CardList';
import DropdownUser from './Dropdown';

//-------------------------------
function App() {

  const [users, setUsers] = useState(null);

  const getUsers = () => {
    Axios.get('http://localhost:2000/users')
      .then(resp => {
        setUsers(resp.data);
        resp.data.forEach(user => {
          console.log(`${user.first_name}, ${user.last_name}, ${user.email}`);
        });
      })
      .catch(error => {
        console.log(error);
      });
  }

  return (
    <div className="container">
      <Button className="btn" onClick={getUsers} color="warning">GET INITIAL DATA</Button>
      <br />
      <h1>User Dropdown</h1>
      <DropdownUser users={users} />
      <br />
      <h1>User Table</h1>
      <UsersTable users={users} getUsers={getUsers} />
      <br />
      <h1>User Card</h1>
      <CardList users={users} />
      <br />
    </div >
  )
}

export default App;
//-------------------------------
