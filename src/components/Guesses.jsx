'use client'
import { useEffect, useState } from 'react'
import { Button } from '@/components/ui/button'
import { Guess } from './Guess'

export function Guesses({ nameA, nameB, updateGame }) {
  const [valueA, setValueA] = useState('')
  const [valueB, setValueB] = useState('')

  useEffect(() => {
    setValueA('')
    setValueB('')
  }, [nameA, nameB])

  return (
    <div className="w-full items-center justify-center text-sm grid gap-4 sm:flex p-8">
      <Guess value={valueA} setValue={setValueA} />
      <Guess value={valueB} setValue={setValueB} />
      <Button
        disabled={!valueA || !valueB}
        onClick={() => {
          let result
          if (valueA === valueB) {
            result = nameA === nameB && valueA === nameA
          } else {
            result = [nameA, nameB].includes(valueA) && [nameA, nameB].includes(valueB)
          }
          updateGame(result)
        }}>
        Guess
      </Button>
    </div>
  )
}
