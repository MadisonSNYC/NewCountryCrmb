import './globals.css'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Country Crmb - CRM for Homesteaders',
  description: 'The complete CRM solution for homesteaders, farm stands, and cottage food businesses',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-cream min-h-screen`}>
        {children}
      </body>
    </html>
  )
}
