import { readFile } from 'fs/promises'

export const gameNumber = () => {
  const startDate = new Date('2024-02-28')
  const currentDate = new Date()
  const timeDifference = currentDate - startDate
  return Math.floor(timeDifference / (1000 * 60 * 60 * 24))
}

const gen1Pokemon = [
  '',
  'Bulbasaur',
  'Ivysaur',
  'Venusaur',
  'Charmander',
  'Charmeleon',
  'Charizard',
  'Squirtle',
  'Wartortle',
  'Blastoise',
  'Caterpie',
  'Metapod',
  'Butterfree',
  'Weedle',
  'Kakuna',
  'Beedrill',
  'Pidgey',
  'Pidgeotto',
  'Pidgeot',
  'Rattata',
  'Raticate',
  'Spearow',
  'Fearow',
  'Ekans',
  'Arbok',
  'Pikachu',
  'Raichu',
  'Sandshrew',
  'Sandslash',
  'Nidoran♀',
  'Nidorina',
  'Nidoqueen',
  'Nidoran♂',
  'Nidorino',
  'Nidoking',
  'Clefairy',
  'Clefable',
  'Vulpix',
  'Ninetales',
  'Jigglypuff',
  'Wigglytuff',
  'Zubat',
  'Golbat',
  'Oddish',
  'Gloom',
  'Vileplume',
  'Paras',
  'Parasect',
  'Venonat',
  'Venomoth',
  'Diglett',
  'Dugtrio',
  'Meowth',
  'Persian',
  'Psyduck',
  'Golduck',
  'Mankey',
  'Primeape',
  'Growlithe',
  'Arcanine',
  'Poliwag',
  'Poliwhirl',
  'Poliwrath',
  'Abra',
  'Kadabra',
  'Alakazam',
  'Machop',
  'Machoke',
  'Machamp',
  'Bellsprout',
  'Weepinbell',
  'Victreebel',
  'Tentacool',
  'Tentacruel',
  'Geodude',
  'Graveler',
  'Golem',
  'Ponyta',
  'Rapidash',
  'Slowpoke',
  'Slowbro',
  'Magnemite',
  'Magneton',
  "Farfetch'd",
  'Doduo',
  'Dodrio',
  'Seel',
  'Dewgong',
  'Grimer',
  'Muk',
  'Shellder',
  'Cloyster',
  'Gastly',
  'Haunter',
  'Gengar',
  'Onix',
  'Drowzee',
  'Hypno',
  'Krabby',
  'Kingler',
  'Voltorb',
  'Electrode',
  'Exeggcute',
  'Exeggutor',
  'Cubone',
  'Marowak',
  'Hitmonlee',
  'Hitmonchan',
  'Lickitung',
  'Koffing',
  'Weezing',
  'Rhyhorn',
  'Rhydon',
  'Chansey',
  'Tangela',
  'Kangaskhan',
  'Horsea',
  'Seadra',
  'Goldeen',
  'Seaking',
  'Staryu',
  'Starmie',
  'Mr. Mime',
  'Scyther',
  'Jynx',
  'Electabuzz',
  'Magmar',
  'Pinsir',
  'Tauros',
  'Magikarp',
  'Gyarados',
  'Lapras',
  'Ditto',
  'Eevee',
  'Vaporeon',
  'Jolteon',
  'Flareon',
  'Porygon',
  'Omanyte',
  'Omastar',
  'Kabuto',
  'Kabutops',
  'Aerodactyl',
  'Snorlax',
  'Articuno',
  'Zapdos',
  'Moltres',
  'Dratini',
  'Dragonair',
  'Dragonite',
  'Mewtwo',
  'Mew',
]

const buildFusion = entry => {
  const [fusion, artist] = entry.split(',')
  const [idA, idB] = fusion.split('.')

  const nameA = gen1Pokemon[idA]
  const nameB = gen1Pokemon[idB]

  const a = { id: idA, name: nameA }
  const b = { id: idB, name: nameB }

  return { a, b, artist }
}

export async function GET() {
  const filePath = './src/app/api/kanto/output.txt'

  const raw = await readFile(filePath, 'utf-8')

  const data = raw
    .split('\n')
    .map(line => line.trim())
    .filter(Boolean)

  const game = gameNumber() % data.length

  const fusions = []

  for (let i = game * 5; i < 5 * game + 5; i++) {
    console.log(i, data[i])
    fusions.push(buildFusion(data[i]))
  }

  return Response.json({ game, fusions })
}
