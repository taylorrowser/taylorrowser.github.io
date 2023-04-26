const background_images = [
    "images/mobile_background_1.png",
    "images/mobile_background_2.png",
    "images/mobile_background_3.png"
];

const foreground_images = [
    "images/mobile_foreground_1.png",
    "images/mobile_foreground_2.png",
    "images/mobile_foreground_3.png"
];

const container = document.querySelector('.container');
const backgrounds = document.createElement('div');
backgrounds.classList.add('backgrounds');
container.appendChild(backgrounds);

const foregrounds = document.createElement('div');
foregrounds.classList.add('foregrounds');
container.appendChild(foregrounds);


for (let i = 0; i < background_images.length; i++) {
    const background = document.createElement('img');
    background.classList.add('background');
    background.src = background_images[i];

    const foreground = document.createElement('img');
    foreground.classList.add('foreground');
    foreground.src = foreground_images[i];

    backgrounds.prepend(background);
    foregrounds.appendChild(foreground);
}

container.addEventListener('scroll', () => {
    backgrounds.style.transform = `translateY(${container.scrollTop}px)`;
});
