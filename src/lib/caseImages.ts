import type { LightboxItem } from "@/data/lightbox"
import type { Block, Project } from "@/data/projects/types"

// Bir projedeki tüm görselleri, büyütme penceresinin anlayacağı listeye çevirir.
// Kimlik olarak görselin yolu kullanılır.
export function collectImages(project: Project): LightboxItem[] {
  const out: LightboxItem[] = []
  const seen = new Set<string>()

  const add = (src: string, alt: string, title: string, description = "") => {
    if (seen.has(src)) return
    seen.add(src)
    out.push({ id: src, title, description, format: project.name, alt, image: src })
  }

  add(project.cover.src, project.cover.alt, project.title, project.summary)

  project.sections.forEach((section) => section.blocks.forEach((block: Block) => {
    if (block.type === "showcase") block.screens.forEach((screen) => add(screen.image.src, screen.image.alt, screen.caption, block.text))
    if (block.type === "cards") block.items.forEach((item) => add(item.image.src, item.image.alt, item.title, item.text))
    if (block.type === "features") block.images.forEach((image) => add(image.src, image.alt, image.alt))
    if (block.type === "picker") block.items.forEach((item) => add(item.preview.src, item.preview.alt, item.title, item.text))
    if (block.type === "figure") add(block.image.src, block.image.alt, block.caption ?? block.image.alt)
  }))

  return out
}
