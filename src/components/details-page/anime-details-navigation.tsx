export default function AnimeDetailsNavigation() {
  return (
    <div className="mt-12 sticky top-24">
      <h4 className="uppercase tracking-wide font-light text-muted-foreground text-center mb-8">
        navigation
      </h4>
      <ul className="space-y-4">
        <li>
          <a href="#description" className="nav-element">
            Description
          </a>
        </li>
        <li>
          <a href="#stats" className="nav-element">
            Stats
          </a>
        </li>
        <li>
          <a href="#relations" className="nav-element">
            Relations
          </a>
        </li>
        <li>
          <a href="#characters" className="nav-element">
            Characters
          </a>
        </li>
        <li>
          <a href="#openings" className="nav-element">
            Openings
          </a>
        </li>
        <li>
          <a href="#gallery" className="nav-element">
            Gallery
          </a>
        </li>
        <li>
          <a href="#recommendations" className="nav-element">
            Recomendations
          </a>
        </li>
        <li>
          <a href="#external" className="nav-element">
            External
          </a>
        </li>
      </ul>
    </div>
  );
}
