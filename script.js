document.addEventListener('DOMContentLoaded', () => {
    // --- Configuration ---
    const colorsBday = ['#FF6B9D', '#C239B3', '#67C6E3', '#FFD93D', '#6BCB77', '#FF6B6B'];
    const colorsValentine = ['#FF0000', '#FF4D4D', '#FF9999', '#E91E63', '#C2185B']; // Shades of Red/Pink

    // --- State Management ---
    const letters = Array.from(document.querySelectorAll('.letter-card'));
    let currentIndex = 0; // Start with Bday letter (index 0)

    const prevLetterBtn = document.getElementById('prev-letter');
    const nextLetterBtn = document.getElementById('next-letter');

    // Initialize Stack
    updateStack();

    // --- Navigation Logic ---
    function updateStack() {
        console.log("updateStack called. currentIndex:", currentIndex);
        letters.forEach((letter, index) => {
            letter.classList.remove('active', 'prev', 'next', 'far-back');

            if (index === currentIndex) {
                console.log(`Setting letter ${index} to ACTIVE`);
                letter.classList.add('active');
            } else if (index === (currentIndex + 1) % letters.length) {
                // Next in loop
                letter.classList.add('next');
            } else if (index === (currentIndex - 1 + letters.length) % letters.length) {
                // Prev in loop
                letter.classList.add('prev');
            } else {
                letter.classList.add('far-back');
            }
        });
    }

    function rotateStack(direction) {
        console.log("rotateStack called. Direction:", direction);
        if (direction === 'next') {
            currentIndex = (currentIndex + 1) % letters.length;
        } else {
            currentIndex = (currentIndex - 1 + letters.length) % letters.length;
        }
        updateStack();
    }

    // Button Listeners
    nextLetterBtn.addEventListener('click', () => rotateStack('next'));
    prevLetterBtn.addEventListener('click', () => rotateStack('prev'));

    // Swipe Support (Basic) - Disabled for stability
    // let touchStartX = 0;
    // let touchEndX = 0;

    // document.querySelector('.stack-container').addEventListener('touchstart', e => {
    //     touchStartX = e.changedTouches[0].screenX;
    // });

    // document.querySelector('.stack-container').addEventListener('touchend', e => {
    //     touchEndX = e.changedTouches[0].screenX;
    //     handleSwipe();
    // });

    // function handleSwipe() {
    //     const threshold = 50;
    //     if (touchEndX < touchStartX - threshold) {
    //         rotateStack('next'); // Swipe Left -> Show Next
    //     }
    //     if (touchEndX > touchStartX + threshold) {
    //         rotateStack('prev'); // Swipe Right -> Show Prev
    //     }
    // }


    // --- Letter Logic (Scoped per instance) ---
    letters.forEach(letterCard => {
        const wrapper = letterCard.querySelector('.envelope-wrapper');
        const content = letterCard.querySelector('.content');
        const closeBtn = letterCard.querySelector('.close-icon');
        const navNext = letterCard.querySelector('.corner-nav.next-page');
        const navPrev = letterCard.querySelector('.corner-nav.prev-page');
        const pages = letterCard.querySelectorAll('.page');

        let isOpen = false;
        let currentPage = 1;
        const totalPages = pages.length;

        // Open Envelope
        wrapper.addEventListener('click', (e) => {
            // Only allow interaction if letter is active
            if (!letterCard.classList.contains('active')) return;
            if (isOpen) return;

            e.stopPropagation(); // Prevent bubbling causing issues

            isOpen = true;
            wrapper.classList.add('vibrate');

            // Hide Main Navigation to focus on letter
            prevLetterBtn.style.opacity = '0';
            nextLetterBtn.style.opacity = '0';
            prevLetterBtn.style.pointerEvents = 'none';
            nextLetterBtn.style.pointerEvents = 'none';

            // Determine Effect Type
            const isValentine = letterCard.id === 'letter-valentine';

            // Phase 1: Vibration finishes, Open Flap
            setTimeout(() => {
                wrapper.classList.remove('vibrate');
                wrapper.classList.add('open');

                // Trigger Effect
                // console.log("Effects DISABLED for debugging");
                // if (isValentine) {
                //     createHearts(wrapper);
                // } else {
                //     createConfetti(wrapper, colorsBday);
                // }

                // document.getElementById('background-overlay').classList.add('visible');
                console.log("Background Overlay DISABLED for debugging");
            }, 1000);

            // Phase 2: Show Content (overlap with flap opening)
            setTimeout(() => {
                // Enter "Reading Mode" - flatten 3D stack
                letterCard.classList.add('reading-mode');

                // Hide envelope after transition to prevent interference
                wrapper.classList.add('fade-out');
                setTimeout(() => {
                    wrapper.style.display = 'none';
                }, 500);

                // Content Appearance Logic
                content.classList.remove('hidden');
                content.style.display = 'block';

                // Force reflow
                void content.offsetWidth;

                content.classList.add('visible');

                updatePageNavigation();
            }, 800); // Slightly faster timing
        });

        // Close Envelope (Back functionality)
        if (closeBtn) {
            closeBtn.addEventListener('click', (e) => {
                e.stopPropagation();

                // Hide content
                content.classList.remove('visible');

                setTimeout(() => {
                    content.classList.add('hidden');
                    content.style.display = 'none';

                    // Exit "Reading Mode"
                    letterCard.classList.remove('reading-mode');

                    // Reset envelope
                    wrapper.style.display = 'flex';
                    // Force reflow for envelope re-appearance if needed
                    void wrapper.offsetWidth;
                    wrapper.classList.remove('fade-out', 'open');

                    // Reset state
                    isOpen = false;
                    document.getElementById('background-overlay').classList.remove('visible');

                    // Show Main Navigation
                    prevLetterBtn.style.opacity = '1';
                    nextLetterBtn.style.opacity = '1';
                    prevLetterBtn.style.pointerEvents = 'auto';
                    nextLetterBtn.style.pointerEvents = 'auto';
                }, 500); // Wait for transition
            });
        }

        // Internal Page Navigation
        function updatePageNavigation() {
            // Show/Hide Pages
            pages.forEach((page, i) => {
                if (i + 1 === currentPage) {
                    page.classList.add('active');
                    page.style.display = 'flex'; // Ensure flex layout is applied
                } else {
                    page.classList.remove('active');
                    page.style.display = 'none';
                }
            });

            // Update Corners
            if (navPrev) {
                if (currentPage === 1) navPrev.classList.add('hidden');
                else navPrev.classList.remove('hidden');
            }
            if (navNext) {
                if (currentPage === totalPages) navNext.classList.add('hidden');
                else navNext.classList.remove('hidden');
            }
        }

        if (navNext) {
            navNext.addEventListener('click', () => {
                if (currentPage < totalPages) {
                    currentPage++;
                    updatePageNavigation();
                }
            });
        }

        if (navPrev) {
            navPrev.addEventListener('click', () => {
                if (currentPage > 1) {
                    currentPage--;
                    updatePageNavigation();
                }
            });
        }
    });


    // --- Effects ---

    function createConfetti(element, colors) {
        const rect = element.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;

        for (let i = 0; i < 100; i++) {
            const confetti = document.createElement('div');
            confetti.classList.add('confetti');
            document.body.appendChild(confetti);

            const color = colors[Math.floor(Math.random() * colors.length)];
            const size = Math.random() * 8 + 4;

            // Random direction
            const angle = Math.random() * 360;
            const distance = Math.random() * 200 + 50;
            const duration = Math.random() * 1.5 + 1;

            confetti.style.cssText = `
                position: fixed;
                left: ${centerX}px;
                top: ${centerY}px;
                width: ${size}px;
                height: ${size}px;
                background-color: ${color};
                z-index: 1000;
                pointer-events: none;
                transform: rotate(${Math.random() * 360}deg);
                animation: particleFade ${duration}s ease-out forwards;
            `;

            // Animate using Web Animations API for dynamic values
            const keyframes = [
                { transform: `translate(0,0) rotate(0)` },
                { transform: `translate(${Math.cos(angle * Math.PI / 180) * distance}px, ${Math.sin(angle * Math.PI / 180) * distance}px) rotate(${Math.random() * 720}deg)`, opacity: 0 }
            ];

            confetti.animate(keyframes, {
                duration: duration * 1000,
                easing: 'cubic-bezier(0.25, 1, 0.5, 1)',
                fill: 'forwards'
            }).onfinish = () => confetti.remove();
        }
    }

    function createHearts(element) {
        const rect = element.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;

        for (let i = 0; i < 60; i++) {
            const heart = document.createElement('div');
            heart.textContent = '♥';
            document.body.appendChild(heart);

            const size = Math.random() * 20 + 10;
            const hue = Math.random() * 30 + 330; // Reds/Pinks

            const angle = Math.random() * 360;
            const distance = Math.random() * 250 + 50;
            const duration = Math.random() * 2 + 1.5;

            heart.style.cssText = `
                position: fixed;
                left: ${centerX}px;
                top: ${centerY}px;
                font-size: ${size}px;
                color: hsl(${hue}, 80%, 60%);
                z-index: 1000;
                pointer-events: none;
                user-select: none;
                animation: particleFade ${duration}s ease-out forwards;
            `;

            const keyframes = [
                { transform: `translate(0,0) scale(0)` },
                { transform: `translate(${Math.cos(angle * Math.PI / 180) * distance}px, ${Math.sin(angle * Math.PI / 180) * distance}px) scale(1)`, opacity: 0 }
            ];

            heart.animate(keyframes, {
                duration: duration * 1000,
                easing: 'cubic-bezier(0.2, 0.9, 0.3, 1)',
                fill: 'forwards'
            }).onfinish = () => heart.remove();
        }
    }
});
