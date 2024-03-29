import { useCallback, useEffect, useState } from "react";

import { SideBar } from "./components/SideBar";
import { Content } from "./components/Content";

import { api } from "./services/api";

import "./styles/global.scss";

import "./styles/sidebar.scss";
import "./styles/content.scss";
interface GenreResponseProps {
  id: number;
  name: "action" | "comedy" | "documentary" | "drama" | "horror" | "family";
  title: string;
}

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

export function App() {
  const [selectedGenreId, setSelectedGenreId] = useState(1);

  const [genres, setGenres] = useState<GenreResponseProps[]>([]);

  const [selectedGenre, setSelectedGenre] = useState<GenreResponseProps>(
    {} as GenreResponseProps
  );

  const [movies, setMovies] = useState<Movie[]>([]);

  useEffect(() => {
    api
      .get<GenreResponseProps[]>("genres")
      .then((response) => {
        if (response.status !== 200 || !response.data)
          throw new Error("Fail to get genres");

        setGenres(response.data);
      })
      .catch(() => {
        window.alert("Fail to get genres");
      });
  }, []);

  useEffect(() => {
    api
      .get<GenreResponseProps>(`genres/${selectedGenreId}`)
      .then((response) => {
        setSelectedGenre(response.data);

        return response.data;
      })
      .then((genre) => {
        api
          .get<Movie[]>(`movies?Genre_id=${genre.id}`)
          .then((response) => {
            if (response.status !== 200 || !response.data)
              throw new Error("Fail to get movies");

            setMovies(response.data);
          })
          .catch(() => {
            window.alert("Fail to get movies");
          });
      });
  }, [selectedGenreId]);

  const handleClickButton = useCallback((id: number) => {
    setSelectedGenreId(id);
  }, []);

  return (
    <div style={{ display: "flex", flexDirection: "row" }}>
      <SideBar
        selectGenreHandler={handleClickButton}
        selectedGenreId={selectedGenreId}
        genres={genres}
      />

      <div className="container">
        <Content genre={selectedGenre} movies={movies} />
      </div>
    </div>
  );
}
