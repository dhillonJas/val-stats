import React, { useEffect, useState } from 'react';
import "./App.css";

function App() {
  const [matches, setMatches] = useState([]);

  useEffect(() => {
    fetch('http://localhost:5000/matches')
      .then((response) => response.json())
      .then((data) => setMatches(data.data))
      .catch((error) => console.error('Error fetching data:', error));
  }, []);

  return (
    <div className="App">
      <h1>Valorant Pro Match Stats</h1>
      
      {matches.map((match, index) => (
        <div key={index}>
          <h2>{match.teamA} vs {match.teamB} - {match.score}</h2>
        </div>
      ))}
    </div>
  );
}

export default App;
