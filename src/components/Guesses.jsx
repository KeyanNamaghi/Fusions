'use client'
import * as React from 'react'
import { Button } from '@/components/ui/button'
import { Guess } from './Guess'

export function Guesses({ nameA, nameB }) {
  const [valueA, setValueA] = React.useState('')
  const [valueB, setValueB] = React.useState('')

  // create listener for correct and wrong events
  React.useEffect(() => {
    console.log('useEffect')
    const correctListener = event => {
      console.log('correct', event.detail)
    }
    const wrongListener = event => {
      console.log('wrong', event.detail)
    }

    window.addEventListener('correct', correctListener)
    window.addEventListener('wrong', wrongListener)
    return () => {
      window.removeEventListener('correct', correctListener)
      window.removeEventListener('wrong', wrongListener)
    }
  }, [])

  return (
    <div className="w-full items-center justify-center text-sm grid gap-4 sm:flex p-8">
      <Guess value={valueA} setValue={setValueA} />
      <Guess value={valueB} setValue={setValueB} />
      <Button
        disabled={!valueA || !valueB}
        onClick={() => {
          let result
          if (valueA === valueB) {
            result = nameA === nameB && valueA === nameA ? 'correct' : 'wrong'
          } else {
            result = [nameA, nameB].includes(valueA) && [nameA, nameB].includes(valueB) ? 'correct' : 'wrong'
          }
          window.dispatchEvent(new CustomEvent(result, { detail: { valueA, valueB } }))
        }}>
        Guess
      </Button>
    </div>
  )
}
