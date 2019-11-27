import React, { useState } from 'react';
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';

const DropdownUser = ({ users }) => {
    const [dropdownOpen, setDropdownOpen] = useState(false);

    const toggle = () => setDropdownOpen(prevState => !prevState);

    return (
        <div>
            {users !== null ? (
                <Dropdown isOpen={dropdownOpen} toggle={toggle}>
                    <DropdownToggle caret>
                        User List Name
                    </DropdownToggle>
                    <DropdownMenu>
                        {users.map(user => (
                            <DropdownItem key={user.id}>{user.first_name} {user.last_name}</DropdownItem>
                        ))}
                    </DropdownMenu>
                </Dropdown>)
                : null}
        </div>
    );
}

export default DropdownUser;