const navbar = document.querySelector('.navbar');

window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// auto slider
const container = document.querySelector('.card-container');
        const wrapper = document.querySelector('.cards-wrapper');
        const cards = document.querySelectorAll('.card');
        const cardWidth = cards[0].offsetWidth + 20; 
        let currentIndex = 0;
        let autoSlideInterval;

        function slideToIndex(index) {
            currentIndex = index;
            container.scrollTo({
                left: index * cardWidth,
                behavior: 'smooth'
            });
        }

        function autoSlide() {
            currentIndex = (currentIndex + 1) % cards.length;
            slideToIndex(currentIndex);
        }

        function startAutoSlide() {
            stopAutoSlide();
            autoSlideInterval = setInterval(autoSlide, 3000);
        }

        function stopAutoSlide() {
            if (autoSlideInterval) {
                clearInterval(autoSlideInterval);
            }
        }

        let scrollTimeout;
        container.addEventListener('scroll', () => {
            clearTimeout(scrollTimeout);
            stopAutoSlide();
            
            scrollTimeout = setTimeout(() => {
                const scrollPosition = container.scrollLeft;
                currentIndex = Math.round(scrollPosition / cardWidth);
                startAutoSlide();
            }, 150);
        });

        container.addEventListener('touchstart', () => {
            stopAutoSlide();
        });

        container.addEventListener('touchend', () => {
            startAutoSlide();
        });

        startAutoSlide();

        document.addEventListener('visibilitychange', () => {
            if (document.hidden) {
                stopAutoSlide();
            } else {
                startAutoSlide();
            }
        });