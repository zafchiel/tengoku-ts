import { AnimeInfo } from "@/types";
import RelationCategory from "@/components/detailsPage/relation-category";

const filterRelations = (anime: AnimeInfo) => {
    const result: {
        [key: string]: {
            mal_id: number;
            type: string;
            name: string;
            url: string;
        }[];
    } = {};
    for (const v of anime.relations) {
        const key: string = v.relation;
        if (key in result) {
            result[key].push(...v.entry);
        } else {
            result[key] = [];
            result[key].push(...v.entry);
        }
    }

    return Object.entries(result);
};

type RelationSectionProps = {
    animeInfo: AnimeInfo;
}

export default function RelationsSection({ animeInfo }: RelationSectionProps) {
    const relations = filterRelations(animeInfo);

    return (
        <section>
            <h3 className="text-3xl">Relations</h3>
            {relations.map((category) => (
                <RelationCategory category={category[0]} entries={category[1]} key={category[0]}/>
            ))}
        </section>
    );
}