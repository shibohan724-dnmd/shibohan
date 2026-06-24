import { useEffect, useRef, useState } from 'react'
import { useLocale } from '../context/LocaleContext'
import { Nav } from './Nav'
import { RevealLayer } from './RevealLayer'

const BG_IMAGE_1 =
  'https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260609_195923_b0ba8ace-1d1d-4f2c-9a28-1ab84b330680.png&w=1280&q=85'

const BG_IMAGE_2 =
  'https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260609_201152_bba90a12-bf12-459f-91f0-51f237dbaf3b.png&w=1280&q=85'

export function HeroSection() {
  const { t } = useLocale()
  const mouse = useRef({ x: -999, y: -999 })
  const smooth = useRef({ x: -999, y: -999 })
  const rafRef = useRef<number>(0)
  const [cursorPos, setCursorPos] = useState({ x: -999, y: -999 })

  useEffect(() => {
    const onMouseMove = (e: MouseEvent) => {
      mouse.current.x = e.clientX
      mouse.current.y = e.clientY
    }

    const tick = () => {
      smooth.current.x += (mouse.current.x - smooth.current.x) * 0.1
      smooth.current.y += (mouse.current.y - smooth.current.y) * 0.1
      setCursorPos({ x: smooth.current.x, y: smooth.current.y })
      rafRef.current = requestAnimationFrame(tick)
    }

    window.addEventListener('mousemove', onMouseMove)
    rafRef.current = requestAnimationFrame(tick)

    return () => {
      window.removeEventListener('mousemove', onMouseMove)
      cancelAnimationFrame(rafRef.current)
    }
  }, [])

  return (
    <section
      id="hero"
      className="relative w-full overflow-x-hidden h-screen bg-black"
      style={{ height: '100dvh' }}
    >
      <div
        className="absolute inset-0 bg-center bg-cover bg-no-repeat z-10 hero-zoom"
        style={{ backgroundImage: `url(${BG_IMAGE_1})` }}
      />

      <RevealLayer
        image={BG_IMAGE_2}
        cursorX={cursorPos.x}
        cursorY={cursorPos.y}
      />

      <Nav />

      <div
        className="absolute left-5 sm:left-10 md:left-14 z-[60] pointer-events-none max-w-[380px] w-[88vw] sm:w-[340px] md:w-[380px]"
        style={{ top: '17%' }}
      >
        <h1 className="text-white leading-[1.08] text-left not-italic font-normal tracking-[-0.02em]">
          <span
            className="block hero-reveal"
            style={{ fontSize: '60px', animationDelay: '0.25s' }}
          >
            {t.hero.line1}
          </span>
          <span
            className="block hero-reveal"
            style={{ fontSize: '60px', animationDelay: '0.42s' }}
          >
            {t.hero.line2}
          </span>
        </h1>

        <div
          className="mt-7 sm:mt-8 md:mt-9 w-10 h-px bg-white/25 hero-fade"
          style={{ animationDelay: '0.48s' }}
          aria-hidden="true"
        />

        <p
          className="mt-5 sm:mt-6 text-sm sm:text-[15px] md:text-base text-white/85 leading-[1.8] sm:leading-[1.85] text-left not-italic hero-fade [text-shadow:0_1px_12px_rgba(0,0,0,0.85)]"
          style={{ animationDelay: '0.55s' }}
        >
          {t.hero.intro}
        </p>
      </div>

      <div
        className="absolute bottom-10 sm:bottom-14 md:bottom-24 right-5 sm:right-10 md:right-14 z-[60] flex flex-col items-end gap-3 hero-fade"
        style={{ animationDelay: '0.85s' }}
      >
        <p className="text-xs text-white/60 whitespace-nowrap not-italic">
          {t.hero.scroll}
        </p>
        <a
          href="#works"
          className="bg-[#e8702a]/55 hover:bg-[#e8702a]/70 text-white/95 text-xs font-medium px-5 py-2 rounded-full border border-[#e8702a]/30 transition-colors active:scale-[0.98]"
        >
          {t.hero.cta}
        </a>
      </div>
    </section>
  )
}
