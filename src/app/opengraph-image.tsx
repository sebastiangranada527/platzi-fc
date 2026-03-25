import { ImageResponse } from "next/og"

export const alt = "Platzi FC — Club de Fútbol Oficial"
export const size = { width: 1200, height: 630 }
export const contentType = "image/png"

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background: "#0a0e1a",
          gap: 24,
        }}
      >
        <div
          style={{
            width: 96,
            height: 96,
            borderRadius: 16,
            background: "#98CA3F",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: 40,
            fontWeight: 900,
            color: "#0a0e1a",
          }}
        >
          PFC
        </div>
        <div
          style={{
            fontSize: 72,
            fontWeight: 900,
            color: "#ffffff",
            letterSpacing: -2,
          }}
        >
          Platzi FC
        </div>
        <div
          style={{
            fontSize: 28,
            color: "#98CA3F",
            letterSpacing: 4,
            textTransform: "uppercase",
          }}
        >
          Club de Fútbol Oficial
        </div>
      </div>
    ),
    { ...size }
  )
}
