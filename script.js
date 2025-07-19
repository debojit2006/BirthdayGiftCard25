document.addEventListener('DOMContentLoaded', () => {
    const runawayBtn = document.getElementById('runaway-btn');
    const letterModal = document.getElementById('letter-modal');
    const closeModalBtn = document.querySelector('.close-btn');
    const bgMusic = document.getElementById('bg-music');
    
    // --- The Mobile-Friendly Game Logic ---
    let clicksNeeded = 5; // She needs to tap it 5 times to "catch" it.
    runawayBtn.textContent = `Catch me!`;

    // A single function to move the button to a random spot
    function moveButton() {
        const winWidth = window.innerWidth;
        const winHeight = window.innerHeight;

        const newTop = Math.random() * (winHeight - 150);
        const newLeft = Math.random() * (winWidth - 200);

        runawayBtn.style.top = `${newTop}px`;
        runawayBtn.style.left = `${newLeft}px`;
    }

    runawayBtn.addEventListener('click', () => {
        // Start music on the first tap
        if (bgMusic.paused) {
            bgMusic.volume = 0.2;
            bgMusic.play().catch(() => {});
        }

        clicksNeeded--; // Decrease the number of taps needed

        if (clicksNeeded > 0) {
            // If more taps are needed, move the button and update the text
            runawayBtn.textContent = `${clicksNeeded} more taps!`;
            moveButton();
        } else {
            // She caught it!
            runawayBtn.textContent = '✅ Got it!';
            runawayBtn.style.pointerEvents = 'none'; // Disable more clicks

            // Pause the music and show the letter after a short delay
            setTimeout(() => {
                bgMusic.pause();
                letterModal.style.display = 'block';
            }, 500); // 0.5 second delay
        }
    });

    // --- Logic to close the letter (no changes here) ---
    const hideLetter = () => {
        letterModal.style.display = 'none';
        bgMusic.play();
    };

    closeModalBtn.addEventListener('click', hideLetter);
    
    window.addEventListener('click', (event) => {
        if (event.target === letterModal) {
            hideLetter();
        }
    });
});
