document.addEventListener('DOMContentLoaded', function() {

    // --- Mobile Navigation Toggle ---
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.main-nav');

    if (hamburger && navMenu) {
        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('is-open');
            navMenu.classList.toggle('is-open');
            // Prevent scrolling when the mobile menu is open
            document.body.style.overflow = navMenu.classList.contains('is-open') ? 'hidden' : '';
        });
    }

    // --- CONSOLIDATED: Scroll-triggered Animations ---
    const animatedElements = document.querySelectorAll('.anim-trigger, .fade-in, .animate-on-scroll');
    
    if ("IntersectionObserver" in window && animatedElements.length > 0) {
        const animationObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('is-visible');
                    observer.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.15 // Start animation when 15% of the element is visible
        });

        animatedElements.forEach(element => {
            animationObserver.observe(element);
        });
    } else {
        animatedElements.forEach(element => {
            element.classList.add('is-visible');
        });
    }
    
    // --- Animated Counter for Statistics ---
    const statsSection = document.querySelector('.hero-stats');

    if (statsSection) {
        const counters = document.querySelectorAll('.stat-number');
        const animationDuration = 2000;

        const counterObserver = new IntersectionObserver(entries => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    counters.forEach(counter => {
                        const target = +counter.getAttribute('data-target');
                        
                        const updateCount = () => {
                            const current = +counter.innerText.replace(/,/g, '');
                            const increment = target / (animationDuration / 16);

                            if (current < target) {
                                counter.innerText = Math.ceil(current + increment).toLocaleString();
                                requestAnimationFrame(updateCount);
                            } else {
                                counter.innerText = target.toLocaleString() + (counter.dataset.suffix || '');
                            }
                        };
                        requestAnimationFrame(updateCount);
                    });
                    counterObserver.disconnect(); 
                }
            });
        }, {
            threshold: 0.5 
        });

        counterObserver.observe(statsSection);
    }
    
    // --- Back to Top Button Logic ---
    const backToTopButton = document.querySelector('.back-to-top');

    if (backToTopButton) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 300) {
                backToTopButton.classList.add('visible');
            } else {
                backToTopButton.classList.remove('visible');
            }
        });

        backToTopButton.addEventListener('click', (e) => {
            e.preventDefault();
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

    // --- Team Carousel (Swiper) with Autoplay ---
    if (document.querySelector('.team-carousel')) {
        const teamSwiper = new Swiper('.team-carousel', {
            autoplay: {
                delay: 4000,
                disableOnInteraction: false,
                pauseOnMouseEnter: true,
            },
            loop: true,
            navigation: {
                nextEl: '.swiper-button-next',
                prevEl: '.swiper-button-prev',
            },
            pagination: {
                el: '.swiper-pagination',
                clickable: true,
            },
            slidesPerView: 1,
            spaceBetween: 30,
            breakpoints: {
                640: { slidesPerView: 2 },
                992: { slidesPerView: 3 },
                1200: { slidesPerView: 4 }
            }
        });
    }

    // --- UPDATED: YouTube Video Modal Logic ---
    const playBtn = document.getElementById('play-video-btn');
    const modal = document.getElementById('videoModal');
    const closeBtn = document.getElementById('closeModalBtn');
    const modalIframe = document.getElementById('youtubeIframe');

    // =========================================================================
    // == IMPORTANT: Replace 'YOUTUBE_VIDEO_ID_HERE' with your video's ID.    ==
    // =========================================================================
    const videoId = "WocWafisMUI"; // <--- PASTE YOUR YOUTUBE VIDEO ID HERE
    const youtubeURL = `https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0&modestbranding=1`;


    if (playBtn && modal && closeBtn && modalIframe) {
        // Open the modal on button click
        playBtn.addEventListener('click', () => {
            modal.classList.add('is-active');
            // Set the src to start loading and playing the video
            modalIframe.src = youtubeURL; 
        });

        // Function to close the modal
        const closeModal = () => {
            modal.classList.remove('is-active');
            // Stop the video by clearing the src attribute. This is crucial.
            modalIframe.src = ""; 
        };

        // Close using the 'X' button
        closeBtn.addEventListener('click', closeModal);
        
        // Close by clicking on the dark background
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                closeModal();
            }
        });

        // Close by pressing the 'Escape' key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && modal.classList.contains('is-active')) {
                closeModal();
            }
        });
    }

    // --- NEW: Text Reveal Animation for Services Hero ---
    const heroSection = document.querySelector('.text-reveal-hero');
    
    if (heroSection) {
        const heroText = heroSection.querySelector('.hero-reveal-text');
        const subText = heroSection.querySelector('.hero-sub-text');

        const heroObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    // Add the 'is-visible' class to trigger the CSS animations
                    heroText.classList.add('is-visible');
                    subText.classList.add('is-visible');
                    
                    // Stop observing once the animation is triggered
                    observer.unobserve(heroSection);
                }
            });
        }, {
            threshold: 0.4 // Trigger when 40% of the section is visible
        });

        heroObserver.observe(heroSection);
    }

    // --- Interactive Contact Form Logic ---
    const contactForm = document.getElementById('interactive-contact-form');

    if (contactForm) {
        const interestCheckboxes = contactForm.querySelectorAll('input[name="interest"]');
        const hiddenSubjectInput = document.getElementById('subject-hidden');

        const updateSubject = () => {
            const selectedInterests = [];
            interestCheckboxes.forEach(checkbox => {
                if (checkbox.checked) {
                    selectedInterests.push(checkbox.value);
                }
            });
            // Join the selected values into a comma-separated string for the subject
            hiddenSubjectInput.value = selectedInterests.length > 0 ? selectedInterests.join(', ') : 'General Inquiry';
        };

        interestCheckboxes.forEach(checkbox => {
            checkbox.addEventListener('change', updateSubject);
        });

        // Initialize on page load
        updateSubject();
    }

    // --- NEW: Project Detail Modal Logic ---
    // script.js

    // --- NEW: Project Detail Modal Logic ---
    const modall = document.getElementById('projectModal');
    if (modall) {
        const openModalButtons = document.querySelectorAll('.open-project-modal');
        const closeModalButton = document.getElementById('closeProjectModal');
        const modalContentTarget = document.getElementById('modal-content-target');
        // Get a reference to the scrollable container
        const modalContentContainer = document.querySelector('.project-modal-content');

        // Function to open the modal
        const openModal = (projectID) => {
            const sourceContent = document.getElementById(`project-detail-${projectID}`);
            if (sourceContent && modalContentTarget) {
                modalContentTarget.innerHTML = sourceContent.innerHTML;
                modall.classList.add('is-active');
                document.body.classList.add('modal-open');

                // --- THIS IS THE NEW LINE ---
                // Reset the scroll position of the modal content to the top
                if (modalContentContainer) {
                    modalContentContainer.scrollTop = 0;
                }
            }
        };

        // Function to close the modal
        const closeModal = () => {
            modall.classList.remove('is-active');
            document.body.classList.remove('modal-open');
        };

        // Add event listeners to all "Learn More" buttons
        openModalButtons.forEach(button => {
            button.addEventListener('click', (e) => {
                e.preventDefault();
                const projectID = button.dataset.project;
                openModal(projectID);
            });
        });

        // Add event listeners for closing the modal
        closeModalButton.addEventListener('click', closeModal);
        
        // Close by clicking the background overlay
        modall.addEventListener('click', (e) => {
            if (e.target === modall) {
                closeModal();
            }
        });

        // Close by pressing the 'Escape' key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && modall.classList.contains('is-active')) {
                closeModal();
            }
        });
    }

});