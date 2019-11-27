import React from 'react';
import './App.css';
import {
    Card, CardText, CardBody,
    CardTitle, CardSubtitle, Button
} from 'reactstrap';

const CardList = ({ users }) => {
    return (
        <div className="card-list">
            {users !== null ? users.map(user => (
                <Card className="card-item" key={user.id}>
                    <CardBody>
                        <CardTitle>{user.first_name} {user.last_name}</CardTitle>
                        <CardSubtitle>{user.email}</CardSubtitle>
                        <CardText>Here is descriptiorn about me</CardText>
                        <Button>See Full Profile</Button>
                    </CardBody>
                </Card>
            )) : null}
        </div>
    );
};

export default CardList;