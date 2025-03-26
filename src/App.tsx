import { useEffect, useState } from 'react';
import Container from './Components/Container';
import Footer from './Components/Footer';
import HashtagList from './Components/HashtagList';
import { TFeedback } from './lib/type';

function App() {
  const [feedbackItems, setFeedbackItem] = useState<TFeedback[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleAddToList = async (text: string) => {
    const companyName = text
      .split(' ')
      .find(word => word.includes('#'))!
      .substring(1);

    const newItem: TFeedback = {
      id: new Date().getTime(),
      company: companyName,
      badgeLetter: companyName.substring(0, 1).toUpperCase(),
      daysAgo: 0,
      upvoteCount: 0,
      text: text
    };
    setFeedbackItem([...feedbackItems, newItem]);

    await fetch(
      'https://bytegrad.com/course-assets/projects/corpcomment/api/feedbacks',
      {
        method: 'POST',
        body: JSON.stringify(newItem),
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        }
      }
    );
  };

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
        setFeedbackItem(data.feedbacks);
      } catch (error) {
        console.error('Error fetching feedbacks:', error);
        setErrorMessage(`⚠️ Failed to load data`);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="app">
      <Footer />

      <Container
        feedbackItems={feedbackItems}
        isLoading={isLoading}
        errorMessage={errorMessage}
        handleAddToList={handleAddToList}
      />

      <HashtagList />
    </div>
  );
}

export default App;
