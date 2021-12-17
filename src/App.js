import './App.css';
import bg from "./bg.jpg";
import { useState } from "react";
import rick from './rick-roll-rick-ashley.gif'

function App() {
  const QA = [
      {
          q: 'Question 1',
          a: 5,
          n: 5,
      },
      {
          q: 'Question 2',
          a: 4,
          n: 4,
      },
      {
          q: 'Cyfra dziesiątek największej liczby pierwszej poznanej przed erą elektroniki:',
          a: 2,
          n: 2,
      }
  ]

  const [started, setStarted] = useState(false)
  const [finished, setFinished] = useState(false)
  const [qIndex, setQIndex] = useState(0)
  const [inputValue, setInputValue] = useState('')
  const [tip, setTip] = useState(false)

  const handleAnswer = () => {
    if(Number(inputValue) === QA[qIndex].a) {
        if((qIndex + 1) > (QA.length - 1)) {
            setFinished(true)
        } else {
            setInputValue('')
            setQIndex(qIndex + 1)
        }
    } else {
        setTip(true)
    }
  }

  return (
    <div className="App" style={{backgroundImage: `url(${bg})`, backgroundSize: '25%'}}>
        <div id='main'>
            {!started && (
                <>
                    <h2>Odpowiedz na pytania i zgadnij swój kod do sejfu!</h2>
                    <button onClick={() => setStarted(true)}>Start</button>
                </>
            )}
            {(started && !finished) && (
                <>
                    <h2>{QA[qIndex].q}</h2>
                    <input type='text' placeholder="Odpowiedź" value={inputValue} onChange={(e) => setInputValue(e.target.value)} onSelect={() => setTip(false)}/>
                    {tip && <p>Zła odpowiedź :(</p>}
                    <button onClick={handleAnswer}>Sprawdź odpowiedź</button>
                </>
            )}
            {finished && (
                <>
                    <img src={rick} alt={'rickRoll'}/>
                    <h2>Gratki! Pełny kod to:</h2>
                    <h1>832</h1>
                </>
            )}
        </div>
    </div>
  );
}

export default App;
