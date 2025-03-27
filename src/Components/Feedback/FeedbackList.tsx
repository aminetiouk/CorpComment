import FeedbackItem from './FeedbackItem';
import SkeletonLoader from '../SkeletonLoader';
import ErrorMessage from '../ErrorMessage';
import { TFeedback } from '../../lib/type';

type FeedbackListProps = {
  feedbackItems: TFeedback[];
  isLoading: boolean;
  errorMessage: string;
};

export default function FeedbackList({
  feedbackItems,
  isLoading,
  errorMessage
}: FeedbackListProps) {
  return (
    <ol className="feedback-list">
      {isLoading && <SkeletonLoader />}
      {errorMessage && <ErrorMessage message={errorMessage} />}
      {feedbackItems.map(feedbackItem => (
        <FeedbackItem key={feedbackItem.id} feedbackItem={feedbackItem} />
      ))}
    </ol>
  );
}
