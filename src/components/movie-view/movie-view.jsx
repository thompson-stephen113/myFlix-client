import "./movie-view.scss";

export const MovieView = ({ movie, onBackClick }) => {
    return (
        <div>
            <div>
                <img src={movie.ImagePath} className="h-100" alt="movie poster" />
            </div>

            <div>
                <span>Title: </span>
                <span>{movie.Title}</span>
            </div>

            <div>
                <span>Description: </span>
                <span>{movie.Description}</span>
            </div>

            <br></br>

            <div>
                <span>Genre: </span>
                <span>{movie.Genre.Name}</span>
                <br></br>
                <span>Description: </span>
                <span>{movie.Genre.Description}</span>
            </div>

            <br></br>

            <div>
                <span>Director: </span>
                <span>{movie.Director.Name}</span>
                <br></br>
                <span>Bio: </span>
                <span>{movie.Director.Bio}</span>
                <br></br>
                <span>Birth: </span>
                <span>{movie.Director.Birth}</span>
                <br></br>
                <span>Death: </span>
                <span>{movie.Director.Death}</span>
            </div>

            <br></br>

            <div>
                <span>Featured: </span>
                <span>{movie.Featured}</span>
            </div>

            <br></br>

            <button 
                onClick={onBackClick}
                className="back-button"
                style={{ cursor: "pointer" }}
            >
                Back
            </button>
        </div>
    );
};
