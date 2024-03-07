import axios from 'axios';

axios.defaults.baseURL = 'https://api.unsplash.com';

export default async function fetchGallery(query, page) {
  const response = await axios.get('/search/photos', {
    params: {
      client_id: 'aNotxHfou_iYUfpZtKGu2_JGjUf1g1iV-dle7hDUolg',
      query,
      page,
      per_page: 12,
    },
  });

  if (response.data.total === 0) {
    throw new Error('No results were found, try another query');
  }
  return response.data;
}
