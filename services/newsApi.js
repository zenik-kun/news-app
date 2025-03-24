import { NEWS_API_KEY } from "@env";

const BASE_URL = "https://newsapi.org/v2/everything?q=";

export const fetchNews = async (query) => {
  try {
    const response = await fetch(`${BASE_URL}${query}&apiKey=${NEWS_API_KEY}`);
    const data = await response.json();
    return data.articles;
  } catch (error) {
    console.error("Error fetching news:", error);
    throw error;
  }
};