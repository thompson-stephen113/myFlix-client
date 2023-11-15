// Login test credentials
// username: testUsername1
// password: testPassword4Yew0d45

import { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

import "./login-view.scss"

export const LoginView = ({ onLoggedIn }) => {
    const [Username, setUsername] = useState("");
    const [Password, setPassword] = useState("");

    const handleSubmit = (event) => {
        event.preventDefault();

        const data = {
            Username: Username,
            Password: Password
        };

        fetch("https://myflix-db-app-24338506cd5a.herokuapp.com/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        })
        .then((response) => response.json())
        .then((data) => {
            console.log("Login response: ", data);
            if (data.user) {
                localStorage.setItem("user", JSON.stringify(data.user));
                localStorage.setItem("token", data.token);
                onLoggedIn(data.user, data.token);
            } else {
                alert("No such user");
            }
        })
        .catch((e) => {
            alert("Something went wrong");
        });
    }

    return (
        <Form onSubmit={handleSubmit} className="form">
            <Form.Group controlId="formUsername">
                <Form.Label className="form-label">Username:</Form.Label>
                <Form.Control
                    className="form-control"
                    type="text"
                    value={Username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                />
            </Form.Group>
            <br />

            <Form.Group controlId="formPassword">
                <Form.Label className="form-label">Password:</Form.Label>
                <Form.Control
                    className="form-control"
                    type="password"
                    value={Password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
            </Form.Group>
            <br />
            
            <Button 
                variant="primary" 
                className="submit-button" 
                type="submit"
            >
                Submit
            </Button>
        </Form>
    );
};
