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

        }, 1000); // Wait for flap to open
    });
});
