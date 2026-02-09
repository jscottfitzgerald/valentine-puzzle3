// =============================================
// MAIN GAME ENGINE
// =============================================

class Game {
    constructor() {
        this.canvas = document.getElementById('gameCanvas');
        this.ctx = this.canvas.getContext('2d');
        
        // Resize canvas to window
        this.resizeCanvas();
        window.addEventListener('resize', () => this.resizeCanvas());
        
        // Game state
        this.running = false;
        this.paused = false;
        this.gameStarted = false;
        
        // Input
        this.keys = {};
        this.setupInput();
        
        // Camera
        this.camera = {
            x: 0,
            y: 0,
            target: null
        };
        
        // Game objects
        this.character = null;
        this.world = null;
        
        // Puzzle piece tracking
        this.collectedPieces = new Set();
        this.activeStation = null;
        this.visitedScenes = new Set();
        
        // Puzzle image
        this.puzzleImage = null;
        this.puzzleImageLoaded = false;
        
        // Initialize
        this.init();
    }
    
    init() {
        // Create world and character
        this.world = new World();
        this.character = new Character({ startX: 450, startY: 300 });
        
        // Set camera target
        this.camera.target = this.character;
        
        // Load puzzle image
        this.loadPuzzleImage();
        
        // Create puzzle engine
        puzzleEngine = new PuzzleEngine(this);
        
        // Initialize inventory UI
        this.initInventoryUI();
    }
    
    loadPuzzleImage() {
        this.puzzleImage = new Image();
        this.puzzleImage.onload = () => {
            this.puzzleImageLoaded = true;
            console.log('Puzzle image loaded successfully');
        };
        this.puzzleImage.onerror = () => {
            console.error('Failed to load puzzle image:', GAME_CONFIG.puzzle.imagePath);
        };
        this.puzzleImage.src = GAME_CONFIG.puzzle.imagePath;
    }
    
    initInventoryUI() {
        const inventory = document.getElementById('puzzleInventory');
        const grid = document.getElementById('inventoryGrid');
        
        // Shuffled order for 9 pieces (not chronological)
        const shuffledOrder = [3, 7, 1, 9, 5, 2, 8, 4, 6];
        
        // Create 9 slots in shuffled order
        shuffledOrder.forEach(pieceNum => {
            const slot = document.createElement('div');
            slot.className = 'inventory-slot';
            slot.id = `slot-${pieceNum}`;
            slot.innerHTML = `
                <div class="slot-number">${pieceNum}</div>
                <div class="slot-piece" id="piece-${pieceNum}"></div>
            `;
            grid.appendChild(slot);
        });
        
        // Update counter
        this.updateInventoryCounter();
    }
    
    resizeCanvas() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
    }
    
    setupInput() {
        // Keyboard
        window.addEventListener('keydown', (e) => {
            this.keys[e.key] = true;
            
            // Interaction key
            if ((e.key === 'e' || e.key === 'E') && this.activeStation && !this.paused) {
                this.interactWithStation();
            }
            
            // Prevent space from scrolling
            if (e.key === ' ') {
                e.preventDefault();
            }
        });
        
        window.addEventListener('keyup', (e) => {
            this.keys[e.key] = false;
        });
        
        // Touch/mobile controls (optional enhancement)
        // Can be added later for mobile support
    }
    
    start() {
        this.gameStarted = true;
        this.running = true;
        
        // Hide start screen
        document.getElementById('startScreen').classList.add('hidden');
        
        // Show inventory
        document.getElementById('puzzleInventory').classList.add('show');
        
        // Start game loop
        this.gameLoop();
    }
    
    gameLoop() {
        if (!this.running) return;
        
        // Update
        if (!this.paused) {
            this.update();
        }
        
        // Render
        this.render();
        
        // Continue loop
        requestAnimationFrame(() => this.gameLoop());
    }
    
    update() {
        // Update character
        this.character.update(this.keys, this.world.platforms);
        
        // Update world
        this.world.update();
        
        // Update camera
        this.updateCamera();
        
        // Check for station proximity
        this.checkStationProximity();
        
        // Update progress
        this.updateProgress();
    }
    
    updateCamera() {
        // Smooth camera follow - HORIZONTAL ONLY
        const targetX = this.character.x - GAME_CONFIG.settings.camera.offsetX;
        
        // Update X position smoothly
        this.camera.x += (targetX - this.camera.x) * GAME_CONFIG.settings.camera.followSpeed;
        
        // Clamp camera X
        this.camera.x = Math.max(0, this.camera.x);
        this.camera.x = Math.min(GAME_CONFIG.settings.world.width - this.canvas.width, this.camera.x);
        
        // LOCK Y position at 0 - no vertical camera movement
        this.camera.y = 0;
    }
    
    checkStationProximity() {
        // Find nearest station
        let nearestStation = null;
        let minDistance = Infinity;
        
        this.world.stations.forEach(station => {
            if (station.visited) return; // Skip visited stations
            
            const distance = Math.sqrt(
                Math.pow(this.character.x - station.x, 2) +
                Math.pow(this.character.y - station.y, 2)
            );
            
            if (distance < 80 && distance < minDistance) {
                minDistance = distance;
                nearestStation = station;
            }
        });
        
        // Update active station
        if (nearestStation) {
            this.activeStation = nearestStation.id;
            this.world.activateStation(nearestStation.id);
        } else {
            this.activeStation = null;
            // Deactivate all stations
            this.world.stations.forEach(s => {
                if (!s.visited) s.active = false;
            });
        }
    }
    
    interactWithStation() {
        if (!this.activeStation) return;
        
        const scene = GAME_CONFIG.scenes[this.activeStation];
        if (!scene) return;
        
        // Check if already collected
        if (this.collectedPieces.has(scene.pieceNumber)) {
            return; // Already collected this piece
        }
        
        // Pause game
        this.paused = true;
        
        // Show puzzle modal
        this.showPuzzleModal(scene);
    }
    
    showPuzzleModal(scene) {
        const modal = document.getElementById('storyModal');
        const modalTitle = document.getElementById('modalTitle');
        const modalText = document.getElementById('modalText');
        const modalImage = document.getElementById('modalImage');
        const modalChoices = document.getElementById('modalChoices');
        const puzzleArea = document.getElementById('puzzleArea');
        
        // Set content
        modalTitle.textContent = scene.title;
        modalText.innerHTML = scene.text.replace(/\n/g, '<br>');
        
        // Hide image area
        modalImage.innerHTML = '';
        modalImage.style.display = 'none';
        
        // Hide choices
        modalChoices.innerHTML = '';
        modalChoices.style.display = 'none';
        
        // Setup puzzle
        puzzleEngine.setupPuzzle(scene, puzzleArea, scene.pieceNumber);
        
        // Show modal
        modal.classList.add('show');
    }
    
    collectPuzzlePiece(pieceNumber) {
        // Add to collected pieces
        this.collectedPieces.add(pieceNumber);
        
        // Mark station as visited
        this.world.markStationVisited(`piece${pieceNumber}`);
        this.visitedScenes.add(`piece${pieceNumber}`);
        
        // Close modal
        const modal = document.getElementById('storyModal');
        modal.classList.remove('show');
        
        // Animate piece to inventory
        this.animatePieceCollection(pieceNumber);
        
        // Resume game
        setTimeout(() => {
            this.paused = false;
        }, 1000);
        
        // Check if all pieces collected
        if (this.collectedPieces.size === GAME_CONFIG.puzzle.totalPieces) {
            setTimeout(() => {
                this.showFinalAssembly();
            }, 2000);
        }
    }
    
    animatePieceCollection(pieceNumber) {
        const slot = document.getElementById(`slot-${pieceNumber}`);
        const pieceDiv = document.getElementById(`piece-${pieceNumber}`);
        
        if (!this.puzzleImageLoaded) {
            // Fallback if image not loaded
            pieceDiv.style.background = GAME_CONFIG.settings.colors.accent;
            slot.classList.add('collected');
            this.updateInventoryCounter();
            return;
        }
        
        // Calculate piece position in the image
        const cols = GAME_CONFIG.puzzle.cols;
        const rows = GAME_CONFIG.puzzle.rows;
        const col = (pieceNumber - 1) % cols;
        const row = Math.floor((pieceNumber - 1) / cols);
        
        const pieceWidth = 100 / cols;
        const pieceHeight = 100 / rows;
        
        // Set background image with correct position
        pieceDiv.style.backgroundImage = `url('${GAME_CONFIG.puzzle.imagePath}')`;
        pieceDiv.style.backgroundSize = `${cols * 100}% ${rows * 100}%`;
        pieceDiv.style.backgroundPosition = `${col * pieceWidth}% ${row * pieceHeight}%`;
        
        // Add collected class for animation
        slot.classList.add('collected');
        
        // Create particles
        this.world.createParticles(this.character.x, this.character.y, 30, GAME_CONFIG.settings.colors.accent);
        
        // Update counter
        this.updateInventoryCounter();
    }
    
    updateInventoryCounter() {
        const counter = document.getElementById('inventoryCounter');
        counter.textContent = `Pieces: ${this.collectedPieces.size}/${GAME_CONFIG.puzzle.totalPieces}`;
        
        // Update progress bar
        const progressBar = document.getElementById('progressBar');
        const progressText = document.getElementById('progressText');
        const progress = (this.collectedPieces.size / GAME_CONFIG.puzzle.totalPieces) * 100;
        
        progressBar.style.width = progress + '%';
        
        if (progress === 100) {
            progressText.textContent = 'All pieces collected! 💖';
        } else if (progress >= 75) {
            progressText.textContent = 'Almost there...';
        } else if (progress >= 50) {
            progressText.textContent = 'Halfway through!';
        } else if (progress >= 25) {
            progressText.textContent = 'Great progress!';
        } else {
            progressText.textContent = 'Collecting pieces...';
        }
    }
    
    showFinalAssembly() {
        // Pause game
        this.paused = true;
        
        // Show assembly overlay
        const overlay = document.getElementById('assemblyOverlay');
        overlay.classList.add('show');
        
        // Start assembly animation
        setTimeout(() => this.assemblePuzzle(), 500);
    }
    
    assemblePuzzle() {
        const container = document.getElementById('assemblyContainer');
        const canvas = document.getElementById('assemblyCanvas');
        const ctx = canvas.getContext('2d');
        
        // Set canvas size
        const maxWidth = Math.min(800, window.innerWidth * 0.9);
        const maxHeight = Math.min(600, window.innerHeight * 0.7);
        
        if (this.puzzleImageLoaded) {
            const imgRatio = this.puzzleImage.width / this.puzzleImage.height;
            let width = maxWidth;
            let height = width / imgRatio;
            
            if (height > maxHeight) {
                height = maxHeight;
                width = height * imgRatio;
            }
            
            canvas.width = width;
            canvas.height = height;
        } else {
            canvas.width = maxWidth;
            canvas.height = maxHeight;
        }
        
        // Animate pieces flying in
        this.animateAssembly(canvas, ctx);
    }
    
    animateAssembly(canvas, ctx) {
        const pieces = Array.from(this.collectedPieces).sort((a, b) => a - b);
        let currentPiece = 0;
        
        const animatePiece = () => {
            if (currentPiece >= pieces.length) {
                // All pieces assembled, show the complete image
                setTimeout(() => this.showCompleteImage(canvas, ctx), 500);
                return;
            }
            
            const pieceNum = pieces[currentPiece];
            const cols = GAME_CONFIG.puzzle.cols;
            const rows = GAME_CONFIG.puzzle.rows;
            const col = (pieceNum - 1) % cols;
            const row = Math.floor((pieceNum - 1) / cols);
            
            const pieceWidth = canvas.width / cols;
            const pieceHeight = canvas.height / rows;
            const x = col * pieceWidth;
            const y = row * pieceHeight;
            
            if (this.puzzleImageLoaded) {
                // Draw piece of the image
                const srcX = (this.puzzleImage.width / cols) * col;
                const srcY = (this.puzzleImage.height / rows) * row;
                const srcW = this.puzzleImage.width / cols;
                const srcH = this.puzzleImage.height / rows;
                
                ctx.drawImage(this.puzzleImage, srcX, srcY, srcW, srcH, x, y, pieceWidth, pieceHeight);
            } else {
                // Fallback colored pieces
                ctx.fillStyle = GAME_CONFIG.settings.colors.accent;
                ctx.fillRect(x, y, pieceWidth, pieceHeight);
                ctx.strokeStyle = '#fff';
                ctx.strokeRect(x, y, pieceWidth, pieceHeight);
            }
            
            // Draw piece border
            ctx.strokeStyle = 'rgba(255, 255, 255, 0.5)';
            ctx.lineWidth = 2;
            ctx.strokeRect(x, y, pieceWidth, pieceHeight);
            
            currentPiece++;
            setTimeout(animatePiece, 300);
        };
        
        animatePiece();
    }
    
    showCompleteImage(canvas, ctx) {
        // Add golden glow effect
        ctx.shadowBlur = 20;
        ctx.shadowColor = GAME_CONFIG.settings.colors.accent;
        ctx.strokeStyle = GAME_CONFIG.settings.colors.primary;
        ctx.lineWidth = 4;
        ctx.strokeRect(0, 0, canvas.width, canvas.height);
        ctx.shadowBlur = 0;
        
        // Show rotate button
        setTimeout(() => {
            const btn = document.getElementById('rotateButton');
            btn.style.display = 'block';
            btn.classList.add('show');
        }, 1000);
    }
    
    showPrize(message) {
        const notification = document.getElementById('prizeNotification');
        const prizeMessage = document.getElementById('prizeMessage');
        
        prizeMessage.textContent = message;
        notification.classList.add('show');
    }
    
    updateProgress() {
        // Progress is now handled by updateInventoryCounter
    }
    
    render() {
        // Clear canvas
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        
        // Draw world
        this.world.draw(this.ctx, this.camera);
        
        // Draw character
        this.character.draw(this.ctx, this.camera);
    }
}

// =============================================
// GLOBAL FUNCTIONS (called from HTML)
// =============================================

let game = null;

function startGame() {
    console.log('Start button clicked!');
    if (!game) {
        console.log('Creating new game...');
        try {
            game = new Game();
        } catch (error) {
            console.error('Error creating game:', error);
            return;
        }
    }
    console.log('Starting game...');
    game.start();
}

function closePrize() {
    const notification = document.getElementById('prizeNotification');
    notification.classList.remove('show');
}

function rotateInvitation() {
    const canvas = document.getElementById('assemblyCanvas');
    const btn = document.getElementById('rotateButton');
    const details = document.getElementById('invitationDetails');
    
    // Hide canvas and button
    canvas.style.transform = 'rotateY(90deg)';
    canvas.style.opacity = '0';
    btn.style.display = 'none';
    
    // Show details after rotation
    setTimeout(() => {
        canvas.style.display = 'none';
        details.style.display = 'block';
        setTimeout(() => {
            details.style.transform = 'rotateY(0deg)';
            details.style.opacity = '1';
        }, 50);
    }, 300);
}

function closeAssembly() {
    const overlay = document.getElementById('assemblyOverlay');
    overlay.classList.remove('show');
}

function submitFeedback() {
    const feedbackText = document.getElementById('feedbackText');
    const feedbackStatus = document.getElementById('feedbackStatus');
    const feedback = feedbackText.value.trim();
    
    if (!feedback) {
        feedbackStatus.textContent = 'Please enter your feedback first! 💭';
        feedbackStatus.style.color = '#ff006e';
        return;
    }
    
    // Store feedback with timestamp
    const timestamp = new Date().toISOString();
    const feedbackData = {
        feedback: feedback,
        timestamp: timestamp,
        date: new Date().toLocaleString()
    };
    
    // Save to localStorage
    const existingFeedback = JSON.parse(localStorage.getItem('invitationFeedback') || '[]');
    existingFeedback.push(feedbackData);
    localStorage.setItem('invitationFeedback', JSON.stringify(existingFeedback));
    
    // Show success message
    feedbackStatus.textContent = '✨ Thank you! Your feedback has been saved! 💕';
    feedbackStatus.style.color = '#e63946';
    
    // Clear the textarea
    feedbackText.value = '';
    
    // Log to console for retrieval
    console.log('Feedback submitted:', feedbackData);
    console.log('All feedback:', existingFeedback);
    
    // Optional: Create a mailto link for easy sharing
    setTimeout(() => {
        feedbackStatus.innerHTML = `✨ Feedback saved! <a href="mailto:?subject=Invitation%20Feedback&body=${encodeURIComponent(feedback)}" style="color: #ff006e; text-decoration: underline;">Click here to email it</a> 💕`;
    }, 2000);
}

// Function to retrieve all feedback (for the creator)
function getAllFeedback() {
    const feedback = JSON.parse(localStorage.getItem('invitationFeedback') || '[]');
    console.log('=== ALL STORED FEEDBACK ===');
    feedback.forEach((item, index) => {
        console.log(`\n--- Feedback #${index + 1} ---`);
        console.log('Date:', item.date);
        console.log('Message:', item.feedback);
    });
    return feedback;
}

// Initialize on page load
window.addEventListener('DOMContentLoaded', () => {
    console.log('DOM Content Loaded');
    
    // Show the start screen
    const startScreen = document.getElementById('startScreen');
    if (startScreen) {
        startScreen.classList.remove('hidden');
        startScreen.style.display = 'flex';
        console.log('Start screen shown');
    } else {
        console.error('Start screen element not found!');
    }
    
    // Attach event listener to start button
    const startButton = document.getElementById('startButton');
    if (startButton) {
        console.log('Start button found, attaching click listener');
        
        // Test if button is clickable
        startButton.addEventListener('mousedown', () => {
            console.log('MOUSEDOWN detected on button!');
        });
        
        startButton.addEventListener('mouseup', () => {
            console.log('MOUSEUP detected on button!');
        });
        
        startButton.addEventListener('click', (e) => {
            console.log('CLICK EVENT FIRED!', e);
            e.stopPropagation();
            e.preventDefault();
            startGame();
        }, true);
        
        // Also try onclick as backup
        startButton.onclick = (e) => {
            console.log('ONCLICK FIRED!', e);
            startGame();
        };
        
        // Force focus for testing
        startButton.style.outline = '3px solid red';
        console.log('Button styles:', window.getComputedStyle(startButton).pointerEvents);
        console.log('Button z-index:', window.getComputedStyle(startButton).zIndex);
    } else {
        console.error('Start button element not found!');
    }
});
