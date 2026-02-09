// =============================================
// GAME CONFIGURATION - CUSTOMIZE THIS FILE
// =============================================

const GAME_CONFIG = {
    // ========================================
    // PUZZLE PIECES & CHALLENGES
    // ========================================
    scenes: {
        piece1: {
            id: 'piece1',
            pieceNumber: 1,
            title: '🧩 Puzzle Piece #1',
            text: 'Solve this puzzle to collect your first piece!',
            puzzle: {
                type: 'pattern',
                instruction: 'Watch the pattern carefully, then repeat it!',
                pattern: [1, 3, 2]
            }
        },
        
        piece2: {
            id: 'piece2',
            pieceNumber: 2,
            title: '🧩 Puzzle Piece #2',
            text: 'A little trivia about us!',
            puzzle: {
                type: 'trivia',
                question: 'What meal did we eat on the night of our first kiss?',
                choices: ['Tacos', 'Fajitas', 'Tomato Curry'],
                answer: 0
            }
        },
        
        piece3: {
            id: 'piece3',
            pieceNumber: 3,
            title: '🧩 Puzzle Piece #3',
            text: 'Unscramble this word!',
            puzzle: {
                type: 'unscramble',
                hint: 'It\'s what we share...',
                scrambled: 'EVOL',
                word: 'LOVE'
            }
        },
        
        piece4: {
            id: 'piece4',
            pieceNumber: 4,
            title: '🧩 Puzzle Piece #4',
            text: 'Quick math challenge!',
            puzzle: {
                type: 'math',
                question: 'Month + Day of our first date = ?',
                answer: 5
            }
        },
        
        piece5: {
            id: 'piece5',
            pieceNumber: 5,
            title: '🧩 Puzzle Piece #5',
            text: 'Solve this riddle!',
            puzzle: {
                type: 'riddle',
                riddle: 'I’m often red, sometimes pink, and I smell divine, I bloom for the one who makes your heart shine?',
                answer: 'Rose'
            }
        },
        
        piece6: {
            id: 'piece6',
            pieceNumber: 6,
            title: '🧩 Puzzle Piece #6',
            text: 'Match the color sequence!',
            puzzle: {
                type: 'colors',
                sequence: ['pink', 'rose', 'mauve']
            }
        },
        
        piece7: {
            id: 'piece7',
            pieceNumber: 7,
            title: '🧩 Puzzle Piece #7',
            text: 'Remember this date?',
            puzzle: {
                type: 'date',
                question: 'What year did we move out of Brighton?',
                answer: '2023'
            }
        },
        
        piece8: {
            id: 'piece8',
            pieceNumber: 8,
            title: '🧩 Puzzle Piece #8',
            text: 'Complete the romantic quote!',
            puzzle: {
                type: 'quote',
                quote: 'What\'s the Elvish word for friend?',
                answer: 'Melon'
            }
        },
        
        piece9: {
            id: 'piece9',
            pieceNumber: 9,
            title: '🧩 Puzzle Piece #9',
            text: 'Final challenge - sliding puzzle!',
            puzzle: {
                type: 'slider'
            }
        }
    },

    // ========================================
    // WORLD LAYOUT - Puzzle Piece Stations
    // ========================================
    stations: [
        { id: 'piece1', x: 500, y: 420, pieceNumber: 1 },
        { id: 'piece2', x: 1500, y: 370, pieceNumber: 2 },
        { id: 'piece3', x: 2800, y: 320, pieceNumber: 3 },
        { id: 'piece4', x: 4200, y: 420, pieceNumber: 4 },
        { id: 'piece5', x: 5500, y: 370, pieceNumber: 5 },
        { id: 'piece6', x: 7000, y: 280, pieceNumber: 6 },
        { id: 'piece7', x: 8500, y: 370, pieceNumber: 7 },
        { id: 'piece8', x: 10000, y: 320, pieceNumber: 8 },
        { id: 'piece9', x: 12000, y: 420, pieceNumber: 9 }
    ],

    // ========================================
    // PUZZLE SETTINGS
    // ========================================
    puzzle: {
        totalPieces: 9,
        rows: 3,
        cols: 3,
        imagePath: 'invitation-image.jpg',
        invitationDetails: {
            date: '13/02/2026',
            time: '17:00',
            location: 'St. Martins Lodge',
            message: 'A special presentation awaits you, followed by a loving Valentine\'s treat for my melon! 💕',
            dressCode: 'Dress to relax in your favourite comfies and pjs ❤️‍🔥',
            rsvp: 'Do you accept? Please confirm your attendance by text at 07933903888 📲'
        }
    },
    
    // ========================================
    // GAME SETTINGS
    // ========================================
    settings: {
        totalScenes: 9,
        targetPlaytime: 600, // 10 minutes in seconds
        
        // Character settings
        character: {
            width: 32,
            height: 48,
            speed: 4,
            jumpPower: 12,
            gravity: 0.6
        },
        
        // Visual settings - Valentine's Theme
        colors: {
            primary: '#e63946',      // Romantic red
            secondary: '#ffccd5',    // Soft pink
            accent: '#ff006e',       // Hot pink
            tertiary: '#ff85a1',     // Rose pink
            lineColor: 'rgba(230, 57, 70, 0.5)',
            skyStart: '#ffe5ec',     // Light pink sky
            skyEnd: '#ffc2d1',       // Deeper pink horizon
            heart: '#ff1744',        // Bright red for hearts
            rose: '#ff6b9d'          // Rose color
        },
        
        // Camera settings
        camera: {
            followSpeed: 0.1,
            offsetX: 300 // Character offset from left edge
        },
        
        // World bounds
        world: {
            width: 14000,
            height: 600,
            groundLevel: 500
        }
    },

    // ========================================
    // CHARACTER SPRITE
    // ========================================
    characterSprite: {
        // Character sprite path - save your 8-bit character as character.png in images folder
        imagePath: 'images/character.png',
        frameWidth: 32,  // Must match character.width
        frameHeight: 48, // Must match character.height
        animations: {
            idle: { frames: [0], speed: 10 },
            walk: { frames: [0, 1, 2, 1], speed: 8 },
            jump: { frames: [3], speed: 1 }
        }
    },

    // ========================================
    // PUZZLE CONFIGURATIONS (for future expansion)
    // ========================================
    puzzles: {
        // Add custom puzzle configurations here
        // Example:
        // riddle1: {
        //     question: "What is...?",
        //     answer: "love",
        //     hints: ["...", "..."]
        // }
    }
};

// Export for use in other files
if (typeof module !== 'undefined' && module.exports) {
    module.exports = GAME_CONFIG;
}

