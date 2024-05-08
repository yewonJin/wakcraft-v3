export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="mx-auto">
      <title>왁크래프트 | 게임</title>
      {children}
    </div>
  )
}
