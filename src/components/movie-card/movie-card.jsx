import PropTypes from "prop-types";
import { Button, Card } from "react-bootstrap";
import { Link } from "react-router-dom";

import "./movie-card.scss"

export const MovieCard = ({ movie, handleFavorite, removeFavorite }) => {
    return (
            <Card className="h-100">
                <Card.Body>
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

                    <Link to={`/movies/${encodeURIComponent(movie.Title)}`}>
                        <Button
                            variant="primary"
                            className="view-button"
                        >
                                View
                        </Button>
                    </Link>
                    
                    <Button
                        variant="secondary"
                        className="favorite-button"
                        onClick={() => handleFavorite(movie.id)}
                    >
                        Favorite
                    </Button>
                </Card.Body>
            </Card>
    );
};

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
};
