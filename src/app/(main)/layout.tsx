import JotaiProvider from "@/components/mianPage/jotaiProvider"

export default function MainPageLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <JotaiProvider>{children}</JotaiProvider>
}
