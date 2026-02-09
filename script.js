// =============================================
// INTERACTIVE INVITATION - DECISION TREE GAME
// =============================================

// ========================================
// CUSTOMIZATION SECTION - EDIT THIS AREA
// ========================================

const CONFIG = {
    // Story scenes - customize text, choices, and images here
    scenes: {
        start: {
            id: 'start',
            title: 'An Invitation Awaits...',
            text: 'My darling, a special moment is waiting for you. But first, let me take you on a journey through our story...',
            image: 'images/scene1.jpg', // Replace with your image path
            choices: [
                { text: 'I\'m ready for this journey ✨', next: 'memory1' },
                { text: 'Tell me more about this adventure 💫', next: 'memory1' }
            ]
        },
        
        memory1: {
            id: 'memory1',
            title: 'Our Beginning',
            text: 'Do you remember when we first met? That moment when everything changed...',
            image: 'images/scene2.jpg',
            choices: [
                { text: 'How could I forget? 💕', next: 'question1' },
                { text: 'That beautiful day... 🌸', next: 'question1' }
            ]
        },
        
        question1: {
            id: 'question1',
            title: 'A Little Quiz',
            text: 'If you could describe our journey in one word, what would it be?',
            image: 'images/scene3.jpg',
            prize: 'A special surprise awaits you! You\'ve earned your first prize - a sweet treat of your choice! 🍰',
            choices: [
                { text: 'Magical ✨', next: 'memory2' },
                { text: 'Beautiful 🌹', next: 'memory2' },
                { text: 'Unforgettable 💫', next: 'memory2' }
            ]
        },
        
        memory2: {
            id: 'memory2',
            title: 'Moments We Cherish',
            text: 'Through every laugh, every adventure, every quiet moment... we\'ve built something extraordinary.',
            image: 'images/scene4.jpg',
            choices: [
                { text: 'And there\'s so much more ahead 🌟', next: 'choice1' },
                { text: 'These memories are treasures 💎', next: 'choice1' }
            ]
        },
        
        choice1: {
            id: 'choice1',
            title: 'A Path Forward',
            text: 'Now, imagine our future together. What excites you most?',
            image: 'images/scene5.jpg',
            choices: [
                { text: 'All the adventures we\'ll have 🗺️', next: 'dream1' },
                { text: 'Growing together every day 🌱', next: 'dream2' },
                { text: 'Building our dreams into reality 🏡', next: 'dream3' }
            ]
        },
        
        dream1: {
            id: 'dream1',
            title: 'Adventures Await',
            text: 'Yes! From quiet weekends to grand adventures, every moment with you is an exploration of happiness.',
            image: 'images/scene6.jpg',
            prize: 'Congratulations! You\'ve unlocked prize #2 - I\'ll plan a surprise date for us! 🎭',
            choices: [
                { text: 'I can\'t wait! 🎉', next: 'revelation' },
                { text: 'This sounds wonderful 💖', next: 'revelation' }
            ]
        },
        
        dream2: {
            id: 'dream2',
            title: 'Growing Together',
            text: 'Exactly! Every day with you is a chance to learn, to love more deeply, and to become better versions of ourselves.',
            image: 'images/scene6.jpg',
            prize: 'Amazing! Prize #2 unlocked - I\'ll cook your favorite meal! 🍝',
            choices: [
                { text: 'Together, we\'re unstoppable 💪', next: 'revelation' },
                { text: 'I love growing with you 🌺', next: 'revelation' }
            ]
        },
        
        dream3: {
            id: 'dream3',
            title: 'Building Dreams',
            text: 'Absolutely! Together, we can turn every dream into reality, one step at a time.',
            image: 'images/scene6.jpg',
            prize: 'Well done! You\'ve earned prize #2 - A surprise gift is coming your way! 🎁',
            choices: [
                { text: 'Our future is bright! ☀️', next: 'revelation' },
                { text: 'Let\'s make it happen! 🚀', next: 'revelation' }
            ]
        },
        
        revelation: {
            id: 'revelation',
            title: 'The Moment of Truth',
            text: 'Now, my love, I have something very special to share with you. A presentation about us, our journey, and our future...',
            image: 'images/scene7.jpg',
            choices: [
                { text: 'Tell me more! 💝', next: 'invitation' },
                { text: 'I\'m intrigued... 🌟', next: 'invitation' }
            ]
        },
        
        invitation: {
            id: 'invitation',
            title: 'The Invitation',
            text: 'I\'ve prepared a special presentation just for you. It\'s about our life, our memories, and the beautiful future ahead of us.',
            image: 'images/scene8.jpg',
            choices: [
                { text: 'When is this happening? 📅', next: 'details' },
                { text: 'This sounds amazing! ❤️', next: 'details' }
            ]
        },
        
        details: {
            id: 'details',
            title: 'Here Are the Details',
            text: 'Date: [Your Date Here]\nTime: [Your Time Here]\nPlace: [Your Location Here]\n\nDress code: Come as you are - beautiful as always! ✨',
            image: 'images/scene9.jpg',
            choices: [
                { text: 'Yes! I\'ll be there! 💕', next: 'final' },
                { text: 'Of course! I wouldn\'t miss it! 🎉', next: 'final' },
                { text: 'Absolutely! Count me in! 💖', next: 'final' }
            ]
        },
        
        final: {
            id: 'final',
            title: '✨ Thank You, My Love ✨',
            text: 'I knew you\'d say yes! ❤️\n\nYou\'ve completed this journey, and I can\'t wait to share the real presentation with you. Everything we\'ve been through has led us to this moment, and everything ahead is ours to create together.\n\nSee you soon, my darling! 💕',
            image: 'images/scene10.jpg',
            prize: 'Final Prize Unlocked! 🎊 All your prizes will be revealed at the presentation. Plus one more surprise... ✨',
            isFinal: true,
            choices: [] // No choices - this is the end
        }
    },
    
    // Progress milestones for the progress bar
    totalScenes: 10,
    
    // Optional: Add background music (set to null if not using)
    backgroundMusic: null // e.g., 'audio/background.mp3'
};

// ========================================
// END OF CUSTOMIZATION SECTION
// ========================================


// ========================================
// GAME ENGINE - Do not modify unless you
// know what you're doing!
// ========================================

let currentScene = 'start';
let visitedScenes = new Set();
let prizesCollected = [];

// Initialize the game
function initGame() {
    visitedScenes.add('start');
    renderScene(CONFIG.scenes.start);
    updateProgress();
}

// Render a scene
function renderScene(scene) {
    const contentArea = document.getElementById('contentArea');
    
    // Fade out current content
    contentArea.style.opacity = '0';
    
    setTimeout(() => {
        // Build scene HTML
        let sceneHTML = `
            <div class="scene ${scene.isFinal ? 'final-scene' : ''}">
                <h1 class="scene-title">${scene.title}</h1>
        `;
        
        // Add image (placeholder or actual)
        if (scene.image) {
            sceneHTML += `
                <div class="scene-image">
                    ${renderImage(scene.image)}
                </div>
            `;
        }
        
        // Add text (preserve line breaks)
        sceneHTML += `<p class="scene-text">${scene.text.replace(/\n/g, '<br>')}</p>`;
        
        // Add choices if not final scene
        if (!scene.isFinal && scene.choices && scene.choices.length > 0) {
            sceneHTML += '<div class="choices">';
            scene.choices.forEach((choice, index) => {
                sceneHTML += `
                    <button class="choice-button" onclick="makeChoice('${choice.next}', '${scene.id}', ${index})">
                        <span>${choice.text}</span>
                    </button>
                `;
            });
            sceneHTML += '</div>';
        } else if (scene.isFinal) {
            sceneHTML += `
                <div class="choices">
                    <button class="choice-button" onclick="restartGame()" style="margin-top: 20px;">
                        <span>Experience This Again 🔄</span>
                    </button>
                </div>
            `;
        }
        
        sceneHTML += '</div>';
        
        // Insert into DOM
        contentArea.innerHTML = sceneHTML;
        
        // Fade in new content
        setTimeout(() => {
            contentArea.style.opacity = '1';
        }, 50);
        
        // Show prize if this scene has one
        if (scene.prize && !prizesCollected.includes(scene.id)) {
            setTimeout(() => {
                showPrize(scene.prize);
                prizesCollected.push(scene.id);
            }, 1000);
        }
        
    }, 300);
}

// Render image or placeholder
function renderImage(imagePath) {
    // Check if image exists (in production, you'd actually check the file)
    // For now, we'll show a placeholder
    return `
        <div class="image-placeholder">
            <div>
                📷<br>
                Replace with your image:<br>
                <strong>${imagePath}</strong>
            </div>
        </div>
    `;
    
    // When you have real images, use this instead:
    // return `<img src="${imagePath}" alt="Scene image" onerror="this.parentElement.innerHTML='<div class=\\'image-placeholder\\'>Image not found: ${imagePath}</div>'">`;
}

// Handle choice selection
function makeChoice(nextSceneId, currentSceneId, choiceIndex) {
    // Add to visited scenes
    visitedScenes.add(nextSceneId);
    
    // Update current scene
    currentScene = nextSceneId;
    
    // Update progress
    updateProgress();
    
    // Render next scene
    const nextScene = CONFIG.scenes[nextSceneId];
    if (nextScene) {
        renderScene(nextScene);
    } else {
        console.error(`Scene "${nextSceneId}" not found!`);
    }
}

// Update progress bar
function updateProgress() {
    const progress = (visitedScenes.size / CONFIG.totalScenes) * 100;
    const progressBar = document.getElementById('progressBar');
    const progressText = document.getElementById('progressText');
    
    progressBar.style.width = progress + '%';
    
    // Update progress text
    if (progress === 100) {
        progressText.textContent = 'Journey Complete! 💖';
    } else if (progress > 75) {
        progressText.textContent = 'Almost there...';
    } else if (progress > 50) {
        progressText.textContent = 'Halfway through...';
    } else if (progress > 25) {
        progressText.textContent = 'The story unfolds...';
    } else {
        progressText.textContent = 'Beginning our journey...';
    }
}

// Show prize notification
function showPrize(message) {
    const notification = document.getElementById('prizeNotification');
    const prizeMessage = document.getElementById('prizeMessage');
    
    prizeMessage.textContent = message;
    notification.classList.add('show');
}

// Close prize notification
function closePrize() {
    const notification = document.getElementById('prizeNotification');
    notification.classList.remove('show');
}

// Restart game
function restartGame() {
    visitedScenes.clear();
    prizesCollected = [];
    currentScene = 'start';
    visitedScenes.add('start');
    renderScene(CONFIG.scenes.start);
    updateProgress();
}

// Background music controls (optional)
let musicPlaying = false;
let audioElement = null;

function toggleMusic() {
    if (!CONFIG.backgroundMusic) return;
    
    if (!audioElement) {
        audioElement = new Audio(CONFIG.backgroundMusic);
        audioElement.loop = true;
        audioElement.volume = 0.3;
    }
    
    if (musicPlaying) {
        audioElement.pause();
        musicPlaying = false;
    } else {
        audioElement.play();
        musicPlaying = true;
    }
}

// Initialize on page load
window.addEventListener('DOMContentLoaded', () => {
    initGame();
    
    // Show audio toggle if music is configured
    if (CONFIG.backgroundMusic) {
        document.getElementById('audioToggle').style.display = 'block';
    }
});

// Handle page visibility changes (pause music when tab is not visible)
document.addEventListener('visibilitychange', () => {
    if (document.hidden && audioElement && musicPlaying) {
        audioElement.pause();
    } else if (!document.hidden && audioElement && musicPlaying) {
        audioElement.play();
    }
});
