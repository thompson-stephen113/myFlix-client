import { useState, useEffect } from "react";
import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";
import { LoginView } from "../login-view/login-view";
import { SignupView } from "../signup-view/signup-view";
import { ProfileView } from "../profile-view/profile-view";
import { NavigationBar } from "../navigation-bar/navigation-bar";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Row, Col } from "react-bootstrap";

import "./main-view.scss"

export const MainView = () => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    const storedToken = localStorage.getItem("token");
    const [user, setUser] = useState(storedUser ? storedUser : null);
    const [token, setToken] = useState(storedToken ? storedToken : null);

    const [movies, setMovies] = useState([]);

    const handleFavorite = (movieId) => {
        fetch(`https://myflix-db-app-24338506cd5a.herokuapp.com/users/${user.Username}/favorites-list/${movieId}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
        }}).then((response) => {
            if (response.ok) {
                return response.json();
            } else {
                alert("Could not add to favorites")
            }
        }).then((user) => {
            if (user) {
                alert("Added to favorites");
                localStorage.setItem("user", JSON.stringify(user));
                setUser(user);
            }
        }).catch((err) => {
            alert(err);
        });
    }

    useEffect(() => {
        if (!token) {
            return;
        }

        fetch("https://myflix-db-app-24338506cd5a.herokuapp.com/movies", { headers: { Authorization: `Bearer ${token}` }
        })
            .then((response) => {
                if(!response.ok) {
                    throw new Error("Network response was not ok");
                }
                return response.json();
            })
            .then((data) => {
                const moviesFromApi = data.map((movie) => {
                    return {
                        id: movie._id,
                        Title: movie.Title,
                        ImagePath: movie.ImagePath,
                        Description: movie.Description,
                        Genre: {
                            Name: movie.Genre.Name,
                            Description: movie.Genre.Description
                        },
                        Director: {
                            Name: movie.Director.Name,
                            Bio: movie.Director.Bio,
                            Birth: movie.Director.Birth,
                            Death: movie.Director.Death
                        },
                        Featured: movie.Featured.toString()
                    };
                });

                setMovies(moviesFromApi);
            })
            .catch((err) => {
                console.error("Fetch error:", err);
            });
    }, [token]);

    return (
        <BrowserRouter>
            <NavigationBar
                user={user}
                onLoggedOut={() => {
                    setUser(null);
                    localStorage.clear();
                }}
            />
            <Row>
                <Routes>
                    {/* Route to Signup view when no user is logged in */}
                    <Route
                        path="/signup"
                        element={
                            <>
                                {user ? (
                                    <Navigate to="/" />
                                ) : (
                                    <Col md={6} className="col-signup">
                                        <span>Signup</span>
                                        <SignupView />
                                    </Col>
                                )}
                            </>
                        }
                    />

                    {/* Route to Login view when no user is logged in */}
                    <Route
                        path="/login"
                        element={
                            <>
                                {user ? (
                                    <Navigate to="/" />
                                ) : (
                                    <Col md={6} className="col-login">
                                        <span>Login</span>
                                        <LoginView
                                            onLoggedIn={(user, token) => {
                                                setUser(user);
                                                setToken(token);
                                                localStorage.setItem
                                            }}
                                        />    
                                    </Col>
                                )}
                            </>
                        }
                    />

                    {/* Route to movie cards when user is logged in */}
                    <Route
                        path="/"
                        element={
                            <>
                                {!user ? (
                                    <Navigate to="/login" replace />
                                ) : movies.length === 0 ? (
                                    <Col>The list is empty.</Col>
                                ) : (
                                    <>
                                        {movies.map((movie) => (
                                            <Col className="mb-4" key={movie.id} md={4}>
                                                <MovieCard 
                                                    movie={movie}
                                                    handleFavorite={handleFavorite}
                                                    // removeFavorite={removeFavorite}
                                                />
                                            </Col>
                                        ))}
                                    </>
                                )}
                            </>
                        }
                    />

                    {/* Route to movie view when a specific movie is selected */}
                    <Route
                        path="/movies/:Title"
                        element={
                            <>
                                {!user ? (
                                    <Navigate to="/login" replace />
                                ) :  movies.length === 0 ? (
                                    <Col>The list is empty.</Col>
                                ) : (
                                    <Col md={8}>
                                        <MovieView
                                            movies={movies}
                                            handleFavorite={handleFavorite}
                                            // removeFavorite={removeFavorite}
                                        />
                                    </Col>
                                )}
                            </>
                        }
                    />

                    {/* Route to user profile */}
                    <Route
                        path="/profile"
                        element={
                            <>
                                {!user ? (
                                    <Navigate to="/login" replace />
                                ) : (
                                    <Col>
                                        <Row>
                                            <ProfileView
                                                user={user}
                                                token={token}
                                                movies={movies}
                                                setUser={setUser}
                                            />
                                        </Row>
                                    </Col>
                                )}
                            </>
                        }
                    />
                </Routes>
            </Row>
        </BrowserRouter>
    );
};
