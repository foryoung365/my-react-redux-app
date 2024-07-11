import React from 'react';
import './App.css';
import Todos from './features/todos/Todos';
import Weather from './features/weather/Weather';
import Quotes from './features/quotes/Quotes';
import Images from './features/images/Images';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Images>
          <Weather />
          <Todos />
          <Quotes />
        </Images>

      </header>
    </div>
  );
}

export default App;
