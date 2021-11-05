type HeaderProps = {
  genreTitle: string;
};

export function Header(props: HeaderProps) {
  return (
    <header>
      <span className="category">
        Categoria: <span>{props.genreTitle}</span>
      </span>
    </header>
  );
}
