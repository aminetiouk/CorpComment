import { useEffect, useState } from 'react';
import FeedbackItem, {Feedback} from './FeedbackItem';
import SkeletonLoader from './SkeletonLoader';
import ErrorMessage from './ErrorMessage';

export default function FeedbackList() {
  const [feedbackItems, setFeedbackItem] = useState<Feedback[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);

      try {

        const response = await fetch('https://bytegrad.com/course-assets/projects/corpcomment/api/feedbacks');
  
        if (!response.ok) {
          throw new Error();
        }
  
        const data = await response.json();
        setFeedbackItem(data.feedbacks)
      } catch (error) {
        console.error("Error fetching feedbacks:", error);
        setErrorMessage(`⚠️ Failed to load data`)
      } finally {
        setIsLoading(false);
      }
    }
    fetchData();
  }, []);
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
