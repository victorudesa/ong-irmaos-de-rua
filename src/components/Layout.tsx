import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import WhatsAppButton from '@/components/WhatsAppButton'

interface LayoutProps {
  children: React.ReactNode
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-2 focus:z-50 focus:rounded focus:px-4 focus:py-2 focus:text-sm focus:font-bold focus:text-white"
        style={{ background: 'var(--color-primary)' }}
      >
        Pular para o conteúdo
      </a>
      <Navbar />
      <main id="main" className="pt-16">
        {children}
      </main>
      <Footer />
      <WhatsAppButton />
    </>
  )
}

export default Layout
