import { useLocale } from '../context/LocaleContext'
import { PROFILE_EMAIL, PROFILE_PHONE, PROFILE_WECHAT } from '../data/content'
import { NewsletterForm } from './NewsletterForm'

const LOGO_SRC = '/assets/logo-shibohan-white.png'

const NAV_LINKS = [
  { key: 'navHome', href: '#hero' },
  { key: 'navAbout', href: '#profile' },
  { key: 'navPortfolio', href: '#works' },
  { key: 'navAiIp', href: '#ai-ip' },
  { key: 'navExperience', href: '#experience' },
] as const

const COLUMN_HEAD_CLASS =
  'text-white text-sm font-semibold leading-none h-8 flex items-center mb-3'

export function Footer() {
  const { t } = useLocale()
  const f = t.footer

  return (
    <footer className="bg-[#080808] border-t border-white/5">
      <div className="max-w-6xl mx-auto px-5 md:px-14 pt-10 md:pt-11 pb-8 md:pb-9">
        <h2 className="text-white text-2xl md:text-[32px] font-medium tracking-[-0.02em] leading-none mb-8 md:mb-10">
          {f.connectTitle}
        </h2>

        <div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-[minmax(0,1.4fr)_minmax(0,0.72fr)_minmax(0,1fr)_minmax(0,1fr)] gap-x-10 lg:gap-x-12 gap-y-8 lg:gap-y-0 items-start"
        >
          <div className="flex flex-col items-start">
            <a href="#hero" className={COLUMN_HEAD_CLASS}>
              <img src={LOGO_SRC} alt={t.logoAlt} className="h-8 w-auto object-contain" />
            </a>
            <p className="text-white/45 text-sm leading-[1.75] max-w-[280px]">{f.intro}</p>
          </div>

          <div className="flex flex-col items-start lg:pl-4">
            <h3 className={COLUMN_HEAD_CLASS}>{f.navTitle}</h3>
            <ul className="space-y-2.5">
              {NAV_LINKS.map((item) => (
                <li key={item.key}>
                  <a
                    href={item.href}
                    className="text-sm text-white/45 hover:text-white/80 transition-colors"
                  >
                    {f[item.key]}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="flex flex-col items-start">
            <h3 className={COLUMN_HEAD_CLASS}>{f.contactTitle}</h3>
            <ul className="space-y-2.5 text-sm text-white/45">
              <li>
                <span className="text-white/40">{f.phoneLabel}</span>
                <a href={`tel:${PROFILE_PHONE}`} className="hover:text-white/80 transition-colors">
                  {PROFILE_PHONE}
                </a>
              </li>
              <li>
                <span className="text-white/40">{f.emailLabel}</span>
                <a
                  href={`mailto:${PROFILE_EMAIL}`}
                  className="hover:text-white/80 transition-colors"
                >
                  {PROFILE_EMAIL}
                </a>
              </li>
              <li>
                <span className="text-white/40">{f.wechatLabel}</span>
                <span className="text-white/55">{PROFILE_WECHAT}</span>
              </li>
            </ul>
          </div>

          <div className="flex flex-col items-start">
            <h3 className={COLUMN_HEAD_CLASS}>{f.newsletterTitle}</h3>
            <NewsletterForm />
          </div>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="max-w-6xl mx-auto px-5 md:px-14 py-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 text-xs text-white/35">
          <p>{f.copyright}</p>
          <p className="text-white/30">
            <span className="hover:text-white/50 transition-colors cursor-default">{f.terms}</span>
            <span className="mx-2">|</span>
            <span className="hover:text-white/50 transition-colors cursor-default">{f.privacy}</span>
          </p>
        </div>
      </div>
    </footer>
  )
}
