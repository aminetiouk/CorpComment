import FeedbackItem from './FeedbackItem';
import SkeletonLoader from '../SkeletonLoader';
import ErrorMessage from '../ErrorMessage';
import { useFeedbackItemsContext } from '../../lib/hooks';

export default function FeedbackList() {
  const {isLoading, errorMessage, feedbackItems } = useFeedbackItemsContext();
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
