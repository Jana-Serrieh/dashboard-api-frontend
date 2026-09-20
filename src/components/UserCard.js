import React from "react";

function UserCard({ user, onDelete }) {
    const companyName = typeof user.company === 'object' && user.company !== null
        ? user.company.name
        : user.company;

    return (
        <div className="user-card">
            <h3>{user.name}</h3>
            <p>Email: {user.email}</p>
            <p>Company: {companyName}</p>
            <p>Posts: {user.postCount}</p>
            <button
                onClick={() => onDelete(user.id)}
                style={{
                    background: "#ef4444",
                    color: "white",
                    border: "none",
                    padding: "8px 12px",
                    borderRadius: "6px",
                    cursor: "pointer",
                    marginTop: "10px"
                }}
            >
                Delete User
            </button>
        </div>
    );
}

export default UserCard;