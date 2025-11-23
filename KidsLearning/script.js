// Learning content
// Define alphabet sets
const alphabetSets = {
    'A-E': {
        A: { image: 'images/apple.jpg', text: 'A for Apple', examples: ['🍎'] },
        B: { image: 'images/banana.jpg', text: 'B for Banana', examples: ['🍌'] },
        C: { image: 'images/cat.jpg', text: 'C for Cat', examples: ['🐱'] },
        D: { image: 'images/dog.jpg', text: 'D for Dog', examples: ['�'] },
        E: { image: 'images/elephant.jpg', text: 'E for Elephant', examples: ['�'] }
    },
    'F-J': {
        F: { image: 'images/fish.jpg', text: 'F for Fish', examples: ['🐠'] },
        G: { image: 'images/giraffe.jpg', text: 'G for Giraffe', examples: ['🦒'] },
        H: { image: 'images/house.jpg', text: 'H for House', examples: ['�'] },
        I: { image: 'images/ice-cream.jpg', text: 'I for Ice Cream', examples: ['�'] },
        J: { image: 'images/juice.jpg', text: 'J for Juice', examples: ['🧃'] }
    },
    'K-O': {
        K: { image: 'images/kite.jpg', text: 'K for Kite', examples: ['🪁'] },
        L: { image: 'images/lion.jpg', text: 'L for Lion', examples: ['🦁'] },
        M: { image: 'images/monkey.jpg', text: 'M for Monkey', examples: ['🐒'] },
        N: { image: 'images/nest.jpg', text: 'N for Nest', examples: ['🪹'] },
        O: { image: 'images/orange.jpg', text: 'O for Orange', examples: ['🍊'] }
    },
    'P-T': {
        P: { image: 'images/penguin.jpg', text: 'P for Penguin', examples: ['🐧'] },
        Q: { image: 'images/queen.jpg', text: 'Q for Queen', examples: ['👑'] },
        R: { image: 'images/rabbit.jpg', text: 'R for Rabbit', examples: ['🐰'] },
        S: { image: 'images/sun.jpg', text: 'S for Sun', examples: ['☀️'] },
        T: { image: 'images/tree.jpg', text: 'T for Tree', examples: ['�'] }
    },
    'U-Z': {
        U: { image: 'images/umbrella.jpg', text: 'U for Umbrella', examples: ['☂️'] },
        V: { image: 'images/violin.jpg', text: 'V for Violin', examples: ['�'] },
        W: { image: 'images/whale.jpg', text: 'W for Whale', examples: ['�'] },
        X: { image: 'images/xylophone.jpg', text: 'X for Xylophone', examples: ['🎵'] },
        Y: { image: 'images/yacht.jpg', text: 'Y for Yacht', examples: ['⛵'] },
        Z: { image: 'images/zebra.jpg', text: 'Z for Zebra', examples: ['🦓'] }
    }
};

let currentAlphabetSet = 'A-E';

const learningContent = {
    numbers: {
        1: { image: 'images/apple.jpg', text: 'One Apple', examples: ['🍎'] },
        2: { image: 'images/birds.jpg', text: 'Two Birds', examples: ['🐦', '🐦'] },
        3: { image: 'images/fish.jpg', text: 'Three Fish', examples: ['🐠', '🐠', '🐠'] },
        4: { image: 'images/flowers.jpg', text: 'Four Flowers', examples: ['🌸', '🌸', '🌸', '🌸'] },
        5: { image: 'images/stars.jpg', text: 'Five Stars', examples: ['⭐', '⭐', '⭐', '⭐', '⭐'] }
    },
    alphabet: alphabetSets['A-E'],
    shapes: {
        'circle': { 
            image: 'images/circle.jpg', 
            text: 'Circle - Round like the sun', 
            examples: ['🟡', '🔴', '🟢'], 
            color: '#FF6B6B',
            description: 'A circle is perfectly round with no corners!'
        },
        'square': { 
            image: 'images/square.jpg', 
            text: 'Square - Four equal sides', 
            examples: ['🟪', '🟦', '🟨'], 
            color: '#4ECDC4',
            description: 'A square has 4 equal sides and 4 corners!'
        },
        'triangle': { 
            image: 'images/triangle.jpg', 
            text: 'Triangle - Three sides', 
            examples: ['🔺', '🔻', '⚠️'], 
            color: '#45B7D1',
            description: 'A triangle has 3 sides and 3 corners!'
        },
        'rectangle': { 
            image: 'images/rectangle.jpg', 
            text: 'Rectangle - Like a door', 
            examples: ['📱', '📺', '🚪'], 
            color: '#96CEB4',
            description: 'A rectangle has 4 sides - 2 long and 2 short!'
        },
        'star': { 
            image: 'images/star.jpg', 
            text: 'Star - Twinkle in the sky', 
            examples: ['⭐', '🌟', '✨'], 
            color: '#FECA57',
            description: 'A star has 5 points that shine bright!'
        },
        'heart': { 
            image: 'images/heart.jpg', 
            text: 'Heart - Shape of love', 
            examples: ['❤️', '💜', '💙'], 
            color: '#FF9FF3',
            description: 'A heart shape shows love and kindness!'
        }
    }
};

let currentCategory = null;
let currentQuestion = null;
let score = 0;
let totalQuestions = 0;

function createAlphabetNavigation() {
    const nav = document.createElement('div');
    nav.className = 'alphabet-navigation';
    nav.style.cssText = 'display: flex; justify-content: center; align-items: center; gap: 20px; margin: 20px 0;';

    const leftArrow = document.createElement('button');
    leftArrow.innerHTML = '⬅️';
    leftArrow.className = 'nav-arrow';
    leftArrow.onclick = () => changeAlphabetSet('prev');
    leftArrow.style.cssText = 'font-size: 24px; background: none; border: none; cursor: pointer; padding: 10px;';

    const setLabel = document.createElement('span');
    setLabel.id = 'alphabet-set-label';
    setLabel.textContent = currentAlphabetSet;
    setLabel.style.cssText = 'font-size: 20px; font-weight: bold;';

    const rightArrow = document.createElement('button');
    rightArrow.innerHTML = '➡️';
    rightArrow.className = 'nav-arrow';
    rightArrow.onclick = () => changeAlphabetSet('next');
    rightArrow.style.cssText = 'font-size: 24px; background: none; border: none; cursor: pointer; padding: 10px;';

    nav.appendChild(leftArrow);
    nav.appendChild(setLabel);
    nav.appendChild(rightArrow);

    return nav;
}

function changeAlphabetSet(direction) {
    const sets = Object.keys(alphabetSets);
    const currentIndex = sets.indexOf(currentAlphabetSet);
    let newIndex;

    if (direction === 'next') {
        newIndex = (currentIndex + 1) % sets.length;
    } else {
        newIndex = (currentIndex - 1 + sets.length) % sets.length;
    }

    currentAlphabetSet = sets[newIndex];
    learningContent.alphabet = alphabetSets[currentAlphabetSet];
    
    // Update the display
    if (currentCategory === 'alphabet') {
        selectCategory('alphabet', true);
        const label = document.getElementById('alphabet-set-label');
        if (label) label.textContent = currentAlphabetSet;
    }
}

function selectCategory(category, skipReset = false) {
    currentCategory = category;
    const learningArea = document.getElementById('learning-area');
    const practiceArea = document.getElementById('practice-area');

    // Show learning area, hide practice area
    learningArea.classList.remove('hidden');
    practiceArea.classList.add('hidden');
    
    learningArea.innerHTML = '';

    // Add alphabet navigation if needed
    if (category === 'alphabet' && !skipReset) {
        currentAlphabetSet = 'A-E';
        learningContent.alphabet = alphabetSets[currentAlphabetSet];
    }
    
    if (category === 'alphabet') {
        learningArea.appendChild(createAlphabetNavigation());
    }

    // Create cards for the category
    const cardContainer = document.createElement('div');
    cardContainer.className = 'card-container';

    Object.entries(learningContent[category]).forEach(([key, value]) => {
        const card = createLearningCard(key, value);
        cardContainer.appendChild(card);
    });

    learningArea.appendChild(cardContainer);

    // Add practice button
    const practiceBtn = document.createElement('button');
    practiceBtn.className = 'category-btn';
    practiceBtn.textContent = 'Practice Time!';
    practiceBtn.onclick = () => {
        score = 0;
        totalQuestions = 0;
        startPractice();
    };
    learningArea.appendChild(practiceBtn);
}

function createLearningCard(key, content) {
    const card = document.createElement('div');
    card.className = 'learning-card';

    // Add special styling for shapes
    if (currentCategory === 'shapes' && content.color) {
        card.style.borderLeft = `8px solid ${content.color}`;
        card.style.background = `linear-gradient(135deg, ${content.color}20, #ffffff)`;
    }

    // Create both image and emoji containers
    const imgContainer = document.createElement('div');
    imgContainer.className = 'image-container';
    
    // For shapes, create a visual shape instead of relying on images
    if (currentCategory === 'shapes') {
        const shapeVisual = document.createElement('div');
        shapeVisual.className = `shape-visual shape-${key}`;
        shapeVisual.style.cssText = `
            width: 120px;
            height: 120px;
            margin: 20px auto;
            background-color: ${content.color};
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 2.5em;
            color: white;
            font-weight: bold;
            text-shadow: 2px 2px 4px rgba(0,0,0,0.3);
            animation: shapeFloat 3s ease-in-out infinite;
        `;
        
        // Apply shape-specific styles
        switch(key) {
            case 'circle':
                shapeVisual.style.borderRadius = '50%';
                shapeVisual.innerHTML = '●';
                break;
            case 'square':
                shapeVisual.style.borderRadius = '8px';
                shapeVisual.innerHTML = '■';
                break;
            case 'triangle':
                shapeVisual.style.width = '0';
                shapeVisual.style.height = '0';
                shapeVisual.style.borderLeft = '60px solid transparent';
                shapeVisual.style.borderRight = '60px solid transparent';
                shapeVisual.style.borderBottom = `100px solid ${content.color}`;
                shapeVisual.style.backgroundColor = 'transparent';
                shapeVisual.innerHTML = '';
                break;
            case 'rectangle':
                shapeVisual.style.width = '160px';
                shapeVisual.style.height = '100px';
                shapeVisual.style.borderRadius = '8px';
                shapeVisual.innerHTML = '▬';
                break;
            case 'star':
                shapeVisual.innerHTML = '★';
                shapeVisual.style.borderRadius = '8px';
                break;
            case 'heart':
                shapeVisual.innerHTML = '♥';
                shapeVisual.style.borderRadius = '8px';
                break;
        }
        
        imgContainer.appendChild(shapeVisual);
    } else {
        // Add real image for non-shapes
        const img = document.createElement('img');
        img.src = content.image;
        img.alt = content.text;
        imgContainer.appendChild(img);
    }
    
    // Add emoji examples below the image/shape
    const emojiContainer = document.createElement('div');
    emojiContainer.className = 'emoji-container';
    emojiContainer.innerHTML = content.examples.join(' ');
    emojiContainer.style.fontSize = '2em';
    emojiContainer.style.margin = '10px 0';

    const text = document.createElement('h3');
    text.textContent = content.text;
    text.style.color = currentCategory === 'shapes' ? content.color : '#333';

    // Add description for shapes
    const description = document.createElement('p');
    if (currentCategory === 'shapes' && content.description) {
        description.textContent = content.description;
        description.style.cssText = `
            font-size: 0.9em;
            color: #666;
            margin-top: 8px;
            line-height: 1.4;
        `;
    }

    card.appendChild(imgContainer);
    card.appendChild(emojiContainer);
    card.appendChild(text);
    if (description.textContent) {
        card.appendChild(description);
    }

    // Add sound and animation effects
    card.onclick = () => {
        playSound('click');
        card.classList.add('card-click');
        
        // Add special shape animation
        if (currentCategory === 'shapes') {
            const shapeVisual = card.querySelector('.shape-visual');
            if (shapeVisual) {
                shapeVisual.style.transform = 'scale(1.2) rotate(360deg)';
                setTimeout(() => {
                    shapeVisual.style.transform = 'scale(1) rotate(0deg)';
                }, 600);
            }
        }
        
        setTimeout(() => card.classList.remove('card-click'), 200);
    };

    return card;
}

function startPractice() {
    document.getElementById('learning-area').classList.add('hidden');
    const practiceArea = document.getElementById('practice-area');
    practiceArea.classList.remove('hidden');
    
    // Reset score for new practice session
    score = 0;
    totalQuestions = 0;
    
    // Make sure the next button is hidden at start
    const nextBtn = document.getElementById('next-btn');
    if (nextBtn) {
        nextBtn.classList.add('hidden');
    }
    
    generateQuestion();
}

function generateQuestion() {
    if (!currentCategory) {
        console.error('No category selected');
        return;
    }
    
    let category;
    if (currentCategory === 'alphabet') {
        category = alphabetSets[currentAlphabetSet];
    } else {
        category = learningContent[currentCategory];
    }
    
    if (!category) {
        console.error('Invalid category:', currentCategory);
        return;
    }

    const keys = Object.keys(category);
    const correctKey = keys[Math.floor(Math.random() * keys.length)];
    currentQuestion = { key: correctKey, content: category[correctKey] };

    const questionContainer = document.getElementById('question');
    const optionsContainer = document.getElementById('options-container');
    const feedback = document.getElementById('feedback');
    
    // Clear previous content
    feedback.textContent = '';  // Clear previous feedback
    questionContainer.textContent = currentCategory === 'numbers' ? 
        'How many do you see?' : 'What is this?';
    optionsContainer.innerHTML = '';

    // Create options grid
    const optionsGrid = document.createElement('div');
    optionsGrid.className = 'options-grid';

    // Create correct option and 3 random incorrect options
    const options = getRandomOptions(keys, correctKey);
    options.forEach(option => {
        const optionCard = document.createElement('div');
        optionCard.className = 'option-card';
        optionCard.textContent = option;
        optionCard.onclick = () => checkAnswer(option);
        optionsGrid.appendChild(optionCard);
    });

    // Show the example/emoji instead of the image
    const exampleDisplay = document.createElement('div');
    exampleDisplay.style.fontSize = '4em';
    exampleDisplay.style.marginBottom = '20px';
    exampleDisplay.innerHTML = category[correctKey].examples.join(' ');
    
    optionsContainer.appendChild(exampleDisplay);
    optionsContainer.appendChild(optionsGrid);

    document.getElementById('next-btn').classList.add('hidden');
    document.getElementById('feedback').textContent = '';
}

function getRandomOptions(allOptions, correctOption) {
    const options = [correctOption];
    const availableOptions = allOptions.filter(opt => opt !== correctOption);
    
    while (options.length < 4 && availableOptions.length > 0) {
        const randomIndex = Math.floor(Math.random() * availableOptions.length);
        options.push(availableOptions.splice(randomIndex, 1)[0]);
    }

    // Shuffle options and ensure we have enough options
    if (options.length < 2) {
        console.warn('Not enough options available');
        return options;
    }
    return options.sort(() => Math.random() - 0.5);
}

function checkAnswer(selectedOption) {
    totalQuestions++;
    const feedback = document.getElementById('feedback');
    const nextBtn = document.getElementById('next-btn');

    // Disable all option buttons to prevent multiple clicks
    const optionButtons = document.querySelectorAll('.option-card');
    optionButtons.forEach(button => {
        button.style.pointerEvents = 'none';
    });

    if (selectedOption === currentQuestion.key) {
        score++;
        feedback.textContent = '✨ Correct! Well done! ✨';
        feedback.className = 'feedback correct';
        // Play success sound
        const successSound = new Audio('data:audio/wav;base64,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qJrx4KOQjahZxWbcZgztj2c49nKmkId44S71j0c8eV9yDK6uPRzx5X18eDvjvQ6yKo9ZSS6l//8elePK/Lf//IInrOF/FvDoADYAGBMGb7FtErm5MXMlmPAJQVgWta7Zx2go+8xJ0UiCb8LHHdftWyLJE0QIAIsI+UbXu67dZMjmgDGCGl1H+vpF4NSDckSIkk7Vd+sxEhBQMRU8j/12UIRhzSaUdQ+rQU5kGeFxm+hb1oh6pWWmv3uvmReDl0UnvtapVaIzo1jZbf/pD6ElLqSX+rUmOQNpJFa/r+sa4e/pBlAABoAAAAA3CUgShLdGIxsY7AUABPRrgCABdDuQ5GC7DqPQCgbbJUAoRSUj+NIEig0YfyWUho1VBBBA//uQZB4ABZx5zfMakeAAAAmwAAAAF5F3P0w9GtAAACfAAAAAwLhMDmAYWMgVEG1U0FIGCBgXBXAtfMH10000EEEEEECUBYln03TTTdNBDZopopYvrTTdNa325mImNg3TTPV9q3pmY0xoO6bv3r00y+IDGid/9aaaZTGMuj9mpu9Mpio1dXrr5HERTZSmqU36A3CumzN/9Robv/Xx4v9ijkSRSNLQhAWumap82WRSBUqXStV/YcS+XVLnSS+WLDroqArFkMEsAS+eWmrUzrO0oEmE40RlMZ5+ODIkAyKAGUwZ3mVKmcamcJnMW26MRPgUw6j+LkhyHGVGYjSUUKNpuJUQoOIAyDvEyG8S5yfK6dhZc0Tx1KI/gviKL6qvvFs1+bWtaz58uUNnryq6kt5RzOCkPWlVqVX2a/EEBUdU1KrXLf40GoiiFXK///qpoiDXrOgqDR38JB0bw7SoL+ZB9o1RCkQjQ2CBYZKd/+VJxZRRZlqSkKiws0WFxUyCwsKiMy7hUVFhIaCrNQsKkTIsLivwKKigsj8XYlwt/WKi2N4d//uQRCSAAjURNIHpMZBGYiaQPSYyAAABLAAAAAAAACWAAAAApUF/Mg+0aohSIRobBAsMlO//Kk4soosy1JSFRYWaLC4qZBYWFRGZdwqKiwkNBVmoWFSJkWFxX4FFRQWR+LsS4W/rFRb/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////VEFHAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAU291bmRib3kuZGUAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAMjAwNGh0dHA6Ly93d3cuc291bmRib3kuZGUAAAAAAAAAACU=');
        successSound.play();
    } else {
        feedback.textContent = `Try again! Count one more time!`;
        feedback.className = 'feedback incorrect';
        // Play incorrect sound
        const wrongSound = new Audio('data:audio/wav;base64,UklGRnoGAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQoGAACBhYqFbF1fdH2Fe3NtdHp+gqdqXmBqeYWFdmNfcp+kc1xXX3qVnZN5aWJsfYB9hYJyaXaCiIFxd4mFdmdjcIeNlIl0XVtならず');
        wrongSound.play();
    }

    // Show next button and bind click event
    nextBtn.classList.remove('hidden');
    nextBtn.onclick = () => {
        // Re-enable option buttons for the next question
        optionButtons.forEach(button => {
            button.style.pointerEvents = 'auto';
        });
        generateQuestion();
        nextBtn.classList.add('hidden');
    };
}

// Sound effects
let isSoundEnabled = true;
const sounds = {
    correct: new Audio('data:audio/mp3;base64,SUQzBAAAAAAAI1RTU0UAAAAPAAADTGF2ZjU4LjI5LjEwMAAAAAAAAAAAAAAA//tQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAWGluZwAAAA8AAAACAAAFbgBra2tra2tra2tra2tra2tra2tra2tra2tra2tra2tra2tra2tra2tra2tra2tra2tra2tra2tra2tra2tra2t7e3t7e3t7e3t7e3t7e3t7e3t7e3t7e3t7e3t7e3t7e3t//////////////////////////8AAAAATGF2YzU4LjU0AAAAAAAAAAAAAAAAJAAAAAAAAAAAAQVuix9NcAAAAAAAAAAAAAAAAAAAAP/7kGQAD/AAAGkAAAAIAAANIAAAAQAAAaQAAAAgAAA0gAAABExBTUUzLjEwMFVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVUxBTUUzLjEwMFVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVV//sQZAAP8AAAaQAAAAgAAA0gAAABAAABpAAAACAAADSAAAAETEFNRTMuMTAwVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVU='),
    incorrect: new Audio('data:audio/mp3;base64,SUQzBAAAAAAAI1RTU0UAAAAPAAADTGF2ZjU4LjI5LjEwMAAAAAAAAAAAAAAA//tQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAWGluZwAAAA8AAAACAAAFbgBra2tra2tra2tra2tra2tra2tra2tra2tra2tra2tra2tra2tra2tra2tra2tra2tra2tra2tra2tra2tra2t7e3t7e3t7e3t7e3t7e3t7e3t7e3t7e3t7e3t7e3t7e3t//////////////////////////8AAAAATGF2YzU4LjU0AAAAAAAAAAAAAAAAJAAAAAAAAAAAAQVuix9NcAAAAAAAAAAAAAAAAAAAAP/7kGQAD/AAAGkAAAAIAAANIAAAAQAAAaQAAAAgAAA0gAAABExBTUUzLjEwMFVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVUxBTUUzLjEwMFVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVV//sQZAAP8AAAaQAAAAgAAA0gAAABAAABpAAAACAAADSAAAAETEFNRTMuMTAwVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVU='),
    click: new Audio('data:audio/mp3;base64,SUQzBAAAAAAAI1RTU0UAAAAPAAADTGF2ZjU4LjI5LjEwMAAAAAAAAAAAAAAA//tQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAWGluZwAAAA8AAAACAAAFbgBra2tra2tra2tra2tra2tra2tra2tra2tra2tra2tra2tra2tra2tra2tra2tra2tra2tra2tra2tra2tra2t7e3t7e3t7e3t7e3t7e3t7e3t7e3t7e3t7e3t7e3t7e3t//////////////////////////8AAAAATGF2YzU4LjU0AAAAAAAAAAAAAAAAJAAAAAAAAAAAAQVuix9NcAAAAAAAAAAAAAAAAAAAAP/7kGQAD/AAAGkAAAAIAAANIAAAAQAAAaQAAAAgAAA0gAAABExBTUUzLjEwMFVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVUxBTUUzLjEwMFVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVV//sQZAAP8AAAaQAAAAgAAA0gAAABAAABpAAAACAAADSAAAAETEFNRTMuMTAwVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVU=')
};

function playSound(type) {
    if (isSoundEnabled) {
        const sound = sounds[type] || sounds.click;
        sound.currentTime = 0;
        sound.play().catch(e => console.log('Sound play failed:', e));
    }
}

function toggleSound() {
    isSoundEnabled = !isSoundEnabled;
    const soundBtn = document.querySelector('.sound-toggle');
    soundBtn.innerHTML = isSoundEnabled ? '🔊' : '🔇';
}

// Initialize sound button and event listeners
function initializeSoundButton() {
    const soundBtn = document.createElement('button');
    soundBtn.className = 'sound-toggle';
    soundBtn.innerHTML = '🔊';
    soundBtn.onclick = toggleSound;
    document.body.appendChild(soundBtn);

    // Add event listeners for category buttons
    document.getElementById('numbers-btn').addEventListener('click', function() {
        handleCategorySwitch('numbers');
    });
    document.getElementById('alphabet-btn').addEventListener('click', function() {
        handleCategorySwitch('alphabet');
    });
    document.getElementById('shapes-btn').addEventListener('click', function() {
        handleCategorySwitch('shapes');
    });
}

function handleCategorySwitch(category) {
    currentCategory = category;
    score = 0;
    totalQuestions = 0;
    
    // If in practice mode, generate new question for new category
    if (!document.getElementById('practice-area').classList.contains('hidden')) {
        generateQuestion();
    }
}

// Progress tracking
function updateProgress() {
    const progressBar = document.querySelector('.progress-fill');
    if (totalQuestions > 0) {
        const percentage = (score / totalQuestions) * 100;
        progressBar.style.width = `${percentage}%`;
    }
}