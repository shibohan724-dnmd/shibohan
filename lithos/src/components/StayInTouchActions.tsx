import { useState } from 'react'
import { Check, Copy, MessageCircle } from 'lucide-react'
import { useLocale } from '../context/LocaleContext'
import { PROFILE_EMAIL } from '../data/content'

const WECHAT_QR_SRC = '/assets/wechat-qr.png'

const BTN_CLASS =
  'inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium border border-white/15 bg-white/[0.04] text-white/75 hover:text-white hover:border-[#e8702a]/45 hover:bg-[#e8702a]/10 transition-colors'

export function StayInTouchActions() {
  const { t } = useLocale()
  const f = t.footer
  const [copied, setCopied] = useState(false)
  const [showQr, setShowQr] = useState(false)
  const [pointer, setPointer] = useState({ x: 0, y: 0 })

  async function copyEmail() {
    try {
      await navigator.clipboard.writeText(PROFILE_EMAIL)
    } catch {
      const ta = document.createElement('textarea')
      ta.value = PROFILE_EMAIL
      ta.style.position = 'fixed'
      ta.style.opacity = '0'
      document.body.appendChild(ta)
      ta.select()
      document.execCommand('copy')
      document.body.removeChild(ta)
    }
    setCopied(true)
    window.setTimeout(() => setCopied(false), 2000)
  }

  function updatePointer(e: React.MouseEvent) {
    setPointer({ x: e.clientX, y: e.clientY })
  }

  return (
    <div className="relative">
      <div className="flex flex-wrap gap-2.5">
        <button type="button" className={BTN_CLASS} onClick={copyEmail}>
          {copied ? <Check size={15} className="text-[#e8702a]" /> : <Copy size={15} />}
          {copied ? f.copied : f.copyEmail}
        </button>

        <button
          type="button"
          className={BTN_CLASS}
          onMouseEnter={(e) => {
            setShowQr(true)
            updatePointer(e)
          }}
          onMouseMove={(e) => showQr && updatePointer(e)}
          onMouseLeave={() => setShowQr(false)}
          onFocus={(e) => {
            setShowQr(true)
            const rect = e.currentTarget.getBoundingClientRect()
            setPointer({ x: rect.left + rect.width / 2, y: rect.top })
          }}
          onBlur={() => setShowQr(false)}
        >
          <MessageCircle size={15} />
          {f.wechat}
        </button>
      </div>

      {showQr && (
        <div
          className="fixed z-[100] pointer-events-none"
          style={{
            left: Math.min(pointer.x + 16, window.innerWidth - 220),
            top: Math.max(pointer.y - 280, 12),
          }}
        >
          <div
            className="rounded-2xl border border-white/15 bg-[#111] shadow-2xl shadow-black/60 p-3"
            style={{ width: 200 }}
          >
            <img
              src={WECHAT_QR_SRC}
              alt={f.wechatQrAlt}
              className="w-full h-auto rounded-xl bg-white"
            />
          </div>
        </div>
      )}
    </div>
  )
}
