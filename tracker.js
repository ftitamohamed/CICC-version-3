
        const duration = 3 * 24 * 60 * 60; // Duration in seconds (3 days)
        const circle = document.querySelector('.circle');
        const timeDisplay = document.getElementById('time');

        let remainingTime = duration;

        function updateTimer() {
            const days = Math.floor(remainingTime / (24 * 60 * 60));
            const hours = Math.floor((remainingTime % (24 * 60 * 60)) / (60 * 60));
            const minutes = Math.floor((remainingTime % (60 * 60)) / 60);
            const seconds = remainingTime % 60;

            timeDisplay.textContent = `${days}d ${hours < 10 ? '0' + hours : hours}:${minutes < 10 ? '0' + minutes : minutes}:${seconds < 10 ? '0' + seconds : seconds}`;

            const progress = (remainingTime / duration) * 100;
            /* circle.style.background = `conic-gradient(#ff4d4d ${progress}%, transparent ${progress}%)`; */

            if (remainingTime > 0) {
                remainingTime--;
            } else {
                clearInterval(timer);
                timeDisplay.textContent = 'Time Up!';
            }
        }

        const timer = setInterval(updateTimer, 1000);

        updateTimer(); // Initialize the timer immediately
    