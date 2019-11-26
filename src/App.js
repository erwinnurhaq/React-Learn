import React, { useState } from 'react';
import './App.css';
import Axios from 'axios';
import UserList from './UserList';
import { Form, Input, Button, Table } from 'reactstrap';


function App() {

  const [users, setUsers] = useState([]);

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

  const [newFName, setNewFName] = useState('');
  const [newLName, setNewLName] = useState('');
  const [newEmail, setNewEmail] = useState('');

  const addUser = (e) => {
    e.preventDefault();
    Axios.post('http://localhost:2000/users', { first_name: newFName, last_name: newLName, email: newEmail })
      .then(() => {
        getUsers();
        setNewFName('');
        setNewLName('');
        setNewEmail('');
      })
      .catch(error => { console.log(error) });
  }

  const deleteUser = e => {
    e.preventDefault();
    Axios.delete(`http://localhost:2000/users/${e.target.name}/`)
      .then(() => {
        getUsers();
      })
      .catch(error => { console.log(error) });
  }

  return (
    <div className="container">
      <Button className="btn" onClick={getUsers}>GET INITIAL DATA</Button>
      <Form className="form-box text-center" onSubmit={addUser}>
        <Input type="text" placeholder="First Name" value={newFName} onChange={e => setNewFName(e.target.value)}></Input>
        <Input type="text" placeholder="Last Name" value={newLName} onChange={e => setNewLName(e.target.value)}></Input>
        <Input type="email" placeholder="Email Address" value={newEmail} onChange={e => setNewEmail(e.target.value)}></Input>
        <Button type="submit" className="btn" color="primary">ADD</Button>
      </Form>
      <Table className="table-user">
        <thead>
          <tr>
            <th>#</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Email</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user, index) => (
            <UserList key={index} index={index} first_name={user.first_name} last_name={user.last_name} email={user.email} delUser={deleteUser} id={user.id}/>
          ))}
        </tbody>
      </Table>
    </div >
  )

}

export default App;
