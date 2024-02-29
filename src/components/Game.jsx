'use client'
import { useEffect, useState } from 'react'
import { Guesses } from '@/components/Guesses'
import { FusionImage } from '@/components/FusionImage'
import Image from 'next/image'
import { Button } from './ui/button'

const usePersistedState = (key, defaultValue) => {
  // Retrieve state from localStorage on initial render
  const initialState = () => {
    if (typeof window === 'undefined') return defaultValue
    const storedValue = localStorage.getItem(key)
    const date = localStorage.getItem('date')
    if (date !== new Date().toDateString()) {
      localStorage.setItem('date', new Date().toDateString())
      return defaultValue
    }
    return storedValue ? JSON.parse(storedValue) : defaultValue
  }

  // Create state and setter function
  const [state, setState] = useState(initialState)

  // Update localStorage whenever the state changes
  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(state))
  }, [key, state])

  return [state, setState]
}

const paginationState = state => {
  if (state === true) return '🟢'
  if (state === false) return '🔴'
  return '⚪️'
}

export const Game = ({ fusions }) => {
  const [rendered, setRendered] = useState(false)
  const [game, setGame] = usePersistedState('game', [null, null, null, null, null])
  const index = game.indexOf(null)

  const { a, b, artist } = fusions[index] || {}
  const pagination = game?.map(paginationState).join('')

  const updateGame = value => {
    console.log({ game, index, value })
    const newGame = game.map((state, i) => {
      if (i === index) return value
      return state
    })

    console.log({ newGame, index })
    setGame([...newGame])
  }

  useEffect(() => {
    setRendered(true)
  }, [])

  if (!rendered) return null

  if (index === -1) {
    const correct = game.filter(Boolean).length
    const shareText = `I scored ${correct}/5 on Pokémon Fusdle! Can you beat my score? ${window.location.href}`

    const share = () =>
      navigator.clipboard
        .writeText(shareText)
        .then(() => alert('Copied to clipboard: ' + shareText))
        .catch(err => console.error('Unable to copy text to clipboard', err))

    return (
      <div className="flex flex-col justify-center text-center">
        <div className="flex flex-wrap justify-center">
          {fusions.map(fusion => (
            <div key={fusion.a.id + fusion.b.id}>
              <Image
                src={`https://gitlab.com/pokemoninfinitefusion/customsprites/-/raw/master/CustomBattlers/${fusion.a.id}.${fusion.b.id}.png?ref_type=heads`}
                alt="Pokémon"
                id="pokemon-fusion"
                className="fade-up z-50"
                width={120}
                height={120}
              />
              <p>{fusion.a.name}</p>
              <span className="text-xs">+</span>
              <p>{fusion.b.name}</p>
            </div>
          ))}
        </div>
        <h2 className="mt-8 text-xl font-bold">You scored: {correct}/5</h2>
        <p>Come back tomorrow for more!</p>
        <Button className="m-4" onClick={share}>
          Share
        </Button>
      </div>
    )
  }

  return (
    <>
      <FusionImage indexA={a.id} indexB={b.id} />
      <p className="text-xs">Artist: {artist}</p>
      <Guesses nameA={a.name.toLowerCase()} nameB={b.name.toLowerCase()} updateGame={updateGame} />
      <span className="tracking-[1em]">{pagination}</span>
    </>
  )
}
