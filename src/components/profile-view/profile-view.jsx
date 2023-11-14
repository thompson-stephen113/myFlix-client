import { UserInfo } from "./user-info";
import { FavoriteMovies } from "./favorite-movies";
import { UpdateUser } from "./update-user";
import { Container, Row, Col, Card, Button } from "react-bootstrap";


import "./profile-view.scss"

export const ProfileView = ({ user, token, movie, movies, setUser }) => {
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
    const removeFavorite = (id) => {
        fetch(`https://myflix-db-app-24338506cd5a.herokuapp.com/users/${user.Username}/favorites-list/${id}`, {
            method: "DELETE", 
            headers: { Authorization: `Bearer ${token}` }
        }).then((response) => {
            if (response.ok) {
                return response.json();
            } else {
                alert("Failed to remove");
            }
        }).then((user) => {
            if (user) {
                alert("Favorite removed");
                localStorage.setItem("user", JSON.stringify(user));
                setUser(user);
            }
        }).catch((err) => {
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
                            movie={movie}
                            favoriteMovies={favoriteMovies}
                            removeFavorite={removeFavorite}
                        />

                        {/* Remove button here? */}
                    </Col>
                </Row>
            </Container>
        </>
    );
}; 
