import React, { useState } from "react";
import { useFavoriteMovies } from "../../favorite-movies-context";
import { UserInfo } from "./user-info";
import { FavoriteMovies } from "./favorite-movies";
import { UpdateUser } from "./update-user";
import { Container, Row, Col, Card, Button } from "react-bootstrap";

import "./profile-view.scss"

export const ProfileView = ({ user, token, movies, setUser }) => {
    const { removeFavoriteMovie } = useFavoriteMovies();

    // Delete user
    const handleDeleteUser = () => {
        fetch(`https://myflix-db-app-24338506cd5a.herokuapp.com/users/${user.Username}/update-info`, {
            method: "DELETE",
            headers: { Authorization: `Bearer ${token}` }
        }).then((response) => {
            if (response.ok) {
                alert("Account successfully deleted");
                setUser(null);
                localStorage.clear();
                window.location.replace("/login");
            } else {
                alert("Account could not be deleted");
            }
        }).catch((err) => {
            console.log("Error: ", err);
        });
    }

    // User favorites
    let favoriteMovies = user.FavoriteMovies ? movies.filter((movie) => user.FavoriteMovies.includes(movie.id)) : [];

    // Remove user favorites
    const removeFavorite = (movieId) => {
        fetch(`https://myflix-db-app-24338506cd5a.herokuapp.com/users/${user.Username}/favorites-list/${movieId}`, {
            method: "DELETE", 
            headers: { Authorization: `Bearer ${token}` }
        })
            .then((response) => {
                if (response.ok) {
                    return response.json();
                } else {
                    alert("Failed to remove");
                }
            })
            .then((updatedUser) => {
                if (updatedUser) {
                    alert("Favorite removed");
                    localStorage.setItem("user", JSON.stringify(updatedUser));
                    setUser(updatedUser);
                    removeFavoriteMovie(movieId);
                }
            })
            .catch((err) => {
                alert(err);
            });
    };

    return (
        <>
            <Container>
                <Row className="justify-content-md-center">
                    <Col md={8}>
                        <Card className="mb-5">
                            <Card.Body>
                                {/* User info */}
                                <UserInfo 
                                    name={user.Username}
                                    email={user.Email}
                                />
                            </Card.Body>
                        </Card>
                    </Col>
                    <br />

                    <Col md={8}>
                        <Card>
                            <Card.Body>
                                {/* Update user info */}
                                <UpdateUser 
                                    user={user}
                                    setUser={setUser}
                                />

                                {/* Delete account */}
                                <Button
                                    variant="danger"
                                    className="account-delete"
                                    onClick={handleDeleteUser}
                                >
                                    Delete Account
                                </Button>
                            </Card.Body>
                        </Card>
                    </Col>
                                
                </Row>
            </Container>
            
            {/* User favorites */}
            <Container>
                <Row className="justify-content-md-center">
                    <Col md={8}>
                        <FavoriteMovies
                            favoriteMovies={favoriteMovies}
                            removeFavorite={removeFavorite}
                        />
                    </Col>
                </Row>
            </Container>
        </>
    );
}; 
