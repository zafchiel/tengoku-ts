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
      <div className="flex gap-4 px-2">
        <div>
          <h5 className="font-semibold text-xl text-muted-foreground">
            Opening theme
          </h5>

          <div className="space-y-2">
            {theme.openings.map((opening) => (
              <p key={opening}>{opening}</p>
            ))}
          </div>
        </div>

        <Separator orientation="vertical" className="h-32" />
        
        <div>
          <h5 className="font-semibold text-xl text-muted-foreground">
            Ending theme
          </h5>

          <div className="space-y-2">
            {theme.endings.map((ending) => (
              <p key={ending}>{ending}</p>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
