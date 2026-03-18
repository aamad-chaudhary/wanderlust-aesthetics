$(document).ready(function() {
    var swiper = new Swiper(".swiper-banner-slider", {
        direction: "horizontal",
        effect: "slide",
        autoplay: {
            delay: 6000, 
            disableOnInteraction: false
        },
        parallax: true,
        speed: 1600,
        rtl: true,
        loop: true,
        loopFillGroupWithBlank: !0,
        keyboard: {
            enabled: true,
            onlyInViewport: true
        },
        scrollbar: {
            el: ".swiper-scrollbar",
            hide: false,
            draggable: true
        },
        navigation: {
            nextEl: ".swiper-button-next",
            prevEl: ".swiper-button-prev",
        },
        pagination: {
            el: '.swiper-pagination',
            clickable: true,
            renderBullet: function (index, className) {
                return `<span class="outer-dot swiper-pagination-bullet"><span class="inner-dot"></span></span>`;
            },
        },
    });
});








// document.addEventListener("DOMContentLoaded", () => {
//     if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') {
//         console.error("GSAP not loaded");
//         return;
//     }
    
//     gsap.registerPlugin(ScrollTrigger);
    
//     const section = document.querySelector(".animated-cards-section");
//     const cards = document.querySelectorAll(".animated-card-single");
    
//     if (!section || cards.length < 2) return;
    
//     const slidingCards = Array.from(cards).slice(0, -1);
//     const lastCard = cards[cards.length - 1];
    
//     // Function to set dynamic heights
//     function setDynamicHeights() {
//         const viewportHeight = window.innerHeight;
        
//         // Calculate the tallest card height
//         let maxCardHeight = 0;
//         cards.forEach(card => {
//             // Temporarily remove styles to measure natural height
//             const originalPosition = card.style.position;
//             const originalHeight = card.style.height;
//             const originalDisplay = card.style.display;
            
//             card.style.position = 'relative';
//             card.style.height = 'auto';
//             card.style.display = 'block';
            
//             // Force reflow
//             void card.offsetHeight;
            
//             const cardHeight = card.offsetHeight;
//             maxCardHeight = Math.max(maxCardHeight, cardHeight);
            
//             // Restore
//             card.style.position = originalPosition;
//             card.style.height = originalHeight;
//             card.style.display = originalDisplay;
//         });
        
//         // Use the larger of: card height or viewport height
//         const cardHeight = Math.max(maxCardHeight, viewportHeight);
        
//         // Set ALL cards to the same height
//         cards.forEach(card => {
//             card.style.height = cardHeight + 'px';
//             card.style.minHeight = cardHeight + 'px';
//         });
        
//         // For last card: make it part of the stack
//         if (lastCard) {
//             lastCard.style.position = 'absolute';
//             lastCard.style.top = '0';
//             lastCard.style.left = '0';
//             lastCard.style.width = '100%';
//             lastCard.style.zIndex = '0'; // Lowest z-index
//         }
        
//         // Set wrapper heights
//         const stickyWrapper = document.querySelector('.sticky-cards-wrapper');
//         const animatedMain = document.querySelector('.animated-cards-main');
//         const animatedWrapper = document.querySelector('.animated-cards-wrapper');
        
//         if (stickyWrapper) {
//             stickyWrapper.style.height = cardHeight + 'px';
//             stickyWrapper.style.minHeight = cardHeight + 'px';
//         }
//         if (animatedMain) {
//             animatedMain.style.height = cardHeight + 'px';
//             animatedMain.style.minHeight = cardHeight + 'px';
//         }
//         if (animatedWrapper) {
//             animatedWrapper.style.height = cardHeight + 'px';
//             animatedWrapper.style.minHeight = cardHeight + 'px';
//             animatedWrapper.style.position = 'relative';
//         }
        
//         // CRITICAL FIX: Section needs enough height for ALL cards to complete animation
//         // Formula: (sliding cards count × card height) + (1 extra for last card to be fully visible)
//         const slidingCardsCount = slidingCards.length;
//         const totalSectionHeight = (slidingCardsCount * cardHeight) + cardHeight;
        
//         section.style.height = totalSectionHeight + 'px';
//         section.style.minHeight = totalSectionHeight + 'px';
        
//         console.log('Heights calculation:', {
//             cardHeight: cardHeight + 'px',
//             slidingCardsCount,
//             totalSectionHeight: totalSectionHeight + 'px',
//             explanation: `(${slidingCardsCount} sliding cards × ${cardHeight}px) + ${cardHeight}px for last card to be fully visible`
//         });
        
//         return { cardHeight, totalSectionHeight, slidingCardsCount };
//     }
    
//     // Initial setup
//     const { cardHeight, totalSectionHeight, slidingCardsCount } = setDynamicHeights();
    
//     // Reset positions for sliding cards only
//     gsap.set(slidingCards, { x: 0 });
    
//     // Create animation timeline
//     const tl = gsap.timeline({
//         scrollTrigger: {
//             trigger: section,
//             start: "top top",
//             // CRITICAL: End needs to be when the LAST CARD is fully visible
//             // Not when section ends, but when all animations complete
//             end: () => `+=${totalSectionHeight}`, // Scroll the entire section height
//             scrub: 1,
//             markers: false, // Keep true to see the extended scroll area
//             invalidateOnRefresh: true,
//             // Add callbacks to debug
//             onUpdate: (self) => {
//                 console.log(`Progress: ${(self.progress * 100).toFixed(1)}%`);
                
//                 // Show which cards are animating
//                 slidingCards.forEach((card, index) => {
//                     const start = index / slidingCardsCount;
//                     const end = (index + 0.8) / slidingCardsCount;
                    
//                     if (self.progress >= start && self.progress <= end) {
//                         console.log(`Card ${index + 1} animating`);
//                     }
//                 });
//             },
//             onEnter: () => console.log("Entered cards section"),
//             onLeave: () => console.log("Left cards section - all animations should be complete"),
//             onEnterBack: () => console.log("Scrolling back into cards section")
//         }
//     });
    
//     // Animate sliding cards to slide out
//     // Make sure the last animation completes BEFORE the section ends
//     slidingCards.forEach((card, index) => {
//         // Each card animation should complete at 80% of its allocated time
//         // This leaves 20% buffer before next card starts
//         const position = index * (0.8 / slidingCardsCount);
//         tl.to(card, {
//             x: "-100vw",
//             duration: 0.3,
//             ease: "power1.inOut"
//         }, position);
//     });
    
//     // Add padding at the end to ensure last card is fully visible
//     tl.to({}, { duration: 0.2 });
    
//     // Update on resize
//     let resizeTimeout;
//     window.addEventListener('resize', () => {
//         clearTimeout(resizeTimeout);
//         resizeTimeout = setTimeout(() => {
//             setDynamicHeights();
//             ScrollTrigger.refresh();
//         }, 250);
//     });
    
//     console.log("Animation set up with proper timing");
// });






// document.addEventListener("DOMContentLoaded", () => {
//     // First: Set dynamic CSS variables for all cards EXCEPT the last one
//     function setCardCSSVariables() {
//         const cards = document.querySelectorAll('.animated-card-single');
//         const totalCards = cards.length;
        
//         if (totalCards === 0) return 0;
        
//         console.log(`Setting CSS variables for ${totalCards - 1} cards (excluding last card)`);
        
//         // Calculate total sliding cards (all except last)
//         const slidingCardsCount = totalCards - 1;
        
//         cards.forEach((card, index) => {
//             // Skip the last card (index === totalCards - 1)
//             if (index === totalCards - 1) {
//                 console.log(`Skipping CSS variables for last card (index ${index + 1})`);
//                 return; // Skip the last card
//             }
            
//             // Calculate inset level for sliding cards only
//             // For 4 total cards, sliding cards would be 3, so:
//             // First card: 3, Second: 2, Third: 1, Fourth: none
//             const cardInsetLevel = slidingCardsCount - index;
            
//             // Card index (starts from 1)
//             const cardIndex = index + 1;
            
//             // Get current style attribute
//             let currentStyle = card.getAttribute('style') || '';
            
//             // Remove existing --card-inset-level and --card-index if they exist
//             currentStyle = currentStyle.replace(/--card-inset-level:\s*\d+;?/g, '');
//             currentStyle = currentStyle.replace(/--card-index:\s*\d+;?/g, '');
//             currentStyle = currentStyle.replace(/--card-total:\s*\d+;?/g, '');
            
//             // Add the new CSS variables
//             const newVariables = `--card-inset-level: ${cardInsetLevel}; --card-index: ${cardIndex}; --card-total: ${slidingCardsCount};`;
            
//             // Combine with existing styles (preserve background-color, etc.)
//             // Trim any extra semicolons and spaces
//             currentStyle = currentStyle.trim();
//             if (currentStyle && !currentStyle.endsWith(';')) {
//                 currentStyle += ';';
//             }
            
//             const newStyle = newVariables + ' ' + currentStyle;
            
//             // Set the new style attribute
//             card.setAttribute('style', newStyle);
            
//             console.log(`Card ${index + 1}: --card-inset-level: ${cardInsetLevel}, --card-index: ${cardIndex}`);
//         });
        
//         return totalCards;
//     }
    
//     // Initialize CSS variables first
//     setCardCSSVariables();
    
//     // Then run your existing GSAP code
//     if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') {
//         console.error("GSAP not loaded");
//         return;
//     }
    
//     gsap.registerPlugin(ScrollTrigger);
    
//     const section = document.querySelector(".animated-cards-section");
//     const cards = document.querySelectorAll(".animated-card-single");
    
//     if (!section || cards.length < 2) return;
    
//     const slidingCards = Array.from(cards).slice(0, -1);
//     const lastCard = cards[cards.length - 1];
    
//     // Function to set dynamic heights
//     function setDynamicHeights() {
//         const viewportHeight = window.innerHeight;
        
//         // Calculate the tallest card height
//         let maxCardHeight = 0;
//         cards.forEach(card => {
//             // Temporarily remove styles to measure natural height
//             const originalPosition = card.style.position;
//             const originalHeight = card.style.height;
//             const originalDisplay = card.style.display;
            
//             card.style.position = 'relative';
//             card.style.height = 'auto';
//             card.style.display = 'block';
            
//             // Force reflow
//             void card.offsetHeight;
            
//             const cardHeight = card.offsetHeight;
//             maxCardHeight = Math.max(maxCardHeight, cardHeight);
            
//             // Restore
//             card.style.position = originalPosition;
//             card.style.height = originalHeight;
//             card.style.display = originalDisplay;
//         });
        
//         // Use the larger of: card height or viewport height
//         const cardHeight = Math.max(maxCardHeight, viewportHeight);
        
//         // Set ALL cards to the same height
//         cards.forEach(card => {
//             card.style.height = cardHeight + 'px';
//             card.style.minHeight = cardHeight + 'px';
//         });
        
//         // For last card: make it part of the stack
//         if (lastCard) {
//             lastCard.style.position = 'absolute';
//             lastCard.style.top = '0';
//             lastCard.style.left = '0';
//             lastCard.style.width = '100%';
//             lastCard.style.zIndex = '0'; // Lowest z-index
//         }
        
//         // Set wrapper heights
//         const stickyWrapper = document.querySelector('.sticky-cards-wrapper');
//         const animatedMain = document.querySelector('.animated-cards-main');
//         const animatedWrapper = document.querySelector('.animated-cards-wrapper');
        
//         if (stickyWrapper) {
//             stickyWrapper.style.height = cardHeight + 'px';
//             stickyWrapper.style.minHeight = cardHeight + 'px';
//         }
//         if (animatedMain) {
//             animatedMain.style.height = cardHeight + 'px';
//             animatedMain.style.minHeight = cardHeight + 'px';
//         }
//         if (animatedWrapper) {
//             animatedWrapper.style.height = cardHeight + 'px';
//             animatedWrapper.style.minHeight = cardHeight + 'px';
//             animatedWrapper.style.position = 'relative';
//         }
        
//         // CRITICAL FIX: Section needs enough height for ALL cards to complete animation
//         // Formula: (sliding cards count × card height) + (1 extra for last card to be fully visible)
//         const slidingCardsCount = slidingCards.length;
//         const totalSectionHeight = (slidingCardsCount * cardHeight) + cardHeight;
        
//         section.style.height = totalSectionHeight + 'px';
//         section.style.minHeight = totalSectionHeight + 'px';
        
//         console.log('Heights calculation:', {
//             cardHeight: cardHeight + 'px',
//             slidingCardsCount,
//             totalSectionHeight: totalSectionHeight + 'px',
//             explanation: `(${slidingCardsCount} sliding cards × ${cardHeight}px) + ${cardHeight}px for last card to be fully visible`
//         });
        
//         return { cardHeight, totalSectionHeight, slidingCardsCount };
//     }
    
//     // Initial setup
//     const { cardHeight, totalSectionHeight, slidingCardsCount } = setDynamicHeights();
    
//     // Reset positions for sliding cards only
//     gsap.set(slidingCards, { x: 0 });
    
//     // Create animation timeline
//     const tl = gsap.timeline({
//         scrollTrigger: {
//             trigger: section,
//             start: "top top",
//             // CRITICAL: End needs to be when the LAST CARD is fully visible
//             // Not when section ends, but when all animations complete
//             end: () => `+=${totalSectionHeight}`, // Scroll the entire section height
//             scrub: 1,
//             markers: false, // Keep true to see the extended scroll area
//             invalidateOnRefresh: true,
//             // Add callbacks to debug
//             onUpdate: (self) => {
//                 console.log(`Progress: ${(self.progress * 100).toFixed(1)}%`);
                
//                 // Show which cards are animating
//                 slidingCards.forEach((card, index) => {
//                     const start = index / slidingCardsCount;
//                     const end = (index + 0.8) / slidingCardsCount;
                    
//                     if (self.progress >= start && self.progress <= end) {
//                         console.log(`Card ${index + 1} animating`);
//                     }
//                 });
//             },
//             onEnter: () => console.log("Entered cards section"),
//             onLeave: () => console.log("Left cards section - all animations should be complete"),
//             onEnterBack: () => console.log("Scrolling back into cards section")
//         }
//     });
    
//     // Animate sliding cards to slide out
//     // Make sure the last animation completes BEFORE the section ends
//     slidingCards.forEach((card, index) => {
//         // Each card animation should complete at 80% of its allocated time
//         // This leaves 20% buffer before next card starts
//         const position = index * (0.8 / slidingCardsCount);
//         tl.to(card, {
//             x: "-100vw",
//             duration: 0.3,
//             ease: "power1.inOut"
//         }, position);
//     });
    
//     // Add padding at the end to ensure last card is fully visible
//     tl.to({}, { duration: 0.2 });
    
//     // Update on resize
//     let resizeTimeout;
//     window.addEventListener('resize', () => {
//         clearTimeout(resizeTimeout);
//         resizeTimeout = setTimeout(() => {
//             setDynamicHeights();
//             ScrollTrigger.refresh();
//         }, 250);
//     });
    
//     console.log("Animation set up with proper timing");
// });



document.addEventListener("DOMContentLoaded", () => {
    // First: Set dynamic CSS variables for all cards EXCEPT the last one
    function setCardCSSVariables() {
        const cards = document.querySelectorAll('.animated-card-single');
        const totalCards = cards.length;
        
        if (totalCards === 0) return 0;
        
        console.log(`Setting CSS variables for ${totalCards - 1} cards (excluding last card)`);
        
        // Calculate total sliding cards (all except last)
        const slidingCardsCount = totalCards - 1;
        
        cards.forEach((card, index) => {
            // Skip the last card (index === totalCards - 1)
            if (index === totalCards - 1) {
                console.log(`Skipping CSS variables for last card (index ${index + 1})`);
                return; // Skip the last card
            }
            
            // Calculate inset level for sliding cards only
            const cardInsetLevel = slidingCardsCount - index;
            
            // Card index (starts from 1)
            const cardIndex = index + 1;
            
            // Get current style attribute
            let currentStyle = card.getAttribute('style') || '';
            
            // Remove existing --card-inset-level and --card-index if they exist
            currentStyle = currentStyle.replace(/--card-inset-level:\s*\d+;?/g, '');
            currentStyle = currentStyle.replace(/--card-index:\s*\d+;?/g, '');
            currentStyle = currentStyle.replace(/--card-total:\s*\d+;?/g, '');
            
            // Add the new CSS variables
            const newVariables = `--card-inset-level: ${cardInsetLevel}; --card-index: ${cardIndex}; --card-total: ${slidingCardsCount};`;
            
            // Combine with existing styles (preserve background-color, etc.)
            currentStyle = currentStyle.trim();
            if (currentStyle && !currentStyle.endsWith(';')) {
                currentStyle += ';';
            }
            
            const newStyle = newVariables + ' ' + currentStyle;
            
            // Set the new style attribute
            card.setAttribute('style', newStyle);
            
            console.log(`Card ${index + 1}: --card-inset-level: ${cardInsetLevel}, --card-index: ${cardIndex}`);
        });
        
        return totalCards;
    }
    
    // Initialize CSS variables first
    setCardCSSVariables();
    
    if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') {
        console.error("GSAP not loaded");
        return;
    }
    
    gsap.registerPlugin(ScrollTrigger);
    
    const section = document.querySelector(".animated-cards-section");
    const cards = document.querySelectorAll(".animated-card-single");
    
    if (!section || cards.length < 2) return;
    
    const slidingCards = Array.from(cards).slice(0, -1);
    const lastCard = cards[cards.length - 1];
    
    // Variables to store animation instances
    let currentTimeline = null;
    let currentScrollTrigger = null;
    
    // Function to check if it's mobile
    function isMobile() {
        return window.innerWidth <= 767;
    }
    
    // Function to set dynamic heights
    function setDynamicHeights() {
        const viewportHeight = window.innerHeight;
        
        // Calculate the tallest card height
        let maxCardHeight = 0;
        cards.forEach(card => {
            // Temporarily remove styles to measure natural height
            const originalPosition = card.style.position;
            const originalHeight = card.style.height;
            const originalDisplay = card.style.display;
            
            card.style.position = 'relative';
            card.style.height = 'auto';
            card.style.display = 'block';
            
            // Force reflow
            void card.offsetHeight;
            
            const cardHeight = card.offsetHeight;
            maxCardHeight = Math.max(maxCardHeight, cardHeight);
            
            // Restore
            card.style.position = originalPosition;
            card.style.height = originalHeight;
            card.style.display = originalDisplay;
        });
        
        // Use the larger of: card height or viewport height
        const cardHeight = Math.max(maxCardHeight, viewportHeight);
        
        // Set ALL cards to the same height
        cards.forEach(card => {
            card.style.height = cardHeight + 'px';
            card.style.minHeight = cardHeight + 'px';
        });
        
        // For last card: make it part of the stack
        if (lastCard) {
            lastCard.style.position = 'absolute';
            lastCard.style.top = '0';
            lastCard.style.left = '0';
            lastCard.style.zIndex = '0';
        }
        
        // Set wrapper heights
        const stickyWrapper = document.querySelector('.sticky-cards-wrapper');
        const animatedMain = document.querySelector('.animated-cards-main');
        const animatedWrapper = document.querySelector('.animated-cards-wrapper');
        
        if (stickyWrapper) {
            stickyWrapper.style.height = cardHeight + 'px';
            stickyWrapper.style.minHeight = cardHeight + 'px';
        }
        if (animatedMain) {
            animatedMain.style.height = cardHeight + 'px';
            animatedMain.style.minHeight = cardHeight + 'px';
        }
        if (animatedWrapper) {
            animatedWrapper.style.height = cardHeight + 'px';
            animatedWrapper.style.minHeight = cardHeight + 'px';
            animatedWrapper.style.position = 'relative';
        }
        
        // Section height calculation
        const slidingCardsCount = slidingCards.length;
        const totalSectionHeight = (slidingCardsCount * cardHeight) + cardHeight;
        
        section.style.height = totalSectionHeight + 'px';
        section.style.minHeight = totalSectionHeight + 'px';
        
        console.log('Heights calculation:', {
            cardHeight: cardHeight + 'px',
            slidingCardsCount,
            totalSectionHeight: totalSectionHeight + 'px',
        });
        
        return { cardHeight, totalSectionHeight, slidingCardsCount };
    }
    
    // Setup DESKTOP animation (cards slide left)
    function setupDesktopAnimation() {
        // Clear any existing animations
        if (currentScrollTrigger) {
            currentScrollTrigger.kill();
        }
        if (currentTimeline) {
            currentTimeline.kill();
        }
        
        const { cardHeight, totalSectionHeight, slidingCardsCount } = setDynamicHeights();
        
        // Reset positions for sliding cards only
        gsap.set(slidingCards, { 
            x: 0,
            y: 0
        });
        
        // Position all cards absolutely - REMOVED width setting
        cards.forEach(card => {
            card.style.position = 'absolute';
            card.style.top = '0';
            card.style.left = '0';
            // Removed: card.style.width = '100%';
        });
        
        // Set z-index for stacking
        slidingCards.forEach((card, index) => {
            card.style.zIndex = slidingCardsCount - index;
        });
        if (lastCard) {
            lastCard.style.zIndex = 0;
        }
        
        // Create animation timeline
        currentTimeline = gsap.timeline({
            scrollTrigger: {
                trigger: section,
                start: "top top",
                end: () => `+=${totalSectionHeight}`,
                scrub: 1,
                markers: false,
                invalidateOnRefresh: true,
            }
        });
        
        // Animate sliding cards to slide out to LEFT
        slidingCards.forEach((card, index) => {
            const position = index * (0.8 / slidingCardsCount);
            currentTimeline.to(card, {
                x: "-100vw",
                duration: 0.3,
                ease: "power1.inOut"
            }, position);
        });
        
        // Add padding at the end
        currentTimeline.to({}, { duration: 0.2 });
        
        currentScrollTrigger = ScrollTrigger.getById(currentTimeline.scrollTrigger.id);
        
        console.log("Desktop animation (left slide) set up");
    }
    
    // Setup MOBILE animation (cards slide up from bottom)
    function setupMobileAnimation() {
        // Clear any existing animations
        if (currentScrollTrigger) {
            currentScrollTrigger.kill();
        }
        if (currentTimeline) {
            currentTimeline.kill();
        }
        
        const { cardHeight, totalSectionHeight, slidingCardsCount } = setDynamicHeights();
        
        // Reset positions
        gsap.set(slidingCards, { 
            x: 0,
            y: 0
        });
        
        // Position all cards absolutely - REMOVED width setting
        cards.forEach(card => {
            card.style.position = 'absolute';
            card.style.top = '0';
            card.style.left = '0';
            // Removed: card.style.width = '100%';
        });
        
        // Set z-index for stacking
        slidingCards.forEach((card, index) => {
            card.style.zIndex = slidingCardsCount - index;
        });
        if (lastCard) {
            lastCard.style.zIndex = 0;
        }
        
        // Create animation timeline
        currentTimeline = gsap.timeline({
            scrollTrigger: {
                trigger: section,
                start: "top top",
                end: () => `+=${totalSectionHeight}`,
                scrub: 1,
                markers: false,
                invalidateOnRefresh: true,
            }
        });
        
        // Animate sliding cards to slide UP
        slidingCards.forEach((card, index) => {
            const position = index * (0.8 / slidingCardsCount);
            currentTimeline.to(card, {
                y: "-100vh",
                duration: 0.3,
                ease: "power1.inOut"
            }, position);
        });
        
        // Add padding at the end
        currentTimeline.to({}, { duration: 0.2 });
        
        currentScrollTrigger = ScrollTrigger.getById(currentTimeline.scrollTrigger.id);
        
        console.log("Mobile animation (bottom to top) set up");
    }
    
    // Initialize the correct animation based on screen size
    function initAnimation() {
        if (isMobile()) {
            setupMobileAnimation();
        } else {
            setupDesktopAnimation();
        }
        
        ScrollTrigger.refresh();
    }
    
    // Initial setup
    initAnimation();
    
    // Update on resize with responsive switching
    let resizeTimeout;
    let currentWidth = window.innerWidth;
    
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(() => {
            const newWidth = window.innerWidth;
            const wasMobile = currentWidth <= 767;
            const isNowMobile = newWidth <= 767;
            
            if ((wasMobile && !isNowMobile) || (!wasMobile && isNowMobile)) {
                console.log(`Screen size changed: ${currentWidth}px -> ${newWidth}px, switching animation`);
                initAnimation();
            } else {
                setDynamicHeights();
                ScrollTrigger.refresh();
            }
            
            currentWidth = newWidth;
        }, 250);
    });
    
    console.log("Responsive animation system initialized");
});



$(document).ready(function(){
    var swiper = new Swiper(".ticker-slider-slider", {
        slidesPerView: "auto",
        spaceBetween: 40,
        loop: true,
        speed: 6000,
        allowTouchMove: false,
        autoplay: {
            delay: 1,
            disableOnInteraction: false
        }
    });
});



$(document).ready(function() {
    var swiper = new Swiper(".images-slider-slider", {
        direction: "horizontal",
        effect: "fade",
        autoplay: {
            delay: 5000, 
            disableOnInteraction: false
        },
        parallax: true,
        speed: 1600,
        rtl: false,
        loop: true,
        loopFillGroupWithBlank: !0,
        keyboard: {
            enabled: true,
            onlyInViewport: true
        },
    });
});





document.addEventListener('DOMContentLoaded', function() {
    // Initialize Swiper without built-in pagination
    const swiper = new Swiper('.comparison-slider', {
        slidesPerView: 1,
        spaceBetween: 30,
        loop: false,
        grabCursor: false,
        allowTouchMove: false,
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        },
        on: {
            init: function() {
                // Initialize sliders for the active slide
                setTimeout(() => {
                    initComparisonSliders();
                }, 100);
                // Update custom pagination
                updateCustomPagination(this);
            },
            slideChange: function() {
                // Reinitialize sliders when slide changes
                setTimeout(() => {
                    initComparisonSliders();
                }, 50);
                // Update custom pagination
                updateCustomPagination(this);
            }
        }
    });
    
    // Custom pagination function
    function updateCustomPagination(swiperInstance) {
        const currentSlideEl = document.querySelector('.current-slide');
        const totalSlidesEl = document.querySelector('.total-slides');
        
        if (currentSlideEl && totalSlidesEl) {
            currentSlideEl.textContent = swiperInstance.activeIndex + 1;
            totalSlidesEl.textContent = swiperInstance.slides.length;
        }
    }
    
    // Initialize custom pagination on load
    updateCustomPagination(swiper);
    
    // Rest of your existing slider code...
    // Object to track active slider instances
    const sliderInstances = new Map();
    
    // Initialize all comparison sliders
    function initComparisonSliders() {
        // Get all comparison containers in the active view
        const containers = document.querySelectorAll('.comparison-slider-container');
        
        containers.forEach((container, index) => {
            const comparisonId = container.getAttribute('data-comparison-id') || `comparison-${index}`;
            
            // Skip if already initialized
            if (sliderInstances.has(comparisonId)) return;
            
            // Get elements for this slider
            const sliderHandle = container.querySelector('.slider-divider');
            const beforeImage = container.querySelector('.image-before');
            
            if (!sliderHandle || !beforeImage) return;
            
            // Set initial position
            updateSliderPosition(50, sliderHandle, beforeImage);
            
            // Initialize dragging functionality
            initSliderDrag(sliderHandle, beforeImage, container, comparisonId);
            
            // Mark as initialized
            sliderInstances.set(comparisonId, {
                sliderHandle,
                beforeImage,
                container,
                isActive: true
            });
        });
    }
    
    // Initialize drag functionality for a slider
    function initSliderDrag(sliderHandle, beforeImage, container, comparisonId) {
        let isDragging = false;
        let startX = 0;
        let sliderLeft = 0;
        
        // Mouse events
        sliderHandle.addEventListener('mousedown', startDrag);
        document.addEventListener('mousemove', drag);
        document.addEventListener('mouseup', stopDrag);
        
        // Touch events for mobile
        sliderHandle.addEventListener('touchstart', startDragTouch);
        document.addEventListener('touchmove', dragTouch);
        document.addEventListener('touchend', stopDrag);
        
        // Also allow clicking anywhere on the container
        container.addEventListener('click', handleContainerClick);
        
        // Prevent image drag
        container.querySelectorAll('.comparison-image').forEach(img => {
            img.addEventListener('dragstart', (e) => e.preventDefault());
        });
        
        function startDrag(e) {
            e.preventDefault();
            isDragging = true;
            startX = e.clientX;
            sliderLeft = parseFloat(sliderHandle.style.left) || 50;
            
            sliderHandle.style.transition = 'none';
            beforeImage.style.transition = 'clip-path 0.1s ease';
        }
        
        function startDragTouch(e) {
            e.preventDefault();
            if (e.touches.length !== 1) return;
            
            isDragging = true;
            startX = e.touches[0].clientX;
            sliderLeft = parseFloat(sliderHandle.style.left) || 50;
            
            sliderHandle.style.transition = 'none';
            beforeImage.style.transition = 'clip-path 0.1s ease';
        }
        
        function drag(e) {
            if (!isDragging) return;
            e.preventDefault();
            
            const currentX = e.clientX;
            const containerRect = container.getBoundingClientRect();
            const deltaX = currentX - startX;
            const deltaPercent = (deltaX / containerRect.width) * 100;
            
            let newPosition = sliderLeft + deltaPercent;
            newPosition = Math.min(Math.max(newPosition, 0), 100);
            
            updateSliderPosition(newPosition, sliderHandle, beforeImage);
        }
        
        function dragTouch(e) {
            if (!isDragging || e.touches.length !== 1) return;
            e.preventDefault();
            
            const currentX = e.touches[0].clientX;
            const containerRect = container.getBoundingClientRect();
            const deltaX = currentX - startX;
            const deltaPercent = (deltaX / containerRect.width) * 100;
            
            let newPosition = sliderLeft + deltaPercent;
            newPosition = Math.min(Math.max(newPosition, 0), 100);
            
            updateSliderPosition(newPosition, sliderHandle, beforeImage);
        }
        
        function stopDrag() {
            if (!isDragging) return;
            isDragging = false;
            
            sliderHandle.style.transition = 'left 0.1s ease';
            beforeImage.style.transition = 'clip-path 0.1s ease';
        }
        
        function handleContainerClick(e) {
            if (isDragging) return;
            
            const containerRect = container.getBoundingClientRect();
            const clickX = e.clientX || (e.touches && e.touches[0].clientX);
            if (!clickX) return;
            
            const clickPercent = ((clickX - containerRect.left) / containerRect.width) * 100;
            const clampedPercent = Math.min(Math.max(clickPercent, 0), 100);
            
            sliderHandle.style.transition = 'left 0.1s ease';
            beforeImage.style.transition = 'clip-path 0.1s ease';
            
            updateSliderPosition(clampedPercent, sliderHandle, beforeImage);
        }
    }
    
    // Update slider position
    function updateSliderPosition(percentage, sliderHandle, beforeImage) {
        const clampedPercentage = Math.min(Math.max(percentage, 0), 100);
        
        sliderHandle.style.left = `${clampedPercentage}%`;
        beforeImage.style.clipPath = `polygon(0 0, ${clampedPercentage}% 0, ${clampedPercentage}% 100%, 0 100%)`;
    }
    
    // Reset specific slider
    function resetSlider(comparisonId) {
        const instance = sliderInstances.get(comparisonId);
        if (instance) {
            instance.sliderHandle.style.transition = 'left 0.5s ease';
            instance.beforeImage.style.transition = 'clip-path 0.5s ease';
            
            updateSliderPosition(50, instance.sliderHandle, instance.beforeImage);
            
            setTimeout(() => {
                instance.sliderHandle.style.transition = '';
                instance.beforeImage.style.transition = '';
            }, 500);
        }
    }
    
    // Reset all sliders
    function resetAllSliders() {
        sliderInstances.forEach((instance, comparisonId) => {
            resetSlider(comparisonId);
        });
    }
    
    // Keyboard controls for accessibility
    document.addEventListener('keydown', function(e) {
        if (e.target !== document.body) return;
        
        // Find the active slider (in the active swiper slide)
        const activeSlide = document.querySelector('.swiper-slide-active');
        if (!activeSlide) return;
        
        const activeSlider = activeSlide.querySelector('.slider-divider');
        if (!activeSlider) return;
        
        const container = activeSlider.closest('.comparison-slider-container');
        const beforeImage = container.querySelector('.image-before');
        const currentPosition = parseFloat(activeSlider.style.left) || 50;
        
        let newPosition = currentPosition;
        
        if (e.key === 'ArrowLeft') {
            newPosition = Math.max(0, currentPosition - 5);
        } else if (e.key === 'ArrowRight') {
            newPosition = Math.min(100, currentPosition + 5);
        } else if (e.key === 'Home') {
            newPosition = 0;
        } else if (e.key === 'End') {
            newPosition = 100;
        } else if (e.key === ' ') {
            newPosition = 50; // Space to center
            e.preventDefault();
        } else {
            return;
        }
        
        activeSlider.style.transition = 'left 0.2s ease';
        beforeImage.style.transition = 'clip-path 0.2s ease';
        
        updateSliderPosition(newPosition, activeSlider, beforeImage);
        e.preventDefault();
    });
    
    // Initialize sliders on page load
    initComparisonSliders();
    
    // Reinitialize on window resize
    let resizeTimeout;
    window.addEventListener('resize', function() {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(() => {
            sliderInstances.forEach((instance, comparisonId) => {
                updateSliderPosition(50, instance.sliderHandle, instance.beforeImage);
            });
        }, 250);
    });
    
    // Make functions available globally if needed
    window.resetAllSliders = resetAllSliders;
});