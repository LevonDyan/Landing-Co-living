const burger = document.querySelector('.menu-burger-icon');
const menu = document.querySelector('.menu');

burger.addEventListener('click', function (event) {
    menu.classList.toggle('_active');
    burger.classList.toggle('_active');
})

// Video ___________________________________________________________

const loader = document.querySelector('.loader');
const video = document.querySelector('.video-block__video');

loader.addEventListener('click', function (event) {
    video.play();
    loader.style.display = 'none';
    video.setAttribute('controls', '');
})

// Carousel ________________________________________________________

const prevBtn = document.querySelector('.controls__prev');
const nextBtn = document.querySelector('.controls__next');
const prevBtnIcon = document.querySelector('.icon_prev');
const nextBtnIcon = document.querySelector('.icon_next');
const slider = document.querySelector('.slider-block__body');
const sliderItems = document.querySelectorAll('.slider-block__body-inner');
let count = 0;
let width = slider.offsetWidth;

const nextSlide = () => {
    nextBtnIcon.classList.add('active');
    prevBtnIcon.classList.remove('active');

    count++;
    if (count >= sliderItems.length) {
        count = 0;
    }
    rollSlider();
    activeIndicator(count);
}

const prevSlide = () => {
    prevBtnIcon.classList.add('active');
    nextBtnIcon.classList.remove('active');

    count--;
    if (count < 0) {
        count = sliderItems.length - 1;
    }
    rollSlider();
    activeIndicator(count);
}

nextBtn.addEventListener('click', nextSlide);
prevBtn.addEventListener('click', prevSlide);

// setInterval(nextSlide, 2500);

function rollSlider() {
    slider.style.transform = 'translate(-' + count * width + 'px)';
}

function initResize() {
    slider.style.width = width * sliderItems.length + 'px';
    sliderItems.forEach(item => {
        item.style.width = width + 'px';
        item.style.width = 'auto';
    })
}

window.addEventListener('resize', initResize);
initResize();

//Indicators______________________________________________________________________

const indicators = document.querySelectorAll('.carousel-indicators__indicator');

const activeIndicator = n => {
    for (indicator of indicators) {
        indicator.classList.remove('active');
    }
    indicators[n].classList.add('active');
}

//,,,,,,,,,,,
indicators.forEach((item, indexIndicator) => {
    item.addEventListener('click', () => {
        count = indexIndicator;
        rollSlider(count);
        activeIndicator(count);
    })
})

//Fixed header________________________________________________________________________

const header = document.querySelector('.header');
const footer = document.querySelector('.footer');
const wrapper = document.querySelector('.wrapper');

window.addEventListener('scroll', e => {
    if (scrollY > 0) header.classList.add('fixed'); // scrolly or pageYOffset
    else header.classList.remove('fixed');
    if (scrollY >= wrapper.clientHeight - 800 && wrapper.clientWidth > 769) header.style.display = 'none';
    else header.style.display = 'flex';
    if (scrollY <= 0) header.style.display = 'block';
})

// window.onscroll = function() {myFunction()};

// function myFunction() {
//   if (document.documentElement.scrollTop > 0) {
//     header.classList.add('fixed');
//   } else if (document.documentElement.scrollTop == 0) {
//       header.classList.remove('fixed');
//   }
// }

//Scroll To Section____________________________________________________________________

const goToLinks = document.querySelectorAll('.menu__link[data-goto]');

goToLinks.forEach(link => {
    link.addEventListener('click', function (e) {
        e.preventDefault();

        const menuLink = e.target;
        if (menuLink.dataset.goto && document.querySelector(menuLink.dataset.goto)) {
            const goToBlock = document.querySelector(menuLink.dataset.goto);
            const goToBlockValue = goToBlock.getBoundingClientRect().top + pageYOffset - 70; // or header.offsetHeight

            window.scrollTo({
                top: goToBlockValue,
                behavior: "smooth"
            });
            menu.classList.remove('_active');
            burger.classList.remove('_active');
        }
    });
});

//Scroll Down____________________________________________________________________

const scrollDown = document.querySelector('.main-section__scrolldown[data-goto]');

scrollDown.addEventListener('click', function (e) {
    const goToGallery = document.querySelector(scrollDown.dataset.goto);
    const goToGalleryValue = goToGallery.getBoundingClientRect().top + pageYOffset - 70;

    window.scrollTo({
        top: goToGalleryValue,
        behavior: "smooth"
    });
})