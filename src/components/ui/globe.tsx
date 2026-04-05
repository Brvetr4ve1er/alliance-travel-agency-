"use client"

import { useEffect, useRef } from "react"
import createGlobe from "cobe"

interface Marker {
  id: string
  location: [number, number]
  label: string
}

interface GlobeProps {
  markers?: Marker[]
  className?: string
  markerColor?: [number, number, number]
  baseColor?: [number, number, number]
  glowColor?: [number, number, number]
  dark?: number
  mapBrightness?: number
  markerSize?: number
  markerElevation?: number
  speed?: number
  theta?: number
  diffuse?: number
  mapSamples?: number
}

export function Globe({
  markers = [],
  className = "",
  markerColor = [0.1, 0.7, 1],
  baseColor = [0.3, 0.3, 0.8],
  glowColor = [0.1, 0.7, 1],
  dark = 1,
  mapBrightness = 6,
  markerSize = 0.04,
  markerElevation = 0.1,
  speed = 0.0012,
  theta = 0.2,
  diffuse = 1.1,
  mapSamples = 12000,
}: GlobeProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const globeRef = useRef<any>(null)
  const phiRef = useRef(0)
  const widthRef = useRef(0)
  
  const latestDataRef = useRef({ markers })
  useEffect(() => {
    latestDataRef.current = { markers }
  }, [markers])

  useEffect(() => {
    if (!canvasRef.current) return
    
    const canvas = canvasRef.current

    const onResize = () => {
      if (canvasRef.current) {
        widthRef.current = canvasRef.current.offsetWidth
      }
    }
    
    window.addEventListener('resize', onResize)
    onResize()

    const width = widthRef.current || canvas.offsetWidth
    if (width === 0) return

    const dpr = window.devicePixelRatio || 1
    
    try {
      const globe = createGlobe(canvas, {
        devicePixelRatio: dpr,
        width: width * dpr,
        height: width * dpr,
        phi: 0,
        theta,
        dark,
        diffuse,
        mapSamples,
        mapBrightness,
        baseColor,
        markerColor,
        glowColor,
        markerElevation,
        markers: latestDataRef.current.markers.map((m) => ({
          location: m.location as [number, number],
          size: markerSize,
        })),
        opacity: 0.8,
        onRender: (state) => {
          state.phi = phiRef.current
          phiRef.current += speed
        }
      })

      globeRef.current = globe
      canvas.style.opacity = "1"
    } catch (e) {
      console.error("Failed to initialize globe:", e)
    }

    return () => {
      window.removeEventListener('resize', onResize)
      if (globeRef.current) {
        if (typeof globeRef.current.destroy === 'function') {
          globeRef.current.destroy()
        }
        globeRef.current = null
      }
    }
  }, [markerColor, baseColor, glowColor, dark, mapBrightness, markerSize, markerElevation, speed, theta, diffuse, mapSamples])

  return (
    <div className={`relative aspect-square select-none ${className}`}>
      <canvas
        ref={canvasRef}
        style={{
          width: "100%",
          height: "100%",
          opacity: 0,
          transition: "opacity 1.5s ease",
          borderRadius: "50%",
          touchAction: "none",
        }}
      />
    </div>
  )
}
