// DOM Elements
const mobileMenuBtn = document.getElementById('mobileMenuBtn');
const mobileMenuOverlay = document.getElementById('mobileMenuOverlay');
const mobileMenuClose = document.getElementById('mobileMenuClose');
const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');
const navLinks = document.querySelectorAll('.nav-link');
const livePriceElement = document.getElementById('livePrice');
const priceChangeElement = document.getElementById('priceChange');
const particlesContainer = document.querySelector('.particles-container');
const floatingShapes = document.querySelector('.floating-shapes');

// Mobile Menu Toggle
mobileMenuBtn.addEventListener('click', () => {
    mobileMenuOverlay.style.display = 'block';
    setTimeout(() => {
        mobileMenuOverlay.style.opacity = '1';
        mobileMenuOverlay.querySelector('.mobile-menu-container').style.transform = 'translateY(0)';
    }, 10);
});

mobileMenuClose.addEventListener('click', closeMobileMenu);

mobileMenuOverlay.addEventListener('click', (e) => {
    if (e.target === mobileMenuOverlay) {
        closeMobileMenu();
    }
});

mobileNavLinks.forEach(link => {
    link.addEventListener('click', closeMobileMenu);
});

function closeMobileMenu() {
    mobileMenuOverlay.style.opacity = '0';
    mobileMenuOverlay.querySelector('.mobile-menu-container').style.transform = 'translateY(100%)';
    setTimeout(() => {
        mobileMenuOverlay.style.display = 'none';
    }, 300);
}

// Smooth Scrolling for Navigation Links
function setupSmoothScrolling() {
    const allLinks = [...navLinks, ...mobileNavLinks];
    
    allLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                window.scrollTo({
                    top: targetSection.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Fake Live Price Updates
let currentPrice = 0.004567;
let priceChange = 2.34;

function updateLivePrice() {
    // Simulate small price fluctuations
    const fluctuation = (Math.random() - 0.5) * 0.0005;
    const newPrice = currentPrice + fluctuation;
    
    // Calculate percentage change
    const changePercent = ((newPrice - currentPrice) / currentPrice) * 100;
    
    // Update current price with some resistance to prevent extreme swings
    currentPrice = newPrice;
    priceChange = changePercent;
    
    // Update UI
    livePriceElement.textContent = `$${currentPrice.toFixed(6)}`;
    
    const isPositive = priceChange >= 0;
    priceChangeElement.innerHTML = `<i class="fas fa-arrow-${isPositive ? 'up' : 'down'}"></i> ${Math.abs(priceChange).toFixed(2)}%`;
    priceChangeElement.className = `price-change ${isPositive ? 'positive' : 'negative'}`;
    
    // Update chart
    updateChartData();
}

// Enhanced Background Animations
function createParticles() {
    if (!particlesContainer) return;
    
    const particleCount = 100;
    
    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        
        // Random properties
        const size = Math.random() * 3 + 1;
        const posX = Math.random() * 100;
        const duration = Math.random() * 20 + 10;
        const delay = Math.random() * 5;
        const moveX = (Math.random() - 0.5) * 100;
        
        // Apply styles
        particle.style.cssText = `
            position: absolute;
            width: ${size}px;
            height: ${size}px;
            background: ${Math.random() > 0.5 ? 'rgba(153, 69, 255, 0.3)' : 'rgba(20, 241, 149, 0.3)'};
            border-radius: 50%;
            left: ${posX}%;
            bottom: -10px;
            animation: particleMove ${duration}s linear ${delay}s infinite;
            --move-x: ${moveX}px;
            filter: blur(${Math.random() * 2}px);
        `;
        
        particlesContainer.appendChild(particle);
    }
}

function createFloatingShapes() {
    if (!floatingShapes) return;
    
    // Create additional floating shapes
    for (let i = 0; i < 6; i++) {
        const shape = document.createElement('div');
        shape.className = `shape-${i + 1}`;
        
        const size = Math.random() * 100 + 50;
        const posX = Math.random() * 90 + 5;
        const posY = Math.random() * 90 + 5;
        const duration = Math.random() * 30 + 20;
        const delay = Math.random() * 20;
        
        const colors = [
            'rgba(153, 69, 255, 0.05)',
            'rgba(20, 241, 149, 0.04)',
            'rgba(0, 209, 255, 0.03)',
            'rgba(255, 107, 157, 0.02)'
        ];
        
        shape.style.cssText = `
            width: ${size}px;
            height: ${size}px;
            top: ${posY}%;
            left: ${posX}%;
            background: radial-gradient(circle, ${colors[Math.floor(Math.random() * colors.length)]}, transparent 70%);
            animation: float ${duration}s infinite linear ${delay}s;
            position: absolute;
            border-radius: 50%;
            pointer-events: none;
        `;
        
        floatingShapes.appendChild(shape);
    }
}

// Mini Chart Animation
let chartCanvas, chartCtx, chartData, chart;

function initializeChart() {
    chartCanvas = document.getElementById('priceChart');
    if (!chartCanvas) return;
    
    chartCtx = chartCanvas.getContext('2d');
    
    // Initial chart data
    chartData = [];
    let currentValue = 0.0045;
    
    for (let i = 0; i < 50; i++) {
        currentValue += (Math.random() - 0.5) * 0.0001;
        chartData.push(currentValue);
    }
    
    // Create gradient
    const gradient = chartCtx.createLinearGradient(0, 0, 0, chartCanvas.height);
    gradient.addColorStop(0, 'rgba(153, 69, 255, 0.5)');
    gradient.addColorStop(1, 'rgba(153, 69, 255, 0.1)');
    
    // Draw chart
    chart = {
        width: chartCanvas.width,
        height: chartCanvas.height,
        data: chartData,
        
        draw: function() {
            // Clear canvas
            chartCtx.clearRect(0, 0, this.width, this.height);
            
            // Calculate dimensions
            const dataLength = this.data.length;
            const step = this.width / (dataLength - 1);
            const max = Math.max(...this.data);
            const min = Math.min(...this.data);
            const range = max - min;
            const scale = this.height / range;
            
            // Draw gradient area
            chartCtx.beginPath();
            chartCtx.moveTo(0, this.height);
            
            for (let i = 0; i < dataLength; i++) {
                const x = i * step;
                const y = this.height - (this.data[i] - min) * scale;
                
                if (i === 0) {
                    chartCtx.lineTo(x, y);
                } else {
                    chartCtx.lineTo(x, y);
                }
            }
            
            chartCtx.lineTo(this.width, this.height);
            chartCtx.closePath();
            
            chartCtx.fillStyle = gradient;
            chartCtx.fill();
            
            // Draw line
            chartCtx.beginPath();
            chartCtx.moveTo(0, this.height - (this.data[0] - min) * scale);
            
            for (let i = 1; i < dataLength; i++) {
                const x = i * step;
                const y = this.height - (this.data[i] - min) * scale;
                chartCtx.lineTo(x, y);
            }
            
            chartCtx.strokeStyle = '#9945FF';
            chartCtx.lineWidth = 2;
            chartCtx.stroke();
            
            // Draw current price point
            const lastX = (dataLength - 1) * step;
            const lastY = this.height - (this.data[dataLength - 1] - min) * scale;
            
            chartCtx.beginPath();
            chartCtx.arc(lastX, lastY, 6, 0, Math.PI * 2);
            chartCtx.fillStyle = '#14F195';
            chartCtx.fill();
            chartCtx.strokeStyle = '#FFFFFF';
            chartCtx.lineWidth = 2;
            chartCtx.stroke();
        },
        
        update: function(newValue) {
            // Shift data and add new value
            this.data.shift();
            this.data.push(newValue);
            this.draw();
        }
    };
    
    // Initial draw
    chart.draw();
    
    // Resize handler
    window.addEventListener('resize', resizeChart);
    resizeChart();
}

function updateChartData() {
    if (chart) {
        chart.update(currentPrice);
    }
}

function resizeChart() {
    if (!chartCanvas) return;
    
    // Get parent container dimensions
    const container = chartCanvas.parentElement;
    chartCanvas.width = container.clientWidth;
    chartCanvas.height = container.clientHeight;
    
    if (chart) {
        chart.width = chartCanvas.width;
        chart.height = chartCanvas.height;
        chart.draw();
    }
}

// Theme Management (Light/Dark)
function setupThemeToggle() {
    const themeToggle = document.createElement('button');
    themeToggle.id = 'themeToggle';
    themeToggle.innerHTML = '<i class="fas fa-moon"></i>';
    themeToggle.className = 'theme-toggle';
    
    document.body.appendChild(themeToggle);
    
    // Check for saved theme preference or default to dark
    const savedTheme = localStorage.getItem('suolala-theme') || 'dark';
    setTheme(savedTheme);
    
    themeToggle.addEventListener('click', () => {
        const currentTheme = document.body.getAttribute('data-theme') || 'dark';
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        setTheme(newTheme);
        localStorage.setItem('suolala-theme', newTheme);
    });
}

function setTheme(theme) {
    document.body.setAttribute('data-theme', theme);
    const themeToggle = document.getElementById('themeToggle');
    
    if (theme === 'light') {
        themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
        document.documentElement.style.setProperty('--dark-bg', '#F5F5FA');
        document.documentElement.style.setProperty('--darker-bg', '#FFFFFF');
        document.documentElement.style.setProperty('--card-bg', 'rgba(255, 255, 255, 0.9)');
        document.documentElement.style.setProperty('--text-primary', '#0A0A0F');
        document.documentElement.style.setProperty('--text-secondary', '#555566');
        document.documentElement.style.setProperty('--glass-border', 'rgba(153, 69, 255, 0.15)');
        document.documentElement.style.setProperty('--glass-bg', 'rgba(255, 255, 255, 0.8)');
        document.documentElement.style.setProperty('--build-rise-color', '#FF6B9D');
        document.documentElement.style.setProperty('--build-rise-gradient', 'linear-gradient(135deg, #FF6B9D 0%, #FFD166 50%, #00D1FF 100%)');
    } else {
        themeToggle.innerHTML = '<i class="fas fa-moon"></i>';
        document.documentElement.style.setProperty('--dark-bg', '#0A0A0F');
        document.documentElement.style.setProperty('--darker-bg', '#050508');
        document.documentElement.style.setProperty('--card-bg', 'rgba(25, 25, 35, 0.7)');
        document.documentElement.style.setProperty('--text-primary', '#FFFFFF');
        document.documentElement.style.setProperty('--text-secondary', '#B0B0C0');
        document.documentElement.style.setProperty('--glass-border', 'rgba(153, 69, 255, 0.2)');
        document.documentElement.style.setProperty('--glass-bg', 'rgba(15, 15, 25, 0.8)');
        document.documentElement.style.setProperty('--build-rise-color', '#FF6B9D');
        document.documentElement.style.setProperty('--build-rise-gradient', 'linear-gradient(135deg, #FF6B9D 0%, #FFD166 50%, #00D1FF 100%)');
    }
}

// Animate elements on scroll
function setupScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
            }
        });
    }, observerOptions);
    
    // Observe elements to animate
    const elementsToAnimate = document.querySelectorAll('.feature-card, .nft-card, .token-stat-card, .roadmap-phase');
    elementsToAnimate.forEach(el => observer.observe(el));
}

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    setupSmoothScrolling();
    initializeChart();
    setupThemeToggle();
    setupScrollAnimations();
    
    // Create enhanced background animations
    createParticles();
    createFloatingShapes();
    
    // Start price updates
    setInterval(updateLivePrice, 3000);
    
    // Initialize with a random delay
    setTimeout(updateLivePrice, 1000);
    
    // Add animation classes
    document.body.classList.add('loaded');
});

// Add CSS for theme toggle and particles
const themeToggleCSS = `
.theme-toggle {
    position: fixed;
    bottom: 30px;
    right: 30px;
    width: 50px;
    height: 50px;
    border-radius: 50%;
    background: var(--gradient-primary);
    color: white;
    border: none;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1.2rem;
    z-index: 1000;
    box-shadow: 0 5px 20px rgba(153, 69, 255, 0.4);
    transition: all 0.3s ease;
}

.theme-toggle:hover {
    transform: scale(1.1) rotate(30deg);
    box-shadow: 0 8px 25px rgba(153, 69, 255, 0.6);
}

@media (max-width: 768px) {
    .theme-toggle {
        bottom: 20px;
        right: 20px;
        width: 45px;
        height: 45px;
        font-size: 1.1rem;
    }
}

/* Animation classes */
.animate-in {
    animation: fadeInUp 0.6s ease forwards;
}

@keyframes fadeInUp {
    from {
        opacity: 0;
        transform: translateY(30px);
    }
    to {
        opacity: 1;
        transform: translateY(0);
    }
}

/* Particle animations */
@keyframes particleMove {
    0% {
        transform: translateY(0) translateX(0);
        opacity: 0;
    }
    10% {
        opacity: 1;
    }
    90% {
        opacity: 1;
    }
    100% {
        transform: translateY(-100vh) translateX(var(--move-x, 0));
        opacity: 0;
    }
}

/* Negative price change */
.price-change.negative {
    color: var(--warning);
}
`;

// Inject theme toggle CSS
const styleSheet = document.createElement('style');
styleSheet.textContent = themeToggleCSS;
document.head.appendChild(styleSheet);