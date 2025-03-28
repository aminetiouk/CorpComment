import { BiSolidUpArrow } from 'react-icons/bi';
import { TFeedback } from '../../lib/type';
import { useState } from 'react';

type FeedbackItemProps = {
  feedbackItem: TFeedback;
};

export default function FeedbackItem({ feedbackItem }: FeedbackItemProps) {

  const [open, setOpen] = useState(false);

  return (
    <li onClick={() => setOpen((prev) => (!prev))} className={`feedback ${open ? "feedback--expand" : ""}`}>
      <button>
        <BiSolidUpArrow />
        <span>{feedbackItem.upvoteCount}</span>
      </button>
      <div>
        <p>{feedbackItem.badgeLetter}</p>
      </div>
      <div>
        <p>{feedbackItem.company}</p>
        <p>
          {feedbackItem.text}
        </p>
      </div>
      <p>{feedbackItem.daysAgo} d</p>
    </li>
  );
}
