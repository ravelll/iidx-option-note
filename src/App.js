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

    this.state = {
      displayedNotes: [],
      defaultNotes: [],
      inputVal: ''
    }

    this.handleChange = this.handleChange.bind(this);
    this.updateNote = this.updateNote.bind(this);
  }

  handleChange(event) {
    this.setState({ inputVal: event.target.value });
  }

  updateNote() {
    let filtered = this.state.defaultNotes.filter(n => {
      return n.name_en.toLowerCase().includes(this.state.inputVal.toLowerCase());
    });

    const exactMatchedIndex = filtered.findIndex(data => {
      return data.name_en !== "" && data.name_en.toLowerCase() === this.state.inputVal.toLowerCase();
    });

    if (exactMatchedIndex !== -1) {
      const exactMatched = filtered.splice(exactMatchedIndex, 1);
      console.log(exactMatched);
      this.setState({ displayedNotes: [...exactMatched, ...filtered] });
    } else {
      this.setState({ displayedNotes: filtered });
    }
  }

  componentDidUpdate(_, prevState) {
    if (this.state.inputVal !== prevState.inputVal) {
      this.updateNote();
    }
  }

  componentDidMount() {
    const notes = require("./data/all.json");
    this.setState({ defaultNotes: notes });
    this.setState({ displayedNotes: notes });
  }

  render() {
    return(
      <div>
        <div className="search-block">
          <input type="url" name="inputVal" className="main-input" value={this.state.inputVal} onChange={this.handleChange} />
        </div>
        <OptionNoteList notes={this.state.displayedNotes} />
      </div>
    );
  }
}

export default App;
