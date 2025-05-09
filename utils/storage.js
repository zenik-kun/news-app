// filepath: /home/zenik/work/products/news-app/utils/storage.js
import AsyncStorage from '@react-native-async-storage/async-storage';

const SAVED_ARTICLES_KEY = 'savedArticles';

// Helper function to get all saved articles
const getSavedArticles = async () => {
  try {
    const jsonValue = await AsyncStorage.getItem(SAVED_ARTICLES_KEY);
    return jsonValue != null ? JSON.parse(jsonValue) : [];
  } catch (e) {
    console.error('Error reading saved articles from AsyncStorage', e);
    return [];
  }
};

// Save an article
export const saveArticle = async (article) => {
  if (!article || !article.url) {
    console.error('Attempted to save an invalid article');
    return;
  }
  try {
    const savedArticles = await getSavedArticles();
    // Avoid duplicates
    if (!savedArticles.find(a => a.url === article.url)) {
      const newSavedArticles = [...savedArticles, article];
      const jsonValue = JSON.stringify(newSavedArticles);
      await AsyncStorage.setItem(SAVED_ARTICLES_KEY, jsonValue);
      console.log('Article saved:', article.title);
    } else {
      console.log('Article already saved:', article.title);
    }
  } catch (e) {
    console.error('Error saving article to AsyncStorage', e);
  }
};

// Remove an article by its URL
export const removeArticle = async (articleUrl) => {
  if (!articleUrl) {
    console.error('Attempted to remove an article with no URL');
    return;
  }
  try {
    const savedArticles = await getSavedArticles();
    const newSavedArticles = savedArticles.filter(article => article.url !== articleUrl);
    const jsonValue = JSON.stringify(newSavedArticles);
    await AsyncStorage.setItem(SAVED_ARTICLES_KEY, jsonValue);
    console.log('Article removed:', articleUrl);
  } catch (e) {
    console.error('Error removing article from AsyncStorage', e);
  }
};

// Check if an article is saved by its URL
export const isArticleSaved = async (articleUrl) => {
  if (!articleUrl) return false;
  try {
    const savedArticles = await getSavedArticles();
    return savedArticles.some(article => article.url === articleUrl);
  } catch (e) {
    console.error('Error checking if article is saved in AsyncStorage', e);
    return false;
  }
};

// Get all saved articles (e.g., for a "Saved" screen)
export const getAllSavedArticles = async () => {
    return await getSavedArticles();
};