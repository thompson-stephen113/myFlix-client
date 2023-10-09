import { useState } from "react";
import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";

export const MainView = () => {
    const [movies, setMovies] = useState([
        {
            id: "65046deb498b41ec74f0076e",
            title: "Oppenheimer",
            description: "During World War II, Lt. Gen. Leslie Groves Jr. appoints physicist J. Robert Oppenheimer to work on the top-secret Manhattan Project. Oppenheimer and a team of scientists spend years developing and designing the atomic bomb. Their work comes to fruition on July 16, 1945, as they witness the world's first nuclear explosion, forever changing the course of history.",
            genre: {
                name: "Biographical",
                description: "A biographical film or biopic is a film that dramatizes the life of a non-fictional or historically-based person or people. Such films show the life of a historical person and the central character's real name is used. (Wikipedia)"
            },
            director: {
                name: "Christopher Nolan",
                bio: "Christopher Edward Nolan CBE is a British and American filmmaker. Known for his Hollywood blockbusters with complex storytelling, Nolan is considered a leading filmmaker of the 21st century. His films have grossed $5 billion worldwide. (Wikipedia)",
                birth: "1970-07-30",
                death: null
            },
            imagePath: "https://upload.wikimedia.org/wikipedia/en/4/4a/Oppenheimer_%28film%29.jpg"
        },
        {
            id: "65046f17498b41ec74f0076f",
            title: "The Dark Knight",
            description: "With the help of allies Lt. Jim Gordon (Gary Oldman) and DA Harvey Dent (Aaron Eckhart), Batman (Christian Bale) has been able to keep a tight lid on crime in Gotham City. But when a vile young criminal calling himself the Joker (Heath Ledger) suddenly throws the town into chaos, the caped Crusader begins to tread a fine line between heroism and vigilantism.",
            genre: {
                name: "Action",
                description: "Action film is a film genre in which the protagonist is thrust into a series of events that typically involve violence and physical feats. (Wikipedia)"
            },
            director: {
                name: "Christopher Nolan",
                bio: "Christopher Edward Nolan CBE is a British and American filmmaker. Known for his Hollywood blockbusters with complex storytelling, Nolan is considered a leading filmmaker of the 21st century. His films have grossed $5 billion worldwide. (Wikipedia)",
                birth: "1970-07-30",
                death: null
            },
            imagePath: "https://upload.wikimedia.org/wikipedia/en/1/1c/The_Dark_Knight_%282008_film%29.jpg"
        },
        {
            id: "650470eef089e4deba99c437",
            title: "Young Frankenstein",
            description: "Respected medical lecturer Dr. Frederick Frankenstein (Gene Wilder) learns that he has inherited his infamous grandfather's estate in Transylvania. Arriving at the castle, Dr. Frankenstein soon begins to recreate his grandfather's experiments with the help of servants Igor (Marty Feldman), Inga (Teri Garr) and the fearsome Frau Blücher (Cloris Leachman). After he creates his own monster (Peter Boyle), new complications ensue with the arrival of the doctor's fiancée, Elizabeth (Madeline Kahn).",
            genre: {
                name: "Comedy",
                description: "A comedy film is a category of film which emphasizes on humor. These films are designed to make the audience laugh in amusement. Films in this style traditionally have a happy ending. Comedy is one of the oldest genres in the film and it is derived from classical comedy in theatre. (Wikipedia)"
            },
            director: {
                name: "Mel Brooks",
                bio: "Melvin James Brooks is an American actor, comedian and filmmaker. With a career spanning over seven decades, he is known as a writer and director of a variety of successful broad farces and parodies. (Wikipedia)",
                birth: "1926-06-28",
                death: null
            },
            imagePath: "https://upload.wikimedia.org/wikipedia/en/b/b5/Young_Frankenstein_movie_poster.jpg"
        }
    ]);

    const [selectedMovie, setSelectedMovie] = useState(null);

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
                    key={movie.id}
                    movie={movie}
                    onMovieClick={(newSelectedMovie) => {
                        setSelectedMovie(newSelectedMovie);
                    }}
                />
            ))}
        </div>
    );
};



