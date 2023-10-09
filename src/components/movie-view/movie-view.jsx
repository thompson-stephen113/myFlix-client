export const MovieView = ({ movie, onBackClick }) => {
    return (
        <div>
            <div>
                <img src={movie.imagePath} />
            </div>

            <div>
                <span>Title: </span>
                <span>{movie.title}</span>
            </div>

            <div>
                <span>Description: </span>
                <span>{movie.description}</span>
            </div>

            <br></br>

            <div>
                <span>Genre: </span>
                <span>{movie.genre.name}</span>
                <br></br>
                <span>Description: </span>
                <span>{movie.genre.description}</span>
            </div>

            <br></br>

            <div>
                <span>Director: </span>
                <span>{movie.director.name}</span>
                <br></br>
                <span>Bio: </span>
                <span>{movie.director.bio}</span>
                <br></br>
                <span>Birth: </span>
                <span>{movie.director.birth}</span>
                <br></br>
                <span>Death: </span>
                <span>{movie.director.death}</span>
            </div>

            <br></br>

            <button onClick={onBackClick}>Back</button>
        </div>
    );
};
