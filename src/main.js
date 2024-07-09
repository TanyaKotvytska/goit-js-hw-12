import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
import { fetchImages } from './js/pixabay-api.js';
import { clearGallery, renderImages } from './js/render-functions.js';

let searchTerm = '';
let currentPage = 1;

const form = document.querySelector('.search-form');
const searchInput = document.querySelector('.search-input');
const loader = document.querySelector('.loader');
const loadMoreBtn = document.querySelector('.load-more');
const gallery = document.querySelector('.gallery');

form.addEventListener('submit', async function (event) {
    event.preventDefault();
    searchTerm = searchInput.value.trim();

    if (searchTerm === '') {
        iziToast.error({
            title: 'Error',
            message: 'Please enter a search term.',
            position: 'topRight',
            backgroundColor: '#EF4040',
            messageColor: '#FFF',
            titleColor: '#FFF',
            iconColor: '#FFF',
            timeout: 5000
        });
        return;
    }

    searchInput.value = '';
    currentPage = 1;
    clearGallery();
    await performSearch(searchTerm, currentPage);
});

loadMoreBtn.addEventListener('click', async function () {
    currentPage++;
    loadMoreBtn.textContent = 'Loading images, please wait...';
    loadMoreBtn.disabled = true;
    await performSearch(searchTerm, currentPage);
    loadMoreBtn.textContent = 'Load more';
    loadMoreBtn.disabled = false;
});

async function performSearch(term, page) {
    loader.textContent = 'Loading images, please wait...';
    loader.style.display = 'block';

    try {
        const images = await fetchImages(term, page);
        loader.style.display = 'none';

        if (images.length === 0) {
            iziToast.info({
                title: 'Error',
                message: 'Sorry, there are no images matching your search query. Please try again!',
                position: 'topRight',
                backgroundColor: '#EF4040',
                messageColor: '#FFF',
                titleColor: '#FFF',
                iconColor: '#FFF',
                timeout: 5000
            });
        } else {
            renderImages(images);
            if (currentPage === 1) {
                loadMoreBtn.style.display = 'inline-block';
            }
            smoothScrollToGallery();
            checkEndOfResults(images.length);
        }
    } catch (error) {
        loader.style.display = 'none';
        iziToast.error({
            title: 'Error',
            message: 'Failed to fetch images. Please try again later.',
            position: 'topRight',
            backgroundColor: '#EF4040',
            messageColor: '#FFF',
            titleColor: '#FFF',
            iconColor: '#FFF',
            timeout: 5000
        });
        console.error('Error fetching images:', error);
    }
}

function smoothScrollToGallery() {
    const galleryHeight = gallery.getBoundingClientRect().height;
    window.scrollBy({
        top: galleryHeight,
        behavior: 'smooth'
    });
}

function checkEndOfResults(imagesCount) {
    const perPage = 15;
    if (imagesCount < perPage) {
        loadMoreBtn.style.display = 'none';
        iziToast.info({
            title: 'Error',
            message: "We're sorry, but you've reached the end of search results.",
            position: 'topRight',
            backgroundColor: '#EF4040',
            messageColor: '#FFF',
            titleColor: '#FFF',
            iconColor: '#FFF',
            timeout: 5000
        });
    } else {
        loadMoreBtn.style.display = 'inline-block';
    }
}
