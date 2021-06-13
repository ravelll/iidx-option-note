import { readFileSync } from 'fs'

type OptionNoteEntry = {
  name: string
  name_en: string
  difficulty: number
  option: string
  note: string
}

const optionNoteEntries: OptionNoteEntry[] = JSON.parse(
  readFileSync('./src/data/all.json', 'utf-8')
)

const hasDuplicatedEntry = (optionNoteEntries: OptionNoteEntry[]): boolean => {
  return (
    optionNoteEntries.length !==
    Array.from(new Set(optionNoteEntries.map((e) => e.name))).length
  )
}

if (hasDuplicatedEntry(optionNoteEntries)) {
  console.log('👮‍♀️ Duplicated entry was found')
  process.exit(1)
} else {
  console.log('💯 No duplicated entry was found')
}
