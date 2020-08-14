import React from 'react';
import './App.css';
import axios from 'axios';

function App() {
  React.useEffect(() => {
    axios.get('/api/books').then(response => {
      console.log('response', response);
    })
  }, []);
  return (
    <div className="App">
      App
    </div>
  );
}

export default App;
