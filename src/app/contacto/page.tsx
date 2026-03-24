"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent } from "@/components/ui/card"

const schema = z.object({
  name: z.string().min(2, "El nombre debe tener al menos 2 caracteres"),
  email: z.string().email("Ingresá un email válido"),
  subject: z.string().min(3, "El asunto debe tener al menos 3 caracteres"),
  message: z.string().min(10, "El mensaje debe tener al menos 10 caracteres"),
})

type FormData = z.infer<typeof schema>

export default function ContactoPage() {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle")

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>({ resolver: zodResolver(schema) })

  const onSubmit = async (data: FormData) => {
    setStatus("loading")
    try {
      const res = await fetch("/api/contacto", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      })
      if (!res.ok) throw new Error()
      setStatus("success")
      reset()
    } catch {
      setStatus("error")
    }
  }

  return (
    <div className="container mx-auto px-4 py-12 max-w-2xl">
      <h1 className="text-4xl font-black mb-2">Contacto</h1>
      <p className="text-muted-foreground mb-10">
        ¿Tenés alguna consulta? Escribinos y te respondemos a la brevedad.
      </p>

      {status === "success" ? (
        <Card>
          <CardContent className="p-10 text-center">
            <p className="text-5xl mb-4">✅</p>
            <h2 className="text-xl font-bold mb-2">¡Mensaje enviado!</h2>
            <p className="text-muted-foreground mb-6">
              Gracias por escribirnos. Te respondemos pronto.
            </p>
            <Button variant="outline" onClick={() => setStatus("idle")}>
              Enviar otro mensaje
            </Button>
          </CardContent>
        </Card>
      ) : (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5" noValidate>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div className="space-y-1">
              <label htmlFor="name" className="text-sm font-medium">
                Nombre <span className="text-destructive">*</span>
              </label>
              <Input id="name" {...register("name")} placeholder="Tu nombre" />
              {errors.name && (
                <p className="text-destructive text-xs">{errors.name.message}</p>
              )}
            </div>
            <div className="space-y-1">
              <label htmlFor="email" className="text-sm font-medium">
                Email <span className="text-destructive">*</span>
              </label>
              <Input id="email" type="email" {...register("email")} placeholder="tu@email.com" />
              {errors.email && (
                <p className="text-destructive text-xs">{errors.email.message}</p>
              )}
            </div>
          </div>

          <div className="space-y-1">
            <label htmlFor="subject" className="text-sm font-medium">
              Asunto <span className="text-destructive">*</span>
            </label>
            <Input id="subject" {...register("subject")} placeholder="¿En qué te podemos ayudar?" />
            {errors.subject && (
              <p className="text-destructive text-xs">{errors.subject.message}</p>
            )}
          </div>

          <div className="space-y-1">
            <label htmlFor="message" className="text-sm font-medium">
              Mensaje <span className="text-destructive">*</span>
            </label>
            <Textarea
              id="message"
              {...register("message")}
              placeholder="Escribí tu mensaje aquí..."
              rows={5}
            />
            {errors.message && (
              <p className="text-destructive text-xs">{errors.message.message}</p>
            )}
          </div>

          {status === "error" && (
            <p className="text-destructive text-sm">
              Hubo un error al enviar el mensaje. Intentá de nuevo.
            </p>
          )}

          <Button type="submit" className="w-full" disabled={status === "loading"}>
            {status === "loading" ? "Enviando..." : "Enviar mensaje"}
          </Button>
        </form>
      )}
    </div>
  )
}
