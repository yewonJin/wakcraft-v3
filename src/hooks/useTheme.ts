import { useEffect, useState } from 'react'

const useTheme = () => {
  const [scrollY, setScrollY] = useState(0)
  const [lastScroll, setLastScroll] = useState(0)
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => {
      setScrollY(window.scrollY)

      if (Math.abs(lastScroll - scrollY) <= 40) return

      if (scrollY > lastScroll && lastScroll > 0) {
        setIsScrolled(false)
      } else {
        setIsScrolled(true)
      }

      setLastScroll(scrollY)
    }

    onScroll()

    document.addEventListener('scroll', onScroll)
  }, [scrollY])

  const handleModeClick = () => {
    const currentTheme = localStorage.getItem('theme')

    document.documentElement.classList.toggle('dark')
    localStorage.setItem('theme', currentTheme === 'dark' ? 'light' : 'dark')
  }

  return { scrollY, isScrolled, handleModeClick }
}

export default useTheme
