import React, { useState, useEffect } from 'react';
import { api } from './api/api';
import './App.css';

function App() {
  const [ledStatus, setLedStatus] = useState(false);

  useEffect(() => {
    api.get('status').then(({ data }) => {
      debugger;
      setLedStatus(data);
    });
  });

  const toggleLed = () => {
    const prom = ledStatus ? api.get('off') : api.get('on');
    prom
      .then((result) => {
        setLedStatus(result.data);
      })
      .catch(() => alert('Falha ao comunicar com o servidor'));
  };
  return (
    <div className="App">
      <h1>LED STATUS</h1>
      <h2>{ledStatus ? 'Ligado' : 'Desligado'}</h2>
      <button className={ledStatus ? 'on' : 'off'} onClick={toggleLed}>
        toggleLed
      </button>
    </div>
  );
}

export default App;
