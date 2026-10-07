import { indoles } from "./indoles"
import type { Project } from "./types"

// Ana sayfadaki "Projelerim" bölümünde bu sırayla görünür.
// Yeni proje eklemek için: yeni bir dosya oluştur (indoles.ts'i kopyala), sonra buraya ekle.
export const projects: Project[] = [
  indoles
]

export const getProject = (slug: string) => projects.find((project) => project.slug === slug)
export type { Project }
