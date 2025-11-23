// Alphabet specific functionality
const alphabetContent = {
    // First set (A-E)
    'A': { image: 'images/apple.jpg', text: 'A for Apple', examples: ['🍎'] },
    'B': { image: 'images/ball.jpg', text: 'B for Ball', examples: ['⚽'] },
    'C': { image: 'images/cat.jpg', text: 'C for Cat', examples: ['🐱'] },
    'D': { image: 'images/dog.jpg', text: 'D for Dog', examples: ['🐕'] },
    'E': { image: 'images/elephant.jpg', text: 'E for Elephant', examples: ['🐘'] },
    
    // Second set (F-J)
    'F': { image: 'images/fish.jpg', text: 'F for Fish', examples: ['🐠'] },
    'G': { image: 'images/goat.jpg', text: 'G for Goat', examples: ['🐐'] },
    'H': { image: 'images/horse.jpg', text: 'H for Horse', examples: ['🐎'] },
    'I': { image: 'images/icecream.jpg', text: 'I for Ice Cream', examples: ['🍦'] },
    'J': { image: 'images/juice.jpg', text: 'J for Juice', examples: ['🧃'] },
    
    // Third set (K-O)
    'K': { image: 'images/kite.jpg', text: 'K for Kite', examples: ['🪁'] },
    'L': { image: 'images/lion.jpg', text: 'L for Lion', examples: ['🦁'] },
    'M': { image: 'images/monkey.jpg', text: 'M for Monkey', examples: ['🐒'] },
    'N': { image: 'images/nest.jpg', text: 'N for Nest', examples: ['🪹'] },
    'O': { image: 'images/orange.jpg', text: 'O for Orange', examples: ['🍊'] },
    
    // Fourth set (P-T)
    'P': { image: 'images/pig.jpg', text: 'P for Pig', examples: ['🐷'] },
    'Q': { image: 'images/queen.jpg', text: 'Q for Queen', examples: ['👑'] },
    'R': { image: 'images/rabbit.jpg', text: 'R for Rabbit', examples: ['🐰'] },
    'S': { image: 'images/snake.jpg', text: 'S for Snake', examples: ['🐍'] },
    'T': { image: 'images/tree.jpg', text: 'T for Tree', examples: ['🌳'] },
    
    // Fifth set (U-Z)
    'U': { image: 'images/umbrella.jpg', text: 'U for Umbrella', examples: ['☂️'] },
    'V': { image: 'images/van.jpg', text: 'V for Van', examples: ['🚐'] },
    'W': { image: 'images/whale.jpg', text: 'W for Whale', examples: ['🐋'] },
    'X': { image: 'images/xray.jpg', text: 'X for X-ray', examples: ['🦴'] },
    'Y': { image: 'images/yoyo.jpg', text: 'Y for Yoyo', examples: ['🪀'] },
    'Z': { image: 'images/zebra.jpg', text: 'Z for Zebra', examples: ['🦓'] }
};

// Sound effects
const sounds = {
    correct: new Audio('data:audio/wav;base64,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qJrx4KOQjahZxWbcZgztj2c49nKmkId44S71j0c8eV9yDK6uPRzx5X18eDvjvQ6yKo9ZSS6l//8elePK/Lf//IInrOF/FvDoADYAGBMGb7FtErm5MXMlmPAJQVgWta7Zx2go+8xJ0UiCb8LHHdftWyLJE0QIAIsI+UbXu67dZMjmgDGCGl1H+vpF4NSDckSIkk7Vd+sxEhBQMRU8j/12UIRhzSaUdQ+rQU5kGeFxm+hb1oh6pWWmv3uvmReDl0UnvtapVaIzo1jZbf/pD6ElLqSX+rUmOQNpJFa/r+sa4e/pBlAABoAAAAA3CUgShLdGIxsY7AUABPRrgCABdDuQ5GC7DqPQCgbbJUAoRSUj+NIEig0YfyWUho1VBBBA//uQZB4ABZx5zfMakeAAAAmwAAAAF5F3P0w9GtAAACfAAAAAwLhMDmAYWMgVEG1U0FIGCBgXBXAtfMH10000EEEEEECUBYln03TTTdNBDZopopYvrTTdNa325mImNg3TTPV9q3pmY0xoO6bv3r00y+IDGid/9aaaZTGMuj9mpu9Mpio1dXrr5HERTZSmqU36A3CumzN/9Robv/Xx4v9ijkSRSNLQhAWumap82WRSBUqXStV/YcS+XVLnSS+WLDroqArFkMEsAS+eWmrUzrO0oEmE40RlMZ5+ODIkAyKAGUwZ3mVKmcamcJnMW26MRPgUw6j+LkhyHGVGYjSUUKNpuJUQoOIAyDvEyG8S5yfK6dhZc0Tx1KI/gviKL6qvvFs1+bWtaz58uUNnryq6kt5RzOCkPWlVqVX2a/EEBUdU1KrXLf40GoiiFXK///qpoiDXrOgqDR38JB0bw7SoL+ZB9o1RCkQjQ2CBYZKd/+VJxZRRZlqSkKiws0WFxUyCwsKiMy7hUVFhIaCrNQsKkTIsLivwKKigsj8XYlwt/WKi2N4d//uQRCSAAjURNIHpMZBGYiaQPSYyAAABLAAAAAAAACWAAAAApUF/Mg+0aohSIRobBAsMlO//Kk4soosy1JSFRYWaLC4qZBYWFRGZdwqKiwkNBVmoWFSJkWFxX4FFRQWR+LsS4W/rFRb/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////VEFHAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAU291bmRib3kuZGUAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAMjAwNGh0dHA6Ly93d3cuc291bmRib3kuZGUAAAAAAAAAACU='),
    incorrect: new Audio('data:audio/wav;base64,UklGRnoGAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQoGAACBhYqFbF1fdH2Fe3NtdHp+gqdqXmBqeYWFdmNfcp+kc1xXX3qVnZN5aWJsfYB9hYJyaXaCiIFxd4mFdmdjcIeNlIl0XVtならず'),
    click: new Audio('data:audio/wav;base64,SUQzBAAAAAAAI1RTU0UAAAAPAAADTGF2ZjU4LjI5LjEwMAAAAAAAAAAAAAAA//tQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAWGluZwAAAA8AAAACAAAFbgBra2tra2tra2tra2tra2tra2tra2tra2tra2tra2tra2tra2tra2tra2tra2tra2tra2tra2tra2tra2tra2t7e3t7e3t7e3t7e3t7e3t7e3t7e3t7e3t7e3t7e3t7e3t//////////////////////////8AAAAATGF2YzU4LjU0AAAAAAAAAAAAAAAAJAAAAAAAAAAAAQVuix9NcAAAAAAAAAAAAAAAAAAAAP/7kGQAD/AAAGkAAAAIAAANIAAAAQAAAaQAAAAgAAA0gAAABExBTUUzLjEwMFVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVUxBTUUzLjEwMFVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVV//sQZAAP8AAAaQAAAAgAAA0gAAABAAABpAAAACAAADSAAAAETEFNRTMuMTAwVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVU=')
};

let isSoundEnabled = true;

// Track current set of letters being shown
let currentSetIndex = 0;
const letterSets = [
    ['A', 'B', 'C', 'D', 'E'],
    ['F', 'G', 'H', 'I', 'J'],
    ['K', 'L', 'M', 'N', 'O'],
    ['P', 'Q', 'R', 'S', 'T'],
    ['U', 'V', 'W', 'X', 'Y', 'Z']
];

function playSound(type) {
    if (isSoundEnabled) {
        const sound = sounds[type] || sounds.click;
        sound.currentTime = 0;
        sound.play().catch(e => console.log('Sound play failed:', e));
    }
}

function createLetterCard(letter, content) {
    const card = document.createElement('div');
    card.className = 'learning-card';

    // Create image container
    const imgContainer = document.createElement('div');
    imgContainer.className = 'image-container';
    
    // Add real image
    const img = document.createElement('img');
    img.src = content.image;
    img.alt = content.text;
    imgContainer.appendChild(img);
    
    // Add examples below the image
    const exampleContainer = document.createElement('div');
    exampleContainer.className = 'example-container';
    exampleContainer.innerHTML = content.examples.join(' ');
    exampleContainer.style.fontSize = '2em';

    const text = document.createElement('h3');
    text.textContent = content.text;

    card.appendChild(imgContainer);
    card.appendChild(exampleContainer);
    card.appendChild(text);

    card.onclick = () => {
        playSound('click');
        card.classList.add('card-click');
        setTimeout(() => card.classList.remove('card-click'), 200);
    };

    return card;
}

function showLetterSet(setIndex) {
    const learningArea = document.getElementById('learning-area');
    const practiceArea = document.getElementById('practice-area');

    learningArea.classList.remove('hidden');
    practiceArea.classList.add('hidden');
    learningArea.innerHTML = '';

    currentSetIndex = setIndex;
    const currentSet = letterSets[setIndex];

    // Create navigation controls
    const nav = document.createElement('div');
    nav.className = 'letter-nav';

    // Previous button
    if (setIndex > 0) {
        const prevBtn = document.createElement('button');
        prevBtn.textContent = '← Previous Set';
        prevBtn.onclick = () => showLetterSet(setIndex - 1);
        nav.appendChild(prevBtn);
    }

    // Set indicator
    const setIndicator = document.createElement('span');
    setIndicator.textContent = `Set ${setIndex + 1} of ${letterSets.length}`;
    nav.appendChild(setIndicator);

    // Next button
    if (setIndex < letterSets.length - 1) {
        const nextBtn = document.createElement('button');
        nextBtn.textContent = 'Next Set →';
        nextBtn.onclick = () => showLetterSet(setIndex + 1);
        nav.appendChild(nextBtn);
    }

    learningArea.appendChild(nav);

    // Create cards for letters
    const cardContainer = document.createElement('div');
    cardContainer.className = 'card-container';

    currentSet.forEach(letter => {
        const content = alphabetContent[letter];
        const card = createLetterCard(letter, content);
        cardContainer.appendChild(card);
    });

    learningArea.appendChild(cardContainer);

    // Add practice button if showing the last card of the set
    if (setIndex === letterSets.length - 1) {
        const practiceBtn = document.createElement('button');
        practiceBtn.className = 'category-btn';
        practiceBtn.textContent = 'Practice Time!';
        practiceBtn.onclick = startPractice;
        learningArea.appendChild(practiceBtn);
    }
}

// Initialize when page loads
document.addEventListener('DOMContentLoaded', () => {
    showLetterSet(0);
    
    // Initialize sound toggle
    const soundBtn = document.createElement('button');
    soundBtn.id = 'sound-toggle';
    soundBtn.className = 'sound-toggle';
    soundBtn.innerHTML = '🔊';
    soundBtn.onclick = () => {
        isSoundEnabled = !isSoundEnabled;
        soundBtn.innerHTML = isSoundEnabled ? '🔊' : '🔇';
    };
    document.body.appendChild(soundBtn);
});