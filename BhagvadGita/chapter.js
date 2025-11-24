// ===== CHAPTER PAGE JAVASCRIPT =====

document.addEventListener('DOMContentLoaded', function() {
    initializeChapterPage();
});

function initializeChapterPage() {
    setupNavigation();
    setupScrollAnimations();
    setupVerseInteractions();
}

// ===== NAVIGATION =====
function setupNavigation() {
    const mobileToggle = document.querySelector('.mobile-toggle');
    const navToggle = document.querySelector('.nav-toggle');
    const navMenu = document.querySelector('#navMenu');
    
    // Handle both mobile-toggle and nav-toggle buttons
    const toggleButton = mobileToggle || navToggle;
    
    if (toggleButton && navMenu) {
        toggleButton.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            toggleButton.classList.toggle('active');
        });
    }

    // Handle navigation links for chapter pages
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            // If it's a link to index.html with hash, navigate to index page
            if (href.includes('index.html#')) {
                e.preventDefault();
                window.location.href = href;
            } else if (href === 'index.html') {
                // Simple navigation to home page
                window.location.href = href;
            }
            
            // Close mobile menu if open
            if (navMenu && toggleButton) {
                navMenu.classList.remove('active');
                toggleButton.classList.remove('active');
            }
        });
    });

    // Close mobile menu when clicking outside
    document.addEventListener('click', function(e) {
        if (toggleButton && navMenu && 
            !toggleButton.contains(e.target) && 
            !navMenu.contains(e.target)) {
            navMenu.classList.remove('active');
            toggleButton.classList.remove('active');
        }
    });
}

// ===== SCROLL ANIMATIONS =====
function setupScrollAnimations() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('revealed');
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });

    const animatedElements = document.querySelectorAll('.verse-card, .chapter-summary');
    animatedElements.forEach(el => {
        el.classList.add('scroll-reveal');
        observer.observe(el);
    });
}

// ===== VERSE INTERACTIONS =====
function setupVerseInteractions() {
    // Initialize collapsible word meanings
    initializeWordMeanings();
    
    // Initialize control buttons
    initializeControlButtons();
    
    // Add copy verse functionality
    const verseCopyButtons = document.querySelectorAll('.copy-verse');
    verseCopyButtons.forEach(button => {
        button.addEventListener('click', function() {
            const verseCard = this.closest('.verse-card');
            const sanskrit = verseCard.querySelector('.sanskrit').textContent;
            const translation = verseCard.querySelector('.translation').textContent;
            const verseText = `${sanskrit}\n\n${translation}`;
            
            navigator.clipboard.writeText(verseText).then(() => {
                showNotification('Verse copied to clipboard! 📋', 'success');
            });
        });
    });

    // Add verse bookmarking
    const bookmarkButtons = document.querySelectorAll('.bookmark-verse');
    bookmarkButtons.forEach(button => {
        button.addEventListener('click', function() {
            const verseNumber = this.getAttribute('data-verse');
            const chapterNumber = this.getAttribute('data-chapter');
            saveVerse(chapterNumber, verseNumber);
        });
    });
}

function initializeWordMeanings() {
    // Set initial state for all word meanings
    const meaningsContents = document.querySelectorAll('.meanings-content');
    meaningsContents.forEach(content => {
        content.classList.add('collapsed');
        content.style.maxHeight = '0px';
        content.style.overflow = 'hidden';
        content.style.transition = 'all 0.5s ease';
    });
}

function initializeControlButtons() {
    // Play Audio button
    document.getElementById('playAudio')?.addEventListener('click', () => {
        showNotification('🔊 Chapter audio feature coming soon!', 'info');
    });

    // Bookmark Chapter button
    document.getElementById('bookmarkChapter')?.addEventListener('click', () => {
        const chapterTitle = document.querySelector('.chapter-title-english')?.textContent || 'Chapter';
        const bookmarks = JSON.parse(localStorage.getItem('bookmarkedChapters') || '[]');
        
        if (!bookmarks.includes(chapterTitle)) {
            bookmarks.push(chapterTitle);
            localStorage.setItem('bookmarkedChapters', JSON.stringify(bookmarks));
            showNotification(`📖 ${chapterTitle} bookmarked!`, 'success');
        } else {
            showNotification(`📚 ${chapterTitle} already bookmarked`, 'info');
        }
    });

    // Share Chapter button
    document.getElementById('shareChapter')?.addEventListener('click', () => {
        if (navigator.share) {
            navigator.share({
                title: document.querySelector('.chapter-title-english')?.textContent || 'Bhagavad Gita Chapter',
                text: document.querySelector('.chapter-description')?.textContent || 'A chapter from the Bhagavad Gita',
                url: window.location.href
            });
        } else {
            navigator.clipboard.writeText(window.location.href);
            showNotification('🔗 Chapter link copied to clipboard!', 'success');
        }
    });

    // Print Chapter button
    document.getElementById('printChapter')?.addEventListener('click', () => {
        window.print();
    });
}

// Toggle word meanings function
function toggleMeanings(button) {
    const content = button.parentElement.nextElementSibling;
    const isCollapsed = content.classList.contains('collapsed');
    
    if (isCollapsed) {
        content.style.maxHeight = content.scrollHeight + 'px';
        content.classList.remove('collapsed');
        button.textContent = 'Hide Details';
    } else {
        content.style.maxHeight = '0px';
        content.classList.add('collapsed');
        button.textContent = 'Show Details';
    }
}

// Individual verse action functions
function playVerse(chapter, verse) {
    console.log(`Playing verse ${chapter}.${verse}`);
    showNotification(`🔊 Playing Chapter ${chapter}, Verse ${verse}`, 'info');
}

function copyVerse(chapter, verse) {
    const verseCard = document.querySelector(`[data-verse="${verse}"]`);
    if (verseCard) {
        const sanskrit = verseCard.querySelector('.sanskrit')?.textContent || '';
        const translation = verseCard.querySelector('.translation')?.textContent || '';
        
        const textToCopy = `Chapter ${chapter}, Verse ${verse}\n\n${sanskrit}\n\n${translation}`;
        
        navigator.clipboard.writeText(textToCopy).then(() => {
            showNotification(`📋 Verse ${chapter}.${verse} copied to clipboard!`, 'success');
        }).catch(() => {
            showNotification('❌ Failed to copy verse', 'error');
        });
    }
}

function saveVerse(chapter, verse) {
    const savedVerses = JSON.parse(localStorage.getItem('savedVerses') || '[]');
    const verseId = `${chapter}.${verse}`;
    
    if (!savedVerses.includes(verseId)) {
        savedVerses.push(verseId);
        localStorage.setItem('savedVerses', JSON.stringify(savedVerses));
        showNotification(`💾 Verse ${chapter}.${verse} saved!`, 'success');
    } else {
        showNotification(`📚 Verse ${chapter}.${verse} already saved`, 'info');
    }
}

// ===== NOTIFICATION SYSTEM =====
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.textContent = message;
    
    let backgroundColor;
    switch(type) {
        case 'success':
            backgroundColor = 'linear-gradient(135deg, #4CAF50, #45a049)';
            break;
        case 'error':
            backgroundColor = 'linear-gradient(135deg, #f44336, #d32f2f)';
            break;
        case 'info':
        default:
            backgroundColor = 'linear-gradient(135deg, #ff8c00, #ff8c42)';
    }
    
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${backgroundColor};
        color: white;
        padding: 15px 20px;
        border-radius: 12px;
        box-shadow: 0 8px 25px rgba(0,0,0,0.3);
        z-index: 10000;
        font-weight: 500;
        animation: slideInRight 0.3s ease-out;
        max-width: 300px;
        word-wrap: break-word;
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.animation = 'slideOutRight 0.3s ease-out';
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

// ===== KEYBOARD SHORTCUTS =====
document.addEventListener('keydown', function(event) {
    // Ctrl/Cmd + S to save current verse
    if ((event.ctrlKey || event.metaKey) && event.key === 's') {
        event.preventDefault();
        const firstVerse = document.querySelector('.verse-card');
        if (firstVerse) {
            const verseNumber = firstVerse.querySelector('.verse-number').textContent.split(' ')[1];
            const chapterNumber = window.location.pathname.match(/chapter(\d+)/)?.[1] || '12';
            saveVerse(chapterNumber, verseNumber);
        }
    }
});

// Add CSS animations
const style = document.createElement('style');
style.textContent = `
    @keyframes slideInRight {
        from { transform: translateX(100%); opacity: 0; }
        to { transform: translateX(0); opacity: 1; }
    }
    
    @keyframes slideOutRight {
        from { transform: translateX(0); opacity: 1; }
        to { transform: translateX(100%); opacity: 0; }
    }
`;
document.head.appendChild(style);