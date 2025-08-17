class MathGame {
    constructor(app, classLevel) {
        this.app = app;
        this.classLevel = classLevel;
        this.gridSize = 5;
        this.cellSize = 100;
        this.gridPadding = 20;
        this.playerPosition = { x: 0, y: 0 };
        this.stars = 0;
        this.currentQuestion = null;
        this.questionBank = this.createQuestionBank();
    }

    start() {
        this.createGrid();
        this.createPlayer();
        this.createUI();
        this.showQuestion();
    }

    createGrid() {
        this.gridContainer = new PIXI.Container();
        this.gridContainer.position.set(
            (this.app.screen.width - (this.gridSize * this.cellSize + (this.gridSize - 1) * this.gridPadding)) / 2,
            (this.app.screen.height - (this.gridSize * this.cellSize + (this.gridSize - 1) * this.gridPadding)) / 2 - 50
        );
        this.app.stage.addChild(this.gridContainer);

        // Draw grid cells
        for (let y = 0; y < this.gridSize; y++) {
            for (let x = 0; x < this.gridSize; x++) {
                const cell = new PIXI.Graphics()
                    .beginFill(0xFFFFFF, 0.2)
                    .drawRect(0, 0, this.cellSize, this.cellSize)
                    .endFill()
                    .lineStyle(2, 0xFFFFFF)
                    .drawRect(0, 0, this.cellSize, this.cellSize);

                cell.position.set(
                    x * (this.cellSize + this.gridPadding),
                    y * (this.cellSize + this.gridPadding)
                );

                this.gridContainer.addChild(cell);
            }
        }

        // Draw start and end markers
        const startCell = new PIXI.Graphics()
            .beginFill(0x4CAF50)
            .drawCircle(this.cellSize / 2, this.cellSize / 2, 20)
            .endFill();
        startCell.position.set(0, 0);
        this.gridContainer.addChild(startCell);

        const endCell = new PIXI.Graphics()
            .beginFill(0xFF5722)
            .drawCircle(this.cellSize / 2, this.cellSize / 2, 20)
            .endFill();
        endCell.position.set(
            (this.gridSize - 1) * (this.cellSize + this.gridPadding),
            (this.gridSize - 1) * (this.cellSize + this.gridPadding)
        );
        this.gridContainer.addChild(endCell);
    }

    createPlayer() {
        this.player = new PIXI.Graphics()
            .beginFill(0x3498db)
            .drawCircle(0, 0, 15)
            .endFill();
        
        this.updatePlayerPosition();
        this.gridContainer.addChild(this.player);
    }

    updatePlayerPosition() {
        this.player.position.set(
            this.playerPosition.x * (this.cellSize + this.gridPadding) + this.cellSize / 2,
            this.playerPosition.y * (this.cellSize + this.gridPadding) + this.cellSize / 2
        );
    }

    createUI() {
        // Stars display
        this.starsText = new PIXI.Text(`Stars: ${this.stars}`, {
            fontSize: 24,
            fill: 0xFFFFFF
        });
        this.starsText.position.set(20, 20);
        this.app.stage.addChild(this.starsText);

        // Back button
        const backButton = createButton('Back', 100, this.app.screen.height - 50);
        backButton.on('pointerdown', () => showMainMenu(this.app));
        this.app.stage.addChild(backButton);
    }

    createQuestionBank() {
        if (this.classLevel === 'PP1') {
            return [
                { question: "Count 5 apples", answer: "5", options: ["3", "5", "7"] },
                { question: "2 + 3 = ?", answer: "5", options: ["4", "5", "6"] },
                { question: "How many fingers on one hand?", answer: "5", options: ["4", "5", "6"] },
                // Add more PP1 questions
            ];
        } else { // PP2
            return [
                { question: "20 + 30 = ?", answer: "50", options: ["40", "50", "60"] },
                { question: "2 x 3 = ?", answer: "6", options: ["4", "6", "8"] },
                { question: "10 x 10 = ?", answer: "100", options: ["10", "100", "1000"] },
                // Add more PP2 questions
            ];
        }
    }

    showQuestion() {
        // Remove previous question if exists
        if (this.questionContainer) {
            this.app.stage.removeChild(this.questionContainer);
        }

        // Select random question
        this.currentQuestion = this.questionBank[Math.floor(Math.random() * this.questionBank.length)];
        
        this.questionContainer = new PIXI.Container();
        this.questionContainer.position.set(
            (this.app.screen.width - 400) / 2,
            this.gridContainer.y + this.gridSize * (this.cellSize + this.gridPadding) + 50
        );
        this.app.stage.addChild(this.questionContainer);

        // Question text
        const questionText = new PIXI.Text(this.currentQuestion.question, {
            fontSize: 28,
            fill: 0xFFFFFF,
            align: 'center',
            wordWrap: true,
            wordWrapWidth: 400
        });
        questionText.anchor.set(0.5, 0);
        questionText.position.set(200, 0);
        this.questionContainer.addChild(questionText);

        // Create answer options
        const options = this.currentQuestion.options || [this.currentQuestion.answer];
        
        options.forEach((option, index) => {
            const optionButton = createButton(option, 200, 80 + index * 70);
            optionButton.on('pointerdown', () => this.checkAnswer(option));
            this.questionContainer.addChild(optionButton);
        });
    }

    checkAnswer(selectedAnswer) {
        if (selectedAnswer === this.currentQuestion.answer) {
            // Correct answer
            this.stars += 1;
            this.starsText.text = `Stars: ${this.stars}`;
            
            // Move player
            if (this.playerPosition.x < this.gridSize - 1) {
                this.playerPosition.x += 1;
            } else if (this.playerPosition.y < this.gridSize - 1) {
                this.playerPosition.x = 0;
                this.playerPosition.y += 1;
            } else {
                // Reached the end
                this.showLevelComplete();
                return;
            }
            
            this.updatePlayerPosition();
            this.showQuestion();
            
            // Show correct feedback
            this.showFeedback("Correct!", 0x4CAF50);
        } else {
            // Incorrect answer
            this.showFeedback("Try again!", 0xFF5722);
        }
    }

    showFeedback(message, color) {
        if (this.feedbackText) {
            this.app.stage.removeChild(this.feedbackText);
        }
        
        this.feedbackText = new PIXI.Text(message, {
            fontSize: 32,
            fill: color,
            fontWeight: 'bold'
        });
        this.feedbackText.anchor.set(0.5);
        this.feedbackText.position.set(
            this.app.screen.width / 2,
            this.questionContainer.y + this.questionContainer.height + 50
        );
        this.app.stage.addChild(this.feedbackText);
        
        // Remove feedback after 1 second
        setTimeout(() => {
            if (this.feedbackText) {
                this.app.stage.removeChild(this.feedbackText);
                this.feedbackText = null;
            }
        }, 1000);
    }

    showLevelComplete() {
        this.app.stage.removeChildren();
        
        const congratsText = new PIXI.Text("Level Complete!", {
            fontSize: 48,
            fill: 0xFFFFFF,
            fontWeight: 'bold'
        });
        congratsText.anchor.set(0.5);
        congratsText.position.set(this.app.screen.width / 2, this.app.screen.height / 3);
        this.app.stage.addChild(congratsText);
        
        const starsText = new PIXI.Text(`You earned ${this.stars} stars!`, {
            fontSize: 36,
            fill: 0xFFFFFF
        });
        starsText.anchor.set(0.5);
        starsText.position.set(this.app.screen.width / 2, this.app.screen.height / 2);
        this.app.stage.addChild(starsText);
        
        const continueButton = createButton("Continue", this.app.screen.width / 2, this.app.screen.height / 2 + 100);
        continueButton.on('pointerdown', () => showMainMenu(this.app));
        this.app.stage.addChild(continueButton);
    }
}