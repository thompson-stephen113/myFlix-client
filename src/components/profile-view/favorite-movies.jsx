import React, { useEffect, useState } from "react";
import { Card, Col, Button, Figure } from "react-bootstrap";
import { Link } from "react-router-dom";

import "./profile-view.scss";

export const FavoriteMovies = ({ favoriteMovies, removeFavorite }) => {
    return (
        <Card>
            <Card.Body>
                <h2>Favorites</h2>
                {favoriteMovies.map(({ ImagePath, Title, id }) => {
                    return (
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

                            <Button
                                className="remove-button"
                                variant="secondary"
                                onClick={() => removeFavorite(id)}>
                                    Remove
                            </Button>
                        </Col>   
                    )
                })} 
            </Card.Body>                 
        </Card>
    )
}
