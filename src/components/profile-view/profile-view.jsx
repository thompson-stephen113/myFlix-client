import React from "react";
import { useFavoriteMovies } from "../../favorite-movies-context";
import { UserInfo } from "./user-info";
import { FavoriteMovies } from "./favorite-movies";
import { UpdateUser } from "./update-user";
import { Container, Row, Col, Card, Button } from "react-bootstrap";

import "./profile-view.scss"

export const ProfileView = ({ user, token, movies, setUser }) => {
    // Uses the custom hook to access the favorite movies context
    const { removeFavoriteMovie } = useFavoriteMovies();

    // Delete user
    const handleDeleteUser = () => {
        // Fetches user information from Heroku app at the URL endpoint
        fetch(`https://myflix-db-app-24338506cd5a.herokuapp.com/users/${user.Username}/update-info`, {
            // Allows authorized users to delete from the user array
            method: "DELETE",
            headers: { Authorization: `Bearer ${token}` }
        })
            // Checks validity of response
            .then((response) => {
                if (response.ok) {
                    alert("Account successfully deleted");
                    // Removes user information, clears local storage, and redirects to LoginView
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
        // Fetches user favorites from Heroku app at the URL enpoint
        fetch(`https://myflix-db-app-24338506cd5a.herokuapp.com/users/${user.Username}/favorites-list/${movieId}`, {
            // Allows authorized users to delete from the favorites array
            method: "DELETE", 
            headers: { Authorization: `Bearer ${token}` }
        })
            // Checks validity of response
            .then((response) => {
                if (response.ok) {
                    return response.json();
                } else {
                    alert("Failed to remove");
                }
            })
            .then((updatedUser) => {
                if (updatedUser) {
                    // Updates the user and the movie's ID to reflect the deletion of the movie from Favorites
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
