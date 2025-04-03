import { useContext, useEffect, useState } from 'react';
import { FeedbackItemsContext } from '../components/contexts/FeedbackContextItemsProvider';
import { TFeedback } from './type';

export function useFeedbackItemsContext() {
  const context = useContext(FeedbackItemsContext);
  if (!context) {
    throw new Error(
      'FeedbackItemsContext is not defined in FeedbackList component'
    );
  }
  return context;
}

export function useFeedbackItem() {
  const [feedbackItems, setFeedbackItems] = useState<TFeedback[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);

      try {
        const response = await fetch(
          'https://bytegrad.com/course-assets/projects/corpcomment/api/feedbacks'
        );

        if (!response.ok) {
          throw new Error();
        }

        const data = await response.json();
        setFeedbackItems(data.feedbacks);
      } catch (error) {
        console.error('Error fetching feedbacks:', error);
        setErrorMessage(`⚠️ Failed to load data`);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);

  return {
    isLoading,
    errorMessage,
    feedbackItems,
    setFeedbackItems
  }
}
