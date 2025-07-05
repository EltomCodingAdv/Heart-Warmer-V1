
        // --- Canvas and Context Setup ---
        const canvas = document.getElementById('bubble-canvas');
        const ctx = canvas.getContext('2d');

        // --- Global Variables ---
        let bubbles = [];
        const numBubbles = 50;

        // --- Core Functions ---

        // Function to set canvas dimensions to fit the window
        function resizeCanvas() {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        }

        // --- Bubble Class Definition ---
        class Bubble {
            constructor() {
                this.reset();
                this.y = Math.random() * canvas.height; // Start at a random height to fill screen on load
            }

            // Reset bubble properties to initial state
            reset() {
                this.radius = Math.random() * 5 + 2; // Radius between 2 and 7
                this.x = Math.random() * canvas.width;
                this.y = canvas.height + this.radius; // Start below the screen
                this.speedY = Math.random() * 1 + 0.5; // Vertical speed
                this.speedX = Math.random() * 2 - 1;   // Horizontal speed (-1 to 1)
                this.opacity = Math.random() * 0.5 + 0.2; // Opacity between 0.2 and 0.7
            }

            // Update bubble position
            update() {
                this.y -= this.speedY;
                this.x += this.speedX;

                // Reset bubble if it moves off the top, left, or right of the screen
                if (this.y < -this.radius || this.x < -this.radius || this.x > canvas.width + this.radius) {
                    this.reset();
                }
            }

            // Draw the bubble on the canvas
            draw() {
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
                ctx.fillStyle = `rgba(255, 255, 255, ${this.opacity})`;
                ctx.fill();
            }
        }

        // --- Animation Setup ---

        // Initialize the array of bubbles
        function initBubbles() {
            bubbles = [];
            for (let i = 0; i < numBubbles; i++) {
                bubbles.push(new Bubble());
            }
        }

        // Main animation loop
        function animate() {
            ctx.clearRect(0, 0, canvas.width, canvas.height); // Clear canvas each frame
            bubbles.forEach(bubble => {
                bubble.update();
                bubble.draw();
            });
            requestAnimationFrame(animate); // Loop the animation
        }

        // --- Event Listeners ---

        // Adjust canvas size on window resize
        window.addEventListener('resize', () => {
            resizeCanvas();
            // No need to re-initialize bubbles, they will adapt
        });

        // --- Initial Execution ---
        resizeCanvas();
        initBubbles();
        animate();