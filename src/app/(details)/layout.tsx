import Header from "@/components/ui/header"

export default function MainPageLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      <Header variant="transparent" />
      <div className="pt-14">{children}</div>
    </>
  )
}
