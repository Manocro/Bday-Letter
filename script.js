document.addEventListener('DOMContentLoaded', () => {
    const envelopeWrapper = document.getElementById('envelope-wrapper');
    const content = document.getElementById('content');
    const seal = document.getElementById('seal');

    let isOpen = false;

    // Confetti explosion function - TWO bursts from sides
    function createConfetti() {
        const confettiContainer = document.createElement('div');
        confettiContainer.className = 'confetti-container';
        document.body.appendChild(confettiContainer);

        const colors = ['#FF6B9D', '#C239B3', '#67C6E3', '#FFD93D', '#6BCB77', '#FF6B6B'];
        const confettiPerBurst = 120;

        // Get envelope position
        const envelopeRect = envelopeWrapper.getBoundingClientRect();

        // Left side burst position
        const leftX = envelopeRect.left;
        const leftY = envelopeRect.top + envelopeRect.height / 2;

        // Right side burst position
        const rightX = envelopeRect.right;
        const rightY = envelopeRect.top + envelopeRect.height / 2;

        // Create left burst
        for (let i = 0; i < confettiPerBurst; i++) {
            const confetti = document.createElement('div');
            confetti.className = 'confetti';

            const color = colors[Math.floor(Math.random() * colors.length)];
            const size = Math.random() * 8 + 4;
            // Spread to the LEFT (135° to 225°)
            const angle = 135 + Math.random() * 90;
            const distance = Math.random() * 300 + 150;
            const duration = Math.random() * 2 + 2;
            const delay = Math.random() * 0.2;

            confetti.style.cssText = `
                position: fixed;
                left: ${leftX}px;
                top: ${leftY}px;
                width: ${size}px;
                height: ${size}px;
                background-color: ${color};
                opacity: 1;
                z-index: 5;
                pointer-events: none;
                animation: confettiFall ${duration}s ease-out ${delay}s forwards;
            `;

            confetti.style.setProperty('--tx', `${Math.cos(angle * Math.PI / 180) * distance}px`);
            confetti.style.setProperty('--ty', `${Math.sin(angle * Math.PI / 180) * distance}px`);
            confetti.style.setProperty('--rotation', `${Math.random() * 720 - 360}deg`);

            confettiContainer.appendChild(confetti);
        }

        // Create right burst
        for (let i = 0; i < confettiPerBurst; i++) {
            const confetti = document.createElement('div');
            confetti.className = 'confetti';

            const color = colors[Math.floor(Math.random() * colors.length)];
            const size = Math.random() * 8 + 4;
            // Spread to the RIGHT (-45° to 45°)
            const angle = -45 + Math.random() * 90;
            const distance = Math.random() * 300 + 150;
            const duration = Math.random() * 2 + 2;
            const delay = Math.random() * 0.2;

            confetti.style.cssText = `
                position: fixed;
                left: ${rightX}px;
                top: ${rightY}px;
                width: ${size}px;
                height: ${size}px;
                background-color: ${color};
                opacity: 1;
                z-index: 5;
                pointer-events: none;
                animation: confettiFall ${duration}s ease-out ${delay}s forwards;
            `;

            confetti.style.setProperty('--tx', `${Math.cos(angle * Math.PI / 180) * distance}px`);
            confetti.style.setProperty('--ty', `${Math.sin(angle * Math.PI / 180) * distance}px`);
            confetti.style.setProperty('--rotation', `${Math.random() * 720 - 360}deg`);

            confettiContainer.appendChild(confetti);
        }

        // Remove confetti after animation
        setTimeout(() => {
            confettiContainer.remove();
        }, 5000);
    }

    envelopeWrapper.addEventListener('click', () => {
        if (isOpen) return;
        isOpen = true;

        // 1. Vibrate (longer, more intense)
        envelopeWrapper.classList.add('vibrate');

        // 2. Open Flap after vibration + trigger confetti
        setTimeout(() => {
            envelopeWrapper.classList.remove('vibrate');
            envelopeWrapper.classList.add('open');

            // Trigger confetti explosion
            createConfetti();
        }, 1500); // Matches new animation duration

        // 3. Slide down envelope and show content
        setTimeout(() => {
            envelopeWrapper.classList.add('fade-out');

            // Show content
            content.classList.remove('hidden');
            // Small delay to allow display:block to apply before opacity transition
            setTimeout(() => {
                content.classList.add('visible');
            }, 50);

            const prevBtn = document.getElementById('nav-prev');
            const nextBtn = document.getElementById('nav-next');
            let currentPage = 1;
            const totalPages = 3;

            function updateNavigation() {
                // Show/Hide Pages
                for (let i = 1; i <= totalPages; i++) {
                    const page = document.getElementById(`page-${i}`);
                    if (i === currentPage) {
                        page.classList.add('active');
                    } else {
                        page.classList.remove('active');
                    }
                }

                // Show/Hide Corners
                if (currentPage === 1) {
                    prevBtn.classList.add('hidden');
                    nextBtn.classList.remove('hidden');
                } else if (currentPage === totalPages) {
                    prevBtn.classList.remove('hidden');
                    nextBtn.classList.add('hidden');
                } else {
                    prevBtn.classList.remove('hidden');
                    nextBtn.classList.remove('hidden');
                }
            }

            nextBtn.addEventListener('click', () => {
                if (currentPage < totalPages) {
                    currentPage++;
                    updateNavigation();
                }
            });

            prevBtn.addEventListener('click', () => {
                if (currentPage > 1) {
                    currentPage--;
                    updateNavigation();
                }
            });

            // Initialize state
            updateNavigation();
        }, 2000); // Adjusted to give time for vibration + opening
    });
});
