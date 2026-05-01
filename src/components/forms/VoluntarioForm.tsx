import { useForm, Controller } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { toast } from 'sonner'
import { Button } from '@/components/ui/button'
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
    // Simula envio (substituir por chamada real de API)
    await new Promise((resolve) => setTimeout(resolve, 500))
    toast.success('Cadastro enviado com sucesso!', {
      description: 'Entraremos em contato em breve. Obrigado!',
    })
    reset()
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5" noValidate>
      {/* Nome + Email */}
      <div className="grid sm:grid-cols-2 gap-5">
        <div className="space-y-1.5">
          <Label htmlFor="nome">Nome Completo</Label>
          <Input
            id="nome"
            placeholder="Seu nome completo"
            aria-invalid={!!errors.nome}
            {...register('nome')}
          />
          {errors.nome && (
            <p className="text-xs text-destructive">{errors.nome.message}</p>
          )}
        </div>

        <div className="space-y-1.5">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            placeholder="seu@email.com"
            aria-invalid={!!errors.email}
            {...register('email')}
          />
          {errors.email && (
            <p className="text-xs text-destructive">{errors.email.message}</p>
          )}
        </div>
      </div>

      {/* Telefone + Cidade */}
      <div className="grid sm:grid-cols-2 gap-5">
        <div className="space-y-1.5">
          <Label htmlFor="telefone">Telefone</Label>
          <Controller
            name="telefone"
            control={control}
            render={({ field }) => (
              <Input
                id="telefone"
                type="tel"
                placeholder="(11) 99999-9999"
                aria-invalid={!!errors.telefone}
                value={field.value}
                onChange={(e) => field.onChange(formatPhone(e.target.value))}
              />
            )}
          />
          {errors.telefone && (
            <p className="text-xs text-destructive">{errors.telefone.message}</p>
          )}
        </div>

        <div className="space-y-1.5">
          <Label htmlFor="cidade">Cidade / Bairro</Label>
          <Input
            id="cidade"
            placeholder="Ex: São Caetano do Sul"
            aria-invalid={!!errors.cidade}
            {...register('cidade')}
          />
          {errors.cidade && (
            <p className="text-xs text-destructive">{errors.cidade.message}</p>
          )}
        </div>
      </div>

      {/* Disponibilidade (checkboxes) */}
      <Controller
        name="disponibilidade"
        control={control}
        render={({ field }) => (
          <div className="space-y-2">
            <Label>Disponibilidade</Label>
            <div className="flex flex-wrap gap-3">
              {availabilityOptions.map((opt) => {
                const selected = field.value.includes(opt)
                return (
                  <label
                    key={opt}
                    className={cn(
                      'flex items-center gap-2 px-4 py-2.5 rounded-lg border text-sm cursor-pointer transition-all duration-200',
                      selected
                        ? 'bg-primary-subtle border-primary text-primary font-medium'
                        : 'bg-muted border-border text-foreground hover:bg-neutral-50'
                    )}
                  >
                    <input
                      type="checkbox"
                      className="sr-only"
                      checked={selected}
                      onChange={() => {
                        const next = selected
                          ? field.value.filter((d) => d !== opt)
                          : [...field.value, opt]
                        field.onChange(next)
                      }}
                    />
                    {opt}
                  </label>
                )
              })}
            </div>
            {errors.disponibilidade && (
              <p className="text-xs text-destructive">
                {errors.disponibilidade.message}
              </p>
            )}
          </div>
        )}
      />

      {/* Área de Interesse (select) */}
      <div className="space-y-1.5">
        <Label htmlFor="interesse">Área de Interesse</Label>
        <select
          id="interesse"
          aria-invalid={!!errors.interesse}
          className={cn(
            'w-full bg-muted border rounded-lg px-4 py-3 text-sm text-foreground',
            'transition-all duration-200 outline-none',
            'focus:ring-2 focus:ring-primary/30',
            errors.interesse ? 'border-destructive' : 'border-border'
          )}
          {...register('interesse')}
        >
          <option value="">Selecione uma área</option>
          {interestOptions.map((opt) => (
            <option key={opt} value={opt}>{opt}</option>
          ))}
        </select>
        {errors.interesse && (
          <p className="text-xs text-destructive">{errors.interesse.message}</p>
        )}
      </div>

      {/* Mensagem */}
      <div className="space-y-1.5">
        <Label htmlFor="mensagem">
          Mensagem{' '}
          <span className="text-muted-foreground font-normal">(opcional)</span>
        </Label>
        <Textarea
          id="mensagem"
          placeholder="Conte como gostaria de contribuir..."
          className="resize-none"
          rows={4}
          {...register('mensagem')}
        />
      </div>

      <Button type="submit" size="lg" className="w-full sm:w-auto" disabled={isSubmitting}>
        {isSubmitting ? 'Enviando...' : 'Quero Ser Voluntário'}
      </Button>
    </form>
  )
}
