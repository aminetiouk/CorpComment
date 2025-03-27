import { useEffect, useState } from 'react';
import Container from './components/Layout/Container';
import Footer from './components/Layout/Footer';
import HashtagList from './components/Hashtag/HashtagList';
import { TFeedback } from './lib/type';

function App() {
  const [feedbackItems, setFeedbackItem] = useState<TFeedback[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [selectCompany, setSelectCompany] = useState('');

  const filterFeedbackItem = selectCompany
    ? feedbackItems.filter(
        feedbackItem => feedbackItem.company === selectCompany
      )
    : feedbackItems;

  const companyList = feedbackItems
    .map(name => name.company)
    .filter((company, index, array) => {
      return array.indexOf(company) === index;
    });

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

  const handleSelectCompany = (company: string) => {
    setSelectCompany(company);
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
        feedbackItems={filterFeedbackItem}
        isLoading={isLoading}
        errorMessage={errorMessage}
        handleAddToList={handleAddToList}
      />

      <HashtagList
        companyList={companyList}
        handleSelectCompany={handleSelectCompany}
      />
    </div>
  );
}

export default App;
