import { LocaleProvider, useLocale } from './context/LocaleContext'
import { HeroSection } from './components/HeroSection'
import { ProfileSection } from './components/ProfileSection'
import { ExperienceSection } from './components/ExperienceSection'
import { PortfolioSection } from './components/PortfolioSection'
import { AiIpSection } from './components/AiIpSection'
import { Footer } from './components/Footer'

function AppContent() {
  const { locale } = useLocale()

  return (
    <div
      className={`min-h-screen bg-black tracking-[-0.02em] ${
        locale === 'zh' ? 'font-zh' : 'font-inter'
      }`}
    >
      <HeroSection />
      <ProfileSection />
      <ExperienceSection />
      <PortfolioSection />
      <AiIpSection />
      <Footer />
    </div>
  )
}

export default function App() {
  return (
    <LocaleProvider>
      <AppContent />
    </LocaleProvider>
  )
}
