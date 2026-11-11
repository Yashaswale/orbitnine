import { Icon, Button, Eyebrow, Accent, Arrow } from './ui.jsx'
import { useEnquiryForm } from './EnquiryForm.jsx'
import mapImg from '../assets/map.webp'
import eduImg from '../assets/edu-photo.webp'
import valueImg from '../assets/value.webp'
import valueImgMobile from '../assets/value-m.webp'

const phases = [
  ['Today', 'Establishing the Ecosystem', 'Connecting customers, space companies and industry partners through orbital and suborbital access, space experiences and commercial space solutions.'],
  ['Near-term', 'Building the Platform', 'Developing our global space commerce platform, integrating service providers, technology partners and commercial opportunities across the space industry.'],
  ['Mid-term', 'Global Market Expansion', 'Expanding into strategic markets, establishing international partnerships and connecting governments, investors, institutions and commercial space enterprises.'],
  ['Future', 'Expanding Space Access', 'Establishing Orbit Nine Space Tourism as a dedicated venture, expanding access to suborbital, orbital and next-generation space experiences.'],
  ['Horizon', 'Beyond Earth’s Boundaries', 'Enabling access to orbital habitats, commercial space infrastructure, lunar exploration and the emerging off-Earth economy.'],
]

export function Roadmap() {
  return (
    <section className="roadmap" id="roadmap">
      <div className="container">
        <div className="roadmap__head">
          <div>
            <Eyebrow>Growth roadmap</Eyebrow>
            <h2 className="h-md">A Phased Journey from<Accent>Earth to Orbit</Accent></h2>
          </div>
          <p>
            Each phase builds on strategic partnerships, commercial opportunities and ecosystem development, creating a scalable foundation for long-term global growth.
          </p>
        </div>
        <ol className="timeline">
          {phases.map(([when, title, text], i) => (
            <li key={when} className={i === 0 ? 'is-current' : ''}>
              <span className="timeline__node" />
              <span className="eyebrow eyebrow--sm timeline__when">{when}</span>
              <h3>{title}</h3>
              <p>{text}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}

const gtm = [
  ['gtm-partner', 'Strategic Partnerships', 'Airlines, travel platforms, space providers, governments and industry leaders.'],
  ['gtm-platform', 'Technology Platform', 'Seamless booking, integration and customer experience.'],
  ['gtm-expansion', 'Global Expansion', 'Targeting new markets, regions and customer segments.'],
  ['gtm-eco', 'Ecosystem Collaboration', 'With mobility, tourism, research and space industry players.'],
]

export function GTM() {
  const { openForm } = useEnquiryForm()
  return (
    <section className="gtm">
      <div className="container gtm__inner">
        <div className="gtm__intro">
          <Eyebrow>Our GTM strategy</Eyebrow>
          <h2 className="h-md">From Market Access to <Accent>Global Scale</Accent></h2>
          <p>
            Our go-to-market strategy is built on strategic partnerships, platform technology and ecosystem
            collaboration, ensuring seamless access, scalability and long-term growth.
          </p>
          <button type="button" className="btn btn--ghost" onClick={() => openForm()}>Our GTM Approach →</button>
        </div>
        <div className="gtm__cards">
          {gtm.map(([icon, title, text]) => (
            <article className="gtm-card" key={title}>
              <span className="icon-box icon-box--60"><Icon name={icon} size={30} /></span>
              <h3>{title}</h3>
              <p>{text}</p>
              <button
                type="button"
                className="gtm-card__link"
                onClick={() => openForm('Industry / Strategic Partner', ['Global Market Entry & Business Development'])}
                style={{ background: 'none', border: 'none', padding: 0, font: 'inherit', cursor: 'pointer', textAlign: 'left', display: 'inline-flex', alignItems: 'center', gap: '8px' }}
              >
                <span>Learn more</span>
                <Arrow size={13} />
              </button>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

const reach = [['180+', 'Countries'], ['3,500+', 'Airports'], ['2,500+', 'Cities'], ['5,000+', 'Providers']]
const hubs = [
  ['gl-uae', 'HQ', 'Global Operations'],
  ['gl-partners', 'Strategic Partners', 'Across Continents'],
  ['gl-local', 'Local Expertise', 'Global Impact'],
]

export function GlobalReach() {
  const { openForm } = useEnquiryForm()
  return (
    <section className="global" id="global">
      <div className="container global__inner">
        <div className="global__intro">
          <Eyebrow>Global reach</Eyebrow>
          <h2 className="h-md">A Truly Global Platform</h2>
          <p>
            Through our partner network of Wipe Technologies we are connected through {' '}
            <span className="text-link">Global</span> land mobility segment across.
          </p>
          <dl className="global__stats">
            {reach.map(([v, l]) => (
              <div key={l}><dt>{v}</dt><dd>{l}</dd></div>
            ))}
          </dl>
          <Button onClick={() => openForm('Industry / Strategic Partner', ['Global Market Entry & Business Development'])}>Our Global Network</Button>
        </div>
        <div className="global__map">
          <img src={mapImg} alt="Illuminated world map with connection routes" loading="lazy" />
        </div>
        <ul className="global__hubs">
          {hubs.map(([icon, title, sub]) => (
            <li key={title}>
              <span className="orb orb--lg"><Icon name={icon} size={26} /></span>
              <div><strong>{title}</strong><span>{sub}</span></div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}

const programs = [
  ['edu-fellow', 'Space Fellowships', 'Hands-on research and real-world experience.'],
  ['edu-exec', 'Executive Programs', 'Space leadership for professionals.'],
  ['edu-masters', 'Space Masters Programs', 'Global education for future leaders.'],
  ['edu-exchange', 'Faculty & Student Exchange', 'Cross-institutional collaboration.'],
]
const values = [
  ['Stronger Economy', 'New industries, jobs and investment'],
  ['Greater Access', 'Space opportunities for more people'],
  ['A More Sustainable Future', 'Insight and infrastructure for a better planet'],
]

export function Education() {
  const { openForm } = useEnquiryForm()
  return (
    <section className="education starfield starfield--edu">
      <div className="container">
        <article className="media-card media-card--edu">
          <div className="media-card__media"><img src={eduImg} alt="Students building a small satellite with a mentor" loading="lazy" /></div>
          <div className="media-card__body">
            <Eyebrow>Education &amp; talent</Eyebrow>
            <h2 className="h-md">Inspire the Next Generation</h2>
            <p>
              Through fellowships, student exchange programs and hands-on experiences, we're building a global
              pipeline of future space leaders.
            </p>
            <button type="button" className="btn btn--ghost" onClick={() => openForm('Student / Researcher', ['Space Fellowships & Education'])}>Partner on Programs →</button>
          </div>
        </article>

        <div className="programs">
          {programs.map(([icon, title, text]) => (
            <article className="program-card" key={title}>
              <span className="icon-box icon-box--60"><Icon name={icon} size={30} /></span>
              <h3>{title}</h3>
              <p>{text}</p>
            </article>
          ))}
        </div>

        <article className="media-card media-card--value">
          <picture className="media-card__media">
            <source media="(max-width: 1180px)" srcSet={valueImgMobile} />
            <img src={valueImg} alt="Person on a ridge looking at the Milky Way" loading="lazy" />
          </picture>
          <div className="media-card__body">
            <Eyebrow>Long-term value</Eyebrow>
            <h2 className="h-md">Creating Lasting Value</h2>
            <p>
              We engage with investors, partners and governments to create long-term economic value, expand space
              infrastructure and make space opportunities accessible to more people.
            </p>
            <Button onClick={() => openForm('Investor / Family Office / Financial Institution', ['Investment & Capital Partnerships'])}>Our Global Reach</Button>
          </div>
          <ul className="value-list">
            {values.map(([t, s]) => (
              <li key={t}>
                <svg className="value-check" width="22" height="22" viewBox="0 0 22 22" aria-hidden="true">
                  <circle cx="11" cy="11" r="9.75" fill="rgba(40,140,90,0.12)" stroke="rgba(70,190,120,0.45)" strokeWidth="1" />
                  <path d="M7.5 11.2l2.3 2.3 4.7-4.8" fill="none" stroke="#3fb57a" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                <div><strong>{t}</strong><span>{s}</span></div>
              </li>
            ))}
          </ul>
        </article>
      </div>
    </section>
  )
}

const numbers = [
  ['$686B', 'Global space economy, 2025 (+12% year on year)', 'Space Foundation, 2026'],
  ['79%', 'Commercial share of the total ($544B)', 'Space Foundation, 2026'],
  ['$1.8T', 'Projected space economy by 2035', 'WEF / McKinsey, 2024'],
  ['317', 'Successful orbital launches in 2025', '2025 orbital launch record'],
]

export function Investors() {
  const { openForm } = useEnquiryForm()
  return (
    <section className="investors" id="investors">
      <div className="container investors__inner">
        <div className="investors__intro">
          <Eyebrow>For investors</Eyebrow>
          <h2 className="h-lg2">Investment &amp; <Accent>Growth Opportunities</Accent></h2>
          <p>
            Qualified investors get an opportunity to be a part of a trillion dollar industry building space economy from Today.
          </p>
          <div className="btn-row">
            <button type="button" className="btn btn--primary" onClick={() => openForm('Investor / Family Office / Financial Institution', ['Investment & Capital Partnerships'])}>Get In Touch →</button>
            <Button variant="glass" arrow={false} onClick={() => openForm('Investor / Family Office / Financial Institution', ['Investment & Capital Partnerships'])}>View Growth Roadmap</Button>
          </div>
        </div>
        <div className="numbers">
          <div className="numbers__head">
            <h3>The Opportunity in Numbers</h3>
            <span className="badge-live badge-live--data">2025 Data</span>
          </div>
          <div className="numbers__grid">
            {numbers.map(([v, d, s]) => (
              <div className="numbers__card" key={v}>
                <strong>{v}</strong>
                <p>{d}</p>
                <span>{s}</span>
              </div>
            ))}
          </div>
          <p className="numbers__src">
            Sources: Space Foundation Global Space Economy Report (2026); World Economic Forum &amp; McKinsey (2024);
            2025 orbital launch record.
          </p>
        </div>
      </div>
    </section>
  )
}

const social = {
  linkedin: <path d="M4 9h3.2v11H4zM5.6 3.5a1.8 1.8 0 1 1 0 3.6 1.8 1.8 0 0 1 0-3.6zM10 9h3v1.6c.5-.9 1.7-1.9 3.6-1.9 3.6 0 4.4 2.3 4.4 5.4V20h-3.2v-5.2c0-1.4 0-3-1.9-3s-2.1 1.4-2.1 2.9V20H10z" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />,
  x: <path d="M4 4l16 16M20 4L4 20" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />,
  instagram: <g fill="none" stroke="currentColor" strokeWidth="1.6"><rect x="3.5" y="3.5" width="17" height="17" rx="4.5" /><circle cx="12" cy="12" r="4" /><circle cx="17.2" cy="6.8" r=".6" fill="currentColor" /></g>,
  twitter: <path d="M21 6.2c-.7.3-1.4.5-2.1.6a3.6 3.6 0 0 0 1.6-2 7.3 7.3 0 0 1-2.3.9 3.6 3.6 0 0 0-6.2 3.3A10.3 10.3 0 0 1 4.5 5.2a3.6 3.6 0 0 0 1.1 4.8 3.6 3.6 0 0 1-1.6-.4 3.6 3.6 0 0 0 2.9 3.5 3.6 3.6 0 0 1-1.6.1 3.6 3.6 0 0 0 3.4 2.5A7.3 7.3 0 0 1 3 17.2a10.3 10.3 0 0 0 5.6 1.6c6.7 0 10.4-5.6 10.4-10.4v-.5c.8-.5 1.4-1.1 2-1.7z" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />,
  mail: <g fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round"><rect x="3" y="5" width="18" height="14" rx="2" /><path d="M3.5 6.5l8.5 6.5 8.5-6.5" /></g>,
}

export function Connect() {
  const { openForm } = useEnquiryForm()
  return (
    <section className="connect" id="contact">
      <div className="container connect__inner">
        <div className="connect__intro">
          <Eyebrow>Let's connect</Eyebrow>
          <h2 className="h-md">Let's Build What's Next</h2>
          <p>Partner with us, invest in the future, or explore opportunities to be part of the global space economy.</p>
          <button type="button" className="btn btn--glass" onClick={() => openForm()}>Partner With Us →</button>
        </div>
        <div className="connect__brand">
          <p className="connect__logo">ORBIT NINE</p>
          <p className="connect__powered">Powered by Wipe Technologies</p>
          <ul className="connect__links">
            {['Mobility', 'Technology', 'Space', 'Global Impact'].map((l) => <li key={l}><a href="#">{l}</a></li>)}
          </ul>
          <ul className="connect__social">
            {Object.entries(social).map(([k, svg]) => (
              <li key={k}>
                <a href="#" aria-label={k}>
                  <svg width="20" height="20" viewBox="0 0 24 24">{svg}</svg>
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}

export function Footer() {
  return (
    <footer className="footer">
      <p>© 2026 Orbit Nine. All rights reserved.</p>
    </footer>
  )
}
