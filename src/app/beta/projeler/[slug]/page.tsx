import type { Metadata } from "next"
import { notFound } from "next/navigation"
import ProjectDetail from "@/components/ProjectDetail"
import { getProject, projects } from "@/data/projects"

type Props = { params: Promise<{ slug: string }> }

export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const project = getProject(slug)

  if (!project) return {}

  return {
    title: project.cardTitle,
    description: project.summary,
    openGraph: { title: project.cardTitle, description: project.summary, images: [ { url: project.cover.src } ] }
  }
}

export default async function Page({ params }: Props) {
  const { slug } = await params
  const project = getProject(slug)

  if (!project) return notFound()

  return <ProjectDetail project={ project } />
}
