import { create } from 'zustand';
import { TFeedbackItem } from '../lib/type';

type Store = {
  feedbackItems: TFeedbackItem[];
  isLoading: boolean;
  errorMessage: string;
  selectedCompany: string;
  companyList: string[];
  getFilteredFeedbackItems: () => TFeedbackItem[];
  addItemToList: (text: string) => Promise<void>;
  selectCompany: (company: string) => void;
  fetchFeedbackItems: () => Promise<void>;
};

export const useFeedbackItemsStore = create<Store>((set, get) => ({
  feedbackItems: [],
  isLoading: false,
  errorMessage: '',
  selectedCompany: '',
  companyList: [],

  getFilteredFeedbackItems: () => {
    const state = get();

    return state.selectedCompany
      ? state.feedbackItems.filter(
          (feedbackItem) => feedbackItem.company === state.selectedCompany
        )
      : state.feedbackItems;
  },

  addItemToList: async (text: string) => {
    const companyName = text
      .split(' ')
      .find(word => word.includes('#'))!
      .substring(1);

    const newItem: TFeedbackItem = {
      id: new Date().getTime(),
      text: text,
      upvoteCount: 0,
      daysAgo: 0,
      company: companyName,
      badgeLetter: companyName.substring(0, 1).toUpperCase()
    };

    set(state => ({
      feedbackItems: [...state.feedbackItems, newItem],
      companyList: Array.from(new Set([...state.companyList, companyName])) // Update company list
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

  fetchFeedbackItems: async () => {
    set(() => ({
      isLoading: true,
      errorMessage: ''
    }));

    try {
      const response = await fetch(
        'https://bytegrad.com/course-assets/projects/corpcomment/api/feedbacks'
      );

      if (!response.ok) {
        throw new Error('Failed to fetch feedback items');
      }

      const data = await response.json();
      const feedbacks: TFeedbackItem[] = data.feedbacks;
      set(() => {
        const uniqueCompanies = Array.from(
          new Set(data.feedbacks.map((item: TFeedbackItem) => item.company))
        );
        return {
          feedbackItems: feedbacks,
          companyList: uniqueCompanies as string[]
        };
      });
    } catch (error) {
      console.error(error);
      set(() => ({
        errorMessage: 'Something went wrong. Please try again later.'
      }));
    } finally {
      set(() => ({
        isLoading: false
      }));
    }
  }
}));
