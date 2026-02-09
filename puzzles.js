// =============================================
// PUZZLE ENGINE - Mini-Puzzle System
// =============================================

class PuzzleEngine {
    constructor(game) {
        this.game = game;
        this.currentPuzzle = null;
        this.currentPieceId = null;
    }
    
    // =============================================
    // PUZZLE SETUP
    // =============================================
    
    setupPuzzle(scene, puzzleArea, pieceId) {
        this.currentPuzzle = scene.puzzle;
        this.currentPieceId = pieceId;
        
        if (!this.currentPuzzle) {
            this.showSimpleCollect(puzzleArea);
            return;
        }
        
        puzzleArea.classList.add('active');
        puzzleArea.style.display = 'block';
        
        switch (this.currentPuzzle.type) {
            case 'pattern':
                this.setupPatternMemory(puzzleArea);
                break;
            case 'trivia':
                this.setupTrivia(puzzleArea);
                break;
            case 'unscramble':
                this.setupWordUnscramble(puzzleArea);
                break;
            case 'math':
                this.setupMathChallenge(puzzleArea);
                break;
            case 'riddle':
                this.setupRiddle(puzzleArea);
                break;
            case 'colors':
                this.setupColorMatch(puzzleArea);
                break;
            case 'date':
                this.setupDateMemory(puzzleArea);
                break;
            case 'picture':
                this.setupPictureChoice(puzzleArea);
                break;
            case 'quote':
                this.setupQuoteComplete(puzzleArea);
                break;
            case 'slider':
                this.setupSliderPuzzle(puzzleArea);
                break;
            default:
                this.showSimpleCollect(puzzleArea);
        }
    }
    
    // =============================================
    // PUZZLE 1: PATTERN MEMORY
    // =============================================
    
    setupPatternMemory(puzzleArea) {
        const pattern = this.currentPuzzle.pattern || [1, 3, 2, 4];
        const colors = ['#e74c3c', '#9b59b6', '#b76e79', '#27ae60']; // Red, Purple, Rose Gold, Green
        
        puzzleArea.innerHTML = `
            <div class="puzzle-container">
                <h3>💝 Pattern Memory</h3>
                <p>${this.currentPuzzle.instruction || 'Remember the pattern and repeat it!'}</p>
                <div class="pattern-display" id="patternDisplay">
                    ${pattern.map((p, i) => `<div class="pattern-heart" data-index="${p}" style="background: ${colors[p-1]}; opacity: 1;">♥</div>`).join('')}
                </div>
                <div class="pattern-input" id="patternInput">
                    ${[1, 2, 3, 4].map(i => `<button class="pattern-btn" data-value="${i}" style="background: ${colors[i-1]}; opacity: 1;" onclick="puzzleEngine.addToPattern(${i})">♥</button>`).join('')}
                </div>
                <div class="pattern-answer" id="patternAnswer"></div>
                <button class="puzzle-reset" onclick="puzzleEngine.resetPattern()">Reset</button>
            </div>
        `;
        
        this.patternAnswer = [];
        this.patternTarget = pattern;
        
        // Flash the pattern
        setTimeout(() => this.flashPattern(), 500);
    }
    
    flashPattern() {
        const display = document.getElementById('patternDisplay');
        const hearts = display.querySelectorAll('.pattern-heart');
        
        // Ensure input buttons stay active
        const inputButtons = document.querySelectorAll('.pattern-btn');
        inputButtons.forEach(btn => {
            btn.style.opacity = '1';
            btn.style.pointerEvents = 'auto';
        });
        
        hearts.forEach((heart, i) => {
            setTimeout(() => {
                heart.style.transform = 'scale(1.3)';
                heart.style.opacity = '1';
                setTimeout(() => {
                    heart.style.transform = 'scale(1)';
                }, 300);
            }, i * 400);
        });
        
        setTimeout(() => {
            // Only fade the display hearts, not the buttons
            hearts.forEach(heart => {
                heart.style.opacity = '0.3';
            });
            
            // Double-check buttons stay clickable
            inputButtons.forEach(btn => {
                btn.style.opacity = '1';
                btn.style.pointerEvents = 'auto';
            });
        }, hearts.length * 400 + 500);
    }
    
    addToPattern(value) {
        this.patternAnswer.push(value);
        const answerDiv = document.getElementById('patternAnswer');
        const colors = ['#e74c3c', '#9b59b6', '#b76e79', '#27ae60']; // Red, Purple, Rose Gold, Green
        answerDiv.innerHTML = this.patternAnswer.map(v => 
            `<span style="color: ${colors[v-1]}">♥</span>`
        ).join(' ');
        
        if (this.patternAnswer.length === this.patternTarget.length) {
            this.checkPattern();
        }
    }
    
    resetPattern() {
        this.patternAnswer = [];
        document.getElementById('patternAnswer').innerHTML = '';
    }
    
    checkPattern() {
        const correct = this.patternAnswer.every((v, i) => v === this.patternTarget[i]);
        if (correct) {
            this.puzzleSolved();
        } else {
            this.showHint('Not quite! Try again. 💕');
            setTimeout(() => this.resetPattern(), 1000);
        }
    }
    
    // =============================================
    // PUZZLE 2: TRIVIA
    // =============================================
    
    setupTrivia(puzzleArea) {
        const choices = this.currentPuzzle.choices || [
            '[First option]',
            '[Second option]',
            '[Third option]'
        ];
        const correct = this.currentPuzzle.answer || 0;
        
        puzzleArea.innerHTML = `
            <div class="puzzle-container">
                <h3>💭 Trivia Time</h3>
                <p>${this.currentPuzzle.question || '[Your trivia question here]'}</p>
                <div class="trivia-choices">
                    ${choices.map((choice, i) => `
                        <button class="trivia-btn" onclick="puzzleEngine.checkTrivia(${i}, ${correct})">${choice}</button>
                    `).join('')}
                </div>
                <div class="puzzle-hint" id="puzzleHint"></div>
            </div>
        `;
    }
    
    checkTrivia(selected, correct) {
        if (selected === correct) {
            this.puzzleSolved();
        } else {
            this.showHint('Try another answer! 💫');
        }
    }
    
    // =============================================
    // PUZZLE 3: WORD UNSCRAMBLE
    // =============================================
    
    setupWordUnscramble(puzzleArea) {
        const word = this.currentPuzzle.word || 'LOVE';
        const scrambled = this.currentPuzzle.scrambled || 'EVOL';
        
        puzzleArea.innerHTML = `
            <div class="puzzle-container">
                <h3>🔤 Unscramble the Word</h3>
                <p>${this.currentPuzzle.hint || 'Unscramble this romantic word!'}</p>
                <div class="scrambled-word">${scrambled}</div>
                <input type="text" id="unscrambleInput" class="puzzle-input" placeholder="Type your answer...">
                <button class="puzzle-submit" onclick="puzzleEngine.checkUnscramble('${word}')">Submit</button>
                <div class="puzzle-hint" id="puzzleHint"></div>
            </div>
        `;
        
        document.getElementById('unscrambleInput').focus();
    }
    
    checkUnscramble(correctWord) {
        const input = document.getElementById('unscrambleInput').value.trim().toUpperCase();
        if (input === correctWord.toUpperCase()) {
            this.puzzleSolved();
        } else {
            this.showHint('Not quite! Keep trying. ✨');
        }
    }
    
    // =============================================
    // PUZZLE 4: MATH CHALLENGE
    // =============================================
    
    setupMathChallenge(puzzleArea) {
        const question = this.currentPuzzle.question || '[Your math question]';
        const answer = this.currentPuzzle.answer || 42;
        
        puzzleArea.innerHTML = `
            <div class="puzzle-container">
                <h3>🔢 Quick Math</h3>
                <p>${question}</p>
                <input type="number" id="mathInput" class="puzzle-input" placeholder="Your answer...">
                <button class="puzzle-submit" onclick="puzzleEngine.checkMath(${answer})">Submit</button>
                <div class="puzzle-hint" id="puzzleHint"></div>
            </div>
        `;
        
        document.getElementById('mathInput').focus();
    }
    
    checkMath(correctAnswer) {
        const input = parseInt(document.getElementById('mathInput').value);
        if (input === correctAnswer) {
            this.puzzleSolved();
        } else {
            this.showHint('Try again! You\'re close! 💕');
        }
    }
    
    // =============================================
    // PUZZLE 5: RIDDLE
    // =============================================
    
    setupRiddle(puzzleArea) {
        const answer = this.currentPuzzle.answer || 'love';
        
        puzzleArea.innerHTML = `
            <div class="puzzle-container">
                <h3>🤔 Riddle Me This</h3>
                <p class="riddle-text">${this.currentPuzzle.riddle || '[Your riddle here]'}</p>
                <input type="text" id="riddleInput" class="puzzle-input" placeholder="Your answer...">
                <button class="puzzle-submit" onclick="puzzleEngine.checkRiddle('${answer}')">Submit</button>
                <div class="puzzle-hint" id="puzzleHint"></div>
            </div>
        `;
        
        document.getElementById('riddleInput').focus();
    }
    
    checkRiddle(correctAnswer) {
        const input = document.getElementById('riddleInput').value.trim().toLowerCase();
        if (input === correctAnswer.toLowerCase()) {
            this.puzzleSolved();
        } else {
            this.showHint('Think about it... 🌹');
        }
    }
    
    // =============================================
    // PUZZLE 6: COLOR MATCH
    // =============================================
    
    setupColorMatch(puzzleArea) {
        const sequence = this.currentPuzzle.sequence || ['pink', 'rose', 'mauve'];
        const colorMap = {
            'pink': '#e91e63',      // Bright Pink
            'rose': '#f39c12',      // Orange/Gold
            'mauve': '#9b59b6',     // Purple
            'blue': '#3498db',      // Blue
            'green': '#27ae60',     // Green
            'red': '#e74c3c'        // Red
        };
        
        puzzleArea.innerHTML = `
            <div class="puzzle-container">
                <h3>🎨 Color Sequence</h3>
                <p>Match the color sequence!</p>
                <div class="color-target">
                    ${sequence.map(c => `<div class="color-box" style="background: ${colorMap[c]}"></div>`).join('')}
                </div>
                <div class="color-choices">
                    ${Object.entries(colorMap).map(([name, color]) => `
                        <button class="color-btn" style="background: ${color}" onclick="puzzleEngine.addColor('${name}')"></button>
                    `).join('')}
                </div>
                <div class="color-answer" id="colorAnswer"></div>
                <button class="puzzle-reset" onclick="puzzleEngine.resetColors()">Reset</button>
            </div>
        `;
        
        this.colorAnswer = [];
        this.colorTarget = sequence;
        this.colorMap = colorMap;
    }
    
    addColor(colorName) {
        this.colorAnswer.push(colorName);
        const answerDiv = document.getElementById('colorAnswer');
        answerDiv.innerHTML = this.colorAnswer.map(c => 
            `<div class="color-box small" style="background: ${this.colorMap[c]}"></div>`
        ).join('');
        
        if (this.colorAnswer.length === this.colorTarget.length) {
            this.checkColors();
        }
    }
    
    resetColors() {
        this.colorAnswer = [];
        document.getElementById('colorAnswer').innerHTML = '';
    }
    
    checkColors() {
        const correct = this.colorAnswer.every((c, i) => c === this.colorTarget[i]);
        if (correct) {
            this.puzzleSolved();
        } else {
            this.showHint('Try the sequence again! 🌈');
            setTimeout(() => this.resetColors(), 1000);
        }
    }
    
    // =============================================
    // PUZZLE 7: DATE MEMORY
    // =============================================
    
    setupDateMemory(puzzleArea) {
        const answer = this.currentPuzzle.answer || '2024';
        
        puzzleArea.innerHTML = `
            <div class="puzzle-container">
                <h3>📅 Date Memory</h3>
                <p>${this.currentPuzzle.question || '[Your date question here]'}</p>
                <input type="text" id="dateInput" class="puzzle-input" placeholder="Enter the date...">
                <button class="puzzle-submit" onclick="puzzleEngine.checkDate('${answer}')">Submit</button>
                <div class="puzzle-hint" id="puzzleHint"></div>
            </div>
        `;
        
        document.getElementById('dateInput').focus();
    }
    
    checkDate(correctAnswer) {
        const input = document.getElementById('dateInput').value.trim();
        if (input === correctAnswer) {
            this.puzzleSolved();
        } else {
            this.showHint('Think back... 💭');
        }
    }
    
    // =============================================
    // PUZZLE 8: PICTURE CHOICE
    // =============================================
    
    setupPictureChoice(puzzleArea) {
        const options = this.currentPuzzle.options || ['Option A', 'Option B', 'Option C'];
        const correct = this.currentPuzzle.answer || 0;
        
        puzzleArea.innerHTML = `
            <div class="puzzle-container">
                <h3>🖼️ Picture Memory</h3>
                <p>${this.currentPuzzle.question || '[Your picture question here]'}</p>
                <div class="picture-choices">
                    ${options.map((opt, i) => `
                        <button class="picture-btn" onclick="puzzleEngine.checkPicture(${i}, ${correct})">${opt}</button>
                    `).join('')}
                </div>
                <div class="puzzle-hint" id="puzzleHint"></div>
            </div>
        `;
    }
    
    checkPicture(selected, correct) {
        if (selected === correct) {
            this.puzzleSolved();
        } else {
            this.showHint('Try another one! 📸');
        }
    }
    
    // =============================================
    // PUZZLE 9: QUOTE COMPLETE
    // =============================================
    
    setupQuoteComplete(puzzleArea) {
        const quote = this.currentPuzzle.quote || '[Your quote here with _____ blank]';
        const answer = this.currentPuzzle.answer || 'love';
        
        puzzleArea.innerHTML = `
            <div class="puzzle-container">
                <h3>💬 Complete the Quote</h3>
                <p class="quote-text">"${quote}"</p>
                <input type="text" id="quoteInput" class="puzzle-input" placeholder="Fill in the blank...">
                <button class="puzzle-submit" onclick="puzzleEngine.checkQuote('${answer}')">Submit</button>
                <div class="puzzle-hint" id="puzzleHint"></div>
            </div>
        `;
        
        document.getElementById('quoteInput').focus();
    }
    
    checkQuote(correctAnswer) {
        const input = document.getElementById('quoteInput').value.trim().toLowerCase();
        if (input === correctAnswer.toLowerCase()) {
            this.puzzleSolved();
        } else {
            this.showHint('Think romantically... 💕');
        }
    }
    
    // =============================================
    // PUZZLE 10: SLIDER PUZZLE (5x2 with invitation image)
    // =============================================
    
    setupSliderPuzzle(puzzleArea) {
        const imagePath = GAME_CONFIG.puzzle.imagePath;
        
        puzzleArea.innerHTML = `
            <div class="puzzle-container">
                <h3>🧩 Sliding Puzzle</h3>
                <p>Arrange the image tiles in order!</p>
                <div class="slider-grid-2x5" id="sliderGrid">
                    ${[1, 2, 3, 4, 5, 6, 7, 8, 9, 0].map(n => {
                        if (n === 0) {
                            return `<div class="slider-tile-2x5 empty" data-value="${n}" onclick="puzzleEngine.slideMove(${n})"></div>`;
                        }
                        // Calculate position for 2x5 grid (2 columns, 5 rows)
                        const col = (n - 1) % 2;
                        const row = Math.floor((n - 1) / 2);
                        const bgPosX = (col * 100) / 1; // 1 = 2-1 columns
                        const bgPosY = (row * 100) / 4; // 4 = 5-1 rows
                        
                        return `<div class="slider-tile-2x5" data-value="${n}" onclick="puzzleEngine.slideMove(${n})" 
                            style="background-image: url('${imagePath}'); 
                                   background-size: 200% 500%; 
                                   background-position: ${bgPosX}% ${bgPosY}%;">
                        </div>`;
                    }).join('')}
                </div>
                <button class="puzzle-reset" onclick="puzzleEngine.shuffleSlider()">Shuffle</button>
                <button class="puzzle-solve" id="sliderSolveBtn" style="display: none;" onclick="puzzleEngine.solveSlider()">Show Solution</button>
                <div class="puzzle-hint" id="puzzleHint" style="margin-top: 10px;"></div>
            </div>
        `;
        
        // 2x5 grid = 10 tiles (0 is empty)
        this.sliderState = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0];
        this.sliderRows = 5;
        this.sliderCols = 2;
        this.shuffleSlider();
        
        // Show "Show Solution" button after 30 seconds
        this.sliderTimer = setTimeout(() => {
            const solveBtn = document.getElementById('sliderSolveBtn');
            if (solveBtn) {
                solveBtn.style.display = 'inline-block';
                this.showHint('Having trouble? You can now use "Show Solution" 💡');
            }
        }, 30000); // 30 seconds
    }
    
    shuffleSlider() {
        // Simple shuffle - swap with empty tile 30 times for 5x2 grid
        for (let i = 0; i < 30; i++) {
            const emptyIndex = this.sliderState.indexOf(0);
            const validMoves = this.getValidSliderMoves(emptyIndex);
            const randomMove = validMoves[Math.floor(Math.random() * validMoves.length)];
            this.performSlide(randomMove, emptyIndex);
        }
        this.renderSlider();
    }
    
    getValidSliderMoves(emptyIndex) {
        const moves = [];
        const cols = this.sliderCols || 5;
        const rows = this.sliderRows || 2;
        const row = Math.floor(emptyIndex / cols);
        const col = emptyIndex % cols;
        
        if (col > 0) moves.push(emptyIndex - 1); // Left
        if (col < cols - 1) moves.push(emptyIndex + 1); // Right
        if (row > 0) moves.push(emptyIndex - cols); // Up
        if (row < rows - 1) moves.push(emptyIndex + cols); // Down
        
        return moves;
    }
    
    performSlide(tileIndex, emptyIndex) {
        [this.sliderState[tileIndex], this.sliderState[emptyIndex]] = 
        [this.sliderState[emptyIndex], this.sliderState[tileIndex]];
    }
    
    slideMove(value) {
        const tileIndex = this.sliderState.indexOf(value);
        const emptyIndex = this.sliderState.indexOf(0);
        const validMoves = this.getValidSliderMoves(emptyIndex);
        
        if (validMoves.includes(tileIndex)) {
            this.performSlide(tileIndex, emptyIndex);
            this.renderSlider();
            
            // Check if solved (for 5x2 grid, last tile is 9, empty at index 9)
            const lastIndex = this.sliderState.length - 1;
            if (this.sliderState.every((v, i) => v === i + 1 || (i === lastIndex && v === 0))) {
                setTimeout(() => this.puzzleSolved(), 300);
            }
        }
    }
    
    renderSlider() {
        const grid = document.getElementById('sliderGrid');
        const imagePath = GAME_CONFIG.puzzle.imagePath;
        
        if (grid) {
            grid.innerHTML = this.sliderState.map(n => {
                if (n === 0) {
                    return `<div class="slider-tile-2x5 empty" data-value="${n}" onclick="puzzleEngine.slideMove(${n})"></div>`;
                }
                // Calculate position for 2x5 grid (2 columns, 5 rows)
                const col = (n - 1) % 2;
                const row = Math.floor((n - 1) / 2);
                const bgPosX = (col * 100) / 1;
                const bgPosY = (row * 100) / 4;
                
                return `<div class="slider-tile-2x5" data-value="${n}" onclick="puzzleEngine.slideMove(${n})" 
                    style="background-image: url('${imagePath}'); 
                           background-size: 200% 500%; 
                           background-position: ${bgPosX}% ${bgPosY}%;">
                </div>`;
            }).join('');
        }
    }
    
    solveSlider() {
        // Clear timer if exists
        if (this.sliderTimer) {
            clearTimeout(this.sliderTimer);
        }
        
        // Set to solved state for 5x2 grid
        this.sliderState = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0];
        this.renderSlider();
        
        // Show success message
        setTimeout(() => this.puzzleSolved(), 500);
    }
    
    // =============================================
    // HELPER METHODS
    // =============================================
    
    showSimpleCollect(puzzleArea) {
        puzzleArea.innerHTML = `
            <div class="puzzle-container">
                <h3>✨ Puzzle Piece</h3>
                <p>Collect this piece of the puzzle!</p>
                <button class="puzzle-submit" onclick="puzzleEngine.puzzleSolved()">Collect Piece</button>
            </div>
        `;
    }
    
    showHint(message) {
        const hintDiv = document.getElementById('puzzleHint');
        if (hintDiv) {
            hintDiv.textContent = message;
            hintDiv.style.opacity = '1';
            setTimeout(() => {
                hintDiv.style.opacity = '0';
            }, 2000);
        }
    }
    
    puzzleSolved() {
        // Visual feedback
        const puzzleArea = document.getElementById('puzzleArea');
        puzzleArea.innerHTML = `
            <div class="puzzle-container success">
                <h3>✨ Puzzle Solved! ✨</h3>
                <p>You earned a puzzle piece!</p>
                <div class="success-animation">🎉</div>
            </div>
        `;
        
        // Notify game to collect piece
        setTimeout(() => {
            this.game.collectPuzzlePiece(this.currentPieceId);
        }, 1500);
    }
}

// Global instance
let puzzleEngine = null;
