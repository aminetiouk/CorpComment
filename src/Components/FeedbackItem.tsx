import { BiSolidUpArrow } from 'react-icons/bi';

export type Feedback = {
  id: number;
  company: string;
  badgeLetter: string;
  upvoteCount: number;
  text: string;
  daysAgo: number;
};

type FeedbackItem = {
  feedbackItem: Feedback;
};

export default function FeedbackItem({ feedbackItem }: FeedbackItem) {
  return (
    <li className="feedback">
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
