import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const useNewsStore = create(
  persist(
    (set, get) => ({
      savedArticles: [],
      
      saveArticle: (article) => 
        set((state) => {
          // Avoid duplicates
          if (state.savedArticles.find(a => a.url === article.url)) {
            return { savedArticles: state.savedArticles };
          }
          return { savedArticles: [...state.savedArticles, article] };
        }),
        
      removeArticle: (articleUrl) =>
        set((state) => ({
          savedArticles: state.savedArticles.filter(article => article.url !== articleUrl)
        })),
    }),
    {
      name: 'news-app-storage',
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);