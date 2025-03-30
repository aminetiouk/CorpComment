import { useState } from 'react';
const CHARACTER_LIMIT = 150;

type onAddToListProps = {
  onAddToList: (text: string) => void;
};

export default function FeedbackForm({ onAddToList }: onAddToListProps) {
  const [text, setText] = useState('');
  const [showValidIndicator, setShowValidIndicator] = useState(false);
  const [showInvalidIndicator, setShowInvalidIndicator] = useState(false);

  const charCount = CHARACTER_LIMIT - text.length;
  const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newText = event.target.value;
    if (newText.length > CHARACTER_LIMIT) {
      return;
    }
    setText(newText);
  };

  const handleAddToList = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // Basic Validation
    if (text.includes('#') && text.length >= 5) {
      setShowValidIndicator(true);
      setTimeout(() => setShowValidIndicator(false), 3000);
    } else {
      setShowInvalidIndicator(true);
      setTimeout(() => setShowInvalidIndicator(false), 3000);
      setText('');
      return;
    }
    onAddToList(text);
    setText('');
  };

  return (
    <form
      onSubmit={handleAddToList}
      className={`form ${showValidIndicator ? 'form--valid' : ''} ${showInvalidIndicator ? 'form--invalid' : ''}`}
    >
      <textarea
        id="feedback-textarea"
        spellCheck={false}
        value={text}
        onChange={handleChange}
      ></textarea>
      <label htmlFor="feedback-textarea">
        Enter your feedback here, remember to #hashtag the company
      </label>
      <div>
        <p>{charCount}</p>
        <button>
          <span>Submit</span>
        </button>
      </div>
    </form>
  );
}
