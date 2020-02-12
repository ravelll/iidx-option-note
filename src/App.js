import React, { Component } from 'react';
import './App.css';

const OptionNoteList = ({ notes }) => {
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

class App extends Component {
  constructor() {
    super();
    this.optionNotes = require("./data/all.json");

    this.state = {
      displayedNotes: this.optionNotes,
      inputVal: ''
    }
  }

  handleChange = event => {
    const inputVal = event.target.value;
    let filtered = this.optionNotes.filter(n => {
      return n.name_en.toLowerCase().includes(inputVal.toLowerCase());
    });

    const exactMatchedIndex = filtered.findIndex(data => {
      return data.name_en !== "" && data.name_en.toLowerCase() === inputVal.toLowerCase();
    });

    if (exactMatchedIndex !== -1) {
      let d = [filtered[exactMatchedIndex]];
      filtered.splice(exactMatchedIndex, 1);
      this.setState({ displayedNotes: d.concat(filtered) });
    } else {
      this.setState({ displayedNotes: filtered });
    }

    this.setState({ inputVal });
  }

  render() {
    const inputVal = this.state.inputVal
    return(
      <div>
        <div className="search-block">
          <input type="url" name="inputVal" className="main-input" value={inputVal} onChange={this.handleChange} />
        </div>
        <OptionNoteList notes={this.state.displayedNotes} />
      </div>
    );
  }
}

export default App;
