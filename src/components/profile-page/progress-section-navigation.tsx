export default function ProgressSectionNavigation() {
  return (
    <div className="mt-12 block pb-12 h-fit top-24 md:sticky">
      <h4 className="uppercase tracking-wide font-light text-muted-foreground text-center mb-8">
        navigation
      </h4>
      <ul className="space-y-4">
        <li>
          <a href="#Watching" className="nav-element">
            Watching
          </a>
        </li>
        <li>
          <a href="#Completed" className="nav-element">
            Completed
          </a>
        </li>
        <li>
          <a href="#Plan to watch" className="nav-element">
            Plan to watch
          </a>
        </li>
        <li>
          <a href="#On-hold" className="nav-element">
            On-hold
          </a>
        </li>
        <li>
          <a href="#Dropped" className="nav-element">
            Dropped
          </a>
        </li>
      </ul>
    </div>
  );
}
