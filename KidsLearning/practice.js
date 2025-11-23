function startPractice() {
    const learningArea = document.getElementById('learning-area');
    const practiceArea = document.getElementById('practice-area');

    learningArea.classList.add('hidden');
    practiceArea.classList.remove('hidden');
    score = 0;
    totalQuestions = 0;
    showQuestion();
}

function generateQuestion() {
    let questionType;
    let content;
    let correctAnswer;

    if (typeof alphabetContent !== 'undefined') {
        // Alphabet practice
        const allLetters = Object.keys(alphabetContent);
        const letter = allLetters[Math.floor(Math.random() * allLetters.length)];
        content = alphabetContent[letter];
        correctAnswer = letter;
        questionType = 'alphabet';
    } else if (typeof shapesContent !== 'undefined') {
        // Shapes practice
        const allShapes = Object.keys(shapesContent);
        const shape = allShapes[Math.floor(Math.random() * allShapes.length)];
        content = shapesContent[shape];
        correctAnswer = shape;
        questionType = 'shape';
    } else {
        // Numbers practice (default)
        const number = Math.floor(Math.random() * 5) + 1;
        content = numbersContent[number];
        correctAnswer = number.toString();
        questionType = 'number';
    }

    return { questionType, content, correctAnswer };
}

function showQuestion() {
    const practiceArea = document.getElementById('practice-area');
    practiceArea.innerHTML = '';

    // Create score display
    const scoreDisplay = document.createElement('div');
    scoreDisplay.className = 'score-display';
    scoreDisplay.textContent = `Score: ${score}/${totalQuestions}`;
    practiceArea.appendChild(scoreDisplay);

    currentQuestion = generateQuestion();
    const { questionType, content, correctAnswer } = currentQuestion;

    // Create question container
    const questionContainer = document.createElement('div');
    questionContainer.className = 'question-container';

    // Display the image
    const img = document.createElement('img');
    img.src = content.image;
    img.alt = content.text;
    questionContainer.appendChild(img);

    // Create options
    const optionsContainer = document.createElement('div');
    optionsContainer.className = 'options-container';

    // Generate options including the correct answer
    let options = [];
    if (questionType === 'number') {
        options = ['1', '2', '3', '4', '5'];
    } else if (questionType === 'alphabet') {
        // Get 4 random letters plus the correct one
        const allLetters = Object.keys(alphabetContent);
        options = [correctAnswer];
        while (options.length < 5) {
            const randomLetter = allLetters[Math.floor(Math.random() * allLetters.length)];
            if (!options.includes(randomLetter)) {
                options.push(randomLetter);
            }
        }
    } else {
        // Shapes
        options = Object.keys(shapesContent);
    }

    // Shuffle options
    options.sort(() => Math.random() - 0.5);

    options.forEach(option => {
        const button = document.createElement('button');
        button.className = 'option-btn';
        button.textContent = option;
        button.onclick = () => checkAnswer(option);
        optionsContainer.appendChild(button);
    });

    questionContainer.appendChild(optionsContainer);
    practiceArea.appendChild(questionContainer);

    // Add back button
    const backBtn = document.createElement('button');
    backBtn.className = 'back-btn';
    backBtn.textContent = 'Back to Learning';
    backBtn.onclick = startLearning;
    practiceArea.appendChild(backBtn);
}

function checkAnswer(selectedAnswer) {
    totalQuestions++;
    const isCorrect = selectedAnswer.toString() === currentQuestion.correctAnswer.toString();
    
    if (isCorrect) {
        score++;
        playSound('correct');
    } else {
        playSound('incorrect');
    }

    // Show next question
    setTimeout(showQuestion, 1000);
}