import FeedbackItem from './FeedbackItem';
import SkeletonLoader from '../SkeletonLoader';
import ErrorMessage from '../ErrorMessage';
import { useFeedbackItemsStore } from '../../stores/feedbackItemsStore';

export default function FeedbackList() {
  const isLoading = useFeedbackItemsStore(state => state.isLoading);
  const errorMessage = useFeedbackItemsStore(state => state.errorMessage);
  const filteredFeedbackItems = useFeedbackItemsStore(state =>
    state.getFilteredFeedbackItems()
  );
  return (
    <ol className="feedback-list">
      {isLoading && <SkeletonLoader />}
      {errorMessage && <ErrorMessage message={errorMessage} />}
      {filteredFeedbackItems.map(feedbackItem => (
        <FeedbackItem key={feedbackItem.id} feedbackItem={feedbackItem} />
      ))}
    </ol>
  );
}
