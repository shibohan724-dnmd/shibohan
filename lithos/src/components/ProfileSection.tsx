import { ArrowUpRight } from 'lucide-react'
import { useLocale } from '../context/LocaleContext'
import { PROFILE_AVATAR, PROFILE_EMAIL } from '../data/content'
import { SectionHeading } from './SectionHeading'
import { ScrollReveal } from './ScrollReveal'

function ChipList({
  items,
  variant = 'skill',
}: {
  items: string[]
  variant?: 'skill' | 'tool'
}) {
  return (
    <ul className="flex flex-wrap gap-2.5">
      {items.map((item) => (
        <li
          key={item}
          className={
            variant === 'tool'
              ? 'px-3.5 py-1.5 rounded-full text-sm font-medium text-[#f0c4a8] bg-[#e8702a]/12 border border-[#e8702a]/30 hover:border-[#e8702a]/50 hover:bg-[#e8702a]/18 transition-colors'
              : 'px-3.5 py-1.5 rounded-full text-sm text-white/85 bg-white/[0.06] border border-white/12 hover:border-white/25 hover:bg-white/10 transition-colors'
          }
        >
          {item}
        </li>
      ))}
    </ul>
  )
}

export function ProfileSection() {
  const { t } = useLocale()

  return (
    <section id="profile" className="relative bg-black py-24 md:py-32 px-5 md:px-14">
      <div className="absolute inset-0 bg-gradient-to-b from-black via-[#0a0a0a] to-black pointer-events-none" />

      <div className="relative max-w-6xl mx-auto">
        <ScrollReveal>
          <SectionHeading
            italic={t.profile.italic}
            title={t.profile.title}
            subtitle={t.profile.subtitle}
          />
        </ScrollReveal>

        <div className="grid md:grid-cols-[280px_1fr] gap-10 md:gap-16 items-start">
          <ScrollReveal delay={80}>
            <div className="flex flex-col items-center md:items-start text-center md:text-left">
              <div className="relative mb-6">
                <div className="absolute -inset-1 rounded-2xl bg-gradient-to-br from-[#e8702a]/40 to-transparent blur-md" />
                <img
                  src={PROFILE_AVATAR}
                  alt={t.profile.avatarAlt}
                  className="relative w-40 h-40 md:w-48 md:h-48 rounded-2xl object-cover border border-white/15"
                />
              </div>
              <h3 className="text-white text-2xl font-medium">{t.profile.name}</h3>
              <p className="text-[#e8702a] text-sm font-medium mt-1">{t.profile.role}</p>
              <p className="text-white/50 text-sm mt-1">{t.profile.tagline}</p>
              <a
                href={`mailto:${PROFILE_EMAIL}`}
                className="mt-6 inline-flex items-center gap-1.5 text-sm text-white/80 hover:text-white transition-colors group"
              >
                {PROFILE_EMAIL}
                <ArrowUpRight
                  size={14}
                  className="opacity-60 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform"
                />
              </a>
            </div>
          </ScrollReveal>

          <div className="space-y-10">
            <ScrollReveal delay={120}>
              <p className="text-white/70 text-base md:text-lg leading-relaxed">
                {t.profile.bio}
              </p>
            </ScrollReveal>

            <ScrollReveal delay={160}>
              <div>
                <h4 className="text-white/40 text-xs uppercase tracking-widest mb-4">
                  {t.profile.skills}
                </h4>
                <ChipList items={[...t.skills]} variant="skill" />
              </div>
            </ScrollReveal>

            <ScrollReveal delay={200}>
              <div>
                <h4 className="text-white/40 text-xs uppercase tracking-widest mb-4">
                  {t.profile.tools}
                </h4>
                <ChipList items={[...t.tools]} variant="tool" />
              </div>
            </ScrollReveal>
          </div>
        </div>
      </div>
    </section>
  )
}
