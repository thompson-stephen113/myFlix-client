import React from "react";
import { Form, Button } from "react-bootstrap";

import "./profile-view.scss"

export const UpdateUser = ({ user, setUser }) => {
    const handleUpdate = (event) => {
        event.preventDefault();

        const data = {
            Username: user.Username,
            Password: user.Password,
            Email: user.Email,
            Birthday: user.Birthday
        };
    
        fetch(`https://myflix-db-app-24338506cd5a.herokuapp.com/users/${user.Username}/update-info`, {
                method: "PUT",
                body: JSON.stringify(data),
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                }
            }).then((response) => {
                console.log(response);
                if (response.ok) {
                    alert("Update successful");
                    window.location.reload();
                } else {
                    alert("Update failed")
                }
            }).then((data) => {
                if (data) {
                    localStorage.setItem("user", JSON.stringify(data));
                    setUser(data);
                }
            }).catch((err) => {
                console.log("Error: ", err);
            }
        )
    }
    
    return (
        <>
            <h3>Update Info</h3>
            <br />

            <Form>
                <Form.Group>
                    <h5 className="form-label">Username:</h5>
                    <Form.Control
                        type="text"
                        onChange={e => handleUpdate(e)}
                        required
                        placeholder="Enter username" 
                    />
                </Form.Group>

                <Form.Group>
                    <h5 className="form-label">Password:</h5>
                    <Form.Control
                        type="password"
                        onChange={e => handleUpdate(e)}
                        required
                        minLength="8"
                        placeholder="Password must be 8 or more characters"
                    />
                </Form.Group>

                <Form.Group>
                    <h5 className="form-label">Email:</h5>
                    <Form.Control
                        type="email"
                        onChange={e=> handleUpdate(e)}
                        required
                        placeholder="Enter email address"
                    />
                </Form.Group>

                <Form.Group>
                    <h5 className="form-label">Birthday:</h5>
                    <Form.Control
                        type="date"
                        onChange={e => handleUpdate(e)}
                        required
                        placeholder="Enter your birthday"
                    />
                </Form.Group>

                <Button
                    variant="primary"
                    type="submit"
                    className="account-update"
                >
                    Update
                </Button>
            </Form>
        </>
    );
};
