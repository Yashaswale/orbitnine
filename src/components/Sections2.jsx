import { useState, useEffect } from 'react'
import { Icon, Button, Eyebrow, Accent, Arrow } from './ui.jsx'
import { useEnquiryForm } from './EnquiryForm.jsx'
import partnersImg from '../assets/partners.webp'
import satelliteImg from '../assets/satellite.webp'
import collabUniImg from '../assets/collab-uni.webp'
import collabInvestImg from '../assets/collab-invest.webp'
import collabGovImg from '../assets/collab-gov.webp'
import collabIndustryImg from '../assets/collab-industry.webp'

const eco = [
  ['eco-tech', 'Space Tech', 'Innovative technologies for a safer, more accessible future.'],
  ['eco-tourism', 'Space Tourism', 'Experiences for individuals and businesses.'],
  ['eco-investors', 'Investors & Opportunities', 'Capital for the next generation of space innovation.'],
  ['eco-partners', 'Global Partnerships', 'Connecting markets worldwide.'],
  ['eco-economy', 'Space Economy', 'Real-world impact on Earth and beyond.'],
  ['eco-infra', 'Infrastructure', 'Stations, launch systems and ground networks.'],
  ['eco-data', 'Data & Services', 'Real-time data and intelligence.'],
  ['eco-rnd', 'Research & Development', 'Advancing space technology and human potential.'],
]

const impact = [
  ['imp-access', 'Enable access & opportunity', 'Space for more people and markets'],
  ['imp-growth', 'Drive economic growth', 'New industries, jobs and revenue'],
  ['imp-partner', 'Strengthen partnerships across sectors', 'Industry, academia and government'],
  ['imp-sustain', 'Build a sustainable and inclusive future', 'Benefits on Earth and beyond'],
]

const stopWidths = [26, 52, 78, 100]

export function Ecosystem() {
  const [activeStep, setActiveStep] = useState(0)
  const [isPaused, setIsPaused] = useState(false)

  useEffect(() => {
    if (isPaused) return
    const interval = setInterval(() => {
      setActiveStep(prev => (prev + 1) % 4)
    }, 2400)
    return () => clearInterval(interval)
  }, [isPaused])

  return (
    <section className="ecosystem starfield starfield--eco" id="ecosystem">
      <div className="container">
        <Eyebrow>Explore our ecosystem</Eyebrow>
        <h2 className="h-lg">A Complete <Accent>Space Mobility Platform</Accent></h2>
        <p className="ecosystem__sub">We bring together people, technology and partners to fuel the space economy.</p>
        <div className="eco-grid">
          {eco.map(([icon, title, text]) => (
            <article className="eco-card" key={title}>
              <span className="icon-box icon-box--56"><Icon name={icon} size={30} /></span>
              <div>
                <h3>{title}</h3>
                <p>{text}</p>
              </div>
              <span className="eco-card__arrow" aria-hidden="true"><Arrow size={14} /></span>
            </article>
          ))}
        </div>

        <div
          className="impact"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          <div className="impact__head">
            <div>
              <Eyebrow>The bigger picture</Eyebrow>
              <h2 className="h-sm">From Access to <Accent>Impact</Accent></h2>
            </div>
            <p className="impact__note">We enable space mobility to create real-world benefits, on Earth and beyond.</p>
          </div>
          <div className="impact__row-wrap">
            <ol className="impact__row">
              {impact.map(([icon, title, sub], i) => {
                const isPassed = i <= activeStep
                const isCurrent = i === activeStep
                return (
                  <li
                    key={title}
                    className={`impact__item ${isPassed ? 'is-active' : ''} ${isCurrent ? 'is-current' : ''}`}
                    onClick={() => setActiveStep(i)}
                    style={{ cursor: 'pointer' }}
                    title={`Step ${i + 1}: ${title}`}
                  >
                    <span className="ring-58"><Icon name={icon} size={28} /></span>
                    <div>
                      <strong>{title}</strong>
                      <span>{sub}</span>
                    </div>
                  </li>
                )
              })}
            </ol>
            <div className="impact__bar" aria-hidden="true">
              <div className="impact__bar-track" />
              <div
                className="impact__bar-fill"
                style={{ width: `${stopWidths[activeStep]}%` }}
              >
                <span className="impact__bar-head" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export function Partnerships() {
  const { openForm } = useEnquiryForm()
  return (
    <section className="partnerships" id="partners">
      <div className="partnerships__media">
        <img src={partnersImg} alt="Launch site with a rocket at sunset" loading="lazy" />
      </div>
      <div className="container partnerships__content">
        <Eyebrow>Partnerships</Eyebrow>
        <h2 className="h-xl">Build the Future of Space <br className="br-desktop" /><Accent>Together</Accent></h2>
        <p className="partnerships__text">
          We collaborate with visionary organizations to create opportunities, accelerate innovation and
          shape the next era of space mobility.
        </p>
        <div className="btn-row">
          <button type="button" className="btn btn--primary" onClick={() => openForm('Industry / Strategic Partner', ['Space Industry Collaboration'])}>Partner With Us →</button>
          <Button variant="outline" arrow={false}>Explore Programs</Button>
        </div>
      </div>
    </section>
  )
}

const collabData = [
  {
    id: 'tech',
    icon: 'col-tech',
    tabTitle: 'Space Tech Companies',
    tabText: 'Build, innovate and scale next-gen solutions globally.',
    eyebrow: 'SPACE TECH COMPANIES',
    headline: 'Innovation Without Limits',
    desc: "We partner with space tech companies to bring breakthroughs to market, uniting technology, data and expertise to solve today's challenges and build tomorrow's possibilities.",
    image: satelliteImg,
    alt: 'Satellite orbiting Earth with a network of connections',
    ctaText: 'Partner With Us',
    audience: 'Space Technology Company',
    interest: 'Space Technology & Commercialisation',
  },
  {
    id: 'uni',
    icon: 'col-uni',
    tabTitle: 'Universities & Research',
    tabText: 'Research, talent and academic collaboration.',
    eyebrow: 'UNIVERSITIES & RESEARCH',
    headline: 'Research That Reaches Orbit',
    desc: 'We work with universities and research institutions on joint research, talent pipelines and academic collaboration, from microgravity experiments to mission data.',
    image: collabUniImg,
    alt: 'Researchers analyzing a holographic glowing Earth in mission control',
    ctaText: 'Partner With Us',
    audience: 'Research / Academic Institution',
    interest: 'Research & Innovation',
  },
  {
    id: 'invest',
    icon: 'col-invest',
    tabTitle: 'Investors & Opportunities',
    tabText: 'Fuel the next wave of space innovation.',
    eyebrow: 'INVESTORS ',
    headline: 'Fuel the Next Wave',
    desc: 'We partner with investors, family offices, sovereign wealth funds and institutional capital partners to scale programmes, platforms and ventures across the global space economy….',
    image: collabInvestImg,
    alt: 'Rocket launching into space above clouds and Earth',
    ctaText: 'Partner With Us',
    audience: 'Investor / Family Office / Financial Institution',
    interest: 'Investment & Capital Partnerships',
  },
  {
    id: 'gov',
    icon: 'col-gov',
    tabTitle: 'Governments & Institutions',
    tabText: 'Policy, infrastructure and strategic partnerships.',
    eyebrow: 'GOVERNMENTS & INSTITUTIONS',
    headline: 'Policy, Infrastructure, Access',
    desc: 'We support governments and institutions with policy, infrastructure and strategic partnerships that bring space capability, and its benefits, to more people.',
    image: collabGovImg,
    alt: 'Neoclassical grand government institutional palace illuminated at sunset',
    ctaText: 'Partner With Us',
    audience: 'Space Agency / Government Institution',
    interest: 'Government & Institutional Partnerships',
  },
  {
    id: 'industry',
    icon: 'col-industry',
    tabTitle: 'Industry Partners',
    tabText: 'Expand markets and global reach together.',
    eyebrow: 'INDUSTRY PARTNERS',
    headline: 'Build the Space Economy Together',
    desc: 'Space technology companies, aerospace manufacturers, research institutions and global industry leaders join our ecosystem to unlock new markets, accelerate commercial opportunities and advance the global space economy — from Earth to orbit.',
    image: collabIndustryImg,
    alt: 'Gold communication satellite with solar panels orbiting Earth',
    ctaText: 'Partner With Us',
    audience: 'Industry / Strategic Partner',
    interest: 'Space Industry Collaboration',
  },
]

export function Collaborate() {
  const [activeTab, setActiveTab] = useState(0)
  const [isPaused, setIsPaused] = useState(false)
  const { openForm } = useEnquiryForm()

  useEffect(() => {
    if (isPaused) return
    const timer = setInterval(() => {
      setActiveTab(prev => (prev + 1) % collabData.length)
    }, 5000)
    return () => clearInterval(timer)
  }, [isPaused])

  const active = collabData[activeTab]

  return (
    <section
      className="collab starfield starfield--collab"
      id="collaborate"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <div className="container">
        <Eyebrow>Collaborate. Innovate. Grow.</Eyebrow>
        <p className="collab__text">
          We work with space tech companies, universities, research institutions, governments and industry
          leaders to accelerate a thriving space economy.
        </p>
        <div className="collab__tabs" role="tablist" aria-label="Collaboration Audiences">
          {collabData.map((tab, i) => {
            const isSelected = i === activeTab
            return (
              <button
                type="button"
                className={`collab__tab ${isSelected ? 'is-active' : ''}`}
                role="tab"
                id={`collab-tab-${tab.id}`}
                aria-selected={isSelected}
                aria-controls={`collab-panel-${tab.id}`}
                key={tab.id}
                onClick={() => setActiveTab(i)}
                onMouseEnter={() => setActiveTab(i)}
                onFocus={() => setActiveTab(i)}
              >
                <span className="icon-box icon-box--44"><Icon name={tab.icon} size={26} /></span>
                <h3>{tab.tabTitle}</h3>
                <p>{tab.tabText}</p>
              </button>
            )
          })}
        </div>
        <article
          className="feature-card"
          id={`collab-panel-${active.id}`}
          role="tabpanel"
          aria-labelledby={`collab-tab-${active.id}`}
          key={active.id}
        >
          <div className="feature-card__media">
            <img src={active.image} alt={active.alt} loading="lazy" />
          </div>
          <div className="feature-card__body">
            <Eyebrow>{active.eyebrow}</Eyebrow>
            <h3 className="h-md">{active.headline}</h3>
            <p>{active.desc}</p>
            <button type="button" className="btn btn--ghost" onClick={() => openForm(active.audience, [active.interest])}>{active.ctaText} →</button>          </div>
        </article>
      </div>
    </section>
  )
}

