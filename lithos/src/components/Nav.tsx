import { useLocale } from '../context/LocaleContext'
import type { Locale } from '../i18n/translations'

const LOGO_SRC = '/assets/logo-shibohan-white.png'

export function Nav() {
  const { locale, setLocale } = useLocale()

  const options: { id: Locale; label: string }[] = [
    { id: 'zh', label: '中' },
    { id: 'en', label: 'EN' },
  ]

  return (
    <nav className="relative z-[60] flex items-center justify-between p-4 sm:p-5">
      <a href="#hero" className="flex items-center">
        <img
          src={LOGO_SRC}
          alt="Shi Bohan"
          className="h-8 sm:h-9 w-auto object-contain"
        />
      </a>

      <div
        className="flex items-center rounded-full border border-white/25 bg-white/10 backdrop-blur-md p-0.5 gap-0.5"
        role="group"
        aria-label="Language"
      >
        {options.map((opt) => {
          const active = locale === opt.id
          return (
            <button
              key={opt.id}
              type="button"
              onClick={() => setLocale(opt.id)}
              className={
                active
                  ? 'min-w-[36px] px-2.5 py-1 rounded-full text-xs font-semibold bg-white text-gray-900 transition-colors'
                  : 'min-w-[36px] px-2.5 py-1 rounded-full text-xs font-medium text-white/60 hover:text-white/90 transition-colors'
              }
              aria-pressed={active}
            >
              {opt.label}
            </button>
          )
        })}
      </div>
    </nav>
  )
}
