/**
 * Shared locale for Lithos portfolio (React homepage + static case pages).
 * Storage key must match LocaleContext in the React app.
 */
(function (global) {
  const STORAGE_KEY = 'lithos-locale'
  const DEFAULT_LOCALE = 'en'

  function getLocale() {
    try {
      const v = localStorage.getItem(STORAGE_KEY)
      if (v === 'zh' || v === 'en') return v
    } catch (_) {
      /* ignore */
    }
    return DEFAULT_LOCALE
  }

  function getStrings(locale) {
    const page = document.body && document.body.dataset.casePage
    const pageStrings = page && global.LithosCaseStrings && global.LithosCaseStrings[page]
    const common = global.LithosCommonStrings
    const dict = { ...(common && common[locale]), ...(pageStrings && pageStrings[locale]) }
    return dict
  }

  function applyLocale(locale) {
    const html = document.documentElement
    html.lang = locale === 'zh' ? 'zh-CN' : 'en'
    html.classList.remove('locale-zh', 'locale-en')
    html.classList.add(locale === 'zh' ? 'locale-zh' : 'locale-en')

    const dict = getStrings(locale)
    if (dict) {
      document.querySelectorAll('[data-i18n]').forEach((el) => {
        const key = el.getAttribute('data-i18n')
        const val = dict[key]
        if (val == null) return
        if (el.hasAttribute('data-i18n-html')) {
          el.innerHTML = val
        } else {
          el.textContent = val
        }
      })

      document.querySelectorAll('img[data-i18n-alt]').forEach((el) => {
        const key = el.getAttribute('data-i18n-alt')
        if (dict[key]) el.alt = dict[key]
      })
    }

    const page = document.body && document.body.dataset.casePage
    const meta = page && global.LithosCaseMeta && global.LithosCaseMeta[page]
    if (meta && meta[locale]) {
      if (meta[locale].title) document.title = meta[locale].title
      const desc = document.querySelector('meta[name="description"]')
      if (desc && meta[locale].description) desc.content = meta[locale].description
    }

    document.querySelectorAll('.case-locale__btn').forEach((btn) => {
      const active = btn.dataset.locale === locale
      btn.classList.toggle('is-active', active)
      btn.setAttribute('aria-pressed', String(active))
    })
  }

  function setLocale(locale) {
    if (locale !== 'zh' && locale !== 'en') return
    try {
      localStorage.setItem(STORAGE_KEY, locale)
    } catch (_) {
      /* ignore */
    }
    applyLocale(locale)
  }

  function mountToggle(container) {
    if (!container) return
    container.innerHTML = ''
    const wrap = document.createElement('div')
    wrap.className = 'case-locale'
    wrap.setAttribute('role', 'group')
    wrap.setAttribute('aria-label', 'Language')

    ;[
      { id: 'zh', label: '中' },
      { id: 'en', label: 'EN' },
    ].forEach((opt) => {
      const btn = document.createElement('button')
      btn.type = 'button'
      btn.className = 'case-locale__btn'
      btn.dataset.locale = opt.id
      btn.textContent = opt.label
      btn.addEventListener('click', () => setLocale(opt.id))
      wrap.appendChild(btn)
    })

    container.appendChild(wrap)
  }

  function init() {
    mountToggle(document.getElementById('localeToggle'))
    applyLocale(getLocale())
  }

  global.LithosLocale = { getLocale, setLocale, applyLocale, init, STORAGE_KEY }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init)
  } else {
    init()
  }
})(window)
