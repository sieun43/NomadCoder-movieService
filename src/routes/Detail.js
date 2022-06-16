import { useEffect, useState } from "react";
import { useParams, useHistory } from "react-router-dom";
import { Link } from "react-router-dom";
import styles from "./Detail.module.css";

function Detail() {
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const [movies, setMovies] = useState([]);

  const getMovie = async () => {
    const response = await fetch(
      `https://yts.mx/api/v2/movie_details.json?movie_id=${id}`
    );
    const json = await response.json();
    setMovies(json.data.movie);
    setLoading(false);
  };
  useEffect(() => {
    getMovie();
  }, []);
  let history = useHistory();
  const star = Math.floor(movies.rating);

  return (
    <div>
      {loading ? (
        <div className={styles.loader}>
          <span>Loading ...</span>
        </div>
      ) : (
        <div>
          <button
            className={styles.homebtn}
            onClick={() => {
              history.goBack();
            }}
          >
            X
          </button>
          <h1 className={styles.title}>{movies.title_long}</h1>

          <hr />
          <div className={styles.container}>
            <img className={styles.img} src={movies.medium_cover_image}></img>
            <div className={styles.text}>
              <p className={styles.rating}>
                rating: {"⭐".repeat(star)}({movies.rating})
              </p>
              <p className={styles.runtime}>runtime: {movies.runtime}</p>
              <ul className={styles.genre}>
                {movies.genres.map((genre, index) => (
                  <li key={index}>&#60;{genre}&#62;</li>
                ))}
              </ul>
              <p className={styles.summary}>{movies.description_full}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Detail;
