import './Difficulty.css';

export default function Difficulty({ onSelect }) {
  return (
    <div className="overlay">
      <div className="difficulty-box">
        <h2>Choose Difficulty</h2>
        <button onClick={() => onSelect('easy')}>Easy (8 cards)</button>
        <button onClick={() => onSelect('medium')}>Medium (10 cards)</button>
        <button onClick={() => onSelect('hard')}>Hard (12 cards)</button>
      </div>
    </div>
  );
}
