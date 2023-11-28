import { createContext, useContext, useState } from 'react';

// Create a context for managing favorite movies
const FavoriteMoviesContext = createContext();

// Custom hook to provide access to the favorite movies context
export const useFavoriteMovies = () => {
    return useContext(FavoriteMoviesContext);
};

// Provider component to wrap the app and provide the favorite movies context
export const FavoriteMoviesProvider = ({ children }) => {
    // State to store the list of favorite movies
    const [favoriteMovies, setFavoriteMovies] = useState([]);

    // Function to add a movie to favorites list
    const addFavoriteMovie = (movieId) => {
        setFavoriteMovies((prevFavorites) => [...prevFavorites, movieId]);
    };

    // Function to remove a movie from favorites list
    const removeFavoriteMovie = (movieId) => {
        setFavoriteMovies((prevFavorites) => prevFavorites.filter((id) => id !== movieId));
    };

return (
    <FavoriteMoviesContext.Provider value={{ favoriteMovies, addFavoriteMovie, removeFavoriteMovie }}>
      {children}
    </FavoriteMoviesContext.Provider>
  );
};
