# 🎮 Interactive Side-Scrolling Invitation Game

A beautiful, romantic 2D side-scrolling adventure where your partner explores a line-art world, discovers your story, and receives a special invitation through interactive gameplay!

## 🎨 Features

- **Side-Scrolling Platformer**: Walk, jump, and explore a beautiful line-art world
- **Interactive Stations**: Encounter story moments as you travel through the world
- **Branching Paths**: Visual paths split based on choices (all lead to "Yes"!)
- **Modular Puzzle System**: Ready for custom puzzles at each decision point
- **Line-Art Aesthetic**: Continuous line-drawing animations and romantic visuals
- **Parallax Scrolling**: Multi-layer backgrounds with depth
- **Animated Character**: Procedural stick-figure with animated limbs (ready for your 8-bit sprite!)
- **Prize Unlocks**: Surprise rewards at strategic milestones
- **Progress Tracking**: Visual progress bar showing journey completion
- **Particle Effects**: Hearts and sparkles when interacting with stations
- **Smooth Physics**: Gravity, jumping, platform collision
- **Camera System**: Smooth follow camera with boundaries
- **Mobile Responsive**: Adapts to any screen size

## 🚀 Quick Start

### To Play:
1. Open `index.html` in any modern browser
2. Click "Begin the Journey 💕"
3. Use **Arrow Keys or A/D** to move left/right
4. Press **SPACE** to jump
5. Press **E** when near a glowing heart station to interact
6. Make choices and continue the journey!

### To Share:
- **Option 1**: Zip the entire folder and send it
- **Option 2**: Host on GitHub Pages/Netlify for a web link

## ✏️ Customization Guide

### 1. Adding Your 8-Bit Character Sprite

Currently using a procedural stick-figure. To use your own character:

1. **Prepare your sprite**: Single 8-bit image (recommended 32x48 pixels)
2. **Add to images folder**: `images/character.png`
3. **Update config.js**:
   ```javascript
   characterSprite: {
       imagePath: 'images/character.png',
       frameWidth: 32,
       frameHeight: 48,
       // ... rest stays the same
   }
   ```

The system will automatically:
- Load your sprite
- Create walking animations by slightly modifying the image
- Flip the sprite when moving left/right
- Handle all animation timing

### 2. Customizing Story Content

Edit `config.js` - all story content is in the `scenes` object:

```javascript
scenes: {
    start: {
        id: 'start',
        title: 'Your Title',              // Modal header
        text: 'Your story text...',        // Story content
        image: 'images/scene1.jpg',        // Photo to display
        puzzleType: 'choice',              // 'choice', 'riddle', 'match', etc.
        prize: 'Prize message!',           // Optional prize unlock
        choices: [
            { text: 'Choice 1 ✨', next: 'memory1', path: 'upper' },
            { text: 'Choice 2 💫', next: 'memory1', path: 'middle' }
        ]
    },
    // ... more scenes
}
```

**Key Fields:**
- `id`: Unique identifier (matches station positions)
- `title`: Modal heading when player reaches this station
- `text`: Story text (use `\n` for line breaks)
- `image`: Path to image file (shows as placeholder until you add images)
- `puzzleType`: Type of puzzle/interaction (currently 'choice', ready for expansion)
- `prize`: Optional prize message (triggers celebration)
- `choices`: Array of choice buttons with:
  - `text`: Button label
  - `next`: ID of next scene to go to
  - `path`: Visual hint ('upper', 'middle', 'lower' for branching)

### 3. Updating Event Details

**IMPORTANT**: Update the `details` scene with your real event info:

```javascript
details: {
    id: 'details',
    title: 'Here Are the Details',
    text: 'Date: Saturday, March 15th, 2026\nTime: 7:00 PM\nPlace: Our favorite restaurant\n\nDress code: Casual romantic ✨',
    // ...
}
```

### 4. Adjusting World Layout

Station positions are defined in `config.js` under `stations`:

```javascript
stations: [
    { id: 'start', x: 500, y: 350 },      // x = horizontal, y = vertical
    { id: 'memory1', x: 1500, y: 300 },
    // ... adjust positions as needed
]
```

- **x coordinate**: Horizontal position (0 to 14000)
- **y coordinate**: Vertical position (lower = higher on screen)
- Stations automatically create glowing heart markers
- Character walks between stations

### 5. Adding Custom Puzzles

The puzzle system is ready for your custom puzzles! Edit `game.js`, find the `setupPuzzle` function:

```javascript
setupPuzzle(scene, puzzleArea) {
    if (scene.puzzleType === 'riddle') {
        // Your riddle puzzle code
        puzzleArea.innerHTML = `
            <div class="puzzle-container">
                <p>Riddle: ${scene.puzzle.question}</p>
                <input type="text" id="riddleAnswer" />
                <button onclick="checkRiddleAnswer()">Submit</button>
            </div>
        `;
    } else if (scene.puzzleType === 'match') {
        // Your matching puzzle code
    }
    // ... add more puzzle types
}
```

Then update scene configurations in `config.js`:

```javascript
question1: {
    puzzleType: 'riddle',
    puzzle: {
        question: "What is always with you but never speaks?",
        answer: "shadow"
    },
    // ... rest of scene config
}
```

### 6. Customizing Colors & Visuals

Edit `config.js` settings:

```javascript
colors: {
    primary: '#8b6f6f',        // Main color
    secondary: '#d4a5a5',      // Accent color
    accent: '#c49a9a',         // Highlights
    lineColor: 'rgba(180, 150, 150, 0.6)',
    skyStart: '#faf8f6',       // Sky gradient top
    skyEnd: '#e8dfd5'          // Sky gradient bottom
}
```

### 7. Adding Your Photos

1. Place images in the `images/` folder
2. Name them: `scene1.jpg`, `scene2.jpg`, etc. (or use custom names)
3. Update paths in `config.js` scenes
4. Images appear in modals when player reaches stations

## 🎯 Game Controls

| Control | Action |
|---------|--------|
| **Arrow Keys / A & D** | Move left/right |
| **Space / W / Up Arrow** | Jump |
| **E** | Interact with station (when near heart marker) |
| **Mouse** | Click modal buttons to make choices |

## 📁 File Structure

```
invitation/
├── index.html          # Main HTML with canvas
├── styles.css          # All game and UI styling
├── config.js           # ⭐ CUSTOMIZE THIS - Story & settings
├── game.js             # Main game engine
├── character.js        # Character animation system
├── world.js            # World rendering & level design
├── images/             # Your photos & character sprite
│   ├── character.png   (your 8-bit sprite)
│   ├── scene1.jpg
│   ├── scene2.jpg
│   └── ... (through scene10.jpg)
└── README.md           # This file
```

## 🎮 How the Game Works

### Game Flow:
1. **Start Screen** → Player clicks "Begin the Journey"
2. **Exploration** → Character walks through line-art world
3. **Stations** → Glowing hearts mark story points
4. **Interaction** → Press E near station to trigger story modal
5. **Choices** → Make a decision (affects visual path)
6. **Continue** → Keep walking to next station
7. **Prizes** → Unlock rewards at special stations
8. **Finale** → All paths lead to final invitation reveal

### Technical Features:
- **60 FPS Game Loop**: Smooth animations
- **Physics Engine**: Gravity, jumping, collision detection
- **Camera System**: Follows player with smooth interpolation
- **Parallax Layers**: Clouds, trees, decorations at different depths
- **Particle System**: Hearts and sparkles on interactions
- **State Management**: Tracks visited stations, collected prizes
- **Modular Architecture**: Easy to extend and customize

## 🔧 Advanced Customization

### Changing Character Physics:

Edit `config.js`:

```javascript
character: {
    width: 32,
    height: 48,
    speed: 4,           // Walking speed
    jumpPower: 12,      // Jump strength
    gravity: 0.6        // Gravity strength
}
```

### Extending the World:

Edit `config.js`:

```javascript
world: {
    width: 14000,       // Total world width (extend for longer game)
    height: 600,
    groundLevel: 500
}
```

### Adding More Stations:

1. Add new scene to `config.js` scenes
2. Add position to `config.js` stations
3. Update `totalScenes` count
4. Link from existing scene choices

### Creating Custom Decorations:

Edit `world.js`, modify `generateDecorations()`:

```javascript
// Add custom decoration
this.decorations.push({
    type: 'custom',
    x: 1000,
    y: 400,
    // ... custom properties
});

// Then add rendering in drawDecorations() switch statement
```

## 🎨 Puzzle Ideas

Ready-to-implement puzzle types:

1. **Riddles**: Text input with answer checking
2. **Memory Match**: Flip cards to find pairs (memories together)
3. **Sequence**: Repeat a pattern of hearts/colors
4. **Trivia**: Multiple choice questions about your relationship
5. **Word Unscramble**: Rearrange letters to form meaningful words
6. **Slider Puzzle**: Arrange pieces of a photo
7. **Mini Quiz**: Series of quick questions

Framework is in place - just implement in `setupPuzzle()` function!

## 🌐 Browser Compatibility

Tested and working on:
- ✅ Chrome/Edge
- ✅ Firefox
- ✅ Safari
- ✅ Opera
- ✅ Mobile browsers (touch controls can be added)

## 💡 Tips for Best Experience

1. **Test Early**: Play through the game after each major customization
2. **Balance Difficulty**: Make platforming easy - focus is on story, not challenge
3. **Timing**: ~10 minutes is perfect - keeps engagement high
4. **Photos**: Use high-quality images that tell your story chronologically
5. **Prizes**: Make them real, tangible rewards your partner can look forward to
6. **Surprises**: Hide Easter eggs in the world (secret hearts, special decorations)
7. **Music**: Consider adding background music (set in config.js)

## 🐛 Troubleshooting

**Character not animating?**
- Check that `config.js` is loaded before `character.js`
- Verify sprite path if using custom character

**Can't interact with stations?**
- Make sure you're close enough (within ~80 pixels)
- Press 'E' key when "Press E" text appears
- Check browser console for errors

**World looks empty?**
- Decorations generate randomly - refresh to see different arrangements
- Adjust decoration density in `world.js` generateDecorations()

**Stuck on platform?**
- Adjust platform heights in `config.js` stations array
- Check y-coordinates match platform positions

## 🎓 For Developers

### Architecture:
- **game.js**: Main game loop, state management, UI integration
- **character.js**: Player entity with physics and sprite rendering
- **world.js**: Level design, decorations, parallax, particles
- **config.js**: All data-driven content (easily customizable)

### Extension Points:
- Add new puzzle types in `game.js` setupPuzzle()
- Create new decoration types in `world.js`
- Implement achievements system
- Add sound effects
- Create save/load functionality
- Add mobile touch controls
- Implement auto-walk between stations
- Add mini-games as puzzles

## ❤️ Final Notes

This game is a labor of love - a unique way to invite your partner to something special. The interactive journey makes the invitation memorable and engaging.

**Remember:**
- The journey is the message
- Make it personal
- Test everything
- Have fun with it!

Your partner will love the creativity and effort you put into making this special moment interactive and beautiful.

---

**Need help customizing?** Check inline comments in the code files for detailed guidance!

Made with 💕 for a special journey together
