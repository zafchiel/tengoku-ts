import Link from "next/link";

export default function MainPage() {
  return (
    <>
      <main className="flex flex-col h-screen w-full px-2 pb-14 md:p-10 items-center justify-center">
        <h1 className="text-6xl">Tengoku</h1>
        <Link href="/legacy" className="underline">
          Legacy main page
        </Link>
      </main>
    </>
  );
}
