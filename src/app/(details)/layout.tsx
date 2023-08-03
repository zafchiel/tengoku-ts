export default function MainPageLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      <main>{children}</main>
    </>
  )
}
