import { useLocale } from '../context/LocaleContext'
import { SectionHeading } from './SectionHeading'
import { ScrollReveal } from './ScrollReveal'

export function ExperienceSection() {
  const { t } = useLocale()

  return (
    <section
      id="experience"
      className="relative bg-[#0a0a0a] py-24 md:py-32 px-5 md:px-14 border-t border-white/5"
    >
      <div className="max-w-6xl mx-auto">
        <ScrollReveal>
          <SectionHeading
            italic={t.experience.italic}
            title={t.experience.title}
            subtitle={t.experience.subtitle}
          />
        </ScrollReveal>

        <div className="space-y-4 md:space-y-5">
          {t.experience.jobs.map((job, i) => (
            <ScrollReveal key={job.period + job.title} delay={i * 80}>
              <article
                className="group relative rounded-2xl border border-white/10 bg-white/[0.03] backdrop-blur-sm p-6 md:p-8 hover:border-white/20 hover:bg-white/[0.05] transition-all duration-300"
              >
                <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 mb-3">
                  <h3 className="text-white text-lg md:text-xl font-medium group-hover:text-[#e8702a] transition-colors">
                    {job.title}
                  </h3>
                  <span className="text-white/40 text-sm font-medium shrink-0">
                    {job.period}
                  </span>
                </div>
                <p className="text-white/50 text-sm mb-3">{job.org}</p>
                <p className="text-white/70 text-sm md:text-base leading-relaxed">
                  {job.desc}
                </p>
              </article>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  )
}
