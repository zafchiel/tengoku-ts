export default function ProgressSectionNavigation() {
  return (
    <div className="mt-12 sticky h-fit top-24">
      <h4 className="uppercase tracking-wide font-light text-muted-foreground text-center mb-8">
        navigation
      </h4>
      <ul className="space-y-4">
        <li>
          <a href="#watching" className="nav-element">
            Watching
          </a>
        </li>
        <li>
          <a href="#completed" className="nav-element">
            Completed
          </a>
        </li>
        <li>
          <a href="#ptw" className="nav-element">
            Plan to watch
          </a>
        </li>
        <li>
          <a href="#onhold" className="nav-element">
            On-hold
          </a>
        </li>
        <li>
          <a href="#dropped" className="nav-element">
            Dropped
          </a>
        </li>
      </ul>
    </div>
  );
}
