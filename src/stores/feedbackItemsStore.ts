import { create } from 'zustand';

export const useFeedbackItemsStore = create((set, get) => ({
  feedbackItems: [],
  isLoading: false,
  errorMessage: '',
  selectedCompany: '',
  getCompanyList: () => {
    return get()
      .feedbackItems.map(name => name.company)
      .filter((company, index, array) => {
        return array.indexOf(company) === index;
      });
  },
  getFilteredFeedbackItems: () => {
    const state = get();

    return state.selectedCompany
      ? state.feedbackItems.filter(
          feedbackItem => feedbackItem.company === state.selectedCompany
        )
      : state.feedbackItems;
  },
  addItemToList: async (text: string) => {
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
    set(state => ({
      feedbackItems: [...state.feedbackItems, newItem]
    }));

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
  },
  selectCompany: (company: string) => {
    set(() => ({
      selectedCompany: company
    }));
  },
  fetchData: async () => {
    set(() => ({
      isLoading: true
    }));

    try {
      const response = await fetch(
        'https://bytegrad.com/course-assets/projects/corpcomment/api/feedbacks'
      );

      if (!response.ok) {
        throw new Error();
      }

      const data = await response.json();
      set(() => ({
        feedbackItems: data.feedbacks
      }));
    } catch (error) {
      console.error('Error fetching feedbacks:', error);
      set(() => ({
        errorMessage: '⚠️ Failed to load data'
      }));
    } finally {
      set(() => ({
        isLoading: false
      }));
    }
  }
}));
