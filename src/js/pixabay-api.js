import axios from 'axios';

const apiKey = '44714741-6fe0dcbbee03096a14c34d671';
const baseUrl = 'https://pixabay.com/api/';

export async function fetchImages(query, page = 1, perPage = 15) {
    const url = `${baseUrl}?key=${apiKey}&q=${encodeURIComponent(query)}&image_type=photo&orientation=horizontal&safesearch=true&page=${page}&per_page=${perPage}`;

    try {
        const response = await axios.get(url);
        if (response.status !== 200) {
            throw new Error('Network response was not ok');
        }
        return response.data.hits;
    } catch (error) {
        console.error('Error fetching images:', error);
        throw error;
    }
}
