const carouselImages = document.getElementById('carousel-images');
const imageInput = document.getElementById('imageInput');
const uploadBtn = document.getElementById('uploadBtn');
let currentIndex = 0;

document.addEventListener('DOMContentLoaded', loadImagesFromLocalStorage);

uploadBtn.addEventListener('click', () => {
    const file = imageInput.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function(e) {
            const imgElement = document.createElement('img');
            imgElement.src = e.target.result;
            carouselImages.appendChild(imgElement);
            saveImageToLocalStorage(e.target.result);
        }
        reader.readAsDataURL(file);
    }
});

document.querySelector('.right-btn').addEventListener('click', () => {
    if (currentIndex < carouselImages.children.length - 1) {
        currentIndex++;
        updateCarousel();
    }
});

document.querySelector('.left-btn').addEventListener('click', () => {
    if (currentIndex > 0) {
        currentIndex--;
        updateCarousel();
    }
});

function updateCarousel() {
    const imgWidth = carouselImages.children[0].clientWidth;
    carouselImages.style.transform = `translateX(${-imgWidth * currentIndex}px)`;
}

function saveImageToLocalStorage(imageSrc) {
    let images = JSON.parse(localStorage.getItem('carouselImages')) || [];
    images.push(imageSrc);
    localStorage.setItem('carouselImages', JSON.stringify(images));
}

function loadImagesFromLocalStorage() {
    let images = JSON.parse(localStorage.getItem('carouselImages')) || [];
    images.forEach(imageSrc => {
        const imgElement = document.createElement('img');
        imgElement.src = imageSrc;
        carouselImages.appendChild(imgElement);
    });
    if (images.length > 0) {
        updateCarousel();
    }
}
