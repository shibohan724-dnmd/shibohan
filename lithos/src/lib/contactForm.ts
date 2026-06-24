import { PROFILE_EMAIL, WEB3FORMS_ACCESS_KEY } from '../data/content'

const WEB3FORMS_ENDPOINT = 'https://api.web3forms.com/submit'

export type ContactSubmitResult = { ok: true } | { ok: false; reason: 'missing_key' | 'network' | 'api' }

export async function submitContactEmail(
  email: string,
  locale: 'zh' | 'en',
): Promise<ContactSubmitResult> {
  if (!WEB3FORMS_ACCESS_KEY) {
    return { ok: false, reason: 'missing_key' }
  }

  try {
    const response = await fetch(WEB3FORMS_ENDPOINT, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify({
        access_key: WEB3FORMS_ACCESS_KEY,
        subject:
          locale === 'zh'
            ? 'Portfolio 访客留联 · shibohan.xyz'
            : 'Portfolio visitor contact · shibohan.xyz',
        email,
        replyto: email,
        from_name: 'Portfolio · shibohan.xyz',
        message:
          locale === 'zh'
            ? `访客在页脚「保持联系」栏留下了邮箱：${email}\n时间：${new Date().toLocaleString('zh-CN')}`
            : `Visitor left email in Stay in touch: ${email}\nTime: ${new Date().toLocaleString('en-US')}`,
      }),
    })

    const data = (await response.json()) as { success?: boolean }
    if (response.ok && data.success) {
      return { ok: true }
    }
    return { ok: false, reason: 'api' }
  } catch {
    return { ok: false, reason: 'network' }
  }
}

export function openContactMailto(email: string) {
  const body =
    email ? `访客邮箱：${email}` : ''
  window.location.href = `mailto:${PROFILE_EMAIL}?subject=Portfolio contact&body=${encodeURIComponent(body)}`
}
