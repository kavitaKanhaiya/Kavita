document.addEventListener('DOMContentLoaded', () => {
    // --- Password Gate Elements ---
    const passwordGate = document.getElementById('password-gate');
    const passwordForm = document.getElementById('passwordForm');
    const passwordInput = document.getElementById('passwordInput');
    const passwordError = document.getElementById('passwordError');

    // --- Main Page Elements ---
    const pageWrapper = document.querySelector('.page-wrapper');
    const heartsContainer = document.querySelector('.falling-hearts-bg');
    const balloonsContainer = document.getElementById('balloons-container');

    // --- Predefined Shayaris for Surprise Popup ---
    const predefinedShayaris = [
        "कविता, तुम मेरी जिंदगी की सबसे खूबसूरत गजल हो,<br>तुम्हारे बिना हर पल अधूरा है। आई लव यू! ❤️",
        "तेरी मुस्कान से रोशन हो जाता है मेरा सवेरा,<br>तू ही मेरी मंजिल, तू ही मेरा बसेरा। 💖",
        "सांसों में बसाया है तुझे अपनी जान बनाकर,<br>तू मेरी है, मेरी ही रहना, ओ मेरे प्यार की कविता। 🥰",
        "जबसे तुम मिली हो, हर ख्वाब हकीकत सा लगता है,<br>तुम्हारे प्यार में जीना जन्नत सा लगता है। ✨",
        "मेरी हर खुशी का राज हो तुम, कविता,<br>तुम्हारे बिना मेरी दुनिया अधूरी है। 💕"
    ];

    // --- Password Check Function ---
    function checkPassword() {
        const enteredPassword = passwordInput.value;
        if (enteredPassword.toLowerCase() === 'love') {
            passwordGate.classList.add('hidden');
            setTimeout(() => {
                passwordGate.style.display = 'none';
                pageWrapper.style.display = 'block';
                initializePageContent();
            }, 500);
            sessionStorage.setItem('isLoveAuthenticated', 'true');
        } else {
            passwordError.style.display = 'block';
            passwordInput.value = '';
            passwordInput.focus();
            passwordForm.classList.add('shake');
            setTimeout(() => passwordForm.classList.remove('shake'), 500);
        }
    }

    if (passwordForm) {
        passwordForm.addEventListener('submit', (event) => {
            event.preventDefault();
            checkPassword();
        });
    }

    if (sessionStorage.getItem('isLoveAuthenticated') === 'true') {
        if (passwordGate) passwordGate.style.display = 'none';
        if (pageWrapper) pageWrapper.style.display = 'block';
        initializePageContent();
    } else {
        if (passwordGate) passwordGate.style.display = 'flex';
        if (pageWrapper) pageWrapper.style.display = 'none';
    }

    // --- Function to Initialize Main Page Content and Interactions ---
    function initializePageContent() {
        const surpriseButton = document.getElementById('surpriseButton');
        const surprisePopup = document.getElementById('surprisePopup');
        const closePopupButton = document.getElementById('closePopupBtn');
        const popupMessageElement = surprisePopup ? surprisePopup.querySelector('.popup-message') : null;

        // --- Surprise Popup Logic (Revised) ---
        if (surpriseButton && surprisePopup && closePopupButton && popupMessageElement) {
            surpriseButton.addEventListener('click', () => {
                const randomIndex = Math.floor(Math.random() * predefinedShayaris.length);
                popupMessageElement.innerHTML = predefinedShayaris[randomIndex];
                surprisePopup.classList.add('visible');
            });

            closePopupButton.addEventListener('click', () => {
                surprisePopup.classList.remove('visible');
            });

            surprisePopup.addEventListener('click', (event) => {
                if (event.target === surprisePopup) {
                    surprisePopup.classList.remove('visible');
                }
            });
        } else {
            console.warn("Surprise popup elements not found post-authentication.");
        }

        // --- Initialize other features ---
        initLoveTimer();
        initLoveQuoteCarousel();
        initLoveLetter();
        initFloatingBalloons(); // Call after pageWrapper is visible for better performance context
        initGlowingHeartTrail();
    }

    // --- 1. Glowing Heart Trail Cursor ---
    function initGlowingHeartTrail() {
        const body = document.body;
        body.addEventListener('mousemove', (e) => {
            const heart = document.createElement('div');
            heart.className = 'cursor-heart-trail';
            body.appendChild(heart);

            heart.style.left = `${e.clientX}px`;
            heart.style.top = `${e.clientY}px`;
            
            // Trigger animation
            requestAnimationFrame(() => {
                heart.style.transform = `translate(-50%, -50%) scale(1) translateY(-20px)`;
                heart.style.opacity = '0';
            });

            setTimeout(() => {
                heart.remove();
            }, 600); // Should match CSS transition duration
        });
    }


    // --- 2. Love Timer Widget ---
    function initLoveTimer() {
        const timerDisplay = document.getElementById('timer-display');
        if (!timerDisplay) return;

        const startDate = new Date('2023-11-27T00:00:00'); // Kanhaiya & Kavita's anniversary

        function updateTimer() {
            const now = new Date();
            const diff = now - startDate;

            const days = Math.floor(diff / (1000 * 60 * 60 * 24));
            const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((diff % (1000 * 60)) / 1000);

            timerDisplay.innerHTML = `💖 ${days} days, ${hours} hours, ${minutes} minutes, ${seconds} seconds of love! 💖`;
        }
        updateTimer(); // Initial call
        setInterval(updateTimer, 1000);
    }

    // --- 3. Love Quote Carousel ---
    function initLoveQuoteCarousel() {
        const slides = document.querySelectorAll('#love-quotes-carousel .quote-slide');
        if (slides.length === 0) return;

        let currentSlide = 0;
        slides[currentSlide].classList.add('active');

        function showNextSlide() {
            slides[currentSlide].classList.remove('active');
            currentSlide = (currentSlide + 1) % slides.length;
            slides[currentSlide].classList.add('active');
        }
        setInterval(showNextSlide, 7000); // Change quote every 7 seconds
    }

    // --- 4. Interactive Love Letter ---
    function initLoveLetter() {
        const envelope = document.querySelector('.love-letter-envelope');
        if (envelope) {
            envelope.addEventListener('click', () => {
                envelope.classList.toggle('open');
            });
        }
    }

    // --- 5. Floating Love Balloons Animation ---
    function initFloatingBalloons() {
        if (!balloonsContainer) return;

        const balloonColors = [
            '#FFB6C1', /* LightPink */
            '#FFC0CB', /* Pink */
            '#FFDAB9', /* PeachPuff */
            '#FFE4E1', /* MistyRose */
            '#ADD8E6'  /* LightBlue, for variety */
        ];

        function createBalloon() {
            const balloon = document.createElement('div');
            balloon.classList.add('balloon');
            
            const nameKanhaiya = document.createElement('span');
            nameKanhaiya.classList.add('balloon-name');
            nameKanhaiya.textContent = 'Kanhaiya';
            
            const heartSymbol = document.createElement('span');
            heartSymbol.classList.add('balloon-name');
            heartSymbol.textContent = '❤️';

            const nameKavita = document.createElement('span');
            nameKavita.classList.add('balloon-name');
            nameKavita.textContent = 'Kavita';

            balloon.appendChild(nameKanhaiya);
            balloon.appendChild(heartSymbol);
            balloon.appendChild(nameKavita);

            balloon.style.left = Math.random() * 90 + 'vw'; // Random horizontal start
            balloon.style.backgroundColor = balloonColors[Math.floor(Math.random() * balloonColors.length)];
            
            // Randomize drift for each balloon
            const driftX = (Math.random() - 0.5) * 15; // -7.5vw to +7.5vw
            const driftX2 = (Math.random() - 0.5) * 15;
            balloon.style.setProperty('--drift-x-balloon', `${driftX}vw`);
            balloon.style.setProperty('--drift-x-balloon-2', `${driftX2}vw`);
            balloon.style.animationDuration = Math.random() * 10 + 10 + 's'; // Duration 10s to 20s


            balloonsContainer.appendChild(balloon);

            // Remove balloon after animation completes + buffer
            setTimeout(() => {
                balloon.remove();
            }, parseFloat(balloon.style.animationDuration) * 1000 + 1000);
        }

        // Create an initial burst and then periodically
        for(let i = 0; i < 5; i++) {
            setTimeout(createBalloon, Math.random() * 2000);
        }
        setInterval(createBalloon, 5000); // New balloon every 5 seconds
    }


    // --- Falling Hearts Background (Existing, no changes needed unless for optimization) ---
    const heartEmojis = ['❤️', '💖', '💕', '💗'];
    function createFallingHeart() {
        if (!heartsContainer) return;
        const heart = document.createElement('div');
        heart.classList.add('heart-particle');
        heart.innerHTML = heartEmojis[Math.floor(Math.random() * heartEmojis.length)];
        heart.style.left = Math.random() * 100 + 'vw';
        heart.style.animationDuration = Math.random() * 6 + 7 + 's';
        heart.style.fontSize = Math.random() * 15 + 10 + 'px';
        heart.style.opacity = Math.random() * 0.4 + 0.5;
        const horizontalDrift = (Math.random() - 0.5) * 40;
        heart.style.setProperty('--drift-x', `${horizontalDrift}vw`);
        heartsContainer.appendChild(heart);
        setTimeout(() => {
            heart.remove();
        }, parseFloat(heart.style.animationDuration) * 1000 + 1000);
    }

    if (heartsContainer) {
        setInterval(createFallingHeart, 400);
        for (let i = 0; i < 20; i++) createFallingHeart();
    } else {
        console.warn(".falling-hearts-bg container not found.");
    }

    // --- Inject shake animation CSS ---
    let shakeStyleInjected = false;
    for (const sheet of document.styleSheets) {
        try {
            if (sheet.cssRules) { // Check if cssRules is accessible
                for (const rule of sheet.cssRules) {
                    if (rule.selectorText === '.password-prompt.shake') {
                        shakeStyleInjected = true;
                        break;
                    }
                }
            }
        } catch (e) { /* console.warn("Cannot access cssRules: ", e); */ }
        if (shakeStyleInjected) break;
    }

    if (!shakeStyleInjected) {
        const styleSheet = document.createElement("style");
        styleSheet.type = "text/css";
        styleSheet.innerText = `
            .password-prompt.shake {
              animation: shake 0.5s cubic-bezier(.36,.07,.19,.97) both;
            }
            @keyframes shake {
              10%, 90% { transform: translateX(-2px); }
              20%, 80% { transform: translateX(4px); }
              30%, 50%, 70% { transform: translateX(-6px); }
              40%, 60% { transform: translateX(6px); }
            }`;
        document.head.appendChild(styleSheet);
    }
});