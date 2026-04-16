import { MessageCircle } from 'lucide-react'

const WhatsAppButton = () => {
  return (
    <a
      href="https://wa.me/5511999999999"
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Fale conosco pelo WhatsApp"
      className="fixed bottom-6 right-6 z-50 w-14 h-14 bg-whatsapp rounded-lg shadow-sm flex items-center justify-center hover:scale-105 transition-all duration-200"
    >
      <MessageCircle className="w-6 h-6 text-white" fill="white" strokeWidth={0} />
    </a>
  )
}

export default WhatsAppButton
