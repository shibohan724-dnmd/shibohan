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

        <div className="border-t border-white/10 max-w-[900px]">
          {t.portfolio.works.map((work, i) => {
            const link = WORK_LINKS[i]
            const imageFirst = i % 2 === 1

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
                imageFirst={imageFirst}
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
  imageFirst,
}: {
  title: string
  desc: string
  tags: readonly string[]
  image: string | null
  soon: boolean
  viewCase: string
  soonLabel: string
  linked: boolean
  imageFirst: boolean
}) {
  const textPad = imageFirst
    ? 'md:pl-5 lg:pl-8 md:pr-6 lg:pr-10'
    : 'md:pl-6 lg:pl-10 md:pr-4'

  const textCol = (
    <div
      className={`flex flex-col min-h-full ${textPad} ${
        imageFirst ? 'md:order-2' : 'md:order-1'
      }`}
    >
      <h3 className="text-white text-xl md:text-[22px] font-medium leading-snug tracking-[-0.02em] group-hover:text-[#e8702a] transition-colors">
        {title}
      </h3>
      <p className="mt-2.5 text-[13px] md:text-sm text-white/55 leading-[1.65] max-w-[280px] md:max-w-xs">
        {desc}
      </p>
      <ul className="mt-3 flex flex-wrap gap-1.5">
        {tags.map((tag) => (
          <li
            key={tag}
            className="px-2.5 py-0.5 text-[10px] md:text-[11px] text-white/65 border border-white/25 rounded-sm tracking-wide"
          >
            {tag}
          </li>
        ))}
      </ul>
      {soon && (
        <span className="mt-3 inline-block text-[11px] text-white/40 border border-white/15 rounded-full px-2.5 py-0.5">
          {soonLabel}
        </span>
      )}
      {linked && !soon && (
        <span className="mt-3 inline-flex items-center gap-1 text-[13px] text-white/45 group-hover:text-[#e8702a] transition-colors">
          {viewCase}
          <ArrowUpRight
            size={14}
            className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform"
          />
        </span>
      )}
    </div>
  )

  const imageCol = (
    <div
      className={`relative h-[150px] sm:h-[170px] md:h-[190px] overflow-hidden rounded-lg md:rounded-xl leading-[0] ${
        imageFirst ? 'md:order-1' : 'md:order-2'
      }`}
    >
      {image ? (
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover object-center block group-hover:scale-[1.02] transition-transform duration-500"
        />
      ) : (
        <div className="w-full h-full flex items-center justify-center bg-white/[0.02]">
          <span className="text-white/20 text-sm font-medium leading-normal">{title}</span>
        </div>
      )}
    </div>
  )

  return (
    <div
      className={`grid md:grid-cols-[minmax(0,0.34fr)_minmax(0,0.66fr)] gap-5 md:gap-6 items-center py-5 md:py-6 ${
        imageFirst ? 'md:grid-cols-[minmax(0,0.66fr)_minmax(0,0.34fr)]' : ''
      }`}
    >
      {textCol}
      {imageCol}
    </div>
  )
}
