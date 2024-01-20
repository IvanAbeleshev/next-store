import type { Metadata } from 'next'
import { Montserrat } from 'next/font/google'
import './globals.css'
import Header from '@/components/Header/Header'
import Footer from '@/components/Footer/Footer'

const montserrat = Montserrat({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Yama-Gaz',
  description: 'Магазин автозапчастин',
}

interface IPropsRootLayout{
  children: React.ReactNode,
  params: {
    locale:string
  }
}

export default function RootLayout({
  children,
  params: { locale }
}: IPropsRootLayout) {

  return (
    <html lang={ locale }>
      <body 
        className={
          montserrat.className + `
          flex 
          flex-col 
          min-h-screen 
          justify-between 
          bg-background`
        }
      >
        <Header />
        <main className='grow !mx-media-auto pb-8'>
          {children}
        </main>
        <Footer />
      </body>
    </html>
  )
}
