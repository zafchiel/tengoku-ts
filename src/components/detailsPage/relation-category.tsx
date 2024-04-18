type RelationCategoryProps = {
    category: string;
    entries: {
        mal_id: number;
        type: string;
        name: string;
        url: string;
    }[];
}

export default function RelationCategory({ category, entries }: RelationCategoryProps) {
    return (
        <div className="flex gap-3">
            <p>{category}</p>
            <div className="flex gap-2">
                {entries.map((entry) => (
                    <p key={entry.mal_id}>{entry.name}</p>
                ))}
            </div>
        </div>
    );
}