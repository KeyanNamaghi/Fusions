import React from 'react'
import { Guesses } from '@/components/Guesses'
import { FusionImage } from '@/components/FusionImage'
import { gameNumber, gen1Pokemon } from '@/lib/utils'
import { readFile } from 'fs/promises'

async function getData() {
  const filePath = './src/app/api/kanto/output.txt'
  const raw = await readFile(filePath, 'utf-8')

  const data = raw.split('\n')

  const game = gameNumber() % data.length
  const daily = data[game]
  const [fusion, artist] = daily.split(',')
  const [a, b] = fusion.split('.')

  const nameA = gen1Pokemon[a]
  const nameB = gen1Pokemon[b]

  return { game, a, nameA, b, nameB, artist }
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
