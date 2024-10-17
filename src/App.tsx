import React, { useState, useEffect, ChangeEvent } from 'react'
import { Input } from 'antd'
import OptionNoteData from './data/all.json'
import './App.css'

interface OptionNote {
  name: string
  name_en: string
  difficulty: number
  option: string
  note: string
}

interface Prop {
  optionNotes: OptionNote[]
}

const OptionNoteList: React.FC<Prop> = ({ optionNotes }) => {
  const list = optionNotes.map((n: OptionNote) => {
    return (
      <div className='data-item' key={n.name}>
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

const App: React.FC = () => {
  const [inputVal, setInputVal] = useState<string>('')
  const [displayedNotes, setDisplayedNotes] =
    useState<OptionNote[]>(OptionNoteData)

  useEffect(() => {
    const updateNotes = () => {
      const filtered = OptionNoteData.filter((n) => {
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
    window.scrollTo(0, 0)
    setInputVal(e.target.value)
  }

  return (
    <div>
      <div className='search-block'>
        <Input
          type='text'
          allowClear
          value={inputVal}
          onChange={handleChange}
          size='large'
          className='main-input'
          autoComplete='username'
        />
      </div>
      <div className='data-block'>
        <OptionNoteList optionNotes={displayedNotes} />
      </div>
    </div>
  )
}

export default App
