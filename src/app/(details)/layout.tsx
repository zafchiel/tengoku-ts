import Header from "@/components/ui/header"

export default function MainPageLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      <Header variant="transparent" />
      <main>{children}</main>
    </>
  )
}
