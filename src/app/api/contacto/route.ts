import { NextRequest, NextResponse } from "next/server"
import { z } from "zod"

const schema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  subject: z.string().min(3),
  message: z.string().min(10),
})

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const data = schema.parse(body)

    // Si RESEND_API_KEY está configurada, enviar email
    const apiKey = process.env.RESEND_API_KEY
    const toEmail = process.env.CONTACT_EMAIL_TO ?? "contacto@platzifc.com"

    if (apiKey) {
      const res = await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${apiKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          from: "Platzi FC <noreply@platzifc.com>",
          to: [toEmail],
          subject: `[Contacto] ${data.subject}`,
          html: `
            <p><strong>De:</strong> ${data.name} (${data.email})</p>
            <p><strong>Asunto:</strong> ${data.subject}</p>
            <hr />
            <p>${data.message.replace(/\n/g, "<br>")}</p>
          `,
        }),
      })

      if (!res.ok) {
        console.error("Error enviando email:", await res.text())
      }
    } else {
      // Sin API key, logear en consola (desarrollo)
      console.log("📧 Contacto recibido:", data)
    }

    return NextResponse.json({ ok: true })
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: error.issues }, { status: 400 })
    }
    return NextResponse.json({ error: "Error interno" }, { status: 500 })
  }
}
