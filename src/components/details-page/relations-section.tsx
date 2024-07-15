import type { AnimeInfo } from "@/types";
import RelationCategory from "@/components/details-page/relation-category";

type RelationSectionProps = {
	animeRelations: AnimeInfo["relations"];
};

export default function RelationsSection({
	animeRelations,
}: RelationSectionProps) {
	return (
		<section id="relations" className="scroll-mt-40">
			<h3 className="text-3xl font-semibold">Relations</h3>
			<hr className="mb-2" />
			<div className="space-y-3 px-1 py-2">
				{animeRelations.length > 0 ? (
					animeRelations.map((relation) => (
						<RelationCategory
							category={relation.relation}
							entries={relation.entry}
							key={relation.relation}
						/>
					))
				) : (
					<p className="py-2">This anime has no related entries yet</p>
				)}
			</div>
		</section>
	);
}
