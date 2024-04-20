import { AnimeInfo } from "@/types";
import RelationCategory from "@/components/detailsPage/relation-category";

type RelationSectionProps = {
    animeInfo: AnimeInfo;
}

export default function RelationsSection({ animeInfo }: RelationSectionProps) {
    return (
        <section>
            <h3 className="text-3xl font-semibold">Relations</h3>
            <hr className="mb-2" />
            <div className="space-y-3 px-1 py-2">
                {animeInfo.relations.map((relation) => (
                    <RelationCategory category={relation.relation} entries={relation.entry} key={relation.relation}/>
                ))}
            </div>
        </section>
    );
}