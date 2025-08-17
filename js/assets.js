// Asset manifest - list all your game assets here
const assetManifest = {
    images: {
        'background': 'assets/images/backgrounds/grid.png',
        'player': 'assets/images/characters/player.png',
        'star': 'assets/images/ui/star.png',
        'badge': 'assets/images/ui/badge.png'
    },
    sounds: {
        'correct': 'assets/sounds/correct.mp3',
        'wrong': 'assets/sounds/wrong.mp3'
    }
};

// Load all assets
function loadAssets() {
    return new Promise((resolve) => {
        const loader = PIXI.Loader.shared;
        
        // Add images to loader
        for (const [key, path] of Object.entries(assetManifest.images)) {
            loader.add(key, path);
        }
        
        // Load everything
        loader.load(() => {
            // Sounds are loaded separately for better mobile performance
            resolve();
        });
    });
}

function playSound(type) {
    // On mobile, we need user interaction first
    if (type === 'correct') {
        const sound = new Audio('assets/sounds/correct.mp3');
        sound.play().catch(e => console.log("Audio play failed:", e));
    } else {
        const sound = new Audio('assets/sounds/wrong.mp3');
        sound.play().catch(e => console.log("Audio play failed:", e));
    }
}