export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="mx-auto max-w-[1200px] px-4 pb-8 pt-24 xl:px-0 xl:pt-32">
      <title>왁크래프트 | 어드민</title>
      {children}
    </div>
  )
}
