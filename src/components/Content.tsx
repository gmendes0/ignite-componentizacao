import { useEffect, useState } from "react";
import { api } from "../services/api";
import { MovieCard } from "./MovieCard";

type ContentProps = {
  genre: Genre;
  // movies: Movie[];
};

type Genre = {
  id: number;
  name: "action" | "comedy" | "documentary" | "drama" | "horror" | "family";
  title: string;
};

type Movie = {
  imdbID: string;
  Title: string;
  Poster: string;
  Runtime: string;
  Ratings: Array<{
    Source: string;
    Value: string;
  }>;
};

export function Content(props: ContentProps) {
  const [movies, setMovies] = useState<Movie[]>([]);

  useEffect(() => {
    api
      .get<Movie[]>(`movies?Genre_id=${props.genre.id}`)
      .then((response) => {
        if (response.status !== 200 || !response.data)
          throw new Error("Fail to get movies");

        setMovies(response.data);
      })
      .catch(() => {
        window.alert("Fail to get movies");
      });
  }, [props.genre]);

  return (
    <>
      <header>
        <span className="category">
          Categoria: <span>{props.genre.title}</span>
        </span>
      </header>

      <main>
        <div className="movies-list">
          {movies.map((movie) => (
            <MovieCard
              title={movie.Title}
              poster={movie.Poster}
              rating={movie.Ratings[0].Value}
              runtime={movie.Runtime}
            />
          ))}
        </div>
      </main>
    </>
  );
}
