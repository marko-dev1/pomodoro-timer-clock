 // Timer variables
        let timer;
        let isRunning = false;
        let isWorkTime = true;
        let timeLeft;
        let totalTime;
        let sessionCount = 1;
        const totalSessions = 4;

        // DOM elements
        const timerDisplay = document.getElementById('timer');
        const startBtn = document.getElementById('start-btn');
        const pauseBtn = document.getElementById('pause-btn');
        const resetBtn = document.getElementById('reset-btn');
        const skipBtn = document.getElementById('skip-btn');
        const sessionCountDisplay = document.getElementById('session-count');
        const modeDisplay = document.getElementById('mode');
        const progressBar = document.getElementById('progress-bar');
        const notification = document.getElementById('notification');

        // Settings elements
        const workDurationInput = document.getElementById('work-duration');
        const breakDurationInput = document.getElementById('break-duration');
        const longBreakDurationInput = document.getElementById('long-break-duration');
        const autoStartCheckbox = document.getElementById('auto-start');
        const startMinimizedCheckbox = document.getElementById('start-minimized');

        // Initialize timer
        function initializeTimer() {
            clearInterval(timer);
            isRunning = false;
            isWorkTime = true;
            sessionCount = 1;
            
            const workDuration = parseInt(workDurationInput.value) * 60;
            timeLeft = workDuration;
            totalTime = workDuration;
            
            updateDisplay();
            updateButtons();
            updateProgressBar();
        }

        // Update timer display
        function updateDisplay() {
            const minutes = Math.floor(timeLeft / 60);
            const seconds = timeLeft % 60;
            timerDisplay.textContent = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
            
            modeDisplay.textContent = isWorkTime ? 'Work' : 'Break';
            sessionCountDisplay.textContent = sessionCount;
        }

        // Update button states
        function updateButtons() {
            startBtn.disabled = isRunning;
            pauseBtn.disabled = !isRunning;
        }

        // Update progress bar
        function updateProgressBar() {
            const progress = ((totalTime - timeLeft) / totalTime) * 100;
            progressBar.style.width = `${progress}%`;
        }

        // Start timer
        function startTimer() {
            if (!isRunning) {
                isRunning = true;
                updateButtons();
                
                timer = setInterval(() => {
                    timeLeft--;
                    updateDisplay();
                    updateProgressBar();
                    
                    if (timeLeft <= 0) {
                        clearInterval(timer);
                        isRunning = false;
                        handleTimerComplete();
                    }
                }, 1000);
            }
        }

        // Pause timer
        function pauseTimer() {
            clearInterval(timer);
            isRunning = false;
            updateButtons();
        }

        // Reset timer
        function resetTimer() {
            clearInterval(timer);
            initializeTimer();
        }

        // Skip current session
        function skipSession() {
            clearInterval(timer);
            isRunning = false;
            handleTimerComplete();
        }

        // Handle timer completion
        function handleTimerComplete() {
            if (isWorkTime) {
                // Work session completed
                showNotification('Work session completed! Time for a break.');
                
                if (sessionCount < totalSessions) {
                    // Regular break
                    const breakDuration = parseInt(breakDurationInput.value) * 60;
                    timeLeft = breakDuration;
                    totalTime = breakDuration;
                    isWorkTime = false;
                } else {
                    // Long break after all sessions
                    const longBreakDuration = parseInt(longBreakDurationInput.value) * 60;
                    timeLeft = longBreakDuration;
                    totalTime = longBreakDuration;
                    isWorkTime = false;
                }
            } else {
                // Break completed
                showNotification('Break completed! Time to get back to work.');
                
                if (sessionCount < totalSessions) {
                    // Next work session
                    const workDuration = parseInt(workDurationInput.value) * 60;
                    timeLeft = workDuration;
                    totalTime = workDuration;
                    isWorkTime = true;
                    sessionCount++;
                } else {
                    // All sessions completed
                    showNotification('Congratulations! You completed all Pomodoro sessions.');
                    sessionCount = 1;
                    const workDuration = parseInt(workDurationInput.value) * 60;
                    timeLeft = workDuration;
                    totalTime = workDuration;
                    isWorkTime = true;
                }
            }
            
            updateDisplay();
            updateProgressBar();
            updateButtons();
            
            // Auto-start next session if enabled
            if (autoStartCheckbox.checked) {
                startTimer();
            }
        }

        // Show notification
        function showNotification(message) {
            notification.textContent = message;
            notification.style.display = 'block';
            
            setTimeout(() => {
                notification.style.display = 'none';
            }, 5000);
        }

        // Event listeners
        startBtn.addEventListener('click', startTimer);
        pauseBtn.addEventListener('click', pauseTimer);
        resetBtn.addEventListener('click', resetTimer);
        skipBtn.addEventListener('click', skipSession);

        // Settings event listeners
        workDurationInput.addEventListener('change', resetTimer);
        breakDurationInput.addEventListener('change', resetTimer);
        longBreakDurationInput.addEventListener('change', resetTimer);

        // Initialize the timer
        initializeTimer();

        // Check if we should auto-start (for demonstration purposes)
        // In a real desktop app, this would be controlled by startup settings
        window.addEventListener('load', () => {
            // Show a welcome message
            showNotification('Pomodoro Timer started! Click Start to begin your session.');
            
            // If auto-start is enabled, start the timer after a short delay
            if (autoStartCheckbox.checked) {
                setTimeout(() => {
                    startTimer();
                }, 2000);
            }
        });