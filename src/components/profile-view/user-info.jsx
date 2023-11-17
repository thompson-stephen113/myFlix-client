import React from "react";

export const UserInfo = ({ name, email }) => {
    return (
        <>
            <h3>User Info</h3>
            <br />

            <div>
                <h5>Username:</h5>
                <p>{name}</p>
            </div>

            <div>
                <h5>Email:</h5>
                <p>{email}</p>
            </div>
        </>
    )
}

