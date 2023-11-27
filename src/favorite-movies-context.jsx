import { createContext, useContext, useState } from 'react';

const FavoriteMoviesContext = createContext();

export const useFavoriteMovies = () => {
    return useContext(FavoriteMoviesContext);
};

export const FavoriteMoviesProvider = ({ children }) => {
    const [favoriteMovies, setFavoriteMovies] = useState([]);

    const addFavoriteMovie = (movieId) => {
        setFavoriteMovies((prevFavorites) => [...prevFavorites, movieId]);
    };

    const removeFavoriteMovie = (movieId) => {
        setFavoriteMovies((prevFavorites) => prevFavorites.filter((id) => id !== movieId));
    };

return (
    <FavoriteMoviesContext.Provider value={{ favoriteMovies, addFavoriteMovie, removeFavoriteMovie }}>
      {children}
    </FavoriteMoviesContext.Provider>
  );
};
