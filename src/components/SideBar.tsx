import { Button } from "./Button";

type SideBarProps = {
  selectGenreHandler: (id: number) => void;
  selectedGenreId: number;
  genres: Genre[];
};

type Genre = {
  id: number;
  name: "action" | "comedy" | "documentary" | "drama" | "horror" | "family";
  title: string;
};

export function SideBar(props: SideBarProps) {
  return (
    <nav className="sidebar">
      <span>
        Watch<p>Me</p>
      </span>

      <div className="buttons-container">
        {props.genres.map((genre) => (
          <Button
            key={genre.id}
            title={genre.title}
            iconName={genre.name}
            onClick={() => props.selectGenreHandler(genre.id)}
            selected={genre.id == props.selectedGenreId}
          />
        ))}
      </div>
    </nav>
  );
}
