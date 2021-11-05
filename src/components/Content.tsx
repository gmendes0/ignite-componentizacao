import { useEffect, useState } from "react";
import { api } from "../services/api";
import { Header } from "./Header";
import { MovieCard } from "./MovieCard";

type ContentProps = {
  genre: Genre;
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
      <Header genreTitle={props.genre.title} />

      <main>
        <div className="movies-list">
          {movies.map((movie) => (
            <MovieCard
              key={movie.imdbID}
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
