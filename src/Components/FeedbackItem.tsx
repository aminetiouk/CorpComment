import { BiSolidUpArrow } from 'react-icons/bi';
import { TFeedback } from '../lib/type';

type FeedbackItemProps = {
  feedbackItem: TFeedback;
};

export default function FeedbackItem({ feedbackItem }: FeedbackItemProps) {
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
