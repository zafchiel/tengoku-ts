import { Separator } from "../ui/separator";

type OpeningsSectionProps = {
  theme: {
    openings: string[];
    endings: string[];
  };
};

export default function OpeningsSection({ theme }: OpeningsSectionProps) {
  return (
    <section id="openings" className="scroll-mt-40">
      <h3 className="text-3xl font-semibold">Openings & Endings</h3>
      <Separator className="mb-3" />
      <div className="grid grid-cols-1 sm:grid-cols-[1fr_10px_1fr] gap-4 px-2">
        <div>
          <h5 className="font-semibold text-xl text-muted-foreground">
            Opening theme
          </h5>

          <div className="space-y-2">
            {theme.openings.length > 0 ? (
              theme.openings.map((opening) => <p key={opening}>{opening}</p>)
            ) : (
              <p className="py-2">No openings yet</p>
            )}
          </div>
        </div>

        <Separator orientation="vertical" className="hidden sm:block h-32" />

        <div>
          <h5 className="font-semibold text-xl text-muted-foreground">
            Ending theme
          </h5>

          <div className="space-y-2">
            {theme.endings.length > 0 ? (
              theme.endings.map((ending) => <p key={ending}>{ending}</p>)
            ) : (
              <p className="py-2">No endings yet</p>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
