
document.addEventListener('DOMContentLoaded', function() {
    const slider = document.querySelector('.slider');
    const slides = document.querySelectorAll('.slide');
    const prevBtn = document.querySelector('.prev');
    const nextBtn = document.querySelector('.next');
    const dots = document.querySelectorAll('.dot');
    let currentIndex = 0;
    const quoteText = document.getElementById('quote-text');
    const quoteAuthor = document.getElementById('quote-author');
    const newQuoteBtn = document.getElementById('new-quote');
    
    // Fetch quotes from your API
    async function fetchQuotes() {
        try {
            const response = await fetch('https://test001-2425.vercel.app/api/quotes');
            if (!response.ok) {
                throw new Error('Failed to fetch quotes');
            }
            return await response.json();
        } catch (error) {
            console.error('Error fetching quotes:', error);
            return null;
        }
    }
    
    // Display a random quote
    async function displayRandomQuote() {
        const quotes = await fetchQuotes();
        if (quotes && quotes.length > 0) {
            const randomIndex = Math.floor(Math.random() * quotes.length);
            const randomQuote = quotes[randomIndex];
            quoteText.textContent = `${randomQuote.quotes}`;
            quoteAuthor.textContent = `— ${randomQuote.author}`;
        } else {
            quoteText.textContent = "Failed to load quotes. Please try again later.";
            quoteAuthor.textContent = "";
        }
    }
    
    // Initial quote load
    displayRandomQuote();


    function updateSlider(index) {
        currentIndex = index;
        slider.style.transform = `translateX(-${currentIndex * 100}%)`;

                // Update active states
        slides.forEach((slide, i) => {
            slide.classList.toggle('active', i === currentIndex);
        });

        dots.forEach((dot, i) => {
            dot.classList.toggle('active', i === currentIndex);
        });
    }

            // Button events
    nextBtn.addEventListener('click', () => {
        updateSlider((currentIndex + 1) % slides.length);
    });

    prevBtn.addEventListener('click', () => {
        updateSlider((currentIndex - 1 + slides.length) % slides.length);
    });

            // Dot events
    dots.forEach(dot => {
        dot.addEventListener('click', () => {
            updateSlider(parseInt(dot.dataset.index));
        });
    });

            // Touch events
    let startX;

    slider.addEventListener('touchstart', e => {
        startX = e.touches[0].clientX;
    }, {passive: true});

    slider.addEventListener('touchend', e => {
        const endX = e.changedTouches[0].clientX;
                if (startX - endX > 50) updateSlider((currentIndex + 1) % slides.length); // Swipe left
                if (endX - startX > 50) updateSlider((currentIndex - 1 + slides.length) % slides.length); // Swipe right
            }, {passive: true});
});

document.getElementById('emailForm').addEventListener('submit', function(e) {
    e.preventDefault();
    const message = document.getElementById('message').value;
    const subject = "New message from portfolio contact form";
    const mailtoLink = `mailto:mufid.anwari01@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(message)}`;
    window.location.href = mailtoLink;
});


// For scroll effect 
// wait DOM
document.addEventListener('DOMContentLoaded', initScrollEffect);

function initScrollEffect() {
    const row1 = document.querySelector('.row-1');
    const row2 = document.querySelector('.row-2');
    const textChunks = document.querySelectorAll('.text-chunk');

    // check if elements exist
    if (!row1 || !row2 || textChunks.length === 0) {
        console.error('Required elements not found!');
        return;
    }

    let lastScrollY = window.scrollY;
    let velocity = 0;

    function animate() {
        const currentScrollY = window.scrollY;
        velocity = currentScrollY - lastScrollY;
        lastScrollY = currentScrollY;

        const moveX1 = -currentScrollY * 0.7;
        row1.style.transform = `translateX(${moveX1}px)`;

        const moveX2 = currentScrollY * 0.7;
        row2.style.transform = `translateX(${moveX2}px)`;

        requestAnimationFrame(animate);
    }

    animate();
}
