import { readFileSync } from 'fs'
import { exit } from 'process'

type OptionNoteEntry = {
  name: string
  name_en: string
  difficulty: number
  option: string
  note: string
}

const optionNoteEntries: OptionNoteEntry[] = JSON.parse(
  readFileSync('./src/data/all.json', 'utf-8'),
)

const hasDuplicatedEntry = (optionNoteEntries: OptionNoteEntry[]): number => {
  let error = 0
  const titles = optionNoteEntries.map((e) => e.name)
  titles.forEach((t, i) => {
    if (titles.indexOf(t) !== i) {
      console.log(`"${t}" is duplicated!!`)
      error = 1
    }
  })

  return error
}

const error = hasDuplicatedEntry(optionNoteEntries)
if (error === 0) {
  console.log('💯 No duplicated entry was found')
} else {
  exit(1)
}
