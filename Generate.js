const themeSelect = document.getElementById('themeSelect');
const generateBtn = document.getElementById('generateBtn');
const visualCanvas = document.getElementById('visualCanvas');
const ctx = visualCanvas.getContext('2d');
const quoteDisplay = document.getElementById('quoteDisplay');

let animationFrameId;
let animationTime = 0; // Tracks time for animation phases

// --- Quotes Data ---
const quotes = {
    general: [
        "The best way to predict the future is to create it.",
        "Believe you can and you're halfway there.",
        "The only way to do great work is to love what you do.",
        "What you get by achieving your goals is not as important as what you become by achieving your goals.",
        "The future belongs to those who believe in the beauty of their dreams."
    ],
    hope: [
        "Hope is being able to see that there is light despite all of the darkness.",
        "Where there is no hope, it is necessary to invent it.",
        "Hope is the thing with feathers that perches in the soul.",
        "Never lose hope. Storms make people stronger and never last forever.",
        "We must accept finite disappointment, but never lose infinite hope."
    ],
    strength: [
        "Strength does not come from physical capacity. It comes from an indomitable will.",
        "You never know how strong you are until being strong is your only choice.",
        "The wound is the place where the Light enters you.",
        "Courage is not the absence of fear, but the triumph over it.",
        "Fall seven times, stand up eight."
    ],
    calm: [
        "Peace begins with a smile.",
        "Do not let the behavior of others destroy your inner peace.",
        "The quieter you become, the more you can hear.",
        "In the midst of movement and chaos, keep stillness inside of you.",
        "Calm mind brings inner strength and self-confidence, so that's very important for good health."
    ],
    growth: [
        "Growth is never by mere chance; it is the result of forces working together.",
        "Unless you try to do something beyond what you have already mastered, you will never grow.",
        "The only person you are destined to become is the person you decide to be.",
        "Every moment is a fresh beginning.",
        "Don't be afraid to give up the good to go for the great."
    ]
};

// --- Canvas Resizing ---
function resizeCanvas() {
    visualCanvas.width = visualCanvas.offsetWidth;
    visualCanvas.height = visualCanvas.offsetHeight;
    // Redraw immediately after resize to prevent blank canvas
    drawVisualBackground();
}

// Initial resize and add event listener
window.addEventListener('resize', resizeCanvas);
resizeCanvas();

// --- Visual Background Generation ---
function drawVisualBackground() {
    // Clear canvas
    ctx.clearRect(0, 0, visualCanvas.width, visualCanvas.height);

    const theme = themeSelect.value;
    let color1, color2, color3; // Define colors based on theme

    switch (theme) {
        case 'hope':
            color1 = '#8B5CF6'; // Violet
            color2 = '#EC4899'; // Pink
            color3 = '#FDE047'; // Yellow
            break;
        case 'strength':
            color1 = '#DC2626'; // Red
            color2 = '#F97316'; // Orange
            color3 = '#6B7280'; // Gray
            break;
        case 'calm':
            color1 = '#3B82F6'; // Blue
            color2 = '#A78BFA'; // Lavender
            color3 = '#6EE7B7'; // Teal
            break;
        case 'growth':
            color1 = '#22C55E'; // Green
            color2 = '#10B981'; // Emerald
            color3 = '#FACC15'; // Amber
            break;
        case 'general':
        default:
            color1 = '#A855F7'; // Purple
            color2 = '#EC4899'; // Pink
            color3 = '#3B82F6'; // Blue
            break;
    }

    // Create a radial gradient for the background
    const gradient = ctx.createRadialGradient(
        visualCanvas.width / 2, visualCanvas.height / 2, 0,
        visualCanvas.width / 2, visualCanvas.height / 2, Math.max(visualCanvas.width, visualCanvas.height) / 1.5
    );
    gradient.addColorStop(0, color1);
    gradient.addColorStop(0.5, color2);
    gradient.addColorStop(1, color3);
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, visualCanvas.width, visualCanvas.height);

    // Add subtle animated elements (e.g., floating orbs/particles)
    const numElements = 20;
    for (let i = 0; i < numElements; i++) {
        const size = 10 + Math.sin(animationTime * 0.05 + i) * 5; // Pulsating size
        const x = (visualCanvas.width / numElements) * i + Math.sin(animationTime * 0.02 + i) * 50;
        const y = (visualCanvas.height / 2) + Math.cos(animationTime * 0.03 + i) * (visualCanvas.height / 3);

        ctx.beginPath();
        ctx.arc(x, y, size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${0.1 + Math.sin(animationTime * 0.04 + i) * 0.05})`; // Fading alpha
        ctx.fill();
    }
}

// --- Animation Loop ---
function animate() {
    animationFrameId = requestAnimationFrame(animate);
    animationTime += 1; // Increment time for animation
    drawVisualBackground(); // Redraw background with updated animation state
}

// --- Quote Generation Logic ---
function generateQuote() {
    const selectedTheme = themeSelect.value;
    const themeQuotes = quotes[selectedTheme];
    if (themeQuotes && themeQuotes.length > 0) {
        const randomIndex = Math.floor(Math.random() * themeQuotes.length);
        quoteDisplay.textContent = themeQuotes[randomIndex];
    } else {
        quoteDisplay.textContent = "No quotes found for this theme. Please select another.";
    }
    // Ensure the visual updates with the new theme colors
    drawVisualBackground();
}

// --- Event Listeners ---
generateBtn.addEventListener('click', generateQuote);

// Initial generation and animation start when the window loads
window.onload = function() {
    generateQuote(); // Generate an initial quote and visual
    animate(); // Start the animation loop
};
