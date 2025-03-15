import axios from 'axios';

const API_URL = process.env.NODE_ENV === 'production' ? '' : 'http://localhost:3001';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Scraper API calls
export const scrapeEventbriteUrl = async (url) => {
  try {
    const response = await api.post('/api/scraper/eventbrite', { url });
    return response.data;
  } catch (error) {
    console.error('Error scraping Eventbrite URL:', error);
    throw error;
  }
};

// Image API calls
export const getImages = async (query, aspectRatio, quality) => {
  try {
    const response = await api.get('/api/images/search', {
      params: {
        query,
        aspectRatio,
        quality,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching images:', error);
    throw error;
  }
};

// Caption API calls
export const generateCaption = async (data, type) => {
  try {
    const response = await api.post('/api/captions/generate', {
      data,
      type,
    });
    return response.data;
  } catch (error) {
    console.error('Error generating caption:', error);
    throw error;
  }
}; 