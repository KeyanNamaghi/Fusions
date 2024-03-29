import React from 'react'
import { Game } from '@/components/Game'

async function getData() {
  const url = process.env.NODE_ENV === 'production' ? 'https://fusions.vercel.app/api/kanto' : 'http://localhost:3000/api/kanto'
  // const { signal } = new AbortController()
  // this is a hack to get it to build
  const res = await fetch(url, { cache: 'no-store' })
  const data = await res.json()
  return data
}

export default async function Home() {
  const data = await getData()

  return (
    <main className="flex min-h-screen flex-col items-center bg-[#020817] gap-2">
      <div className="flex flex-col items-center p-8 w-full  text-white text-center">
        <h1 className="text-4xl font-bold text-center mb-4">Pokémon Fusdle</h1>
        <p className="text-xs">What pairs of Pokémon from Kanto make these fusions?</p>
      </div>
      <Game fusions={data.fusions} />
    </main>
  )
}
