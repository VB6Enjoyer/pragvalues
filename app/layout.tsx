import type React from "react"
import type { Metadata } from "next"
import { Geist, Geist_Mono } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import "./globals.css"

const _geist = Geist({ subsets: ["latin"] })
const _geistMono = Geist_Mono({ subsets: ["latin"] })

const basePath = process.env.NODE_ENV === "production" ? "/pragvalues" : ""

export const metadata: Metadata = {
  title: "PragValues - Political Compass Test",
  description:
    "Discover where you stand on the political compass of libertarian thought across strategic and cultural dimensions",

  icons: {
    icon: [
      {
        url: `${basePath}/icon.png`,
        media: "(prefers-color-scheme: light)",
      },
      {
        url: `${basePath}/icon-dark.png`,
        media: "(prefers-color-scheme: dark)",
      },
      {
        url: `${basePath}/icon.png`,
        type: "image/png",
      },
    ],
    apple: `${basePath}/icon-dark.png`,
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`font-sans antialiased`}>
        {children}
        <Analytics />
      </body>
    </html>
  )
}
