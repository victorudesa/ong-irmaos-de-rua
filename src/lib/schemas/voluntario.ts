import { z } from 'zod'

export const voluntarioSchema = z.object({
  nome: z
    .string()
    .min(1, 'Nome é obrigatório')
    .max(100, 'Máximo 100 caracteres')
    .trim(),

  email: z
    .string()
    .min(1, 'Email é obrigatório')
    .email('Email inválido')
    .trim(),

  telefone: z
    .string()
    .min(1, 'Telefone é obrigatório')
    .refine(
      (val) => val.replace(/\D/g, '').length >= 10,
      'Telefone inválido'
    ),

  cidade: z
    .string()
    .min(1, 'Cidade/Bairro é obrigatório')
    .trim(),

  disponibilidade: z
    .array(z.string())
    .min(1, 'Selecione ao menos uma opção'),

  interesse: z
    .string()
    .min(1, 'Selecione uma área'),

  mensagem: z
    .string()
    .max(1000, 'Máximo 1000 caracteres')
    .optional(),
})

export type VoluntarioFormData = z.infer<typeof voluntarioSchema>

export const availabilityOptions = ['Manhã', 'Tarde', 'Noite', 'Fins de semana'] as const
export const interestOptions = ['Distribuição de alimentos', 'Acolhimento', 'Logística', 'Comunicação', 'Outro'] as const
