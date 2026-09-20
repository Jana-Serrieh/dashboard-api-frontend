import React from "react";
import UserCard from "./UserCard";

function UserList({ users, onDelete }) {
    if (users.length === 0) {
        return (
            <p className="no-users">
                No users found.
            </p>
        );
    }

    return (
        <div className="user-container">
            {users.map(user => (
                <UserCard
                    key={user.id}
                    user={user}
                    onDelete={onDelete}
                />
            ))}
        </div>
    );
}

export default UserList;