import { useState } from 'react'
import { useForm, Controller } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { cn } from '@/lib/utils'
import {
  voluntarioSchema,
  type VoluntarioFormData,
  availabilityOptions,
  interestOptions,
} from '@/lib/schemas/voluntario'

const formatPhone = (value: string) => {
  const digits = value.replace(/\D/g, '').slice(0, 11)
  if (digits.length <= 2) return digits
  if (digits.length <= 7) return `(${digits.slice(0, 2)}) ${digits.slice(2)}`
  return `(${digits.slice(0, 2)}) ${digits.slice(2, 7)}-${digits.slice(7)}`
}

export function VoluntarioForm() {
  const [success, setSuccess] = useState(false)

  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<VoluntarioFormData>({
    resolver: zodResolver(voluntarioSchema),
    defaultValues: {
      nome: '',
      email: '',
      telefone: '',
      cidade: '',
      disponibilidade: [],
      interesse: '',
      mensagem: '',
    },
  })

  const onSubmit = async (_data: VoluntarioFormData) => {
    await new Promise((resolve) => setTimeout(resolve, 800))
    setSuccess(true)
  }

  if (success) {
    return (
      <div className="flex flex-col items-center text-center gap-4 py-12 px-8">
        <div
          className="w-16 h-16 rounded-full flex items-center justify-center"
          style={{ background: 'oklch(0.95 0.06 145)' }}
        >
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" strokeWidth="2.5" stroke="oklch(0.65 0.18 145)">
            <polyline points="20 6 9 17 4 12" />
          </svg>
        </div>
        <h3 className="font-display text-[28px] tracking-tight" style={{ color: 'var(--color-ink)' }}>
          Cadastro enviado!
        </h3>
        <p className="text-[15px] leading-relaxed max-w-[360px]" style={{ color: 'var(--color-ink-mid)' }}>
          Obrigado pelo seu interesse. Nossa equipe entrará em contato pelo WhatsApp em breve para dar os próximos passos.
        </p>
        <button
          type="button"
          onClick={() => {
            setSuccess(false)
            reset()
          }}
          className="mt-2 text-sm font-bold bg-transparent border-none cursor-pointer"
          style={{ color: 'var(--color-primary)' }}
        >
          Enviar outro cadastro
        </button>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-5">
      {/* Nome + Email */}
      <div className="grid sm:grid-cols-2 gap-5">
        <div className="space-y-1.5">
          <Label htmlFor="nome" className="text-[13px] font-semibold" style={{ color: 'var(--color-ink)' }}>
            Nome Completo
          </Label>
          <Input
            id="nome"
            placeholder="Seu nome completo"
            aria-invalid={!!errors.nome}
            className={cn(errors.nome && 'border-destructive')}
            {...register('nome')}
          />
          {errors.nome && <ErrorMsg>{errors.nome.message}</ErrorMsg>}
        </div>

        <div className="space-y-1.5">
          <Label htmlFor="email" className="text-[13px] font-semibold" style={{ color: 'var(--color-ink)' }}>
            Email
          </Label>
          <Input
            id="email"
            type="email"
            placeholder="seu@email.com"
            aria-invalid={!!errors.email}
            className={cn(errors.email && 'border-destructive')}
            {...register('email')}
          />
          {errors.email && <ErrorMsg>{errors.email.message}</ErrorMsg>}
        </div>
      </div>

      {/* Telefone + Cidade */}
      <div className="grid sm:grid-cols-2 gap-5">
        <div className="space-y-1.5">
          <Label htmlFor="telefone" className="text-[13px] font-semibold" style={{ color: 'var(--color-ink)' }}>
            Telefone
          </Label>
          <Controller
            name="telefone"
            control={control}
            render={({ field }) => (
              <Input
                id="telefone"
                type="tel"
                placeholder="(11) 99999-9999"
                aria-invalid={!!errors.telefone}
                className={cn(errors.telefone && 'border-destructive')}
                value={field.value}
                onChange={(e) => field.onChange(formatPhone(e.target.value))}
              />
            )}
          />
          {errors.telefone && <ErrorMsg>{errors.telefone.message}</ErrorMsg>}
        </div>

        <div className="space-y-1.5">
          <Label htmlFor="cidade" className="text-[13px] font-semibold" style={{ color: 'var(--color-ink)' }}>
            Cidade / Bairro
          </Label>
          <Input
            id="cidade"
            placeholder="Ex: São Caetano do Sul"
            aria-invalid={!!errors.cidade}
            className={cn(errors.cidade && 'border-destructive')}
            {...register('cidade')}
          />
          {errors.cidade && <ErrorMsg>{errors.cidade.message}</ErrorMsg>}
        </div>
      </div>

      {/* Disponibilidade — pill chips */}
      <Controller
        name="disponibilidade"
        control={control}
        render={({ field }) => (
          <div className="space-y-2">
            <Label className="text-[13px] font-semibold" style={{ color: 'var(--color-ink)' }}>
              Disponibilidade
            </Label>
            <div className="flex flex-wrap gap-2.5 mt-1">
              {availabilityOptions.map((opt) => {
                const selected = field.value.includes(opt)
                return (
                  <button
                    key={opt}
                    type="button"
                    onClick={() => {
                      const next = selected
                        ? field.value.filter((d) => d !== opt)
                        : [...field.value, opt]
                      field.onChange(next)
                    }}
                    className={cn(
                      'flex items-center gap-2 px-[18px] py-2.5 rounded-full border text-[13px] font-semibold cursor-pointer transition-all duration-[180ms] select-none',
                      selected
                        ? 'text-white border-transparent'
                        : 'bg-white border-[oklch(0.10_0.008_50_/_0.09)] hover:border-[var(--color-primary)] hover:text-[var(--color-primary)]'
                    )}
                    style={selected ? { background: 'var(--color-primary)', borderColor: 'var(--color-primary)' } : { color: 'var(--color-ink)' }}
                  >
                    <span
                      className="w-2 h-2 rounded-full border flex-shrink-0 transition-colors duration-150"
                      style={{
                        borderColor: 'currentColor',
                        background: selected ? 'white' : 'transparent',
                      }}
                    />
                    {opt}
                  </button>
                )
              })}
            </div>
            {errors.disponibilidade && (
              <ErrorMsg>{errors.disponibilidade.message}</ErrorMsg>
            )}
          </div>
        )}
      />

      {/* Área de Interesse */}
      <div className="space-y-1.5">
        <Label htmlFor="interesse" className="text-[13px] font-semibold" style={{ color: 'var(--color-ink)' }}>
          Área de Interesse
        </Label>
        <div className="relative">
          <select
            id="interesse"
            aria-invalid={!!errors.interesse}
            className={cn(
              'w-full h-12 bg-white border rounded-[10px] pl-4 pr-10 text-sm appearance-none outline-none transition-all duration-150',
              'focus:border-[var(--color-primary)] focus:ring-[3px] focus:ring-[oklch(0.55_0.20_25_/_0.12)]',
              errors.interesse ? 'border-destructive' : 'border-[oklch(0.10_0.008_50_/_0.09)]'
            )}
            style={{ color: 'var(--color-ink)', fontFamily: 'var(--font-sans)' }}
            {...register('interesse')}
          >
            <option value="">Selecione uma área</option>
            {interestOptions.map((opt) => (
              <option key={opt} value={opt}>{opt}</option>
            ))}
          </select>
          {/* Custom chevron */}
          <span className="pointer-events-none absolute right-3.5 top-1/2 -translate-y-1/2">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#666" strokeWidth="2">
              <polyline points="6 9 12 15 18 9" />
            </svg>
          </span>
        </div>
        {errors.interesse && <ErrorMsg>{errors.interesse.message}</ErrorMsg>}
      </div>

      {/* Mensagem */}
      <div className="space-y-1.5">
        <Label htmlFor="mensagem" className="text-[13px] font-semibold" style={{ color: 'var(--color-ink)' }}>
          Mensagem{' '}
          <span className="text-[12px] font-normal" style={{ color: 'var(--color-ink-soft)' }}>(opcional)</span>
        </Label>
        <Textarea
          id="mensagem"
          placeholder="Conte como gostaria de contribuir..."
          className="resize-none min-h-[120px] leading-relaxed"
          rows={4}
          {...register('mensagem')}
        />
      </div>

      {/* Submit */}
      <button
        type="submit"
        disabled={isSubmitting}
        className="inline-flex items-center gap-2.5 px-8 py-[15px] rounded-[10px] border-none cursor-pointer text-[15px] font-bold text-white transition-all duration-150 hover:-translate-y-px disabled:opacity-55 disabled:cursor-not-allowed disabled:translate-y-0 mt-2"
        style={{ background: isSubmitting ? 'var(--color-primary)' : 'var(--color-primary)' }}
      >
        {isSubmitting ? (
          <>
            <svg
              width="18" height="18" viewBox="0 0 24 24" fill="none"
              stroke="white" strokeWidth="2" strokeLinecap="round"
              className="animate-spin"
            >
              <circle cx="12" cy="12" r="10" strokeDasharray="32" strokeDashoffset="8" />
            </svg>
            Enviando...
          </>
        ) : (
          <>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
              <path d="M22 2L11 13" /><path d="M22 2L15 22 11 13 2 9l20-7z" />
            </svg>
            Quero Ser Voluntário
          </>
        )}
      </button>
    </form>
  )
}

function ErrorMsg({ children }: { children: React.ReactNode }) {
  return (
    <p className="flex items-center gap-1 text-xs mt-1" style={{ color: 'var(--color-primary)' }}>
      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <circle cx="12" cy="12" r="10" /><line x1="12" y1="8" x2="12" y2="12" /><line x1="12" y1="16" x2="12.01" y2="16" />
      </svg>
      {children}
    </p>
  )
}
