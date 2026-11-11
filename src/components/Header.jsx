import { useEffect, useState } from 'react'
import { useEnquiryForm } from './EnquiryForm.jsx'

const links = [
  ['Services', '#services'],
  ['Space Tourism', '#tourism'],
  ['Ecosystem', '#ecosystem'],
  ['Partners', '#partners'],
  ['Global Reach', '#global'],
  ['Roadmap', '#roadmap'],
  ['Investors', '#investors'],
  ['Contact', '#contact'],
]

export default function Header() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const [active, setActive] = useState('#services')
  const { openForm } = useEnquiryForm()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
  }, [open])

  return (
    <header className={`header ${scrolled ? 'is-scrolled' : ''} ${open ? 'is-open' : ''}`}>
      <div className="header__inner container">
        <a href="#top" className="logo" aria-label="Orbit Nine home">ORBIT NINE</a>
        <nav className="nav" aria-label="Primary">
          {links.map(([label, href]) => (
            <a
              key={href}
              href={href}
              className={active === href ? 'is-active' : ''}
              onClick={() => { setActive(href); setOpen(false) }}
            >
              {label}
            </a>
          ))}
          <a href="#contact" className="btn btn--glass nav__cta-mobile" onClick={() => { openForm(); setOpen(false) }}>Connect with Orbit Nine</a>
        </nav>
        <button type="button" className="btn btn--glass header__cta" onClick={() => openForm()}>Connect with Orbit Nine →</button>
        <button
          className="burger"
          aria-label={open ? 'Close menu' : 'Open menu'}
          aria-expanded={open}
          onClick={() => setOpen(!open)}
        >
          <span /><span /><span />
        </button>
      </div>
    </header>
  )
}
