import React, { Suspense } from 'react'
import { Guesses } from '@/components/Guesses'
import { FusionImage } from '@/components/FusionImage'

async function getData() {
  const protocol = process.env.NODE_ENV === 'production' ? 'https' : 'http'
  const { signal } = new AbortController()
  const res = await fetch(`${protocol}://${process.env.VERCEL_URL}/api/kanto`, { signal, cache: 'no-store' })
  const data = await res.json()
  return data
}

export default async function Home() {
  const { game, a, nameA, b, nameB, artist } = await getData()

  return (
    <main className="flex min-h-screen flex-col items-center bg-[#020817] gap-8">
      <div className="flex flex-col items-center p-8 w-full  text-white text-center">
        <h1 className="text-4xl font-bold text-center mb-4">Pokémon Fusdle</h1>
        <p>Which two Pokémon from the original 151 make this fusion?</p>
      </div>
      <FusionImage indexA={a} indexB={b} />
      <Guesses nameA={nameA.toLowerCase()} nameB={nameB.toLowerCase()} />
    </main>
  )
}
