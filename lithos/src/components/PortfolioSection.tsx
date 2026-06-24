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

        <div className="grid sm:grid-cols-2 gap-5 md:gap-6">
          {t.portfolio.works.map((work, i) => {
            const link = WORK_LINKS[i]
            const card = (
              <WorkCardContent
                title={work.title}
                tag={work.tag}
                image={link.image}
                soon={link.soon}
                viewCase={t.portfolio.viewCase}
                soonLabel={t.portfolio.soon}
              />
            )

            return (
              <ScrollReveal key={work.title} delay={i * 80}>
                {link.href ? (
                  <a
                    href={link.href}
                    className="group block rounded-2xl border border-white/10 bg-white/[0.03] overflow-hidden hover:border-white/20 hover:bg-white/[0.05] transition-all duration-300"
                  >
                    {card}
                  </a>
                ) : (
                  <article
                    className="group rounded-2xl border border-white/10 bg-white/[0.03] overflow-hidden opacity-70"
                  >
                    {card}
                  </article>
                )}
              </ScrollReveal>
            )
          })}
        </div>
      </div>
    </section>
  )
}

function WorkCardContent({
  title,
  tag,
  image,
  soon,
  viewCase,
  soonLabel,
}: {
  title: string
  tag: string
  image: string | null
  soon: boolean
  viewCase: string
  soonLabel: string
}) {
  return (
    <>
      <div className="relative aspect-video overflow-hidden leading-[0]">
        {image ? (
          <img
            src={image}
            alt={title}
            className="w-full h-full object-cover object-center block"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-white/[0.03]">
            <span className="text-white/20 text-sm font-medium leading-normal">{title}</span>
          </div>
        )}
        {soon && (
          <span className="absolute top-3 right-3 px-2.5 py-1 rounded-full bg-black/60 backdrop-blur text-white/60 text-xs border border-white/10">
            {soonLabel}
          </span>
        )}
        {image && !soon && (
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-end p-4">
            <span className="flex items-center gap-1 text-white text-sm font-medium">
              {viewCase}
              <ArrowUpRight size={16} />
            </span>
          </div>
        )}
      </div>
      <div className="px-4 pt-2 pb-3.5">
        <h3 className="text-white/90 text-[15px] font-medium leading-snug group-hover:text-[#e8702a] transition-colors">
          {title}
        </h3>
        <p className="mt-1 text-[11px] leading-relaxed text-white/40 tracking-wide">
          {tag}
        </p>
      </div>
    </>
  )
}
