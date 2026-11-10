import { useState, useEffect } from 'react'
import { Icon, Button, Eyebrow, Accent, Arrow } from './ui.jsx'
import seg1 from '../assets/seg1.webp'
import seg2 from '../assets/seg2.webp'
import seg3 from '../assets/seg3.webp'
import tourismImg from '../assets/tourism.webp'

const stats = [
  ['Growth', '~9%', 'Average yearly growth, outpacing global GDP'],
  ['Today', '3', 'Space segments active now: orbital, suborbital, zero-g'],
  ['Network', '180+', 'Countries reached through our partner network'],
]

export function Hero() {
  return (
    <section className="hero" id="top">
      <div className="container hero__content">
        <h1 className="hero__title">
          Powering the Global <br />
          <Accent>Commercial Space</Accent> <br />
          Ecosystem
        </h1>
        <p className="hero__text">
          Welcome to the future of Space Economy
        </p>
        <Button variant="primary" className="hero__btn" href="#ecosystem">Explore Our Ecosystem</Button>
      </div>
    </section>
  )
}

const services = [
  ['svc-tourism', 'Space Tourism'],
  ['svc-orbital', 'Orbital Access'],
  ['svc-suborbital', 'Suborbital'],
  ['svc-zerog', 'Zero Gravity'],
  ['svc-tech', 'Space Tech'],
  ['svc-education', 'Education'],
  ['svc-global', 'Global Reach'],
]

export function Services() {
  const [activeService, setActiveService] = useState(3) // Default to Zero Gravity matching Image 1
  const [isPaused, setIsPaused] = useState(false)

  useEffect(() => {
    if (isPaused) return
    const timer = setInterval(() => {
      setActiveService(prev => (prev + 1) % services.length)
    }, 5000)
    return () => clearInterval(timer)
  }, [isPaused])

  return (
    <section
      className="services"
      id="services"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <div className="container services__list" role="tablist" aria-label="Services Navigation">
        {services.map(([icon, label], i) => {
          const isActive = i === activeService
          return (
            <button
              type="button"
              key={label}
              className={`services__item ${isActive ? 'is-active' : ''}`}
              role="tab"
              aria-selected={isActive}
              onClick={() => setActiveService(i)}
              onMouseEnter={() => setActiveService(i)}
            >
              <span className="services__icon-wrap">
                <Icon name={icon} size={36} />
              </span>
              <span className="services__label">{label}</span>
              <span className="services__indicator" aria-hidden="true" />
            </button>
          )
        })}
      </div>
      <div className="container">
        <dl className="hero__stats">
          {stats.map(([label, value, desc]) => (
            <div className="hero__stat" key={label}>
              <dt className="eyebrow eyebrow--sm">{label}</dt>
              <dd>
                <span className="hero__stat-value">{value}</span>
                <span className="hero__stat-desc">{desc}</span>
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  )
}

const segments = [
  [seg1, 'Zero Gravity', 'Unique microgravity experiences for research, training and commercial use.', 'Explore Zero Gravity'],
  [seg2, 'Suborbital Experiences', 'High-altitude journeys and short-duration spaceflights for adventure and research.', 'Explore Suborbital'],
  [seg3, 'Orbital Access', 'Enabling orbital and suborbital missions through strategic partners and commercial providers.', 'Explore Orbital Access'],
]

export function CoreSegments() {
  return (
    <section className="core starfield starfield--core">
      <div className="core__inner">
        <div className="core__intro">
          <Eyebrow>Our core segments (today)</Eyebrow>
          <h2 className="h-md core__title">Building the Foundation for a <Accent>Connected Planet</Accent></h2>
          <p className="core__text">
            We currently focus on three key space segments, laying the groundwork for a larger vision
            that includes space tourism in the future.
          </p>
          <Button href="#roadmap">See the Roadmap</Button>
        </div>
        <div className="core__cards">
          {segments.map(([img, title, text, link]) => (
            <article className="seg-card" key={title}>
              <div className="seg-card__media">
                <img src={img} alt="" loading="lazy" />
                {/* <span className="badge-live">Live</span> */}
                <span className="seg-card__icon"><Icon name="seg-sat" size={24} /></span>
              </div>
              <div className="seg-card__body">
                <h3>{title}</h3>
                <p>{text}</p>
                <a href="#" className="link">{link} <Arrow size={12} /></a>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

const journeys = [
  ['tour-orbital', 'Orbital Flights', 'Experience Earth from space'],
  ['tour-suborbital', 'Suborbital Journeys', 'Short, breathtaking, accessible'],
  ['tour-zerog', 'Zero Gravity Experiences', 'Float. Explore. Discover.'],
]

export function Tourism() {
  return (
    <section className="tourism" id="tourism">
      <div className="tourism__media">
        <img src={tourismImg} alt="Passengers floating weightless inside a space station module" loading="lazy" />
      </div>
      <div className="tourism__content">
        <div className="tourism__copy">
          <Eyebrow>Future vision</Eyebrow>
          <h2 className="tourism__title">Space Tourism</h2>
          <p className="tourism__lead">Not just a destination. A new perspective.</p>
          {/* <p className="tourism__text">
            In the long term, Orbit Nine will launch a dedicated space tourism company, offering suborbital
            and orbital experiences for individuals, corporates and research partners.
          </p> */}
          <Button>The Journey Awaits</Button>
        </div>
        <ul className="tourism__list">
          {journeys.map(([icon, title, sub]) => (
            <li key={title}>
              <span className="orb"><Icon name={icon} size={30} /></span>
              <div>
                <strong>{title}</strong>
                <span>{sub}</span>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
