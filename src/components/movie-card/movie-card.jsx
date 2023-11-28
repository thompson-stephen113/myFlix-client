import PropTypes from "prop-types";
import { Button, Card } from "react-bootstrap";
import { Link } from "react-router-dom";

// Import styles
import "./movie-card.scss"

export const MovieCard = ({ movie, handleFavorite, removeFavorite }) => {
    // Sets conditional to check if a movie is favorited
    const isFavorite = movie.isFavorite || false;

    // Uses the condition of isFavorite to determine toggle behavior
    const toggleFavorite = () => {
        if (isFavorite) {
            removeFavorite(movie.id);
        } else {
            handleFavorite(movie.id);
        }
    };

    return (
            <Card className="h-100">
                <Card.Body>
                    {/* Turns the movie image into a button that links to MovieView */}
                    <Link
                        to={`/movies/${encodeURIComponent(movie.Title)}`}
                        className="image-link"
                    >
                        <Button
                            variant="link"
                            className="image-button"
                            style={{ cursor: "pointer" }}
                        >
                            <Card.Img
                                className="movie-image"
                                src={movie.ImagePath}
                                alt={[movie.Title, " movie poster"]}
                            />
                        </Button>
                    </Link>
                
                    <Card.Title>{movie.Title}</Card.Title>
                    <Card.Text>{movie.Director.Name}</Card.Text>

                    {/* Button to view MovieView */}
                    <Link to={`/movies/${encodeURIComponent(movie.Title)}`}>
                        <Button
                            variant="primary"
                            className="view-button"
                        >
                                View
                        </Button>
                    </Link>
                    
                    {/* Button to add to or remove from favorites */}
                    <Button
                        variant="secondary"
                        className="favorite-button"
                        onClick={toggleFavorite}
                    >
                        {/* Toggles the appearance of the Favorite button */}
                        {movie.isFavorite ? "Unfavorite" : "Favorite"}
                    </Button>
                </Card.Body>
            </Card>
    );
};

// PropTypes
MovieCard.propTypes = {
    movie: PropTypes.shape({
        Image: PropTypes.string,
        Title: PropTypes.string.isRequired,
        Description: PropTypes.string.isRequired,
        Genre: PropTypes.shape({
            Name: PropTypes.string,
            Description: PropTypes.string
        }),
        Director: PropTypes.shape({
            Name: PropTypes.string,
            Bio: PropTypes.string,
            Birth: PropTypes.string,
            Death: PropTypes.string
        })
    }).isRequired,
    handleFavorite: PropTypes.func.isRequired,
    removeFavorite: PropTypes.func.isRequired,
};
