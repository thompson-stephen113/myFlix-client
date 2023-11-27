import { useState } from "react";
import { Navbar, Container, Nav } from "react-bootstrap";
import { Link } from "react-router-dom";

import "./navigation-bar.scss";

export const NavigationBar = ({ user, onLoggedOut }) => {
    const [expanded, setExpanded] = useState(false);

    const handleToggle = () => {
        setExpanded(!expanded);
    };

    const handleNav = () => {
        setExpanded(false);
    }
    return (
        <Navbar bg="light" expand="lg" expanded={expanded} onToggle={handleToggle}>
            <Container fluid>
                <Navbar.Brand as={Link} to="/" onClick={handleNav}>
                    myFlix
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        {!user && (
                            <>
                                <Nav.Link as={Link} to="/login" onClick={handleNav}>
                                    Login
                                </Nav.Link>
                                <Nav.Link as={Link} to="/signup" onClick={handleNav}>
                                    Signup
                                </Nav.Link>
                            </>
                        )}
                        {user && (
                            <>
                                <Nav.Link as={Link} to="/" onClick={handleNav}>
                                    Home
                                </Nav.Link>
                                <Nav.Link as={Link} to="/profile" onClick={handleNav}>
                                    Profile
                                </Nav.Link>
                                <Nav.Link onClick={() => {
                                    onLoggedOut();
                                    handleNav();
                                }}>
                                    Logout
                                </Nav.Link>
                            </>
                        )}
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
};
