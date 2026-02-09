                                                                                                // =============================================
// CHARACTER ANIMATION SYSTEM
// =============================================

class Character {
    constructor(config) {
        this.x = config.startX || 100;
        this.y = config.startY || 400;
        this.width = (typeof GAME_CONFIG !== 'undefined') ? GAME_CONFIG.settings.character.width : 32;
        this.height = (typeof GAME_CONFIG !== 'undefined') ? GAME_CONFIG.settings.character.height : 48;
        
        // Physics
        this.velocityX = 0;
        this.velocityY = 0;
        this.speed = GAME_CONFIG.settings.character.speed;
        this.jumpPower = GAME_CONFIG.settings.character.jumpPower;
        this.gravity = GAME_CONFIG.settings.character.gravity;
        this.onGround = false;
        
        // Animation
        this.facingRight = true;
        this.currentAnimation = 'idle';
        this.animationFrame = 0;
        this.animationTimer = 0;
        
        // Sprite
        this.spriteImage = null;
        this.spriteLoaded = false;
        this.useProceduralSprite = true;
        
        // Animation frames (generated or from sprite sheet)
        this.frames = {
            idle: [],
            walk: [],
            jump: []
        };
        
        this.init();
    }
    
    init() {
        // Try to load user sprite if configured
        if (GAME_CONFIG.characterSprite.imagePath) {
            this.loadSprite(GAME_CONFIG.characterSprite.imagePath);
        } else {
            // Use procedurally generated character
            this.generateProceduralSprite();
        }
    }
    
    loadSprite(path) {
        const img = new Image();
        img.onload = () => {
            this.spriteImage = img;
            this.spriteLoaded = true;
            this.useProceduralSprite = false;
            this.generateAnimationFrames();
        };
        img.onerror = () => {
            console.warn('Could not load character sprite, using procedural character');
            this.generateProceduralSprite();
        };
        img.src = path;
    }
    
    generateProceduralSprite() {
        // Create a simple line-art character procedurally
        this.useProceduralSprite = true;
        this.spriteLoaded = true;
    }
    
    generateAnimationFrames() {
        // Generate walking animation frames from single sprite
        // by programmatically modifying the image
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        canvas.width = this.width;
        canvas.height = this.height;
        
        // For now, we'll use the single image for all frames
        // Advanced: implement limb rotation/movement
        this.frames.idle = [this.spriteImage];
        this.frames.walk = [this.spriteImage, this.spriteImage, this.spriteImage, this.spriteImage];
        this.frames.jump = [this.spriteImage];
    }
    
    update(keys, platforms) {
        // Horizontal movement
        this.velocityX = 0;
        
        if (keys['ArrowLeft'] || keys['a'] || keys['A']) {
            this.velocityX = -this.speed;
            this.facingRight = false;
            this.currentAnimation = 'walk';
        } else if (keys['ArrowRight'] || keys['d'] || keys['D']) {
            this.velocityX = this.speed;
            this.facingRight = true;
            this.currentAnimation = 'walk';
        } else {
            this.currentAnimation = 'idle';
        }
        
        // Jumping
        if ((keys[' '] || keys['ArrowUp'] || keys['w'] || keys['W']) && this.onGround) {
            this.velocityY = -this.jumpPower;
            this.onGround = false;
            this.currentAnimation = 'jump';
        }
        
        // Apply gravity
        this.velocityY += this.gravity;
        
        // Update position
        this.x += this.velocityX;
        this.y += this.velocityY;
        
        // Reset ground flag before checking collisions
        this.onGround = false;
        
        // Check ground collision FIRST (most important)
        const groundLevel = GAME_CONFIG.settings.world.groundLevel;
        if (this.y + this.height >= groundLevel) {
            this.y = groundLevel - this.height;
            this.velocityY = 0;
            this.onGround = true;
        }
        
        // Check platform collisions (only if not already on ground)
        if (platforms && this.velocityY >= 0) {
            platforms.forEach(platform => {
                // Skip ground platform
                if (platform.type === 'ground') return;
                
                if (this.checkPlatformCollision(platform)) {
                    this.y = platform.y - this.height;
                    this.velocityY = 0;
                    this.onGround = true;
                }
            });
        }
        
        // Safety check - never let character fall below ground
        if (this.y + this.height > groundLevel + 10) {
            this.y = groundLevel - this.height;
            this.velocityY = 0;
            this.onGround = true;
        }
        
        // Update animation based on state
        if (!this.onGround) {
            this.currentAnimation = 'jump';
        }
        
        // World boundaries
        if (this.x < 0) this.x = 0;
        if (this.x > GAME_CONFIG.settings.world.width - this.width) {
            this.x = GAME_CONFIG.settings.world.width - this.width;
        }
        
        // Update animation
        this.updateAnimation();
    }
    
    checkPlatformCollision(platform) {
        // Simple AABB collision
        return this.x < platform.x + platform.width &&
               this.x + this.width > platform.x &&
               this.y + this.height > platform.y &&
               this.y + this.height < platform.y + 20 && // Landing from above
               this.velocityY >= 0;
    }
    
    updateAnimation() {
        this.animationTimer++;
        const animSpeed = GAME_CONFIG.characterSprite.animations[this.currentAnimation]?.speed || 8;
        
        if (this.animationTimer >= animSpeed) {
            this.animationTimer = 0;
            const frames = GAME_CONFIG.characterSprite.animations[this.currentAnimation]?.frames || [0];
            this.animationFrame = (this.animationFrame + 1) % frames.length;
        }
    }
    
    draw(ctx, camera) {
        const screenX = this.x - camera.x;
        const screenY = this.y - camera.y;
        
        // Emergency safety: if character would be drawn off-screen, reset position
        if (screenY > ctx.canvas.height + 50 || screenY < -100) {
            this.y = GAME_CONFIG.settings.world.groundLevel - this.height;
            this.velocityY = 0;
            this.onGround = true;
            console.warn('Character reset - was off screen at Y:', screenY);
        }
        
        ctx.save();
        
        // Simpler flip method - translate to character center, flip, translate back
        if (!this.facingRight) {
            ctx.translate(screenX + this.width / 2, screenY + this.height / 2);
            ctx.scale(-1, 1);
            ctx.translate(-(screenX + this.width / 2), -(screenY + this.height / 2));
        }
        
        if (this.useProceduralSprite) {
            this.drawProceduralCharacter(ctx, screenX, screenY);
        } else if (this.spriteLoaded && this.spriteImage) {
            // Draw sprite image
            ctx.drawImage(this.spriteImage, screenX, screenY, this.width, this.height);
        } else {
            // Fallback: draw placeholder
            this.drawProceduralCharacter(ctx, screenX, screenY);
        }
        
        ctx.restore();
    }
    
    drawProceduralCharacter(ctx, x, y) {
        // Draw a simple line-art character
        const centerX = x + this.width / 2;
        const headY = y + 10;
        const bodyY = y + 20;
        const legY = y + this.height - 10;
        
        ctx.strokeStyle = GAME_CONFIG.settings.colors.primary;
        ctx.lineWidth = 2;
        ctx.lineCap = 'round';
        ctx.lineJoin = 'round';
        
        // Head (circle)
        ctx.beginPath();
        ctx.arc(centerX, headY, 6, 0, Math.PI * 2);
        ctx.stroke();
        
        // Body (line)
        ctx.beginPath();
        ctx.moveTo(centerX, headY + 6);
        ctx.lineTo(centerX, bodyY + 15);
        ctx.stroke();
        
        // Arms - animate during walk
        const armSwing = this.currentAnimation === 'walk' ? Math.sin(this.animationFrame * 2) * 5 : 0;
        ctx.beginPath();
        ctx.moveTo(centerX, bodyY);
        ctx.lineTo(centerX - 8, bodyY + 8 + armSwing);
        ctx.moveTo(centerX, bodyY);
        ctx.lineTo(centerX + 8, bodyY + 8 - armSwing);
        ctx.stroke();
        
        // Legs - animate during walk
        const legSwing = this.currentAnimation === 'walk' ? Math.sin(this.animationFrame * 2) * 6 : 0;
        ctx.beginPath();
        ctx.moveTo(centerX, bodyY + 15);
        ctx.lineTo(centerX - 5, legY + legSwing);
        ctx.moveTo(centerX, bodyY + 15);
        ctx.lineTo(centerX + 5, legY - legSwing);
        ctx.stroke();
        
        // Draw a little heart above head if on final station
        if (this.currentAnimation === 'idle') {
            ctx.fillStyle = GAME_CONFIG.settings.colors.accent;
            ctx.font = '12px Arial';
            ctx.fillText('♥', centerX - 4, headY - 8);
        }
    }
    
    canInteract(station) {
        // Check if character is near a station
        const distance = Math.abs(this.x - station.x);
        return distance < 100 && Math.abs(this.y - station.y) < 50;
    }
}
