interface SectionHeadingProps {
  title: string
  subtitle?: string
  italic?: string
}

export function SectionHeading({ title, subtitle, italic }: SectionHeadingProps) {
  return (
    <div className="mb-12 md:mb-16">
      {italic && (
        <p className="text-[#e8702a] text-lg md:text-xl mb-2 not-italic">
          {italic}
        </p>
      )}
      <h2 className="text-white text-3xl sm:text-4xl md:text-5xl leading-tight not-italic">
        {title}
      </h2>
      {subtitle && (
        <p className="mt-3 text-white/50 text-sm md:text-base max-w-xl not-italic">
          {subtitle}
        </p>
      )}
    </div>
  )
}
