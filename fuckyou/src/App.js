import React, { useState, useEffect } from 'react'
import './App.css'

// const SpeechRecognition =
//   window.SpeechRecognition || window.webkitSpeechRecognition
// // const mic = new window.SpeechRecognition() || window.webkitSpeechRecognition()

const SpeechRecognition =
  window.SpeechRecognition || window.webkitSpeechRecognition
const mic = new SpeechRecognition()

mic.continuous = true
mic.interimResults = true
mic.lang = 'en-US'

function App() {
  const [isListening, setIsListening] = useState(false)
  const [note, setNote] = useState(null)
  const [data, setData] = useState(null)
  const [offset, setOffset] = useState(0)
  const [savedNotes, setSavedNotes] = useState([])
  const [midCommand, setMidCommand] = useState(true)
  const [start, setStart] = useState(null)
  const [now, setNow] = useState(null)


  useEffect(() => {
    handleListen()
  }, [isListening])


  const readDB = () => {
    fetch('http://localhost:5001/Title')
      .then(response => response.json())
      .then(data => console.log(data))
      .catch(error => console.error(error));
  }

  const handleListen = () => {
    if (isListening) {
      mic.start()
      mic.onend = () => {
        console.log('continue..')
        mic.start()
      }
    } else {
      mic.stop()
      mic.onend = () => {
        console.log('Stopped Mic on Click')
      }
    }
    mic.onstart = () => {
      console.log('Mics on')
    }
    // mic.onspeechend = () => {
    //   console.log("done listening")
    // }
    mic.onresult = event => {
      let transcript = Array.from(event.results)
        .map(result => result[0])
        .map(result => result.transcript)
        .join('')
      console.log(transcript)

      mic.onerror = event => {
        console.log(event.error)
      }

      if(transcript.indexOf("done") != -1){
        let command = transcript.substring((transcript.lastIndexOf("Remy")+4),transcript.lastIndexOf("done")-1)
        // transcript = transcript.substring(transcript.length-4)
        mic.stop()
        setNote('')
        console.log(command);
        fetch('http://localhost:5001/text-input', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ command })
        })
      }
     }
  }

  const handleSaveNote = () => {
    setSavedNotes([...savedNotes, note])
    setNote('')
  }

  return (
    <>
      <h1>Voice Notes</h1>
      <div className="container">
        <div className="box">
          <h2>Current Note</h2>
          {isListening ? <span>🛑🎙️</span> : <span>🎙️</span>}
          <button onClick={handleSaveNote} disabled={!note}>
            Save Note
          </button>
          {/* <div onLoad={() => setIsListening(true)}> </div> */}
          <button onClick={() => setIsListening(prevState => !prevState)}>
            Start/Stop
          </button>
          <p>{note}</p>
        </div>
        <div className="box">
          <h2>Notes</h2>
          {savedNotes.map(n => (
            <p key={n}>{n}</p>
          ))}
        </div>
        <button onClick={readDB}>
            get DB data
          </button>
      </div>
    </>
  )
}

export default App
