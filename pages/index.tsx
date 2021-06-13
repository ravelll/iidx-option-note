import { useState, useEffect, ChangeEvent } from 'react'
import { Input } from 'antd'
import * as fs from 'fs'
import * as path from 'path'
import 'antd/dist/antd.css'

type OptionNote = {
  name: string
  name_en: string
  difficulty: number
  option: string
  note: string
}

export const getStaticProps = () => {
  const postsDirectory = path.join(process.cwd(), 'posts')
  const optionNoteData = JSON.parse(
    fs.readFileSync(
      path.join(process.cwd(), 'data/options.json'),
      'utf8'
    )
  )
  return {
    props: {
      optionNoteData
    }
  }
}

type OptionNoteListProp = {
  optionNotes: OptionNote[]
}

const OptionNoteList: React.FC<OptionNoteListProp> = ({ optionNotes }) => {
  const list = optionNotes.map((n: OptionNote, i: number) => {
    return (
      <div className='data-block' key={n.name}>
        <div className='main-column'>{n.name}</div>
        <div className='sub-column'>OPTION: {n.option}</div>
        {n.note !== '' && (
          <div className='sub-column note-column'>{n.note}</div>
        )}
      </div>
    )
  })

  return <div className='data-container'>{list}</div>
}

type AppProps = {
  optionNoteData: OptionNote[]
}

const App = ({ optionNoteData }) => {
  const [inputVal, setInputVal] = useState<string>('')
  const [displayedNotes, setDisplayedNotes] =
    useState(optionNoteData)

  useEffect(() => {
    const updateNotes = () => {
      const filtered = optionNoteData.filter((n) => {
        return n.name_en.toLowerCase().includes(inputVal.toLowerCase())
      })

      const exactMatchedIndex = filtered.findIndex((data) => {
        return (
          data.name_en !== '' &&
          data.name_en.toLowerCase() === inputVal.toLowerCase()
        )
      })

      if (exactMatchedIndex !== -1) {
        const exactMatched = filtered.splice(exactMatchedIndex, 1)
        setDisplayedNotes([...exactMatched, ...filtered])
      } else {
        setDisplayedNotes(filtered)
      }
    }

    updateNotes()
  }, [inputVal])

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInputVal(e.target.value)
  }

  return (
    <div>
      <div className='search-block'>
        <Input
          allowClear
          value={inputVal}
          onChange={handleChange}
          size='large'
          className='main-input'
        />
      </div>
      <OptionNoteList optionNotes={displayedNotes} />
    </div>
  )
}

export default App
