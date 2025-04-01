import { useEffect, useMemo, useState } from 'react';
import Container from './components/Layout/Container';
import Footer from './components/Layout/Footer';
import HashtagList from './components/Hashtag/HashtagList';
import { TFeedback } from './lib/type';
import HashtagItem from './components/Hashtag/HashtagItem';

function App() {
  const [selectCompany, setSelectCompany] = useState('');

  const filterFeedbackItem = useMemo(
    () =>
      selectCompany
        ? feedbackItems.filter(
            feedbackItem => feedbackItem.company === selectCompany
          )
        : feedbackItems,
    [feedbackItems, selectCompany]
  );

  const handleSelectCompany = (company: string) => {
    setSelectCompany(company);
  };

  return (
    <div className="app">
      <Footer />

      <Container
        feedbackItems={filterFeedbackItem}
        isLoading={isLoading}
        errorMessage={errorMessage}
        handleAddToList={handleAddToList}
      />

      <HashtagList>
        {companyList.map((company: string) => (
          <HashtagItem
            company={company}
            onSelectCompany={handleSelectCompany}
          />
        ))}
      </HashtagList>
    </div>
  );
}

export default App;
