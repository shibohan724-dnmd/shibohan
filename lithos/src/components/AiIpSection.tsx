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
          <div className="max-w-[min(100%,640px)] md:max-w-[700px] mx-auto">
            <div className="grid md:grid-cols-[minmax(0,0.42fr)_minmax(0,0.58fr)] gap-4 md:gap-5 items-stretch">
              <figure
                className="rounded-xl md:rounded-2xl border border-white/10 overflow-hidden bg-white/[0.02] flex items-start justify-center max-h-[340px] sm:max-h-[380px] md:max-h-[400px]"
              >
                <img
                  src={SHOWCASE_IMAGE}
                  alt={s.imageAlt}
                  className="w-full h-full object-contain object-top block"
                />
              </figure>

              <aside
                className="rounded-xl md:rounded-2xl border border-white/10 bg-white/[0.03] p-4 md:p-5 flex flex-col h-full min-h-0"
              >
                <p className="text-[13px] md:text-sm text-white/55 leading-[1.65]">
                  {s.lead}
                </p>

                <div className="mt-4 space-y-3.5 flex-1">
                  {s.highlights.map((item) => (
                    <div key={item.label}>
                      <span className="text-[#e8702a] text-[10px] md:text-xs font-medium tracking-wide uppercase">
                        {item.label}
                      </span>
                      <h3 className="mt-1 text-white/90 text-sm font-medium leading-snug">
                        {item.title}
                      </h3>
                      <p className="mt-1 text-white/45 text-[13px] leading-relaxed">{item.body}</p>
                    </div>
                  ))}
                </div>

                <p className="mt-4 pt-3 border-t border-white/10 text-[11px] text-white/35 leading-relaxed">
                  {s.captions.join(' · ')}
                </p>
              </aside>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  )
}
