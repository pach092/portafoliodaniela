import { NextRequest, NextResponse } from 'next/server'

// Required env vars:
//   MAILGUN_API_KEY   — your Mailgun private API key
//   MAILGUN_DOMAIN    — your sending domain, e.g. mg.danisco.com.co
//   CONTACT_EMAIL     — where notifications arrive, e.g. danielaacoronador@gmail.com
//   MAILGUN_REGION    — "us" (default) or "eu"

export async function POST(req: NextRequest) {
  try {
    const { nombre, email, asunto, mensaje } = await req.json() as Record<string, string>

    if (!nombre || !email || !asunto || !mensaje) {
      return NextResponse.json({ error: 'Faltan campos requeridos' }, { status: 400 })
    }

    const apiKey = process.env.MAILGUN_API_KEY
    const domain = process.env.MAILGUN_DOMAIN
    const toEmail = process.env.CONTACT_EMAIL
    const region = process.env.MAILGUN_REGION ?? 'us'

    if (!apiKey || !domain || !toEmail) {
      console.error('Faltan variables de entorno de Mailgun')
      return NextResponse.json({ error: 'Configuración incompleta' }, { status: 500 })
    }

    const baseUrl = region === 'eu'
      ? 'https://api.eu.mailgun.net'
      : 'https://api.mailgun.net'

    const enc = encodeURIComponent
    const body = [
      `from=${enc(`Portafolio Daniela <noreply@${domain}>`)}`,
      `to=${enc(toEmail)}`,
      `h:Reply-To=${enc(`${nombre} <${email}>`)}`,
      `subject=${enc(`✦ Nuevo mensaje: ${asunto}`)}`,
      `template=contact`,
      `t:variables=${enc(JSON.stringify({ n: nombre, e: email, a: asunto, m: mensaje }))}`
    ].join('&')

    const response = await fetch(`${baseUrl}/v3/${domain}/messages`, {
      method: 'POST',
      headers: {
        Authorization: `Basic ${Buffer.from(`api:${apiKey}`).toString('base64')}`,
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body,
    })

    if (!response.ok) {
      const text = await response.text()
      console.error('Mailgun error:', response.status, text)
      return NextResponse.json({ error: 'Error al enviar el correo' }, { status: 500 })
    }

    return NextResponse.json({ ok: true })
  } catch (err) {
    console.error('Contact route error:', err)
    return NextResponse.json({ error: 'Error interno' }, { status: 500 })
  }
}
