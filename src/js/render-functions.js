import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

const gallery = document.querySelector('.gallery');
const lightbox = new SimpleLightbox('.gallery a');

export function clearGallery() {
    gallery.innerHTML = '';
    lightbox.refresh();
}

export function renderImages(images) {
    const html = images.map(image => `
        <li class="gallery-item">
            <a class="gallery-link" href="${image.largeImageURL}">
                <div class="large-img">
                    <img class="gallery-image" src="${image.webformatURL}" alt="${image.tags}">
                    <ul class="img-details">
                        <li><p>Likes</p><p>${image.likes}</p></li>
                        <li><p>Views</p><p>${image.views}</p></li>
                        <li><p>Comments</p><p>${image.comments}</p></li>
                        <li><p>Downloads</p><p>${image.downloads}</p></li>
                    </ul>
                </div>
            </a>
        </li>
    `).join('');
    
    gallery.insertAdjacentHTML('beforeend', html);
    lightbox.refresh();
}