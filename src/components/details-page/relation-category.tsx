import Link from "next/link";

type RelationCategoryProps = {
	category: string;
	entries: {
		mal_id: number;
		type: string;
		name: string;
		url: string;
	}[];
};

export default function RelationCategory({
	category,
	entries,
}: RelationCategoryProps) {
	return (
		<div className="grid grid-cols-[80px_1fr] md:grid-cols-[150px_1fr] gap-3">
			<p className="font-light">{category}:</p>
			<div className="flex gap-2 flex-col">
				{entries.map((entry) => (
					<Link
						href={`/anime/${entry.mal_id}`}
						key={entry.mal_id}
						className="underline max-w-max hover:text-slate-400"
					>
						{entry.name}
					</Link>
				))}
			</div>
			<hr className="col-span-2" />
		</div>
	);
}
