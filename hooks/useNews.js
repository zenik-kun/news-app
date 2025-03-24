import { useState, useEffect } from "react";
import { fetchNews } from "../services/newsApi";

export const useNews = (initialCategory = "Technology") => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState(initialCategory);
  const [error, setError] = useState(null);

  const getNews = async (query) => {
    try {
      setLoading(true);
      setError(null);
      const data = await fetchNews(query);
      
      // Filter out articles without images
      const filteredArticles = data.filter(article => article.urlToImage);
      setArticles(filteredArticles);
    } catch (err) {
      setError("Failed to fetch news. Please try again.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (selectedCategory) {
      getNews(selectedCategory);
    }
  }, [selectedCategory]);

  const searchNews = (query) => {
    setSelectedCategory(null);
    getNews(query);
  };

  const selectCategory = (category) => {
    setSelectedCategory(category);
  };

  return {
    articles,
    loading,
    error,
    selectedCategory,
    searchNews,
    selectCategory
  };
};