import Nav     from '@/components/nav'
import Hero    from '@/components/sections/hero'
import Work    from '@/components/sections/work'
import About   from '@/components/sections/about'
import Resume  from '@/components/sections/resume'
import Contact from '@/components/sections/contact'

export default function Page() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <Work />
        <About />
        <Resume />
        <Contact />
      </main>
    </>
  )
}
