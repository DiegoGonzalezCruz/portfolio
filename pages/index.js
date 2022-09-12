import Head from 'next/head'
import { Toaster } from 'react-hot-toast'
import { Contact } from '../components/main/Contact'
import { Hero } from '../components/main/Hero'
import { Portafolio } from '../components/main/Portafolio'
import { Skills } from '../components/main/Skills'



export default function Home() {
  return (
    <>
      <Toaster />
      <Head>
        <title>DGC - Full Stack Developer</title>
        <meta name="javascript developer" content="Diego González Cruz" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Hero />
      <Skills />
      <Portafolio />
      <Contact />
    </>


  )
}
