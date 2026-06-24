import { useLocale } from '../context/LocaleContext'
import { SectionHeading } from './SectionHeading'
import { ScrollReveal } from './ScrollReveal'

const SHOWCASE_IMAGE = '/assets/coffy-ip-showcase.png'

export function AiIpSection() {
  const { t } = useLocale()
  const s = t.aiIp

  return (
    <section
      id="ai-ip"
      className="relative bg-black py-20 md:py-24 px-5 md:px-14 border-t border-white/5"
    >
      <div className="max-w-6xl mx-auto">
        <ScrollReveal>
          <SectionHeading italic={s.italic} title={s.title} subtitle={s.subtitle} />
        </ScrollReveal>

        <ScrollReveal delay={60}>
          <p className="text-white/55 text-sm md:text-base leading-relaxed max-w-2xl mb-6">
            {s.lead}
          </p>
        </ScrollReveal>

        <ScrollReveal delay={80}>
          <ul className="flex flex-wrap gap-2.5 mb-8 md:mb-10">
            {s.tools.map((tool) => (
              <li
                key={tool}
                className="px-3.5 py-1.5 rounded-full text-sm font-medium text-[#f0c4a8] bg-[#e8702a]/12 border border-[#e8702a]/30"
              >
                {tool}
              </li>
            ))}
          </ul>
        </ScrollReveal>

        <div className="grid sm:grid-cols-3 gap-4 md:gap-5 mb-8 md:mb-10">
          {s.highlights.map((item, i) => (
            <ScrollReveal key={item.title} delay={100 + i * 60}>
              <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-5 md:p-6 h-full">
                <span className="text-[#e8702a] text-xs font-medium tracking-wide uppercase">
                  {item.label}
                </span>
                <h3 className="mt-2 text-white/90 text-[15px] font-medium leading-snug">
                  {item.title}
                </h3>
                <p className="mt-2 text-white/45 text-sm leading-relaxed">{item.body}</p>
              </div>
            </ScrollReveal>
          ))}
        </div>

        <ScrollReveal delay={120}>
          <figure
            className="mx-auto w-full max-w-[280px] sm:max-w-[300px] md:max-w-[320px] rounded-2xl border border-white/10 overflow-hidden bg-white/[0.02]"
          >
            <img
              src={SHOWCASE_IMAGE}
              alt={s.imageAlt}
              className="w-full h-auto block"
            />
          </figure>
          <figcaption className="mt-3 flex flex-wrap justify-center gap-x-5 gap-y-1.5 text-xs text-white/35">
            {s.captions.map((caption) => (
              <span key={caption}>{caption}</span>
            ))}
          </figcaption>
        </ScrollReveal>
      </div>
    </section>
  )
}
