import React from 'react';
import { Link } from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <p>
          oh lalala
        </p>
         Learn React
         <Link to="../public/loginPage.html">Click me</Link>
      </header>
    </div>
  );
}

export default App;
