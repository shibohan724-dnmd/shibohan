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

        <ScrollReveal delay={100}>
          <div className="grid md:grid-cols-[minmax(0,0.42fr)_minmax(0,0.58fr)] gap-5 md:gap-6 items-stretch">
            <figure
              className="rounded-2xl border border-white/10 overflow-hidden bg-white/[0.02] flex items-start justify-center"
            >
              <img
                src={SHOWCASE_IMAGE}
                alt={s.imageAlt}
                className="w-full h-auto block"
              />
            </figure>

            <aside
              className="rounded-2xl border border-white/10 bg-white/[0.03] p-5 md:p-6 lg:p-7 flex flex-col h-full min-h-0"
            >
              <p className="text-sm md:text-[15px] text-white/55 leading-[1.75]">
                {s.lead}
              </p>

              <div className="mt-5 md:mt-6 space-y-5 flex-1">
                {s.highlights.map((item) => (
                  <div key={item.label}>
                    <span className="text-[#e8702a] text-xs font-medium tracking-wide uppercase">
                      {item.label}
                    </span>
                    <h3 className="mt-1.5 text-white/90 text-[15px] font-medium leading-snug">
                      {item.title}
                    </h3>
                    <p className="mt-1.5 text-white/45 text-sm leading-relaxed">{item.body}</p>
                  </div>
                ))}
              </div>

              <p className="mt-5 md:mt-6 pt-4 border-t border-white/10 text-xs text-white/35 leading-relaxed">
                {s.captions.join(' · ')}
              </p>
            </aside>
          </div>
        </ScrollReveal>
      </div>
    </section>
  )
}
