import React, { useState } from 'react';
import './App.css';
import Axios from 'axios';
import { Input, Button, Table } from 'reactstrap';


function UsersTable({ users, getUsers }) {

  const [newFName, setNewFName] = useState('');
  const [newLName, setNewLName] = useState('');
  const [newEmail, setNewEmail] = useState('');

  const [editFName, setEditFName] = useState('');
  const [editLName, setEditLName] = useState('');
  const [editEmail, setEditEmail] = useState('');

  const [selected, setSelected] = useState('');
  const [isEdit, setIsEdit] = useState(false);

  const getDefault = () => {
    setSelected('');
    setIsEdit(false);
    setNewFName(''); setNewLName(''); setNewEmail('');
    setEditFName(''); setEditLName(''); setEditEmail('');
  }

  const addUser = e => {
    e.preventDefault();
    if (newFName && newLName && newEmail) {
      Axios.post('http://localhost:2000/users', { first_name: newFName, last_name: newLName, email: newEmail })
        .then(() => {
          getDefault();
          getUsers();
        })
        .catch(error => { console.log(error) });
    } else {
      alert(`Please fill the form!`);
    }
  }

  const deleteUser = e => {
    e.preventDefault();
    Axios.delete(`http://localhost:2000/users/${e.target.id}/`)
      .then(() => {
        getDefault();
        getUsers();
      })
      .catch(error => { console.log(error) });
  }

  const editForm = e => {
    setSelected(parseInt(e.target.id));
    setIsEdit(true);
  }

  const deleteForm = e => {
    setSelected(parseInt(e.target.id));
    setIsEdit(false);
  }

  const editUser = e => {
    e.preventDefault();
    Axios.put(`http://localhost:2000/users/${e.target.id}/`, { first_name: editFName, last_name: editLName, email: editEmail })
      .then(() => {
        getDefault();
        getUsers();
      })
  }

  return (
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
        {users ? users.map((user, index) => ((selected === index + 1 && isEdit) ? (
          <tr id={user.id} key={user.id}>
            <th scope="row">{index + 1}</th>
            <td><Input type="text" placeholder={user.first_name} value={editFName} onChange={e => setEditFName(e.target.value)}></Input></td>
            <td><Input type="text" placeholder={user.last_name} value={editLName} onChange={e => setEditLName(e.target.value)}></Input></td>
            <td><Input type="email" placeholder={user.email} value={editEmail} onChange={e => setEditEmail(e.target.value)}></Input></td>
            <td>
              <Button className="btn" id={user.id} onClick={editUser} color="success">SAVE</Button>
              <Button className="btn" id={user.id} onClick={e => { setSelected(''); setIsEdit(false) }}>CANCEL</Button>
            </td>
          </tr>
        ) : (selected === index + 1 && !isEdit) ? (
          <tr id={user.id} key={user.id}>
            <th scope="row">{index + 1}</th>
            <td><b>{user.first_name}</b></td>
            <td><b>{user.last_name}</b></td>
            <td><b>{user.email}</b></td>
            <td>
              <Button className="btn" id={user.id} onClick={deleteUser} color="success">YES</Button>
              <Button className="btn" id={user.id} onClick={e => { setSelected(''); setIsEdit(false) }}>NO</Button>
            </td>
          </tr>
        ) : (
              <tr id={user.id} key={user.id}>
                <th scope="row">{index + 1}</th>
                <td>{user.first_name}</td>
                <td>{user.last_name}</td>
                <td>{user.email}</td>
                <td>
                  <Button className="btn" id={user.id} onClick={editForm} color="secondary">EDIT</Button>
                  <Button className="btn" id={user.id} onClick={deleteForm} color="danger">DELETE</Button>
                </td>
              </tr>
            )
        )
        ) : null}
        {users !== null ? (
          <tr>
            <th scope="row">#</th>
            <td><Input type="text" placeholder="First Name" value={newFName} onChange={e => setNewFName(e.target.value)}></Input></td>
            <td><Input type="text" placeholder="Last Name" value={newLName} onChange={e => setNewLName(e.target.value)}></Input></td>
            <td><Input type="email" placeholder="Email Address" value={newEmail} onChange={e => setNewEmail(e.target.value)}></Input></td>
            <td><Button color="primary" onClick={addUser}>ADD</Button></td>
          </tr>
        ) : null}
      </tbody>
    </Table>
  )
}

export default UsersTable;