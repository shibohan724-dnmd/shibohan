import { useState } from 'react'
import { ChevronDown } from 'lucide-react'
import { useLocale } from '../context/LocaleContext'
import { AI_IP_IMAGES } from '../data/content'
import { SectionHeading } from './SectionHeading'
import { ScrollReveal } from './ScrollReveal'

function CollapsibleShowcase({
  name,
  lead,
  highlights,
  captions,
  imageAlt,
  image,
  expandLabel,
  collapseLabel,
}: {
  name: string
  lead: string
  highlights: readonly { label: string; title: string; body: string }[]
  captions: readonly string[]
  imageAlt: string
  image: string
  expandLabel: string
  collapseLabel: string
}) {
  const [open, setOpen] = useState(false)
  const firstHighlight = highlights[0]

  return (
    <div className="w-full md:w-[88%] max-w-[960px] mx-auto rounded-2xl border border-white/10 bg-white/[0.02] overflow-hidden">
      <div className="grid md:grid-cols-2 gap-4 md:gap-5 p-4 md:p-5 items-start">
        <div
          className={`relative overflow-hidden rounded-xl md:rounded-2xl transition-[max-height] duration-500 ease-out ${
            open ? 'max-h-none' : 'max-h-[200px] sm:max-h-[220px] md:max-h-[260px]'
          }`}
        >
          <img src={image} alt={imageAlt} className="w-full h-auto block" />
          {!open && (
            <div
              className="absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-black via-black/70 to-transparent pointer-events-none"
              aria-hidden
            />
          )}
        </div>

        <aside
          className={`relative rounded-xl md:rounded-2xl border border-white/10 bg-white/[0.03] p-3.5 md:p-4 overflow-hidden transition-[max-height] duration-500 ease-out ${
            open ? 'max-h-none' : 'max-h-[200px] sm:max-h-[220px] md:max-h-[260px]'
          }`}
        >
          <p className="text-[#e8702a] text-xs md:text-sm font-medium tracking-wide">{name}</p>
          <p
            className={`mt-2 text-[13px] md:text-sm text-white/55 leading-[1.6] ${
              open ? '' : 'line-clamp-2'
            }`}
          >
            {lead}
          </p>

          {open ? (
            <>
              <div className="mt-2.5 md:mt-3 space-y-2.5">
                {highlights.map((item) => (
                  <div key={item.label}>
                    <span className="text-[#e8702a] text-[10px] font-medium tracking-wide uppercase">
                      {item.label}
                    </span>
                    <h3 className="mt-0.5 text-white/90 text-[13px] font-medium leading-snug">
                      {item.title}
                    </h3>
                    <p className="mt-0.5 text-white/45 text-xs leading-relaxed">{item.body}</p>
                  </div>
                ))}
              </div>
              <p className="mt-2.5 pt-2.5 border-t border-white/10 text-[10px] md:text-[11px] text-white/35 leading-snug">
                {captions.join(' · ')}
              </p>
            </>
          ) : (
            firstHighlight && (
              <div className="mt-2.5">
                <span className="text-[#e8702a] text-[10px] font-medium tracking-wide uppercase">
                  {firstHighlight.label}
                </span>
                <h3 className="mt-0.5 text-white/90 text-[13px] font-medium leading-snug">
                  {firstHighlight.title}
                </h3>
                <p className="mt-0.5 text-white/45 text-xs leading-relaxed line-clamp-2">
                  {firstHighlight.body}
                </p>
              </div>
            )
          )}

          {!open && (
            <div
              className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-[#141414] via-[#141414]/80 to-transparent pointer-events-none"
              aria-hidden
            />
          )}
        </aside>
      </div>

      <button
        type="button"
        onClick={() => setOpen((value) => !value)}
        aria-expanded={open}
        className="w-full flex items-center justify-center gap-2 py-3 md:py-3.5 border-t border-white/10 text-xs md:text-sm text-white/40 hover:text-[#e8702a] hover:bg-white/[0.03] transition-colors"
      >
        {open ? collapseLabel : expandLabel}
        <ChevronDown
          className={`w-4 h-4 transition-transform duration-300 ${open ? 'rotate-180' : ''}`}
          aria-hidden
        />
      </button>
    </div>
  )
}

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

        <div className="space-y-5 md:space-y-6">
          {s.showcases.map((showcase, i) => (
            <ScrollReveal key={showcase.name} delay={100 + i * 80}>
              <CollapsibleShowcase
                name={showcase.name}
                lead={showcase.lead}
                highlights={showcase.highlights}
                captions={showcase.captions}
                imageAlt={showcase.imageAlt}
                image={AI_IP_IMAGES[i] ?? AI_IP_IMAGES[0]}
                expandLabel={s.expandLabel}
                collapseLabel={s.collapseLabel}
              />
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  )
}
