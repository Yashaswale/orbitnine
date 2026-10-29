const iconFiles = import.meta.glob('../assets/icons/*.png', { eager: true, import: 'default' })

/** Raster icon extracted from the design; rendered with screen blending so its glow sits on any dark surface. */
export function Icon({ name, size, className = '' }) {
  const src = iconFiles[`../assets/icons/${name}.png`]
  return <img className={`ico ${className}`} src={src} width={size} height={size} alt="" aria-hidden="true" />
}

export function Arrow({ size = 14 }) {
  return (
    <svg className="arrow" width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

export function Button({ children, variant = 'ghost', href = '#', className = '', arrow = true }) {
  return (
    <a href={href} className={`btn btn--${variant} ${className}`}>
      <span>{children}</span>
      {arrow && <Arrow />}
    </a>
  )
}

export function Eyebrow({ children, className = '' }) {
  return <p className={`eyebrow ${className}`}>{children}</p>
}

export function Accent({ children }) {
  return <span className="accent">{children}</span>
}
