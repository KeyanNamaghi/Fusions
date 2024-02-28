'use client'
import { useEffect, useState } from 'react'
import { Guesses } from '@/components/Guesses'
import { FusionImage } from '@/components/FusionImage'
import Image from 'next/image'

const usePersistedState = (key, defaultValue) => {
  // Retrieve state from localStorage on initial render
  const initialState = () => {
    if (typeof window === 'undefined') return defaultValue
    const storedValue = localStorage.getItem(key)
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
    return (
      <div className="flex flex-col justify-center text-center">
        <div className="flex flex-wrap justify-center">
          {fusions.map(fusion => (
            <Image
              src={`https://gitlab.com/pokemoninfinitefusion/customsprites/-/raw/master/CustomBattlers/${fusion.a.id}.${fusion.b.id}.png?ref_type=heads`}
              alt="Pokémon"
              id="pokemon-fusion"
              className="fade-up z-50"
              width={120}
              height={120}
              key={fusion.a.id + fusion.b.id}
            />
          ))}
        </div>
        <h2 className="my-8 text-xl">You scored: {correct}/5</h2>

        <p>Come back tomorrow for more!</p>
        <button onClick={() => setGame([null, null, null, null, null])}>Restart</button>
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
