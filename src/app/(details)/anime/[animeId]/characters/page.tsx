type AllCharactersPageProps = {
    params: {
        animeId: string;
    }
}

export default async function AllCharactersPage({ params: { animeId }}: AllCharactersPageProps) {
    return (
        {animeId}
    )
}