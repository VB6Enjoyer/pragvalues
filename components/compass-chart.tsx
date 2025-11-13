"use client"

import { useRef } from "react"
import { Button } from "@/components/ui/button"
import { Download } from "lucide-react"

interface CompassChartProps {
  xScore: number
  yScore: number
  title: string
}

export function CompassChart({ xScore, yScore, title }: CompassChartProps) {
  const canvasRef = useRef<HTMLDivElement>(null)

  // Convert scores (10-40) to percentages (0-100)
  const xPercent = ((xScore - 10) / 30) * 100
  const yPercent = ((yScore - 10) / 30) * 100

  const handleDownload = () => {
    const canvas = document.createElement("canvas")
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Set canvas size
    const size = 800
    const padding = 64
    const chartSize = size - padding * 2
    canvas.width = size
    canvas.height = size

    // Background
    ctx.fillStyle = "#ffffff"
    ctx.fillRect(0, 0, size, size)

    // Grid
    ctx.strokeStyle = "#f1f5f9"
    ctx.lineWidth = 1
    for (let i = 0; i <= 10; i++) {
      const pos = padding + (i * chartSize) / 10
      // Vertical lines
      ctx.beginPath()
      ctx.moveTo(pos, padding)
      ctx.lineTo(pos, padding + chartSize)
      ctx.stroke()
      // Horizontal lines
      ctx.beginPath()
      ctx.moveTo(padding, pos)
      ctx.lineTo(padding + chartSize, pos)
      ctx.stroke()
    }

    // Axis lines
    ctx.strokeStyle = "#94a3b8"
    ctx.lineWidth = 3
    // Vertical axis
    ctx.beginPath()
    ctx.moveTo(padding + chartSize / 2, padding)
    ctx.lineTo(padding + chartSize / 2, padding + chartSize)
    ctx.stroke()
    // Horizontal axis
    ctx.beginPath()
    ctx.moveTo(padding, padding + chartSize / 2)
    ctx.lineTo(padding + chartSize, padding + chartSize / 2)
    ctx.stroke()

    // Quadrant labels
    ctx.font = "bold 14px sans-serif"
    ctx.fillStyle = "#475569"
    ctx.fillText("Radical", padding + 16, padding + 24)
    ctx.fillText("Cosmopolitan", padding + 16, padding + 40)

    ctx.textAlign = "right"
    ctx.fillText("Beltway", padding + chartSize - 16, padding + 24)
    ctx.fillText("Pragmatist", padding + chartSize - 16, padding + 40)

    ctx.textAlign = "left"
    ctx.fillText("Principled", padding + 16, padding + chartSize - 24)
    ctx.fillText("Paleolibertarian", padding + 16, padding + chartSize - 8)

    ctx.textAlign = "right"
    ctx.fillText("Neo-Prag", padding + chartSize - 16, padding + chartSize - 16)

    // Axis labels
    ctx.font = "bold 16px sans-serif"
    ctx.fillStyle = "#334155"
    ctx.textAlign = "center"

    // Bottom label
    ctx.fillText("Principled ← → Pragmatist", padding + chartSize / 2, size - 16)

    // Left label (rotated)
    ctx.save()
    ctx.translate(16, padding + chartSize / 2)
    ctx.rotate(-Math.PI / 2)
    ctx.fillText("Cosmopolitan ← → Paleo", 0, 0)
    ctx.restore()

    // User position marker
    const markerX = padding + (xPercent / 100) * chartSize
    const markerY = padding + ((100 - yPercent) / 100) * chartSize

    // Outer white border
    ctx.fillStyle = "#ffffff"
    ctx.beginPath()
    ctx.arc(markerX, markerY, 16, 0, Math.PI * 2)
    ctx.fill()

    // Gradient marker
    const gradient = ctx.createLinearGradient(markerX - 12, markerY - 12, markerX + 12, markerY + 12)
    gradient.addColorStop(0, "#2563eb")
    gradient.addColorStop(1, "#334155")
    ctx.fillStyle = gradient
    ctx.beginPath()
    ctx.arc(markerX, markerY, 12, 0, Math.PI * 2)
    ctx.fill()

    // PragValues legend
    const legendWidth = 90
    const legendHeight = 28
    const legendX = padding + chartSize - legendWidth
    const legendY = size - 32 - legendHeight / 2
    const legendGradient = ctx.createLinearGradient(legendX, legendY, legendX + legendWidth, legendY + legendHeight)
    legendGradient.addColorStop(0, "#2563eb")
    legendGradient.addColorStop(1, "#334155")
    ctx.fillStyle = legendGradient
    ctx.fillRect(legendX, legendY, legendWidth, legendHeight)
    ctx.fillStyle = "#ffffff"
    ctx.font = "bold 12px sans-serif"
    ctx.fillText("PragValues", legendX + legendWidth / 2, legendY + 18)

    // Download
    const link = document.createElement("a")
    link.download = "pragvalues-result.png"
    link.href = canvas.toDataURL("image/png")
    link.click()
  }

  return (
    <div className="space-y-4">
      <div
        ref={canvasRef}
        style={{ backgroundColor: "#ffffff", padding: "32px", borderRadius: "12px", border: "1px solid #e2e8f0" }}
      >
        <div className="relative w-full aspect-square max-w-2xl mx-auto">
          {/* Grid Background */}
          <div className="absolute inset-0 grid grid-cols-10 grid-rows-10">
            {Array.from({ length: 100 }).map((_, i) => (
              <div key={i} style={{ border: "1px solid #f1f5f9" }} />
            ))}
          </div>

          {/* Axis lines */}
          <div className="absolute inset-0">
            <div className="absolute left-1/2 top-0 bottom-0" style={{ width: "2px", backgroundColor: "#94a3b8" }} />
            <div className="absolute top-1/2 left-0 right-0" style={{ height: "2px", backgroundColor: "#94a3b8" }} />
          </div>

          {/* Quadrant labels */}
          <div
            style={{
              position: "absolute",
              top: "16px",
              left: "16px",
              fontSize: "12px",
              fontWeight: 600,
              color: "#475569",
              backgroundColor: "rgba(255, 255, 255, 0.9)",
              padding: "4px 8px",
              borderRadius: "4px",
            }}
          >
            Radical
            <br />
            Cosmopolitan
          </div>
          <div
            style={{
              position: "absolute",
              top: "16px",
              right: "16px",
              fontSize: "12px",
              fontWeight: 600,
              color: "#475569",
              backgroundColor: "rgba(255, 255, 255, 0.9)",
              padding: "4px 8px",
              borderRadius: "4px",
              textAlign: "right",
            }}
          >
            Beltway
            <br />
            Pragmatist
          </div>
          <div
            style={{
              position: "absolute",
              bottom: "16px",
              left: "16px",
              fontSize: "12px",
              fontWeight: 600,
              color: "#475569",
              backgroundColor: "rgba(255, 255, 255, 0.9)",
              padding: "4px 8px",
              borderRadius: "4px",
            }}
          >
            Principled
            <br />
            Paleolibertarian
          </div>
          <div
            style={{
              position: "absolute",
              bottom: "16px",
              right: "16px",
              fontSize: "12px",
              fontWeight: 600,
              color: "#475569",
              backgroundColor: "rgba(255, 255, 255, 0.9)",
              padding: "4px 8px",
              borderRadius: "4px",
              textAlign: "right",
            }}
          >
            Neo-Prag
          </div>

          {/* Axis labels */}
          <div
            style={{
              position: "absolute",
              left: "-96px",
              top: "50%",
              transform: "translateY(-50%) rotate(-90deg)",
              fontSize: "14px",
              fontWeight: 700,
              color: "#334155",
            }}
          >
            Cosmopolitan ← → Paleo
          </div>
          <div
            style={{
              position: "absolute",
              bottom: "0",
              left: "50%",
              transform: "translateX(-50%) translateY(32px)",
              fontSize: "14px",
              fontWeight: 700,
              color: "#334155",
            }}
          >
            Principled ← → Pragmatist
          </div>

          {/* User position marker */}
          <div
            style={{
              position: "absolute",
              width: "24px",
              height: "24px",
              marginLeft: "-12px",
              marginTop: "-12px",
              borderRadius: "50%",
              background: "linear-gradient(to bottom right, #2563eb, #334155)",
              border: "4px solid #ffffff",
              boxShadow: "0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)",
              zIndex: 10,
              transition: "all 0.5s",
              left: `${xPercent}%`,
              top: `${100 - yPercent}%`,
            }}
          />
        </div>
      </div>

      <div className="flex justify-between items-center">
        <div
          style={{
            background: "linear-gradient(to bottom right, #2563eb, #334155)",
            color: "#ffffff",
            padding: "6px 12px",
            borderRadius: "8px",
            boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)",
            fontSize: "12px",
            fontWeight: 700,
          }}
        >
          PragValues
        </div>
        <Button onClick={handleDownload} className="h-12 font-semibold bg-slate-700 hover:bg-slate-800">
          <Download className="mr-2 h-4 w-4" />
          Download Result Image
        </Button>
      </div>
    </div>
  )
}
