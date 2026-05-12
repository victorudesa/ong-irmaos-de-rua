import masonry01 from '@/assets/images/sections/masonry/masonry-01.jpg'
import masonry02 from '@/assets/images/sections/masonry/masonry-02.jpg'
import masonry03 from '@/assets/images/sections/masonry/masonry-03.jpg'
import masonry04 from '@/assets/images/sections/masonry/masonry-04.jpg'
import masonry05 from '@/assets/images/sections/masonry/masonry-05.jpg'
import masonry06 from '@/assets/images/sections/masonry/masonry-06.jpg'

export type GalleryItem = {
  src: string
  alt: string
  caption: string
  width: number
  height: number
}

export const galleryItems: GalleryItem[] = [
  {
    src: masonry01,
    alt: 'Voluntários da ONG Irmãos de Rua durante ação social',
    caption: 'Cris, liderando a ONG há mais de 10 anos e nossa motorista oficial da van.',
    width: 1200,
    height: 1600,
  },
  {
    src: masonry02,
    alt: 'Ação solidária da ONG Irmãos de Rua',
    caption: 'Membro da Insanos MC, parceiros da ONG há bastante tempo.',
    width: 1200,
    height: 900,
  },
  {
    src: masonry03,
    alt: 'Registro de voluntários em atividade social',
    caption: 'A sede da nossa ONG, recentemente reformada e expandida.',
    width: 1201,
    height: 1200,
  },
  {
    src: masonry04,
    alt: 'Voluntários reunidos em ação de apoio nas ruas',
    caption: 'Nossa van, responsável pela locomoção durantes as ações da ONG.',
    width: 1201,
    height: 1500,
  },
  {
    src: masonry05,
    alt: 'Momento de acolhimento em ação da ONG',
    caption: 'Nossos vonluntários reunidos fazendo a oração depois no fim da noite.',
    width: 1201,
    height: 800,
  },
  {
    src: masonry06,
    alt: 'Equipe da ONG Irmãos de Rua em trabalho voluntário',
    caption: 'O baazar, onde vendemos itens doados semanalmente e arrecadamos fundos para a ONG.',
    width: 1201,
    height: 1350,
  },
]
