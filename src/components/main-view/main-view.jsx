import { useState, useEffect } from "react";
import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";

export const MainView = () => {
    const [movies, setMovies] = useState([]);

    const [selectedMovie, setSelectedMovie] = useState(null);

    useEffect(() => {
        fetch("https://myflix-db-app-24338506cd5a.herokuapp.com/movies")
            .then((response) => {
                if(!response.ok) {
                    throw new Error("Network response was not ok");
                }
                return response.json();
            })
            .then((data) => {
                const moviesFromApi = data.map((movie) => {
                    return {
                        _id: movie.id,
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
    }, []);

    if (selectedMovie) {
        return (
            <MovieView movie={selectedMovie} onBackClick={ () => setSelectedMovie(null)} />
        );
    }
    
    if (movies.length === 0) {
        return <div>The list is empty.</div>
    }

    return (
        <div>
            {movies.map((movie) => (
                <MovieCard
                    key={movie.Title}
                    movie={movie}
                    onMovieClick={(newSelectedMovie) => {
                        setSelectedMovie(newSelectedMovie);
                    }}
                />
            ))}
        </div>
    );
};



