import './App.css';
import {useEffect, useState} from 'react';

function App() {
  const [partita, setPartita] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [showResult, setShowResult] = useState(false);
  const [number, setNumber] = useState();
  const [result, setRisultato] = useState([]);

  const handleInput = (e) => {
    setNumber(e.target.value);
  };

  async function Invia(){
    const response = await fetch(`http://localhost:8080/partita/${partita.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        numero: number,
      }),
    });

    const r = await response.json();
    setRisultato(r);
  }

  async function start(){
    setIsLoading(true);
    
    const response = await fetch('http://localhost:8080/partita', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      }
    });

    const r = await response.json();
    setPartita(r);
    setIsLoading(false);
    setShowForm(true);
  }

  function result(){
    switch (risultato.risultato) {
      case -1: 
        return <p>Troppo Piccolo</p>    
      case 0:
        return <p>Hai indovinato in {risultato.risultato}</p> 
      case 1:
        return <p>Troppo Grande</p>
      
    }
  }

  return (
    <div className="App">
      <h2>Indovina Numero</h2>
      <button onClick = {start}>Nuova Partita</button> <br/>
      {showForm && 
      <div>
        <p>
          ID: {partita.id} <br />
          Tentativi: {risultato.tentativi || partita.tentativi}
        </p>
        <p>Inserisci un numero da 1 a 100: <br></br>
          <input  onChange = {handleInput} placeholder = 'inserisci un numero'></input>
          <button onClick = {Invia}>invia</button>
        </p>
      </div>
      }
         
      {result.risultato === 0 &&
        <p>Hai indovinato in {result.tentativi}</p> 
      }

      {result.risultato === 1 &&
        <p>Troppo Grande</p>
      }

      {result.risultato === -1 &&
        <p>Troppo Piccolo</p>
      }

    </div>
      
  );
}

export default App;