import { cn } from '@/lib/utils'
import type { GalleryItem } from '@/lib/gallery'

type GalleryMasonryProps = {
  items: GalleryItem[]
  className?: string
  eagerFirst?: boolean
}

const GalleryMasonry = ({ items, className, eagerFirst = false }: GalleryMasonryProps) => {
  return (
    <div className={cn('columns-2 md:columns-3 [column-gap:0.75rem] sm:[column-gap:1rem]', className)}>
      {items.map((item, index) => (
        <figure key={item.src} className="mb-3 sm:mb-4 break-inside-avoid">
          <img
            src={item.src}
            alt={item.alt}
            width={item.width}
            height={item.height}
            loading={eagerFirst && index === 0 ? 'eager' : 'lazy'}
            className="w-full rounded-[18px] object-cover transition-opacity duration-200 hover:opacity-90"
          />
        </figure>
      ))}
    </div>
  )
}

export default GalleryMasonry
