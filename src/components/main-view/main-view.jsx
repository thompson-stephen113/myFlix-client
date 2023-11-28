import { useState, useEffect } from "react";
import { useFavoriteMovies } from "../../favorite-movies-context";
import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";
import { LoginView } from "../login-view/login-view";
import { SignupView } from "../signup-view/signup-view";
import { ProfileView } from "../profile-view/profile-view";
import { NavigationBar } from "../navigation-bar/navigation-bar";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Row, Col, Container } from "react-bootstrap";

// Import styles
import "./main-view.scss"

// Export MainView
export const MainView = () => {
    // Stores logged in user and authentication token locally 
    const storedUser = JSON.parse(localStorage.getItem("user"));
    const storedToken = localStorage.getItem("token");
    const [user, setUser] = useState(storedUser ? storedUser : null);
    const [token, setToken] = useState(storedToken ? storedToken : null);

    // Stores movies in an array
    const [movies, setMovies] = useState([]);

    // Stores search filter terms and populates an array with the movies that appear as a result of the filter
    const [filterTerm, setFilterTerm] = useState("");
    const [filteredMovies, setFilteredMovies] = useState([]);

    // Uses the custom hook to access the favorite movies context
    const { favoriteMovies, addFavoriteMovie, removeFavoriteMovie } = useFavoriteMovies();

    // Stores a function to change the filtered items based on the filtered term
    const handleFilterChange = (e) => {
        setFilterTerm(e.target.value);
    };

    // Add user favorites
    const handleFavorite = (movieId) => {
        // Fetch user favorites from Heroku app at the URL enpoint
        fetch(`https://myflix-db-app-24338506cd5a.herokuapp.com/users/${user.Username}/favorites-list/${movieId}`, {
            // Allows authorized users to post to the favorites array
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
        })
            // Checks validity of response
            .then((response) => {
                if (response.ok) {
                    return response.json();
                } else {
                    throw new Error("Could not add to favorites");
                }
            })
            .then((updatedUser) => {
                // Updates the user and the movie's ID to reflect the addition of the movie to Favorites
                setUser(updatedUser);
                addFavoriteMovie(movieId);
                // Sets the condition of isFavorite of the movie from the list of movies to true
                const updatedMovies = movies.map((movie) =>
                    movie.id === movieId ? { ...movie, isFavorite: true } : movie
                );
                setMovies(updatedMovies);
            })
            .catch((error) => {
                console.error("Add to favorites error:", error);
            });
    };

    // Remove user favorites
    const removeFavorite = (movieId) => {
        // Fetch user favorites from Heroku app at the URL enpoint
        fetch(`https://myflix-db-app-24338506cd5a.herokuapp.com/users/${user.Username}/favorites-list/${movieId}`, {
            // Allows authorized users to delete from the favorites array
            method: "DELETE",
            headers: {
                Authorization: `Bearer ${token}`,
            },
        })
            // Checks validity of response
            .then((response) => {
                if (response.ok) {
                    return response.json();
                } else {
                    throw new Error("Failed to remove");
                }
            })
            .then((updatedUser) => {
                // Updates the user and the movie's ID to reflect the deletion of the movie from Favorites
                setUser(updatedUser);
                removeFavoriteMovie(movieId);
                // Sets the condition of isFavorite of the movie from the list of movies to false
                const updatedMovies = movies.map((movie) =>
                    movie.id === movieId ? { ...movie, isFavorite: false } : movie
                );
                setMovies(updatedMovies);
            })
            .catch((error) => {
                console.error("Remove from favorites error:", error);
            });
    };

    // Fetch all movies
    useEffect(() => {
        // Returns users without a token to the default view
        if (!token) {
            return;
        }

        // Fetches all movies from the Heroku URL endpoint
        fetch("https://myflix-db-app-24338506cd5a.herokuapp.com/movies", { headers: { Authorization: `Bearer ${token}` }
        })
            // Checks validity of the response
            .then((response) => {
                if(!response.ok) {
                    throw new Error("Network response was not ok");
                }
                return response.json();
            })
            .then((data) => {
                // Maps all of the information for each movie
                const moviesFromApi = data.map((movie) => {
                    // Converts the ID of favorited movies to a string
                    const isFavorite = favoriteMovies.includes(movie._id.toString());
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
                        Featured: movie.Featured.toString(),
                        isFavorite: isFavorite,
                    };
                });
            
                // Updates the array of movies with all movies or filtered movies
                setMovies(moviesFromApi);
                setFilteredMovies(moviesFromApi);
            })
            .catch((err) => {
                console.error("Fetch error:", err);
            });
    }, [token, favoriteMovies]);

    // Movie filter
    useEffect(() => {
        const filtered = movies.filter((movie) =>
            // Converts inputted filter terms to lowercase for consistent searching
            movie.Title.toLowerCase().includes(filterTerm.toLowerCase()) ||
            movie.Genre.Name.toLowerCase().includes(filterTerm.toLowerCase()) ||
            movie.Director.Name.toLowerCase().includes(filterTerm.toLowerCase())
        );
        setFilteredMovies(filtered);
    }, [filterTerm, movies]);

    return (
        <BrowserRouter>
            <NavigationBar
                // Clears locally stored user and token upon logout
                user={user}
                onLoggedOut={() => {
                    setUser(null);
                    localStorage.clear();
                }}
            />
            <Container>
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
                                        <Col className="empty-list">The list is empty.</Col>
                                    ) : (
                                        <>
                                            <Row>
                                                <Col md={7}>
                                                    {/* Search filter input field */}
                                                    <input
                                                        type="text"
                                                        placeholder="Filter movies by title, director, or genre"
                                                        value={filterTerm}
                                                        onChange={handleFilterChange}
                                                        className="form-control form-control-sm"
                                                    />
                                                </Col>
                                            </Row>

                                            <Row>
                                                {/* Displayed results of filtered search */}
                                                {filteredMovies.length === 0 ? (
                                                    <Col className="empty-list">No movies found.</Col>
                                                ) : (
                                                    <>
                                                        {filteredMovies.map((movie) => (
                                                            <Col className="mb-4" key={movie.id} md={4}>
                                                                <MovieCard 
                                                                    movie={movie}
                                                                    handleFavorite={handleFavorite}
                                                                    removeFavorite={removeFavorite}
                                                                />
                                                            </Col>
                                                        ))}
                                                    </>
                                                )}
                                            </Row>
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
                                        <Col className="empty-list">The list is empty.</Col>
                                    ) : (
                                        <Col md={8}>
                                            <MovieView
                                                movies={movies}
                                                handleFavorite={handleFavorite}
                                                removeFavorite={removeFavorite}
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
            </Container>
        </BrowserRouter>
    );
};
