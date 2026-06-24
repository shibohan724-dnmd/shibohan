import { ArrowUpRight } from 'lucide-react'
import { useLocale } from '../context/LocaleContext'
import { WORK_LINKS } from '../data/content'
import { SectionHeading } from './SectionHeading'
import { ScrollReveal } from './ScrollReveal'

export function PortfolioSection() {
  const { t } = useLocale()

  return (
    <section
      id="works"
      className="relative bg-black py-24 md:py-32 px-5 md:px-14 border-t border-white/5"
    >
      <div className="max-w-6xl mx-auto">
        <ScrollReveal>
          <SectionHeading
            italic={t.portfolio.italic}
            title={t.portfolio.title}
            subtitle={t.portfolio.subtitle}
          />
        </ScrollReveal>

        <div className="border-t border-white/10">
          {t.portfolio.works.map((work, i) => {
            const link = WORK_LINKS[i]

            const inner = (
              <WorkRow
                title={work.title}
                desc={work.desc}
                tags={work.tags}
                image={link.image}
                soon={link.soon}
                viewCase={t.portfolio.viewCase}
                soonLabel={t.portfolio.soon}
                linked={Boolean(link.href)}
              />
            )

            return (
              <ScrollReveal key={work.title} delay={i * 80}>
                {link.href ? (
                  <a
                    href={link.href}
                    className="group block border-b border-white/10 hover:bg-white/[0.02] transition-colors"
                  >
                    {inner}
                  </a>
                ) : (
                  <article className="border-b border-white/10 opacity-70">{inner}</article>
                )}
              </ScrollReveal>
            )
          })}
        </div>
      </div>
    </section>
  )
}

function WorkRow({
  title,
  desc,
  tags,
  image,
  soon,
  viewCase,
  soonLabel,
  linked,
}: {
  title: string
  desc: string
  tags: readonly string[]
  image: string | null
  soon: boolean
  viewCase: string
  soonLabel: string
  linked: boolean
}) {
  return (
    <div className="grid md:grid-cols-[minmax(0,0.36fr)_minmax(0,0.64fr)] gap-8 md:gap-10 lg:gap-14 items-start py-10 md:py-12 lg:py-14">
      <div className="flex flex-col min-h-full">
        <h3 className="text-white text-2xl md:text-[28px] font-medium leading-tight tracking-[-0.02em] group-hover:text-[#e8702a] transition-colors">
          {title}
        </h3>
        <p className="mt-4 md:mt-5 text-sm md:text-[15px] text-white/55 leading-[1.75] max-w-md">
          {desc}
        </p>
        <ul className="mt-6 md:mt-8 flex flex-wrap gap-2">
          {tags.map((tag) => (
            <li
              key={tag}
              className="px-3 py-1 text-[11px] md:text-xs text-white/65 border border-white/25 rounded-sm tracking-wide"
            >
              {tag}
            </li>
          ))}
        </ul>
        {soon && (
          <span className="mt-5 inline-block text-xs text-white/40 border border-white/15 rounded-full px-3 py-1">
            {soonLabel}
          </span>
        )}
        {linked && !soon && (
          <span className="mt-6 inline-flex items-center gap-1.5 text-sm text-white/45 group-hover:text-[#e8702a] transition-colors">
            {viewCase}
            <ArrowUpRight size={15} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </span>
        )}
      </div>

      <div className="relative aspect-[16/10] overflow-hidden rounded-xl md:rounded-2xl border border-white/8 bg-white/[0.02] leading-[0]">
        {image ? (
          <img
            src={image}
            alt={title}
            className="w-full h-full object-cover object-center block group-hover:scale-[1.02] transition-transform duration-500"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <span className="text-white/20 text-sm font-medium leading-normal">{title}</span>
          </div>
        )}
      </div>
    </div>
  )
}
