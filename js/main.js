// Wait for the DOM to load
document.addEventListener('DOMContentLoaded', () => {
    // Create the PixiJS application
    const app = new PIXI.Application({
        width: window.innerWidth,
        height: window.innerHeight,
        backgroundColor: 0x1099bb,
        resolution: window.devicePixelRatio || 1,
        autoDensity: true
    });

    // Add the canvas to the HTML document
    document.getElementById('game-container').appendChild(app.view);

    // Handle window resizing
    window.addEventListener('resize', () => {
        app.renderer.resize(window.innerWidth, window.innerHeight);
    });

    // Load assets and start the game
    loadAssets(app);
});

function loadAssets(app) {
    // We'll add asset loading here
    // For now, we'll just start the main menu
    showMainMenu(app);
}

function showMainMenu(app) {
    // Clear the stage
    app.stage.removeChildren();

    // Create title text
    const title = new PIXI.Text('Learn & Play Quest', {
        fontSize: 48,
        fill: 0xffffff,
        fontWeight: 'bold',
        dropShadow: true,
        dropShadowDistance: 4
    });
    title.anchor.set(0.5);
    title.position.set(app.screen.width / 2, app.screen.height / 4);
    app.stage.addChild(title);

    // Create class selection buttons
    const pp1Button = createButton('PP1', app.screen.width / 2, app.screen.height / 2);
    const pp2Button = createButton('PP2', app.screen.width / 2, app.screen.height / 2 + 100);

    pp1Button.on('pointerdown', () => showSubjectSelection(app, 'PP1'));
    pp2Button.on('pointerdown', () => showSubjectSelection(app, 'PP2'));

    app.stage.addChild(pp1Button, pp2Button);
}

function showSubjectSelection(app, selectedClass) {
    app.stage.removeChildren();

    const title = new PIXI.Text(`Select Subject for ${selectedClass}`, {
        fontSize: 36,
        fill: 0xffffff
    });
    title.anchor.set(0.5);
    title.position.set(app.screen.width / 2, app.screen.height / 4);
    app.stage.addChild(title);

    const mathButton = createButton('Math', app.screen.width / 2, app.screen.height / 2);
    const languageButton = createButton('Language', app.screen.width / 2, app.screen.height / 2 + 100);

    mathButton.on('pointerdown', () => startGame(app, selectedClass, 'Math'));
    languageButton.on('pointerdown', () => startGame(app, selectedClass, 'Language'));

    app.stage.addChild(mathButton, languageButton);
}

function createButton(text, x, y) {
    const button = new PIXI.Graphics()
        .beginFill(0x4CAF50)
        .drawRoundedRect(-100, -25, 200, 50, 15)
        .endFill();

    const buttonText = new PIXI.Text(text, {
        fontSize: 24,
        fill: 0xffffff
    });
    buttonText.anchor.set(0.5);
    button.addChild(buttonText);

    button.position.set(x, y);
    button.interactive = true;
    button.buttonMode = true;

    // Add hover effect
    button.on('pointerover', () => {
        button.tint = 0xAAAAAA;
    });
    button.on('pointerout', () => {
        button.tint = 0xFFFFFF;
    });

    return button;
}

function startGame(app, selectedClass, selectedSubject) {
    app.stage.removeChildren();
    
    // Here we'll initialize the game based on class and subject
    if (selectedSubject === 'Math') {
        initMathGame(app, selectedClass);
    } else {
        initLanguageGame(app, selectedClass);
    }
}

function initMathGame(app, selectedClass) {
    // We'll implement this next
    const mathGame = new MathGame(app, selectedClass);
    mathGame.start();
}