import { createContext, useContext, useState, useEffect, useRef, useCallback } from 'react'

/* ─────────────────────────── Context ─────────────────────────── */

const EnquiryFormContext = createContext(null)

export function useEnquiryForm() {
  return useContext(EnquiryFormContext)
}

export function EnquiryFormProvider({ children }) {
  const [isOpen, setIsOpen] = useState(false)
  const [preselect, setPreselect] = useState({ audience: '', interests: [] })

  const openForm = useCallback((audience = '', interests = []) => {
    setPreselect({ audience, interests: Array.isArray(interests) ? interests : [interests] })
    setIsOpen(true)
  }, [])

  const closeForm = useCallback(() => setIsOpen(false), [])

  return (
    <EnquiryFormContext.Provider value={{ openForm, closeForm, isOpen }}>
      {children}
      {isOpen && <EnquiryFormModal preselect={preselect} onClose={closeForm} />}
    </EnquiryFormContext.Provider>
  )
}

/* ─────────────────────────── Data ─────────────────────────── */

const AUDIENCES = [
  'Space Technology Company',
  'Aerospace / Space Industry Company',
  'Space Agency / Government Institution',
  'Investor / Family Office / Financial Institution',
  'Research / Academic Institution',
  'Industry / Strategic Partner',
  'Individual',
  'Space Enthusiast',
  'Astronaut / Aspiring Astronaut',
  'Student / Researcher',
  'Other',
]

const INTERESTS = [
  'Space Technology & Commercialisation',
  'Space Tourism & Experiences',
  'Orbital & Suborbital Access',
  'Zero-Gravity Experiences',
  'Investment & Capital Partnerships',
  'Global Market Entry & Business Development',
  'Government & Institutional Partnerships',
  'Space Industry Collaboration',
  'Space Fellowships & Education',
  'Research & Innovation',
  'Other',
]

const COUNTRIES = [
  'Afghanistan', 'Argentina', 'Australia', 'Austria', 'Belgium', 'Brazil', 'Canada', 'Chile',
  'China', 'Colombia', 'Czech Republic', 'Denmark', 'Egypt', 'Finland', 'France', 'Germany',
  'Greece', 'Hong Kong SAR', 'India', 'Indonesia', 'Ireland', 'Israel', 'Italy', 'Japan',
  'Kazakhstan', 'Kenya', 'Malaysia', 'Mexico', 'Netherlands', 'New Zealand', 'Nigeria',
  'Norway', 'Pakistan', 'Philippines', 'Poland', 'Portugal', 'Qatar', 'Russia', 'Saudi Arabia',
  'Singapore', 'South Africa', 'South Korea', 'Spain', 'Sweden', 'Switzerland', 'Thailand',
  'Turkey', 'Ukraine', 'United Arab Emirates', 'United Kingdom', 'United States', 'Vietnam', 'Other',
]

const CONTACT_METHODS = ['Email', 'Phone', 'WhatsApp']

/* ─────────────── Conditional field configs ─────────────── */

function getConditionalFields(audience) {
  switch (audience) {
    case 'Investor / Family Office / Financial Institution':
      return [
        { id: 'investmentInterests', label: 'Investment interests', type: 'text', required: false },
        { id: 'engagementType', label: 'Preferred engagement type', type: 'text', required: false },
        { id: 'investmentFocus', label: 'Approximate investment focus', type: 'text', required: false },
      ]
    case 'Space Technology Company':
    case 'Aerospace / Space Industry Company':
      return [
        { id: 'technologyCategory', label: 'Technology or capability category', type: 'text', required: false },
        { id: 'productDescription', label: 'Product / service description', type: 'textarea', required: false },
        { id: 'collaborationObjective', label: 'Collaboration objective', type: 'text', required: false },
      ]
    case 'Individual':
    case 'Space Enthusiast':
      return [
        {
          id: 'preferredExperience', label: 'Preferred experience', type: 'select', required: false,
          options: ['Suborbital', 'Orbital', 'Zero-Gravity', 'General Interest'],
        },
        { id: 'expectedTimeframe', label: 'Expected timeframe', type: 'text', required: false },
      ]
    case 'Astronaut / Aspiring Astronaut':
      return [
        { id: 'experienceLevel', label: 'Current experience level', type: 'text', required: false },
        { id: 'qualifications', label: 'Relevant qualifications / training', type: 'textarea', required: false },
        { id: 'programSought', label: 'Programme or opportunity sought', type: 'text', required: false },
      ]
    case 'Space Agency / Government Institution':
      return [
        { id: 'department', label: 'Department or institution', type: 'text', required: false },
        { id: 'cooperationArea', label: 'Potential area of cooperation', type: 'text', required: false },
      ]
    case 'Student / Researcher':
      return [
        {
          id: 'educationLevel', label: 'Current education level', type: 'select', required: false,
          options: ['Undergraduate', 'Postgraduate', 'PhD / Doctoral', 'Post-Doctoral', 'Other'],
        },
        { id: 'fieldOfStudy', label: 'Field of study / research', type: 'text', required: false },
        { id: 'programInterest', label: 'Fellowship or programme of interest', type: 'text', required: false },
      ]
    default:
      return []
  }
}

function showCompanyField(audience) {
  return [
    'Space Technology Company', 'Aerospace / Space Industry Company',
    'Space Agency / Government Institution', 'Investor / Family Office / Financial Institution',
    'Research / Academic Institution', 'Industry / Strategic Partner',
  ].includes(audience)
}

/* ─────────────────────────── Helpers ─────────────────────────── */

function initialFormState(preselect) {
  return {
    audience: preselect.audience || '',
    interests: preselect.interests || [],
    fullName: '',
    email: '',
    phone: '',
    company: '',
    linkedin: '',
    country: '',
    contactMethod: '',
    enquiryText: '',
    privacy: false,
    honeypot: '',
    // conditional
    investmentInterests: '', engagementType: '', investmentFocus: '',
    technologyCategory: '', productDescription: '', collaborationObjective: '',
    preferredExperience: '', expectedTimeframe: '',
    experienceLevel: '', qualifications: '', programSought: '',
    department: '', cooperationArea: '',
    educationLevel: '', fieldOfStudy: '', programInterest: '',
  }
}

/* ─────────────────────────── Modal ─────────────────────────── */

export function EnquiryFormModal({ preselect, onClose }) {
  const [step, setStep] = useState(1) // 1 = audience+interests, 2 = contact+conditional, 3 = success
  const [form, setForm] = useState(() => initialFormState(preselect))
  const [errors, setErrors] = useState({})
  const [submitting, setSubmitting] = useState(false)
  const [countryQuery, setCountryQuery] = useState('')
  const overlayRef = useRef(null)
  const modalRef = useRef(null)

  // Sync preselect when it changes (e.g. opened from different CTA)
  useEffect(() => {
    setForm(initialFormState(preselect))
    setStep(1)
    setErrors({})
  }, [preselect])

  // Lock body scroll
  useEffect(() => {
    document.body.style.overflow = 'hidden'
    return () => { document.body.style.overflow = '' }
  }, [])

  // Close on Escape
  useEffect(() => {
    const handler = (e) => { if (e.key === 'Escape') onClose() }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [onClose])

  // Click outside to close
  const handleOverlayClick = (e) => {
    if (e.target === overlayRef.current) onClose()
  }

  const set = (field, value) => setForm(prev => ({ ...prev, [field]: value }))

  const toggleInterest = (interest) => {
    setForm(prev => ({
      ...prev,
      interests: prev.interests.includes(interest)
        ? prev.interests.filter(i => i !== interest)
        : [...prev.interests, interest],
    }))
  }

  /* ── Validation ── */
  const validateStep1 = () => {
    const e = {}
    if (!form.audience) e.audience = 'Please select who you are enquiring as.'
    if (form.interests.length === 0) e.interests = 'Please select at least one area of interest.'
    setErrors(e)
    return Object.keys(e).length === 0
  }

  const validateStep2 = () => {
    const e = {}
    if (!form.fullName.trim()) e.fullName = 'Full name is required.'
    if (!form.email.trim()) {
      e.email = 'Email address is required.'
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      e.email = 'Please enter a valid email address.'
    }
    if (!form.phone.trim()) e.phone = 'Contact number is required.'
    if (!form.country) e.country = 'Please select a country or region.'
    if (!form.privacy) e.privacy = 'Please accept the privacy policy to continue.'
    setErrors(e)
    return Object.keys(e).length === 0
  }

  const handleNext = () => {
    if (validateStep1()) setStep(2)
  }

  const handleBack = () => { setStep(1); setErrors({}) }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!validateStep2()) return
    // Honeypot check (spam bots fill hidden fields)
    if (form.honeypot) return

    setSubmitting(true)

    const payload = {
      timestamp: new Date().toLocaleString(),
      audience: form.audience,
      interests: form.interests.join(', '),
      fullName: form.fullName,
      email: form.email,
      phone: form.phone,
      company: form.company || 'N/A',
      linkedin: form.linkedin || 'N/A',
      country: form.country,
      contactMethod: form.contactMethod || 'No preference',
      enquiryText: form.enquiryText || 'None',
      additionalDetails: [
        form.investmentInterests && `Investment Interests: ${form.investmentInterests}`,
        form.engagementType && `Engagement: ${form.engagementType}`,
        form.investmentFocus && `Investment Focus: ${form.investmentFocus}`,
        form.technologyCategory && `Tech Category: ${form.technologyCategory}`,
        form.productDescription && `Product: ${form.productDescription}`,
        form.collaborationObjective && `Objective: ${form.collaborationObjective}`,
        form.preferredExperience && `Preferred Experience: ${form.preferredExperience}`,
        form.expectedTimeframe && `Timeframe: ${form.expectedTimeframe}`,
        form.experienceLevel && `Experience Level: ${form.experienceLevel}`,
        form.qualifications && `Qualifications: ${form.qualifications}`,
        form.programSought && `Program: ${form.programSought}`,
        form.department && `Department: ${form.department}`,
        form.cooperationArea && `Area: ${form.cooperationArea}`,
        form.educationLevel && `Education: ${form.educationLevel}`,
        form.fieldOfStudy && `Field: ${form.fieldOfStudy}`,
        form.programInterest && `Program Interest: ${form.programInterest}`,
      ].filter(Boolean).join(' | ') || 'N/A',
    }

    const scriptUrl = import.meta.env.VITE_GOOGLE_SHEETS_URL || 'https://script.google.com/macros/s/AKfycbxPO2dPCbXKhuiVP50jacLzAtvXFJwvOhuynTcLa0aHkC4ACievTErptCC0XAFrXrH2SQ/exec'

    try {
      if (scriptUrl) {
        await fetch(scriptUrl, {
          method: 'POST',
          mode: 'no-cors',
          headers: { 'Content-Type': 'text/plain;charset=utf-8' },
          body: JSON.stringify(payload),
        })
      } else {
        await new Promise(resolve => setTimeout(resolve, 800))
      }
      setStep(3)
    } catch (err) {
      console.error('Submission error:', err)
      setStep(3)
    } finally {
      setSubmitting(false)
    }
  }

  /* ── Filtered countries ── */
  const filteredCountries = COUNTRIES.filter(c =>
    c.toLowerCase().includes(countryQuery.toLowerCase())
  )

  const conditionalFields = getConditionalFields(form.audience)

  return (
    <div className="ef-overlay" ref={overlayRef} onClick={handleOverlayClick} role="dialog" aria-modal="true" aria-label="Enquiry Form">
      <div className="ef-modal" ref={modalRef}>
        {/* Header */}
        <div className="ef-header">
          <span className="ef-brand">ORBIT NINE</span>
          <button className="ef-close" onClick={onClose} aria-label="Close enquiry form">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <path d="M18 6L6 18M6 6l12 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            </svg>
          </button>
        </div>

        {/* Progress — only on steps 1 and 2 */}
        {step < 3 && (
          <div className="ef-progress" aria-label={`Step ${step} of 2`}>
            <div className={`ef-progress__step ${step >= 1 ? 'is-active' : ''}`}>
              <span>1</span>
              <span className="ef-progress__label">Your Profile</span>
            </div>
            <div className="ef-progress__line" />
            <div className={`ef-progress__step ${step >= 2 ? 'is-active' : ''}`}>
              <span>2</span>
              <span className="ef-progress__label">Contact Details</span>
            </div>
          </div>
        )}

        {/* ── Step 1 ── */}
        {step === 1 && (
          <div className="ef-body">
            <h2 className="ef-heading">Let's Build What's Next.</h2>
            <p className="ef-subheading">Connect with our team to explore opportunities across the global commercial space ecosystem.</p>

            {/* A. Audience */}
            <div className={`ef-field ${errors.audience ? 'has-error' : ''}`}>
              <label className="ef-label" htmlFor="ef-audience">
                I am enquiring as <span className="ef-required">*</span>
              </label>
              <div className="ef-select-wrap">
                <select
                  id="ef-audience"
                  className="ef-select"
                  value={form.audience}
                  onChange={e => set('audience', e.target.value)}
                >
                  <option value="">Select your role or organisation type…</option>
                  {AUDIENCES.map(a => <option key={a} value={a}>{a}</option>)}
                </select>
                <svg className="ef-select-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                  <path d="M6 9l6 6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
              {errors.audience && <p className="ef-error">{errors.audience}</p>}
            </div>

            {/* B. Interests */}
            <div className={`ef-field ${errors.interests ? 'has-error' : ''}`}>
              <label className="ef-label">
                What are you interested in? <span className="ef-required">*</span>
              </label>
              <div className="ef-pills" role="group" aria-label="Select your areas of interest">
                {INTERESTS.map(interest => (
                  <button
                    key={interest}
                    type="button"
                    className={`ef-pill ${form.interests.includes(interest) ? 'is-active' : ''}`}
                    onClick={() => toggleInterest(interest)}
                    aria-pressed={form.interests.includes(interest)}
                  >
                    {interest}
                  </button>
                ))}
              </div>
              {errors.interests && <p className="ef-error">{errors.interests}</p>}
            </div>

            <div className="ef-actions">
              <button type="button" className="ef-btn ef-btn--primary" onClick={handleNext}>
                Continue <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
              </button>
            </div>
          </div>
        )}

        {/* ── Step 2 ── */}
        {step === 2 && (
          <form className="ef-body" onSubmit={handleSubmit} noValidate>
            <h2 className="ef-heading">Contact Details</h2>
            <p className="ef-subheading">Tell us a little about yourself so we can connect you with the right team.</p>

            {/* Honeypot — hidden from humans */}
            <input
              type="text"
              name="website"
              value={form.honeypot}
              onChange={e => set('honeypot', e.target.value)}
              tabIndex={-1}
              autoComplete="off"
              className="ef-honeypot"
              aria-hidden="true"
            />

            <div className="ef-grid-2">
              {/* Full Name */}
              <div className={`ef-field ${errors.fullName ? 'has-error' : ''}`}>
                <label className="ef-label" htmlFor="ef-fullname">
                  Full Name <span className="ef-required">*</span>
                </label>
                <input
                  id="ef-fullname"
                  type="text"
                  className="ef-input"
                  placeholder="Your full name"
                  value={form.fullName}
                  onChange={e => set('fullName', e.target.value)}
                  autoComplete="name"
                />
                {errors.fullName && <p className="ef-error">{errors.fullName}</p>}
              </div>

              {/* Email */}
              <div className={`ef-field ${errors.email ? 'has-error' : ''}`}>
                <label className="ef-label" htmlFor="ef-email">
                  Business Email Address <span className="ef-required">*</span>
                </label>
                <input
                  id="ef-email"
                  type="email"
                  className="ef-input"
                  placeholder="you@company.com"
                  value={form.email}
                  onChange={e => set('email', e.target.value)}
                  autoComplete="email"
                />
                {errors.email && <p className="ef-error">{errors.email}</p>}
              </div>

              {/* Phone */}
              <div className={`ef-field ${errors.phone ? 'has-error' : ''}`}>
                <label className="ef-label" htmlFor="ef-phone">
                  Contact Number / WhatsApp <span className="ef-required">*</span>
                </label>
                <input
                  id="ef-phone"
                  type="tel"
                  className="ef-input"
                  placeholder="+1 234 567 8900"
                  value={form.phone}
                  onChange={e => set('phone', e.target.value)}
                  autoComplete="tel"
                />
                {errors.phone && <p className="ef-error">{errors.phone}</p>}
              </div>

              {/* Company (conditional) */}
              {showCompanyField(form.audience) && (
                <div className="ef-field">
                  <label className="ef-label" htmlFor="ef-company">Company / Organisation</label>
                  <input
                    id="ef-company"
                    type="text"
                    className="ef-input"
                    placeholder="Your organisation name"
                    value={form.company}
                    onChange={e => set('company', e.target.value)}
                    autoComplete="organization"
                  />
                </div>
              )}

              {/* LinkedIn Handle / Profile */}
              <div className="ef-field">
                <label className="ef-label" htmlFor="ef-linkedin">LinkedIn Profile / Handle</label>
                <input
                  id="ef-linkedin"
                  type="text"
                  className="ef-input"
                  placeholder="https://linkedin.com/in/username"
                  value={form.linkedin}
                  onChange={e => set('linkedin', e.target.value)}
                />
              </div>

              {/* Country */}
              <div className={`ef-field ${errors.country ? 'has-error' : ''}`}>
                <label className="ef-label" htmlFor="ef-country">
                  Country / Region <span className="ef-required">*</span>
                </label>
                <input
                  id="ef-country-search"
                  type="text"
                  className="ef-input ef-input--search"
                  placeholder="Search country…"
                  value={countryQuery}
                  onChange={e => setCountryQuery(e.target.value)}
                />
                <div className="ef-select-wrap">
                  <select
                    id="ef-country"
                    className="ef-select"
                    value={form.country}
                    onChange={e => set('country', e.target.value)}
                    size={countryQuery ? Math.min(filteredCountries.length + 1, 6) : 1}
                  >
                    <option value="">Select country / region…</option>
                    {filteredCountries.map(c => <option key={c} value={c}>{c}</option>)}
                  </select>
                  {!countryQuery && (
                    <svg className="ef-select-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                      <path d="M6 9l6 6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  )}
                </div>
                {errors.country && <p className="ef-error">{errors.country}</p>}
              </div>

              {/* Preferred contact method */}
              <div className="ef-field">
                <label className="ef-label" htmlFor="ef-contact-method">Preferred Contact Method</label>
                <div className="ef-select-wrap">
                  <select
                    id="ef-contact-method"
                    className="ef-select"
                    value={form.contactMethod}
                    onChange={e => set('contactMethod', e.target.value)}
                  >
                    <option value="">No preference</option>
                    {CONTACT_METHODS.map(m => <option key={m} value={m}>{m}</option>)}
                  </select>
                  <svg className="ef-select-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                    <path d="M6 9l6 6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
              </div>
            </div>

            {/* Conditional fields */}
            {conditionalFields.length > 0 && (
              <div className="ef-conditional">
                <div className="ef-conditional__divider">
                  <span>Additional Details</span>
                </div>
                <div className="ef-grid-2">
                  {conditionalFields.map(field => (
                    <div className="ef-field" key={field.id} style={field.type === 'textarea' ? { gridColumn: '1 / -1' } : {}}>
                      <label className="ef-label" htmlFor={`ef-${field.id}`}>
                        {field.label}
                        {field.required && <span className="ef-required">*</span>}
                      </label>
                      {field.type === 'textarea' ? (
                        <textarea
                          id={`ef-${field.id}`}
                          className="ef-textarea"
                          rows={3}
                          placeholder={`Enter ${field.label.toLowerCase()}…`}
                          value={form[field.id]}
                          onChange={e => set(field.id, e.target.value)}
                        />
                      ) : field.type === 'select' ? (
                        <div className="ef-select-wrap">
                          <select
                            id={`ef-${field.id}`}
                            className="ef-select"
                            value={form[field.id]}
                            onChange={e => set(field.id, e.target.value)}
                          >
                            <option value="">Select…</option>
                            {field.options.map(o => <option key={o} value={o}>{o}</option>)}
                          </select>
                          <svg className="ef-select-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                            <path d="M6 9l6 6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                          </svg>
                        </div>
                      ) : (
                        <input
                          id={`ef-${field.id}`}
                          type="text"
                          className="ef-input"
                          placeholder={`Enter ${field.label.toLowerCase()}…`}
                          value={form[field.id]}
                          onChange={e => set(field.id, e.target.value)}
                        />
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Enquiry text */}
            <div className="ef-field" style={{ marginTop: '1.25rem' }}>
              <label className="ef-label" htmlFor="ef-enquiry">Tell Us Briefly About Your Enquiry</label>
              <textarea
                id="ef-enquiry"
                className="ef-textarea"
                rows={4}
                placeholder="Share any additional context about your enquiry…"
                value={form.enquiryText}
                onChange={e => set('enquiryText', e.target.value)}
              />
            </div>

            {/* Privacy */}
            <div className={`ef-field ef-field--check ${errors.privacy ? 'has-error' : ''}`}>
              <label className="ef-checkbox">
                <input
                  type="checkbox"
                  checked={form.privacy}
                  onChange={e => set('privacy', e.target.checked)}
                />
                <span className="ef-checkbox__box" aria-hidden="true" />
                <span className="ef-checkbox__label">
                  I agree to the{' '}
                  <a href="#" className="ef-link" onClick={e => e.stopPropagation()}>Privacy Policy</a>{' '}
                  and consent to Orbit Nine processing my data to respond to this enquiry.
                  <span className="ef-required"> *</span>
                </span>
              </label>
              {errors.privacy && <p className="ef-error">{errors.privacy}</p>}
            </div>

            {errors.submit && <p className="ef-error ef-error--global">{errors.submit}</p>}

            <div className="ef-actions ef-actions--2">
              <button type="button" className="ef-btn ef-btn--ghost" onClick={handleBack}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M19 12H5M11 6l-6 6 6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
                Back
              </button>
              <button type="submit" className="ef-btn ef-btn--primary" disabled={submitting}>
                {submitting ? (
                  <span className="ef-spinner" aria-label="Submitting…" />
                ) : (
                  <>Submit Enquiry →</>
                )}
              </button>
            </div>
          </form>
        )}

        {/* ── Step 3: Success ── */}
        {step === 3 && (
          <div className="ef-body ef-body--success">
            <div className="ef-success-icon" aria-hidden="true">
              <svg width="52" height="52" viewBox="0 0 52 52" fill="none">
                <circle cx="26" cy="26" r="25" stroke="rgba(74,150,255,0.35)" strokeWidth="1.5" />
                <circle cx="26" cy="26" r="19" fill="rgba(74,150,255,0.08)" stroke="rgba(74,150,255,0.5)" strokeWidth="1" />
                <path d="M17 26.5l6.5 6.5 11.5-13" stroke="#4a96ff" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
            <h2 className="ef-heading">Thank You for Connecting.</h2>
            <p className="ef-subheading">Our team will be in touch regarding your enquiry.</p>
            <button type="button" className="ef-btn ef-btn--ghost" onClick={onClose}>
              Close
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
