'use client'
import Image from 'next/image'

import ColorThief from 'colorthief'
import { rgbToHsl } from '@/lib/utils'

const handleImageLoad = async event => {
  const colorThief = new ColorThief()
  const image = event.target
  const color = colorThief.getColor(image)

  console.log('color', color)

  const { h, s, l } = rgbToHsl(...color)
  const foreground = l < 0.5 ? `210 40% 98%` : `222.2 47.4% 11.2%`

  document.documentElement.style.setProperty('--accent', `${h * 360}, ${s * 100}%, ${l * 100}%`)
  document.documentElement.style.setProperty('--accent-foreground', foreground)
  document.documentElement.style.setProperty('--image-before-bg', `radial-gradient(circle, rgba(${color},0.5) 10%, transparent 90%)`)
  document.documentElement.style.setProperty('--image-before-opacity', 1)
}

export function FusionImage({ indexA, indexB }) {
  return (
    <div className="max-w-sm mx-auto overflow-hidden rounded-xl flex items-center justify-center glow relative">
      <Image
        src={`https://gitlab.com/pokemoninfinitefusion/customsprites/-/raw/master/CustomBattlers/${indexA}.${indexB}.png?ref_type=heads`}
        alt="Pokémon"
        id="pokemon-fusion"
        className="fade-up z-50 p-12"
        width={300}
        height={300}
        onLoad={handleImageLoad}
      />
    </div>
  )
}
