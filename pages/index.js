import Head from 'next/head'
import { Hero } from '../components/main/Hero'
import { Portafolio } from '../components/main/Portafolio'
import { Skills } from '../components/main/Skills'



export default function Home() {
  return (
    <>
      <Head>
        <title>DGC - Full Stack Developer</title>
        <meta name="javascript developer" content="Diego González Cruz" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Hero />
      <Skills />
      <Portafolio />
    </>


  )
}
