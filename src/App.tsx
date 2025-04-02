import Container from './components/Layout/Container';
import Footer from './components/Layout/Footer';
import HashtagList from './components/Hashtag/HashtagList';
import FeedbackContextItemsProvider from './components/contexts/FeedbackContextItemsProvider';

function App() {
  return (
    <div className="app">
      <Footer />

      <FeedbackContextItemsProvider>
        <Container />
        <HashtagList />
      </FeedbackContextItemsProvider>
    </div>
  );
}

export default App;
