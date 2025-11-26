document.addEventListener('DOMContentLoaded', () => {
    const envelopeWrapper = document.getElementById('envelope-wrapper');
    const content = document.getElementById('content');
    const seal = document.getElementById('seal');

    let isOpen = false;

    envelopeWrapper.addEventListener('click', () => {
        if (isOpen) return;
        isOpen = true;

        // 1. Vibrate
        envelopeWrapper.classList.add('vibrate');

        // 2. Open Flap after vibration
        setTimeout(() => {
            envelopeWrapper.classList.remove('vibrate');
            envelopeWrapper.classList.add('open');
        }, 500); // Matches animation duration

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
        }, 1000);
    });
});
