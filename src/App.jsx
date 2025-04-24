import { useState } from 'react';
import Card from './components/Card';
import Message from './components/Message';
import Difficulty from './components/Difficulty';
import './App.css';

function App() {
  const [cards, setCards] = useState([]);
  const [clicked, setClicked] = useState([]);
  const [score, setScore] = useState(0);
  const [bestScore, setBestScore] = useState(0);
  const [difficulty, setDifficulty] = useState('');
  const [showMessage, setShowMessage] = useState(false);
  const [messageText, setMessageText] = useState('');
  const [showDifficulty, setShowDifficulty] = useState(true);
  const cardCounts = {
    easy: 8,
    medium: 10,
    hard: 12,
  };

  // Fetch Pokémon based on difficulty level
  const fetchPokemon = async (count) => {
    const promises = [];
    const usedIds = new Set();

    while (usedIds.size < count) {
      const id = Math.floor(Math.random() * 898) + 1;
      if (!usedIds.has(id)) {
        usedIds.add(id);
        promises.push(fetch(`https://pokeapi.co/api/v2/pokemon/${id}`).then(res => res.json()));
      }
    }

    const data = await Promise.all(promises);
    setCards(data);
  };

  // Handle difficulty selection and start the game
  const handleDifficultySelect = (level) => {
    setDifficulty(level);
    setShowDifficulty(false);

    fetchPokemon(cardCounts[level]);
  };

  // Shuffle array function
  const shuffleArray = (array) => {
    return [...array].sort(() => Math.random() - 0.5);
  };

  // Handle card click
  const handleClick = (name) => {
    if (clicked.includes(name)) {
      setMessageText(`Oops! You already clicked ${name}. Try again.`);
      setShowMessage(true);
      setClicked([]);
      setScore(0);
      fetchPokemon(cardCounts[difficulty]);
    } else {
      const newClicked = [...clicked, name];
      const newScore = score + 1;
      setClicked(newClicked);
      setScore(newScore);
      if (newScore > bestScore) setBestScore(newScore);

      if (newScore === cards.length) {
        setMessageText("Nice job! You got them all! Keep going here's a new set!");
        setShowMessage(true);
        setClicked([]);
        //setScore(0);
        fetchPokemon(cardCounts[difficulty]); // Fetch new set based on difficulty
      } else {
        setCards(shuffleArray(cards));
      }
    }
  };

  return (
    <div className="app">
      {showDifficulty && <Difficulty onSelect={handleDifficultySelect} />}
      <h1>Pokémon Memory Game</h1>
      <p>Click each Pokémon once without repeating!</p>
      <p><strong>Score:</strong> {score} | <strong>Best Score:</strong> {bestScore}</p>

      <div className="card-grid">
        {cards.map(p => (
          <Card key={p.name} name={p.name} img={p.sprites.front_default} onClick={() => handleClick(p.name)} />
        ))}
      </div>

      {showMessage && (
        <Message message={messageText} onClose={() => setShowMessage(false)} />
      )}
    </div>
  );
}

export default App;