function initMainMenu() {
    // Clear the stage
    app.stage.removeChildren();
    
    // Add background
    const bg = new PIXI.Sprite(PIXI.Texture.WHITE);
    bg.tint = 0x4472C4;
    bg.width = app.screen.width;
    bg.height = app.screen.height;
    app.stage.addChild(bg);
    
    // Game title
    const title = new PIXI.Text('Learn & Play Quest', {
        fontFamily: 'Arial',
        fontSize: 48 * scaleFactor,
        fill: 0xFFFFFF,
        align: 'center',
        fontWeight: 'bold'
    });
    title.anchor.set(0.5);
    title.x = app.screen.width / 2;
    title.y = 150 * scaleFactor;
    app.stage.addChild(title);
    
    // Class selection buttons
    const pp1Button = createButton('PP1 (Ages 4-5)', 0x70AD47);
    const pp2Button = createButton('PP2 (Ages 6-7)', 0xED7D31);
    
    pp1Button.y = app.screen.height / 2 - 100 * scaleFactor;
    pp2Button.y = app.screen.height / 2;
    
    pp1Button.on('pointertap', () => selectClass('pp1'));
    pp2Button.on('pointertap', () => selectClass('pp2'));
    
    app.stage.addChild(pp1Button, pp2Button);
}

function createButton(text, color) {
    const button = new PIXI.Container();
    const buttonWidth = 300 * scaleFactor;
    const buttonHeight = 80 * scaleFactor;
    
    // Button background
    const bg = new PIXI.Graphics()
        .beginFill(color)
        .drawRoundedRect(0, 0, buttonWidth, buttonHeight, 15)
        .endFill();
    
    // Button text
    const buttonText = new PIXI.Text(text, {
        fontFamily: 'Arial',
        fontSize: 24 * scaleFactor,
        fill: 0xFFFFFF,
        align: 'center'
    });
    buttonText.anchor.set(0.5);
    buttonText.x = buttonWidth / 2;
    buttonText.y = buttonHeight / 2;
    
    button.addChild(bg, buttonText);
    button.interactive = true;
    button.buttonMode = true;
    button.anchor.set(0.5);
    button.x = app.screen.width / 2;
    
    // Add hover effect
    button.on('pointerover', () => bg.tint = 0xCCCCCC);
    button.on('pointerout', () => bg.tint = 0xFFFFFF);
    
    return button;
}

function selectClass(selectedClass) {
    // Store selected class globally
    app.currentClass = selectedClass;
    
    // Show subject selection
    initSubjectMenu();
}

function initSubjectMenu() {
    // Similar to class selection but for Math/Language
    // We'll implement this next
}