export default function ErrorMessage({ message }) {
  return (
    <div className="error-container">
      <div className="error-text">{message}</div>
    </div>
  );
}
