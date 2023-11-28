import PropTypes from "prop-types";
import { useParams } from "react-router";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";

import "./movie-view.scss";

export const MovieView = ({ movies, handleFavorite, removeFavorite }) => {
    // Exctract the "Title" parameter from the route
    const {Title} = useParams();
    // Find the movie object with the matching "Title" from the movies array
    const movie = movies.find((movie) => movie.Title === Title);

    // Sets conditional to check if a movie is favorited
    const isFavorite = movie && movie.isFavorite;

    // Uses the condition of isFavorite to determine toggle behavior
    const toggleFavorite = () => {
        if (isFavorite) {
            removeFavorite(movie.id);
        } else {
            handleFavorite(movie.id);
        }
    }

    // Return statement if movie cannot be found
    if (!movie) {
        return <div>Movie not found</div>
    }

    return (
        // Entire movie with its information formatted
        <div className="movie-view">
            <div className="image-div">
                <img className="movie-image" src={movie.ImagePath} alt="movie poster" />
            </div>
            <br />

            <div>
                <span className="movie-element-label">Title: </span>
                <span>{movie.Title}</span>
            </div>
            <br />

            <div>
                <span className="movie-element-label">Description: </span>
                <span>{movie.Description}</span>
            </div>
            <br />
            <br />

            <div>
                <span className="movie-element-label">Genre: </span>
                <span>{movie.Genre.Name}</span>
                <br></br>
                <span className="movie-element-label">Description: </span>
                <span>{movie.Genre.Description}</span>
            </div>
            <br />
            <br />

            <div>
                <span className="movie-element-label">Director: </span>
                <span>{movie.Director.Name}</span>
                <br></br>
                <span className="movie-element-label">Bio: </span>
                <span>{movie.Director.Bio}</span>
                <br></br>
                <span className="movie-element-label">Birth: </span>
                <span>{movie.Director.Birth}</span>
                <br></br>
                <span className="movie-element-label">Death: </span>
                {/* Determines if director has a death date */}
                {movie.Director.Death ? (
                    <span>{movie.Director.Death}</span>
                ) : (
                    <span>-</span>
                )}
            </div>
            <br />
            <br />

            <div>
                <span className="movie-element-label">Featured: </span>
                <span>{movie.Featured}</span>
            </div>
            <br />

            {/* Button to add to or remove from favorites */}
            <Button
                variant="secondary"
                className="favorite-button"
                onClick={toggleFavorite}
            >
                {/* Toggles the appearance of the Favorite button */}
                {movie.isFavorite ? "Unfavorite" : "Favorite"}
            </Button>
            <br />
            
            {/* Redirects user back to MovieCard */}
            <Link to="/">
                <Button
                    variant="primary"
                    className="back-button"
                    style={{ cursor: "pointer" }}
                >
                    Back
                </Button>
            </Link>
        </div>
    );
};

// PropTypes
MovieView.propTypes = {
    handleFavorite: PropTypes.func.isRequired,
    removeFavorite: PropTypes.func.isRequired,
}
