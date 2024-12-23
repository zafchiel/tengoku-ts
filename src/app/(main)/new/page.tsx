import NewCarousel from "@/components/mian-page/new-carousel";

export default async function NewMainPage() {
return (
  <main className="py-14 px-6 grid grid-cols-1 md:grid-cols-[400px_1fr] min-h-screen items-center gap-8">
    <div>
      <h1 className="text-6xl font-bold">Bleach: Sennen Kessen-hen - Soukoku-tan</h1>
      <p className="text-muted-foreground">
        Bleach: Sennen Kessen-hen - Soukoku-tan
      </p>
    </div>
    <NewCarousel />
  </main>
)
}