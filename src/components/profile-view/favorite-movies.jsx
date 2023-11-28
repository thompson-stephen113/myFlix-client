import React from "react";
import { Card, Col, Button, Figure } from "react-bootstrap";
import { Link } from "react-router-dom";

// Import styles
import "./profile-view.scss";

export const FavoriteMovies = ({ favoriteMovies, removeFavorite }) => {
    return (
        <Card>
            <Card.Body>
                <h2>Favorites</h2>
                {/* Check if the favorites list is empty */}
                {favoriteMovies.length === 0 ? (
                    <span>No favorites yet!</span>
                ) : (
                    // Populates card with items from favoriteMovies
                    favoriteMovies.map(({ ImagePath, Title, id }) => (
                        <Col key={id} className="favorite-movie">
                            <Figure>
                                <Button variant="link" className="image-button">
                                    <Link to={`/movies/${encodeURIComponent(Title)}`}>
                                        <Figure.Image
                                            src={ImagePath}
                                            alt={[Title, " movie poster"]}
                                        />
                                    </Link>
                                </Button>
                                <Figure.Caption className="figure-caption">
                                    {Title}
                                </Figure.Caption>
                            </Figure>

                            {/* Attached remove button to remove favorited movie */}
                            <Button
                                className="remove-button"
                                variant="secondary"
                                onClick={() => removeFavorite(id)}>
                                    Remove
                            </Button>
                        </Col>   
                    ))
                )} 
            </Card.Body>                 
        </Card>
    )
}
