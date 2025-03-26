import { useState } from 'react';
const CHARACTER_LIMIT = 150;

type onAddToListProps = {
  onAddToList: (text: string) => void;
};

export default function FeedbackForm({ onAddToList }: onAddToListProps) {
  const [text, setText] = useState('');
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
    onAddToList(text);
  };

  return (
    <form onSubmit={handleAddToList} className="form">
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
