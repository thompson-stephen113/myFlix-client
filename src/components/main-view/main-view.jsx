import { useState, useEffect } from "react";
import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";
import { LoginView } from "../login-view/login-view";
import { SignupView } from "../signup-view/signup-view";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

import "./main-view.scss"

export const MainView = () => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    const storedToken = localStorage.getItem("token");
    const [user, setUser] = useState(storedUser ? storedUser : null);
    const [token, setToken] = useState(storedToken ? storedToken : null);

    const [movies, setMovies] = useState([]);
    const [selectedMovie, setSelectedMovie] = useState(null);

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
                console.log(data);
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
        <Row>
            {!user ? (
                <Col md={6} className="col-login-signup">
                    <span>Login</span>
                    <LoginView 
                        onLoggedIn={(user, token) => {
                            setUser(user);
                            setToken(token);
                        }} 
                    />
                    <br />
                    <span>or</span>
                    <br />
                    <br />
                    <span>Signup</span>
                    <SignupView />
                </Col>
            ) : selectedMovie ? (
                <Col
                    md={8}
                    // style={{border: "1px solid black"}}
                >
                    <MovieView
                        // style={{border: "1px solid green"}}
                        movie={selectedMovie}
                        onBackClick={() => setSelectedMovie(null)}
                    />
                </Col>
            ) : movies.length === 0 ? (
                <div>The list is empty.</div>
            ) : (
                <>
                    {movies.map((movie) => (
                        <Col className="mb-5" key={movie._id} md={3}>
                            <MovieCard
                                movie={movie}
                                onMovieClick={(newSelectedMovie) => {
                                    setSelectedMovie(newSelectedMovie);
                                }}
                            />
                        </Col>
                    ))}
                </>
            )}
        </Row>
    );
};
