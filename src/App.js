import React from 'react';
import './App.css';
import Todos from './features/todos/Todos';
import  Weather from  './features/weather/Weather';
import Quotes from './features/quotes/Quotes';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Weather/>
        <Todos />
        <Quotes />
      </header>
    </div>
  );
}

export default App;
