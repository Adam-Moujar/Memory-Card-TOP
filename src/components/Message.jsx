import './Message.css';

export default function Message({ message, onClose }) {
  return (
    <div className="overlay">
      <div className="message-box">
        <h2>{message}</h2>
        <button onClick={onClose}>OK</button>
      </div>
    </div>
  );
}
