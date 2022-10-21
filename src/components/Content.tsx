import { Header } from "./Header";
import { MovieCard } from "./MovieCard";

type ContentProps = {
  genre: Genre;
  movies: Movie[];
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
  return (
    <>
      <Header genreTitle={props.genre.title} />

      <main>
        <div className="movies-list">
          {props.movies.map((movie) => (
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
