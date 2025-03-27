import { TFeedback } from '../../lib/type';
import FeedbackList from '../Feedback/FeedbackList';
import Header from './Header';


type ContainerProps = {
  feedbackItems: TFeedback[];
  errorMessage: string;
  isLoading: boolean;
  handleAddToList: (text: string) => void;
};

export default function Container({
  feedbackItems,
  errorMessage,
  isLoading,
  handleAddToList
}: ContainerProps) {
  return (
    <div className="container">
      <Header handleAddToList={handleAddToList} />
      <FeedbackList
        feedbackItems={feedbackItems}
        errorMessage={errorMessage}
        isLoading={isLoading}
      />
    </div>
  );
}
