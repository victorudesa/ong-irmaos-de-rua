import { WhatsAppIcon } from '@/components/icons/WhatsAppIcon'

const WhatsAppButton = () => {
  return (
    <a
      href="https://wa.me/5511999999999"
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Fale conosco pelo WhatsApp"
      className="fixed z-50 w-[52px] h-[52px] rounded-full flex items-center justify-center transition-all duration-200 hover:scale-[1.08]"
      style={{
        background: 'var(--color-whatsapp)',
        boxShadow: '0 4px 20px oklch(0.74 0.17 150 / 0.4)',
        bottom: 'max(1rem, env(safe-area-inset-bottom))',
        right: 'max(1rem, env(safe-area-inset-right))',
      }}
    >
      <WhatsAppIcon width="26" height="26" fill="white" />
    </a>
  )
}

export default WhatsAppButton
