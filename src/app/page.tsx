import Hero from "@/components/Hero"
import Works from "@/components/Works"
import Projects from "@/components/Projects"
import Shell from "@/components/Shell"

export default function Page() {
  return (
    <Shell>
      <main id="top">
        <Hero />
        <Works />
        <Projects />
      </main>
    </Shell>
  )
}
