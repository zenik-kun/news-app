import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const useNewsStore = create(
  persist(
    (set) => ({
      savedArticles: [],
      
      saveArticle: (article) => 
        set((state) => ({
          savedArticles: [...state.savedArticles.filter(a => a.url !== article.url), article]
        })),
        
      removeArticle: (articleUrl) =>
        set((state) => ({
          savedArticles: state.savedArticles.filter(article => article.url !== articleUrl)
        })),
        
      isSaved: (articleUrl) => (state) => 
        state.savedArticles.some(article => article.url === articleUrl),
    }),
    {
      name: 'news-storage',
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);