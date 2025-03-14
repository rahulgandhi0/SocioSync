const axios = require('axios');

// Using the provided Google API key and Search Engine ID
const GOOGLE_API_KEY = 'AIzaSyCvb9bI_2XBr4yrt3Am8vKaFDZOT8todBE';
const SEARCH_ENGINE_ID = 'a740c18060f64499a';
const BASE_URL = 'https://www.googleapis.com/customsearch/v1';

/**
 * Search for images based on query and image requirements
 * @param {string} query - Search query
 * @param {Object} imageRequirements - Image requirements (aspectRatio, quality)
 * @returns {Promise<Array>} - List of images
 */
async function searchImages(query, imageRequirements = {}) {
  try {
    const { aspectRatio = 'wide', quality = 'high' } = imageRequirements;
    
    // Map aspect ratio to Google's imgSize parameter
    let imgSize;
    if (aspectRatio === 'square') {
      imgSize = 'medium';
    } else if (aspectRatio === 'wide') {
      imgSize = 'xlarge';
    } else if (aspectRatio === 'tall') {
      imgSize = 'large';
    } else {
      imgSize = 'xlarge'; // default
    }
    
    // Map quality to Google's imgType parameter
    let imgType;
    if (quality === 'high') {
      imgType = 'photo';
    } else if (quality === 'medium') {
      imgType = 'clipart';
    } else {
      imgType = 'photo'; // default
    }
    
    const response = await axios.get(BASE_URL, {
      params: {
        key: GOOGLE_API_KEY,
        cx: SEARCH_ENGINE_ID,
        q: query,
        searchType: 'image',
        imgSize: imgSize,
        imgType: imgType,
        num: 10, // Get top 10 images
        safe: 'active'
      }
    });
    
    if (!response.data.items || response.data.items.length === 0) {
      return [];
    }
    
    return response.data.items.map(item => ({
      title: item.title,
      link: item.link,
      thumbnail: item.image.thumbnailLink,
      context: item.image.contextLink,
      width: item.image.width,
      height: item.image.height
    }));
  } catch (error) {
    console.error('Error fetching images from Google:', error.response?.data || error.message);
    throw new Error('Failed to fetch images from Google');
  }
}

module.exports = {
  searchImages
}; 