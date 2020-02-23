import React, { useState, useEffect } from 'react';
import './App.css';

const OptionNotesList = ({ notes }) => {
  const list = notes.map((n, i) => {
    return(
      <div className="data-block" key={i}>
        <div className="main-column">{ n.name }</div>
        <div className="sub-column">OPTION: { n.option }</div>
        { n.note !== "" &&
          <div className="sub-column note-column">{ n.note }</div>
        }
      </div>
    )
  });

  return <div className="data-container">{ list }</div>
}

const App = () => {
  const [displayedNotes, setDisplayedNotes] = useState([]);
  const [defaultNotes, setDefaultNotes] = useState([]);
  const [inputVal, setInputVal] = useState('');

  useEffect(() => {
    if (defaultNotes.length === 0) {
      const notes = require("./data/all.json");
      setDefaultNotes(notes);
      setDisplayedNotes(notes);
    }
  }, [defaultNotes.length])

  useEffect(() => {
    const updateNotes = () => {
      let filtered = defaultNotes.filter(n => {
        return n.name_en.toLowerCase().includes(inputVal.toLowerCase());
      });

      const exactMatchedIndex = filtered.findIndex(data => {
        return data.name_en !== "" && data.name_en.toLowerCase() === inputVal.toLowerCase();
      });

      if (exactMatchedIndex !== -1) {
        const exactMatched = filtered.splice(exactMatchedIndex, 1);
        setDisplayedNotes([...exactMatched, ...filtered]);
      } else {
        setDisplayedNotes(filtered);
      }
    }

    updateNotes();
  }, [inputVal, defaultNotes]);

  const handleChange = (e) => {
    setInputVal(e.target.value);
  }

  return(
    <div>
      <div className="search-block">
        <input type="text" inputmode="text" name="inputVal" className="main-input" value={inputVal} onChange={handleChange} />
      </div>
      <OptionNotesList notes={displayedNotes} />
    </div>
  );
}

export default App;
