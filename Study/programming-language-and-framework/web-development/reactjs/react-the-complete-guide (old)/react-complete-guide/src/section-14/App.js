import React, { useState, useEffect, useCallback } from "react";

import MoviesList from "./components/MoviesList";
import "./App.css";
import AddMovie from "./components/AddMovie";

function App() {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchMoviesHandler();
  }, []);

  const fetchMoviesHandler = useCallback(async () => {
    setError(null);
    setIsLoading(true);

    try {
      const response = await fetch(
        `${process.env.REACT_APP_FIREBASE}/movies.json`
      );
      const data = await response.json();

      if (!response.ok) {
        throw new Error("Something went wrong!");
      }

      const moviesKey = Object.keys(data);

      const transformData = moviesKey.map((key) => {
        return {
          episode_id: key,
          opening_crawl: data[key].openingText,
          title: data[key].title,
          release_date: data[key].releaseDate,
        };
      });

      const transformMovies = transformData.map((movie) => {
        return {
          id: movie.episode_id,
          title: movie.title,
          openingText: movie.opening_crawl,
          releaseDate: movie.release_date,
        };
      });
      setMovies(transformMovies);
    } catch (error) {
      setError(error.message);
    }
    setIsLoading(false);
  }, []);

  const addMovieHandler = async (movie) => {
    const response = await fetch(
      `${process.env.REACT_APP_FIREBASE}/movies.json`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(movie),
      }
    );

    const data = await response.json();
    console.log(data);
  };

  return (
    <React.Fragment>
      <section>
        <AddMovie onAddMovie={addMovieHandler} />
      </section>
      <section>
        <button onClick={fetchMoviesHandler}>Fetch Movies</button>
      </section>
      <section>
        {!isLoading && movies.length > 0 && <MoviesList movies={movies} />}
        {!isLoading && movies.length === 0 && <p>Found no movies.</p>}
        {isLoading && <p>Loading ...</p>}
        {!isLoading && error && <p>{error}</p>}
      </section>
    </React.Fragment>
  );
}

export default App;
