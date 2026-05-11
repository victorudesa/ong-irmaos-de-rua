import Layout from '@/components/Layout'
import PageHero from '@/components/PageHero'
import GalleryMasonry from '@/components/GalleryMasonry'
import { galleryItems } from '@/lib/gallery'

const Galeria = () => {
  return (
    <Layout>
      <PageHero
        title="Galeria"
        breadcrumb="Galeria"
        subtitle="Registros das ações, encontros e pessoas que constroem essa missão nas ruas."
      />

      <section className="py-[var(--section-y)] md:py-[var(--section-y-md)]" style={{ background: 'white' }}>
        <div className="container mx-auto px-6 md:px-8 max-w-[1200px]">
          <GalleryMasonry items={galleryItems} eagerFirst />
        </div>
      </section>
    </Layout>
  )
}

export default Galeria
