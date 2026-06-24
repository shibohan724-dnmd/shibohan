import { useState, type FormEvent } from 'react'
import { Send } from 'lucide-react'
import { useLocale } from '../context/LocaleContext'
import { PROFILE_EMAIL } from '../data/content'
import { openContactMailto, submitContactEmail } from '../lib/contactForm'

export function NewsletterForm() {
  const { locale, t } = useLocale()
  const f = t.footer
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const form = e.currentTarget
    const email = String(new FormData(form).get('email') || '').trim()
    if (!email) return

    setStatus('loading')
    const result = await submitContactEmail(email, locale)

    if (result.ok) {
      setStatus('success')
      form.reset()
      return
    }

    if (result.reason === 'missing_key') {
      openContactMailto(email)
      setStatus('idle')
      return
    }

    setStatus('error')
  }

  return (
    <div className="w-full max-w-[260px]">
      <form
        className="flex items-center rounded-full border border-white/15 bg-white/[0.04] pl-4 pr-1 py-1"
        onSubmit={handleSubmit}
      >
        <input
          type="checkbox"
          name="botcheck"
          className="hidden"
          tabIndex={-1}
          autoComplete="off"
          aria-hidden="true"
        />
        <input
          name="email"
          type="email"
          required
          disabled={status === 'loading'}
          placeholder={f.emailPlaceholder}
          className="flex-1 min-w-0 bg-transparent text-sm text-white/70 placeholder:text-white/30 outline-none disabled:opacity-50"
        />
        <button
          type="submit"
          disabled={status === 'loading'}
          className="flex items-center justify-center w-9 h-9 rounded-full bg-white/10 hover:bg-white/15 text-white/70 hover:text-white transition-colors shrink-0 disabled:opacity-40 disabled:pointer-events-none"
          aria-label={f.send}
        >
          <Send size={16} className={status === 'loading' ? 'animate-pulse' : ''} />
        </button>
      </form>

      {status === 'success' && (
        <p className="mt-2.5 text-xs text-[#e8702a]/90 leading-relaxed">{f.submitSuccess}</p>
      )}
      {status === 'error' && (
        <p className="mt-2.5 text-xs text-white/45 leading-relaxed">
          {f.submitError}{' '}
          <a href={`mailto:${PROFILE_EMAIL}`} className="text-white/60 hover:text-white/85 underline">
            {f.submitErrorMail}
          </a>
        </p>
      )}
    </div>
  )
}
