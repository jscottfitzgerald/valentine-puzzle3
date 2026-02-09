// =============================================
// WORLD RENDERING & LEVEL DESIGN
// =============================================

class World {
    constructor() {
        this.platforms = [];
        this.decorations = [];
        this.stations = [];
        this.paths = [];
        this.particles = [];
        this.movingPlatforms = [];
        this.obstacles = [];
        
        this.init();
    }
    
    init() {
        this.generatePlatforms();
        this.generateMovingPlatforms();
        this.generateObstacles();
        this.generateStations();
        this.generatePaths();
        this.generateDecorations();
    }
    
    generatePlatforms() {
        const groundLevel = GAME_CONFIG.settings.world.groundLevel;
        
        // Main ground platform (entire world)
        this.platforms.push({
            x: 0,
            y: groundLevel,
            width: GAME_CONFIG.settings.world.width,
            height: 20,
            type: 'ground'
        });
        
        // Fun climbing platforms throughout the world!
        
        // Section 1: Start area climbing (1000-1800)
        this.platforms.push(
            { x: 1000, y: 450, width: 200, height: 15, type: 'climb' },
            { x: 1300, y: 400, width: 250, height: 15, type: 'climb' },
            { x: 1600, y: 350, width: 200, height: 15, type: 'climb' }
        );
        
        // Section 2: Stepping stones (2200-3200)
        this.platforms.push(
            { x: 2200, y: 430, width: 180, height: 15, type: 'step' },
            { x: 2500, y: 380, width: 200, height: 15, type: 'step' },
            { x: 2850, y: 330, width: 220, height: 15, type: 'step' },
            { x: 3150, y: 380, width: 200, height: 15, type: 'step' },
            { x: 3400, y: 430, width: 180, height: 15, type: 'step' }
        );
        
        // Section 3: Elevated pathway (3800-4500)
        this.platforms.push(
            { x: 3800, y: 400, width: 300, height: 15, type: 'path' },
            { x: 4200, y: 380, width: 350, height: 15, type: 'path' }
        );
        
        // Section 4: Climbing staircase (4800-5600)
        this.platforms.push(
            { x: 4800, y: 450, width: 200, height: 15, type: 'stair' },
            { x: 5050, y: 410, width: 200, height: 15, type: 'stair' },
            { x: 5300, y: 370, width: 200, height: 15, type: 'stair' },
            { x: 5550, y: 330, width: 250, height: 15, type: 'stair' }
        );
        
        // Section 5: Branching paths - UPPER
        this.platforms.push(
            { x: 5900, y: 280, width: 300, height: 15, type: 'upper' },
            { x: 6300, y: 250, width: 350, height: 15, type: 'upper' },
            { x: 6750, y: 230, width: 300, height: 15, type: 'upper' },
            { x: 7100, y: 210, width: 350, height: 15, type: 'upper' }
        );
        
        // Section 5: Branching paths - MIDDLE
        this.platforms.push(
            { x: 5950, y: 380, width: 280, height: 15, type: 'middle' },
            { x: 6350, y: 360, width: 300, height: 15, type: 'middle' },
            { x: 6750, y: 340, width: 300, height: 15, type: 'middle' },
            { x: 7100, y: 320, width: 350, height: 15, type: 'middle' }
        );
        
        // Section 5: Branching paths - LOWER (close to ground)
        this.platforms.push(
            { x: 6000, y: 470, width: 300, height: 15, type: 'lower' },
            { x: 6400, y: 470, width: 350, height: 15, type: 'lower' },
            { x: 6850, y: 470, width: 300, height: 15, type: 'lower' }
        );
        
        // Section 6: Convergence area (7500-8800)
        this.platforms.push(
            { x: 7500, y: 400, width: 300, height: 15, type: 'converge' },
            { x: 7900, y: 380, width: 300, height: 15, type: 'converge' },
            { x: 8300, y: 360, width: 350, height: 15, type: 'converge' },
            { x: 8700, y: 380, width: 300, height: 15, type: 'converge' }
        );
        
        // Section 7: Fun jumps (9200-10200)
        this.platforms.push(
            { x: 9200, y: 420, width: 200, height: 15, type: 'jump' },
            { x: 9500, y: 370, width: 180, height: 15, type: 'jump' },
            { x: 9750, y: 320, width: 200, height: 15, type: 'jump' },
            { x: 10050, y: 370, width: 200, height: 15, type: 'jump' }
        );
        
        // Section 8: Final approach (10500-11800)
        this.platforms.push(
            { x: 10500, y: 450, width: 250, height: 15, type: 'final' },
            { x: 10850, y: 420, width: 250, height: 15, type: 'final' },
            { x: 11200, y: 450, width: 300, height: 15, type: 'final' }
        );
        
        // Section 9: Victory platforms (12000-13200)
        this.platforms.push(
            { x: 12000, y: 430, width: 250, height: 15, type: 'victory' },
            { x: 12350, y: 390, width: 280, height: 15, type: 'victory' },
            { x: 12700, y: 360, width: 300, height: 15, type: 'victory' },
            { x: 13100, y: 380, width: 350, height: 15, type: 'victory' }
        );
    }
    
    generateMovingPlatforms() {
        const groundLevel = GAME_CONFIG.settings.world.groundLevel;
        
        // Moving platforms add extra challenge and fun!
        this.movingPlatforms = [
            { x: 3600, y: 350, width: 150, height: 15, startX: 3600, endX: 3900, speed: 1, direction: 1 },
            { x: 6200, y: 400, width: 180, height: 15, startX: 6200, endX: 6550, speed: 1.2, direction: 1 },
            { x: 9000, y: 380, width: 160, height: 15, startX: 9000, endX: 9350, speed: 0.8, direction: 1 },
            { x: 11500, y: 420, width: 170, height: 15, startX: 11500, endX: 11850, speed: 1, direction: 1 }
        ];
        
        // Add moving platforms to main platforms array
        this.movingPlatforms.forEach(mp => {
            this.platforms.push(mp);
        });
    }
    
    generateObstacles() {
        const groundLevel = GAME_CONFIG.settings.world.groundLevel;
        
        // Heart arches to navigate through/under
        this.obstacles.push(
            { type: 'arch', x: 800, y: groundLevel, width: 100, height: 120 },
            { type: 'arch', x: 2000, y: groundLevel, width: 120, height: 100 },
            { type: 'arch', x: 3500, y: groundLevel, width: 110, height: 110 },
            { type: 'arch', x: 5800, y: groundLevel, width: 130, height: 100 },
            { type: 'arch', x: 8000, y: groundLevel, width: 115, height: 105 },
            { type: 'arch', x: 10300, y: groundLevel, width: 125, height: 115 },
            { type: 'arch', x: 12500, y: groundLevel, width: 120, height: 110 }
        );
        
        // Rose bushes to jump over
        this.obstacles.push(
            { type: 'rose_obstacle', x: 1200, y: groundLevel - 40, width: 60, height: 40 },
            { type: 'rose_obstacle', x: 2600, y: groundLevel - 40, width: 70, height: 40 },
            { type: 'rose_obstacle', x: 4100, y: groundLevel - 40, width: 65, height: 40 },
            { type: 'rose_obstacle', x: 6500, y: groundLevel - 40, width: 60, height: 40 },
            { type: 'rose_obstacle', x: 9400, y: groundLevel - 40, width: 70, height: 40 },
            { type: 'rose_obstacle', x: 11800, y: groundLevel - 40, width: 65, height: 40 }
        );
        
        // Giant heart sculptures to climb
        this.obstacles.push(
            { type: 'heart_sculpture', x: 4600, y: groundLevel - 150, width: 120, height: 150 },
            { type: 'heart_sculpture', x: 7700, y: groundLevel - 180, width: 150, height: 180 },
            { type: 'heart_sculpture', x: 10800, y: groundLevel - 160, width: 130, height: 160 }
        );
    }
    
    generateStations() {
        // Create station markers based on config
        GAME_CONFIG.stations.forEach(stationConfig => {
            this.stations.push({
                id: stationConfig.id,
                x: stationConfig.x,
                y: stationConfig.y,
                width: 80,
                height: 80,
                pieceNumber: stationConfig.pieceNumber,
                active: false,
                visited: false,
                glowPhase: 0
            });
        });
    }
    
    generatePaths() {
        // Visual path connections between stations
        for (let i = 0; i < this.stations.length - 1; i++) {
            const from = this.stations[i];
            const to = this.stations[i + 1];
            
            this.paths.push({
                x1: from.x + 40,
                y1: from.y + 40,
                x2: to.x + 40,
                y2: to.y + 40,
                drawn: false,
                progress: 0
            });
        }
    }
    
    generateDecorations() {
        const worldWidth = GAME_CONFIG.settings.world.width;
        const groundLevel = GAME_CONFIG.settings.world.groundLevel;
        
        // Valentine's themed decorations throughout the world
        for (let x = 200; x < worldWidth; x += 300 + Math.random() * 200) {
            // Rose bushes (more frequent than trees)
            if (Math.random() > 0.2) {
                this.decorations.push({
                    type: 'rosebush',
                    x: x,
                    y: groundLevel - 40,
                    height: 30 + Math.random() * 20,
                    roses: Math.floor(Math.random() * 3) + 2,
                    layer: 0.8
                });
            }
            
            // Hearts on ground
            if (Math.random() > 0.5) {
                this.decorations.push({
                    type: 'groundheart',
                    x: x + 80,
                    y: groundLevel - 20,
                    size: 12 + Math.random() * 8,
                    layer: 0.95
                });
            }
            
            // Gift boxes
            if (Math.random() > 0.7) {
                this.decorations.push({
                    type: 'giftbox',
                    x: x - 50,
                    y: groundLevel - 25,
                    size: 20 + Math.random() * 10,
                    layer: 0.9
                });
            }
        }
        
        // Heart-shaped clouds in sky
        for (let i = 0; i < 25; i++) {
            this.decorations.push({
                type: 'heartcloud',
                x: Math.random() * worldWidth,
                y: 40 + Math.random() * 120,
                size: 40 + Math.random() * 30,
                layer: 0.3,
                speed: 0.03 + Math.random() * 0.04
            });
        }
        
        // Floating heart balloons
        for (let i = 0; i < 30; i++) {
            this.decorations.push({
                type: 'balloon',
                x: Math.random() * worldWidth,
                y: 150 + Math.random() * 200,
                size: 15 + Math.random() * 10,
                phase: Math.random() * Math.PI * 2,
                floatSpeed: 0.01 + Math.random() * 0.02,
                layer: 0.85
            });
        }
        
        // Cupid decorations (scattered)
        for (let i = 0; i < 8; i++) {
            this.decorations.push({
                type: 'cupid',
                x: (i + 1) * (worldWidth / 9),
                y: 100 + Math.random() * 80,
                size: 25,
                phase: Math.random() * Math.PI * 2,
                layer: 0.5
            });
        }
        
        // Hearts floating around stations (increased)
        this.stations.forEach(station => {
            for (let i = 0; i < 5; i++) {
                this.decorations.push({
                    type: 'heart',
                    x: station.x + Math.random() * 80 - 40,
                    y: station.y - 60 - Math.random() * 60,
                    size: 10 + Math.random() * 8,
                    phase: Math.random() * Math.PI * 2,
                    layer: 1
                });
            }
        });
        
        // Sparkles everywhere!
        for (let i = 0; i < 50; i++) {
            this.decorations.push({
                type: 'sparkle',
                x: Math.random() * worldWidth,
                y: Math.random() * 400,
                size: 3 + Math.random() * 4,
                phase: Math.random() * Math.PI * 2,
                layer: 0.95
            });
        }
    }
    
    update() {
        // Update moving platforms
        this.movingPlatforms.forEach(platform => {
            platform.x += platform.speed * platform.direction;
            
            // Reverse direction at boundaries
            if (platform.x >= platform.endX || platform.x <= platform.startX) {
                platform.direction *= -1;
            }
        });
        
        // Update animated decorations
        this.decorations.forEach(deco => {
            if (deco.type === 'heartcloud' || deco.type === 'cloud') {
                deco.x += deco.speed;
                if (deco.x > GAME_CONFIG.settings.world.width + 100) {
                    deco.x = -100;
                }
            }
            
            // Update phase for floating/animated decorations
            if (deco.phase !== undefined) {
                deco.phase += 0.02;
            }
        });
        
        // Update station glow
        this.stations.forEach(station => {
            station.glowPhase += 0.05;
        });
        
        // Update particles
        this.particles = this.particles.filter(p => {
            p.life--;
            p.y += p.vy;
            p.x += p.vx;
            p.vy += 0.1;
            return p.life > 0;
        });
    }
    
    draw(ctx, camera) {
        const canvasWidth = ctx.canvas.width;
        const canvasHeight = ctx.canvas.height;
        
        // Draw sky gradient
        this.drawSky(ctx);
        
        // Draw decorations (with parallax)
        this.drawDecorations(ctx, camera);
        
        // Draw obstacles (arches, sculptures, etc.)
        this.drawObstacles(ctx, camera);
        
        // Draw paths
        this.drawPaths(ctx, camera);
        
        // Draw platforms
        this.drawPlatforms(ctx, camera);
        
        // Draw stations
        this.drawStations(ctx, camera);
        
        // Draw particles
        this.drawParticles(ctx, camera);
    }
    
    drawSky(ctx) {
        const gradient = ctx.createLinearGradient(0, 0, 0, ctx.canvas.height);
        gradient.addColorStop(0, GAME_CONFIG.settings.colors.skyStart);
        gradient.addColorStop(1, GAME_CONFIG.settings.colors.skyEnd);
        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    }
    
    drawDecorations(ctx, camera) {
        this.decorations.forEach(deco => {
            // Apply parallax
            const parallaxX = deco.x - (camera.x * deco.layer);
            const screenX = parallaxX;
            const screenY = deco.y - camera.y;
            
            // Only draw if on screen
            if (screenX < -200 || screenX > ctx.canvas.width + 200) return;
            
            ctx.save();
            
            switch (deco.type) {
                case 'rosebush':
                    this.drawRoseBush(ctx, screenX, screenY, deco.height, deco.roses);
                    break;
                case 'groundheart':
                    this.drawGroundHeart(ctx, screenX, screenY, deco.size);
                    break;
                case 'giftbox':
                    this.drawGiftBox(ctx, screenX, screenY, deco.size);
                    break;
                case 'heartcloud':
                    this.drawHeartCloud(ctx, screenX, screenY, deco.size);
                    break;
                case 'balloon':
                    this.drawBalloon(ctx, screenX, screenY, deco.size, deco.phase);
                    break;
                case 'cupid':
                    this.drawCupid(ctx, screenX, screenY, deco.size, deco.phase);
                    break;
                case 'heart':
                    this.drawFloatingHeart(ctx, screenX, screenY, deco.size, deco.phase);
                    break;
                case 'sparkle':
                    this.drawSparkle(ctx, screenX, screenY, deco.size, deco.phase);
                    break;
            }
            
            ctx.restore();
        });
    }
    
    drawObstacles(ctx, camera) {
        this.obstacles.forEach(obs => {
            const screenX = obs.x - camera.x;
            const screenY = obs.y - camera.y;
            
            // Only draw if on screen
            if (screenX + obs.width < -100 || screenX > ctx.canvas.width + 100) return;
            
            ctx.save();
            
            switch (obs.type) {
                case 'arch':
                    this.drawHeartArch(ctx, screenX, screenY, obs.width, obs.height);
                    break;
                case 'rose_obstacle':
                    this.drawRoseObstacle(ctx, screenX, screenY, obs.width, obs.height);
                    break;
                case 'heart_sculpture':
                    this.drawHeartSculpture(ctx, screenX, screenY, obs.width, obs.height);
                    break;
            }
            
            ctx.restore();
        });
    }
    
    drawTree(ctx, x, y, height) {
        // Trunk
        ctx.beginPath();
        ctx.moveTo(x, y);
        ctx.lineTo(x, y - height);
        ctx.stroke();
        
        // Crown (simple triangle)
        ctx.beginPath();
        ctx.moveTo(x - 20, y - height * 0.6);
        ctx.lineTo(x, y - height);
        ctx.lineTo(x + 20, y - height * 0.6);
        ctx.closePath();
        ctx.stroke();
    }
    
    drawFlower(ctx, x, y, size) {
        // Stem
        ctx.beginPath();
        ctx.moveTo(x, y);
        ctx.lineTo(x, y - size);
        ctx.stroke();
        
        // Flower head
        ctx.beginPath();
        ctx.arc(x, y - size, size * 0.4, 0, Math.PI * 2);
        ctx.stroke();
    }
    
    drawCloud(ctx, x, y, width, height) {
        // Simple cloud shape
        ctx.globalAlpha = 0.4;
        ctx.beginPath();
        ctx.ellipse(x, y, width / 3, height / 2, 0, 0, Math.PI * 2);
        ctx.ellipse(x + width / 3, y, width / 3, height / 2, 0, 0, Math.PI * 2);
        ctx.ellipse(x + width / 2, y - height / 4, width / 4, height / 3, 0, 0, Math.PI * 2);
        ctx.stroke();
        ctx.globalAlpha = 1;
    }
    
    drawRoseBush(ctx, x, y, height, roseCount) {
        ctx.strokeStyle = GAME_CONFIG.settings.colors.rose;
        ctx.fillStyle = GAME_CONFIG.settings.colors.rose;
        ctx.lineWidth = 2;
        
        // Stems
        for (let i = 0; i < roseCount; i++) {
            const offsetX = (i - roseCount / 2) * 8;
            ctx.beginPath();
            ctx.moveTo(x + offsetX, y);
            ctx.lineTo(x + offsetX, y - height);
            ctx.stroke();
            
            // Rose bloom (simplified)
            ctx.fillStyle = GAME_CONFIG.settings.colors.heart;
            ctx.font = '14px Arial';
            ctx.fillText('🌹', x + offsetX - 7, y - height);
        }
    }
    
    drawGroundHeart(ctx, x, y, size) {
        ctx.fillStyle = GAME_CONFIG.settings.colors.heart;
        ctx.globalAlpha = 0.7;
        ctx.font = `${size}px Arial`;
        ctx.fillText('♥', x, y);
        ctx.globalAlpha = 1;
    }
    
    drawGiftBox(ctx, x, y, size) {
        // Box
        ctx.fillStyle = GAME_CONFIG.settings.colors.secondary;
        ctx.fillRect(x, y, size, size);
        ctx.strokeStyle = GAME_CONFIG.settings.colors.primary;
        ctx.lineWidth = 2;
        ctx.strokeRect(x, y, size, size);
        
        // Ribbon
        ctx.strokeStyle = GAME_CONFIG.settings.colors.heart;
        ctx.lineWidth = 3;
        ctx.beginPath();
        ctx.moveTo(x + size / 2, y);
        ctx.lineTo(x + size / 2, y + size);
        ctx.moveTo(x, y + size / 2);
        ctx.lineTo(x + size, y + size / 2);
        ctx.stroke();
        
        // Bow
        ctx.fillStyle = GAME_CONFIG.settings.colors.heart;
        ctx.beginPath();
        ctx.arc(x + size / 2, y + size / 2, 4, 0, Math.PI * 2);
        ctx.fill();
    }
    
    drawHeartCloud(ctx, x, y, size) {
        ctx.fillStyle = GAME_CONFIG.settings.colors.tertiary;
        ctx.globalAlpha = 0.4;
        ctx.font = `${size}px Arial`;
        ctx.fillText('♥', x, y);
        ctx.globalAlpha = 1;
    }
    
    drawBalloon(ctx, x, y, size, phase) {
        const floatY = y + Math.sin(phase) * 10;
        
        // Balloon
        ctx.fillStyle = GAME_CONFIG.settings.colors.accent;
        ctx.beginPath();
        ctx.ellipse(x, floatY, size * 0.6, size * 0.8, 0, 0, Math.PI * 2);
        ctx.fill();
        
        // String
        ctx.strokeStyle = GAME_CONFIG.settings.colors.lineColor;
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(x, floatY + size * 0.8);
        ctx.lineTo(x, floatY + size * 1.5);
        ctx.stroke();
    }
    
    drawCupid(ctx, x, y, size, phase) {
        const floatY = y + Math.sin(phase) * 8;
        
        ctx.fillStyle = GAME_CONFIG.settings.colors.heart;
        ctx.globalAlpha = 0.5;
        ctx.font = `${size}px Arial`;
        ctx.fillText('👼', x, floatY);
        ctx.globalAlpha = 1;
    }
    
    drawFloatingHeart(ctx, x, y, size, phase) {
        // Animate floating
        const floatY = y + Math.sin(phase) * 5;
        
        ctx.fillStyle = GAME_CONFIG.settings.colors.accent;
        ctx.globalAlpha = 0.6;
        ctx.font = `${size}px Arial`;
        ctx.fillText('♥', x, floatY);
        ctx.globalAlpha = 1;
    }
    
    drawSparkle(ctx, x, y, size, phase) {
        const twinkle = Math.abs(Math.sin(phase));
        ctx.fillStyle = GAME_CONFIG.settings.colors.heart;
        ctx.globalAlpha = twinkle * 0.8;
        ctx.font = `${size}px Arial`;
        ctx.fillText('✨', x, y);
        ctx.globalAlpha = 1;
    }
    
    drawHeartArch(ctx, x, y, width, height) {
        ctx.strokeStyle = GAME_CONFIG.settings.colors.primary;
        ctx.lineWidth = 3;
        
        // Left pillar
        ctx.beginPath();
        ctx.moveTo(x, y);
        ctx.lineTo(x, y - height);
        ctx.stroke();
        
        // Right pillar
        ctx.beginPath();
        ctx.moveTo(x + width, y);
        ctx.lineTo(x + width, y - height);
        ctx.stroke();
        
        // Heart arch top
        ctx.fillStyle = GAME_CONFIG.settings.colors.heart;
        ctx.font = `${width * 0.8}px Arial`;
        ctx.textAlign = 'center';
        ctx.fillText('♥', x + width / 2, y - height + 20);
        ctx.textAlign = 'left';
    }
    
    drawRoseObstacle(ctx, x, y, width, height) {
        // Dense rose bush - player must jump over
        ctx.fillStyle = GAME_CONFIG.settings.colors.tertiary;
        ctx.fillRect(x, y, width, height);
        
        ctx.strokeStyle = GAME_CONFIG.settings.colors.rose;
        ctx.lineWidth = 2;
        ctx.strokeRect(x, y, width, height);
        
        // Multiple roses
        const roses = 3;
        for (let i = 0; i < roses; i++) {
            ctx.fillStyle = GAME_CONFIG.settings.colors.heart;
            ctx.font = '18px Arial';
            ctx.fillText('🌹', x + (i * width / roses) + 5, y + height / 2);
        }
    }
    
    drawHeartSculpture(ctx, x, y, width, height) {
        // Large decorative heart sculpture that can be climbed
        ctx.fillStyle = GAME_CONFIG.settings.colors.secondary;
        ctx.globalAlpha = 0.9;
        
        // Draw big heart shape
        const centerX = x + width / 2;
        const centerY = y + height / 3;
        
        ctx.beginPath();
        ctx.moveTo(centerX, centerY + height / 3);
        ctx.bezierCurveTo(centerX, centerY, centerX - width / 2, centerY - height / 4, centerX - width / 4, centerY - height / 3);
        ctx.bezierCurveTo(centerX - width / 8, centerY - height / 2.5, centerX, centerY - height / 2.5, centerX, centerY - height / 4);
        ctx.bezierCurveTo(centerX, centerY - height / 2.5, centerX + width / 8, centerY - height / 2.5, centerX + width / 4, centerY - height / 3);
        ctx.bezierCurveTo(centerX + width / 2, centerY - height / 4, centerX, centerY, centerX, centerY + height / 3);
        ctx.closePath();
        ctx.fill();
        
        ctx.strokeStyle = GAME_CONFIG.settings.colors.primary;
        ctx.lineWidth = 3;
        ctx.stroke();
        ctx.globalAlpha = 1;
    }
    
    drawPaths(ctx, camera) {
        ctx.strokeStyle = GAME_CONFIG.settings.colors.lineColor;
        ctx.lineWidth = 2;
        ctx.setLineDash([10, 5]);
        ctx.globalAlpha = 0.4;
        
        this.paths.forEach(path => {
            const x1 = path.x1 - camera.x;
            const y1 = path.y1 - camera.y;
            const x2 = path.x2 - camera.x;
            const y2 = path.y2 - camera.y;
            
            ctx.beginPath();
            ctx.moveTo(x1, y1);
            ctx.lineTo(x2, y2);
            ctx.stroke();
        });
        
        ctx.setLineDash([]);
        ctx.globalAlpha = 1;
    }
    
    drawPlatforms(ctx, camera) {
        ctx.strokeStyle = GAME_CONFIG.settings.colors.lineColor;
        ctx.fillStyle = GAME_CONFIG.settings.colors.lineColor;
        ctx.lineWidth = 2;
        
        this.platforms.forEach(platform => {
            const screenX = platform.x - camera.x;
            const screenY = platform.y - camera.y;
            
            // Only draw if on screen
            if (screenX + platform.width < 0 || screenX > ctx.canvas.width) return;
            
            if (platform.type === 'ground') {
                // Ground with grass effect
                ctx.beginPath();
                ctx.moveTo(screenX, screenY);
                
                // Add some variation to the ground line
                for (let x = 0; x < platform.width; x += 20) {
                    const variation = Math.sin(x * 0.02) * 2;
                    ctx.lineTo(screenX + x, screenY + variation);
                }
                ctx.stroke();
                
                // Grass blades
                for (let x = screenX; x < screenX + platform.width; x += 40) {
                    if (x > 0 && x < ctx.canvas.width) {
                        ctx.beginPath();
                        ctx.moveTo(x, screenY);
                        ctx.lineTo(x - 3, screenY - 8);
                        ctx.moveTo(x, screenY);
                        ctx.lineTo(x + 3, screenY - 6);
                        ctx.stroke();
                    }
                }
            } else {
                // Floating platforms
                ctx.globalAlpha = 0.8;
                ctx.fillStyle = GAME_CONFIG.settings.colors.secondary;
                ctx.fillRect(screenX, screenY, platform.width, platform.height);
                ctx.strokeRect(screenX, screenY, platform.width, platform.height);
                ctx.globalAlpha = 1;
            }
        });
    }
    
    drawStations(ctx, camera) {
        this.stations.forEach(station => {
            const screenX = station.x - camera.x;
            const screenY = station.y - camera.y;
            
            // Only draw if on screen
            if (screenX < -100 || screenX > ctx.canvas.width + 100) return;
            
            // Glow effect
            const glow = Math.sin(station.glowPhase) * 0.3 + 0.7;
            
            // Station marker (heart shape or door)
            ctx.save();
            ctx.globalAlpha = glow;
            
            if (station.visited) {
                ctx.fillStyle = GAME_CONFIG.settings.colors.primary;
            } else if (station.active) {
                ctx.fillStyle = GAME_CONFIG.settings.colors.accent;
            } else {
                ctx.fillStyle = GAME_CONFIG.settings.colors.secondary;
            }
            
            // Draw station as a glowing portal/door
            ctx.beginPath();
            ctx.arc(screenX + 40, screenY + 40, 30, 0, Math.PI * 2);
            ctx.fill();
            ctx.strokeStyle = GAME_CONFIG.settings.colors.primary;
            ctx.lineWidth = 3;
            ctx.stroke();
            
            // Inner design - show puzzle piece icon
            ctx.fillStyle = '#ffffff';
            ctx.font = '20px Arial';
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';
            ctx.fillText('🧩', screenX + 40, screenY + 40);
            
            // Piece number
            if (station.pieceNumber) {
                ctx.font = 'bold 14px Montserrat';
                ctx.fillStyle = station.visited ? '#ffffff' : GAME_CONFIG.settings.colors.primary;
                ctx.fillText(station.pieceNumber, screenX + 40, screenY + 55);
            }
            
            // "Press E" hint if active
            if (station.active) {
                ctx.font = '12px Montserrat';
                ctx.fillStyle = GAME_CONFIG.settings.colors.primary;
                ctx.fillText('Press E to solve', screenX + 40, screenY - 15);
            }
            
            ctx.restore();
        });
    }
    
    drawParticles(ctx, camera) {
        this.particles.forEach(p => {
            const screenX = p.x - camera.x;
            const screenY = p.y - camera.y;
            
            ctx.fillStyle = p.color;
            ctx.globalAlpha = p.life / p.maxLife;
            ctx.fillRect(screenX, screenY, p.size, p.size);
        });
        ctx.globalAlpha = 1;
    }
    
    createParticles(x, y, count, color) {
        for (let i = 0; i < count; i++) {
            this.particles.push({
                x: x,
                y: y,
                vx: (Math.random() - 0.5) * 4,
                vy: -Math.random() * 4 - 2,
                size: 2 + Math.random() * 3,
                life: 30 + Math.random() * 30,
                maxLife: 60,
                color: color || GAME_CONFIG.settings.colors.accent
            });
        }
    }
    
    activateStation(stationId) {
        const station = this.stations.find(s => s.id === stationId);
        if (station) {
            station.active = true;
        }
    }
    
    markStationVisited(stationId) {
        const station = this.stations.find(s => s.id === stationId);
        if (station) {
            station.visited = true;
            station.active = false;
            this.createParticles(station.x + 40, station.y + 40, 20);
        }
    }
    
    getStationAt(x, y) {
        return this.stations.find(s => {
            return Math.abs(x - s.x) < 60 && Math.abs(y - s.y) < 60;
        });
    }
}
