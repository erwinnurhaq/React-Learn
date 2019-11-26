import React from 'react';
import { Button } from 'reactstrap';
import './App.css';

function UserList({ index, first_name, last_name, email, delUser,id }) {
    
    return (
        <tr>
            <th scope="row">{index + 1}</th>
            <td>{first_name}</td>
            <td>{last_name}</td>
            <td>{email}</td>
            <td><Button className="btn" name={id} onClick={delUser} color="danger">DELETE</Button></td>
        </tr>
    )

}

export default UserList;
