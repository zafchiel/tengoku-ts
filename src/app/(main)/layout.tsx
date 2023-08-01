import JotaiProvider from "@/components/mianPage/jotaiProvider"
import Header from "@/components/ui/header"

export default function MainPageLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <JotaiProvider>
      <Header />
      {children}
    </JotaiProvider>
  )
}
