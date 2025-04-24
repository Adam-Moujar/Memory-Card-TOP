export default function Card({ name, img, onClick }) {
    return (
      <div className="card" onClick={onClick}>
        <img src={img} alt={name} />
        <p>{name.charAt(0).toUpperCase() + name.slice(1)}</p>
      </div>
    );
  }