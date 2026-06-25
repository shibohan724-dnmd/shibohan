import { useLocale } from '../context/LocaleContext'
import { SectionHeading } from './SectionHeading'
import { ScrollReveal } from './ScrollReveal'

const SHOWCASE_IMAGE = '/assets/coffy-ip-showcase.png'
/** 原图比例 803×1024，用于锁定展示区高度 */
const SHOWCASE_ASPECT = '803 / 1024'

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
          <div className="max-w-[min(100%,720px)] mx-auto">
            <div className="grid md:grid-cols-2 gap-4 md:gap-5 items-stretch">
              <figure
                className="rounded-xl md:rounded-2xl border border-white/10 overflow-hidden bg-white/[0.02] w-full"
                style={{ aspectRatio: SHOWCASE_ASPECT }}
              >
                <img
                  src={SHOWCASE_IMAGE}
                  alt={s.imageAlt}
                  className="w-full h-full object-contain object-top block"
                />
              </figure>

              <aside
                className="rounded-xl md:rounded-2xl border border-white/10 bg-white/[0.03] p-3.5 md:p-4 flex flex-col min-h-0 h-full overflow-hidden"
              >
                <p className="text-[13px] md:text-sm text-white/55 leading-[1.6]">
                  {s.lead}
                </p>

                <div className="mt-2.5 md:mt-3 space-y-2.5 flex-1 min-h-0 overflow-y-auto pr-0.5">
                  {s.highlights.map((item) => (
                    <div key={item.label}>
                      <span className="text-[#e8702a] text-[10px] font-medium tracking-wide uppercase">
                        {item.label}
                      </span>
                      <h3 className="mt-0.5 text-white/90 text-[13px] font-medium leading-snug">
                        {item.title}
                      </h3>
                      <p className="mt-0.5 text-white/45 text-xs leading-relaxed">
                        {item.body}
                      </p>
                    </div>
                  ))}
                </div>

                <p className="mt-2.5 pt-2.5 border-t border-white/10 text-[10px] md:text-[11px] text-white/35 leading-snug shrink-0">
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
