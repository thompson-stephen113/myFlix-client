import PropTypes from "prop-types";
import { useParams } from "react-router";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";

import "./movie-view.scss";

export const MovieView = ({ movies, handleFavorite, removeFavorite }) => {
    const {Title} = useParams();
    const movie = movies.find((movie) => movie.Title === Title);

    const isFavorite = movie && movie.isFavorite;

    const toggleFavorite = () => {
        if (isFavorite) {
            removeFavorite(movie.id);
        } else {
            handleFavorite(movie.id);
        }
    }

    if (!movie) {
        return <div>Movie not found</div>
    }

    return (
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

            <Button
                variant="secondary"
                className="favorite-button"
                onClick={toggleFavorite}
            >
                {movie.isFavorite ? "Unfavorite" : "Favorite"}
            </Button>
            <br />
            
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

MovieView.propTypes = {
    handleFavorite: PropTypes.func.isRequired,
    removeFavorite: PropTypes.func.isRequired,
}
