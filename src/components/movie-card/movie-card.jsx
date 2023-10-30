import PropTypes from "prop-types";
import { Button, Card } from "react-bootstrap";

export const MovieCard = ({ movie, onMovieClick }) => {
    return (
        <Card onClick={() => onMovieClick(movie)}>
            <Card.Img variant="top" src="{movie.Image}" />
            <Card.Title>{movie.Title}</Card.Title>
            <Card.Text>{movie.Director}</Card.Text>
            <Button onClick={() => onMovieClick(movie)} variant="link">
                Open
            </Button>
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
    onMovieClick: PropTypes.func.isRequired
};
