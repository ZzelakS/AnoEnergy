'use client'

import { FormEvent, useEffect, useMemo, useState } from 'react'
import { useAurora } from './AuroraContext'
import { BRAND } from '@/config/site'

const ENQUIRIES = [
  'Procurement',
  'Distribution & Supply',
  'System Design & Feasibility',
  'Agriculture & Agro-Processing',
  'Property & Estate Development',
  'Fleet & Mobility',
  'Investment & Partnership',
  'Government & Development Finance',
  'Media',
]

const PARAM: Record<string, string> = {
  'system-design': 'System Design & Feasibility',
  agriculture: 'Agriculture & Agro-Processing',
  'property-estate': 'Property & Estate Development',
  estates: 'Property & Estate Development',
  distribution: 'Distribution & Supply',
  'fleet-mobility': 'Fleet & Mobility',
}

type Status = 'idle' | 'sending' | 'success' | 'error'

export default function BriefBuilder() {
  const [enquiry, setEnquiry] = useState(ENQUIRIES[0])
  const [name, setName] = useState('')
  const [organisation, setOrganisation] = useState('')
  const [email, setEmail] = useState('')
  const [site, setSite] = useState('')
  const [notes, setNotes] = useState('')

  const [status, setStatus] = useState<Status>('idle')
  const [responseMessage, setResponseMessage] = useState('')

  // Honeypot field — real visitors never see/fill this.
  const [website, setWebsite] = useState('')

  const { surge } = useAurora()

  useEffect(() => {
    const q = new URLSearchParams(window.location.search).get('enquiry')

    if (q && PARAM[q]) {
      setEnquiry(PARAM[q])
    }
  }, [])

  const showSite = [
    'System Design & Feasibility',
    'Agriculture & Agro-Processing',
    'Property & Estate Development',
  ].includes(enquiry)

  const body = useMemo(
    () =>
      [
        `Enquiry: ${enquiry}`,
        `Name: ${name || '(not given)'}`,
        `Organisation: ${organisation || '(not given)'}`,
        `Email: ${email || '(not given)'}`,
        showSite
          ? `Site location and approximate size: ${site || '(not given)'}`
          : '',
        '',
        notes || '(no further notes)',
      ]
        .filter(Boolean)
        .join('\n'),
    [enquiry, name, organisation, email, site, notes, showSite]
  )

  const field =
    'w-full border border-[rgb(var(--surface-border)/.20)] bg-[rgb(var(--surface-raised)/.78)] px-4 py-3 text-[15px] text-[rgb(var(--surface-text))] placeholder:text-[rgb(var(--surface-muted)/.62)] transition-colors focus:border-[rgb(var(--gold-line))] focus:outline-none'

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()

    if (status === 'sending') return

    setStatus('sending')
    setResponseMessage('')

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },

        body: JSON.stringify({
          name,
          email,
          company: organisation,
          enquiryType: enquiry,
          siteLocation: showSite ? site : '',
          message: notes,
          website,
        }),
      })

      const result = await response.json()

      if (!response.ok) {
        throw new Error(
          result.message || 'Unable to send your enquiry.'
        )
      }

      setStatus('success')
      setResponseMessage(
        result.message ||
          'Thank you. Your enquiry has been sent successfully.'
      )

      surge(0.8)

      setName('')
      setOrganisation('')
      setEmail('')
      setSite('')
      setNotes('')
      setWebsite('')
    } catch (error) {
      console.error(error)

      setStatus('error')

      setResponseMessage(
        error instanceof Error
          ? error.message
          : 'Something went wrong. Please try again.'
      )
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="grid gap-10 lg:grid-cols-[1.15fr_1fr] lg:gap-16"
    >
      <div className="grid gap-5">
        <label className="grid gap-2">
          <span className="micro-label impact-kicker">
            Enquiry type
          </span>

          <select
            className={field}
            value={enquiry}
            onChange={(e) => {
              setEnquiry(e.target.value)
              setStatus('idle')
              setResponseMessage('')
            }}
          >
            {ENQUIRIES.map((x) => (
              <option className="text-black" key={x}>
                {x}
              </option>
            ))}
          </select>
        </label>

        <label className="grid gap-2">
          <span className="micro-label impact-kicker">
            Name
          </span>

          <input
            required
            className={field}
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Your name"
          />
        </label>

        <label className="grid gap-2">
          <span className="micro-label impact-kicker">
            Organisation
          </span>

          <input
            className={field}
            value={organisation}
            onChange={(e) => setOrganisation(e.target.value)}
            placeholder="Company or organisation"
          />
        </label>

        <label className="grid gap-2">
          <span className="micro-label impact-kicker">
            Email
          </span>

          <input
            required
            type="email"
            className={field}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@company.com"
          />
        </label>

        {showSite && (
          <label className="grid gap-2">
            <span className="micro-label impact-kicker">
              Site location and approximate size{' '}
              <span className="normal-case opacity-70">
                (optional)
              </span>
            </span>

            <input
              className={field}
              value={site}
              onChange={(e) => setSite(e.target.value)}
              placeholder="e.g. Lekki, Lagos — 40-unit estate"
            />
          </label>
        )}

        <label className="grid gap-2">
          <span className="micro-label impact-kicker">
            Project details
          </span>

          <textarea
            required
            className={`${field} min-h-[130px] resize-y`}
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            placeholder="Tell us what the site needs, the timeline, and what is already in place."
          />
        </label>

        {/* Honeypot spam trap */}
        <div
          aria-hidden="true"
          className="absolute -left-[9999px] h-0 w-0 overflow-hidden"
        >
          <label>
            Website
            <input
              type="text"
              tabIndex={-1}
              autoComplete="off"
              value={website}
              onChange={(e) => setWebsite(e.target.value)}
            />
          </label>
        </div>
      </div>

      <div className="lg:sticky lg:top-24 lg:self-start">
        <p className="micro-label impact-kicker">
          Enquiry preview
        </p>

        <pre className="pad-card-tight mt-4 max-h-[360px] overflow-auto whitespace-pre-wrap border border-[rgb(var(--surface-border)/.14)] bg-[rgb(var(--surface-raised)/.72)] font-mono text-[12px] leading-[1.8] text-[rgb(var(--surface-muted))]">
          {body}
        </pre>

        <button
          type="submit"
          disabled={status === 'sending'}
          className="impact-button mt-6 inline-flex min-w-[180px] items-center justify-center px-7 py-4 text-sm font-semibold disabled:cursor-not-allowed disabled:opacity-60"
        >
          {status === 'sending'
            ? 'Sending...'
            : 'Send enquiry →'}
        </button>

        {status === 'success' && (
          <div className="mt-5 border-l-2 border-[#2D6A4F] pl-4">
            <p className="text-[14px] font-semibold text-[rgb(var(--surface-text))]">
              Enquiry received
            </p>

            <p className="corporate-copy mt-1 text-[13px] leading-6">
              {responseMessage}
            </p>
          </div>
        )}

        {status === 'error' && (
          <div className="mt-5 border-l-2 border-red-600 pl-4">
            <p className="text-[14px] font-semibold text-red-700">
              Unable to send
            </p>

            <p className="corporate-copy mt-1 text-[13px] leading-6">
              {responseMessage}
            </p>
          </div>
        )}

        <p className="corporate-copy mt-4 max-w-[42ch] text-[13px] leading-6">
          Your enquiry will be sent securely to {BRAND.email}.
          You will also receive an email confirming that we
          received it.
        </p>
      </div>
    </form>
  )
}