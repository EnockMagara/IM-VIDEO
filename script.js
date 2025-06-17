// DORM GOURMET: A CULINARY TRAGEDY
// JavaScript for maximum chaos and interactivity

document.addEventListener('DOMContentLoaded', function() {
    initializeWebsite();
});

function initializeWebsite() {
    setupNavigation();
    setupCustomCursor();
    setupLandingInteractions();
    setupInteractiveVideo();
    setupHeistFiles();
    setupIngredientsSection();
    setupChoicePanel();
    setupSimulator();
    setupFinalPlating();
    setupBloopers();
    setupScrollEffects();
    setupSoundSystem();
}

// NAVIGATION SYSTEM
function setupNavigation() {
    const navLinks = document.querySelectorAll('.nav-link');
    const hamburger = document.getElementById('navHamburger');
    const navMenu = document.getElementById('navMenu');
    
    // Smooth scrolling for navigation links
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                targetSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
                
                // Close mobile menu if open
                navMenu.classList.remove('active');
                hamburger.classList.remove('active');
                
                // Play navigation sound
                playSound('nav-click');
                
                // Add active state animation
                this.style.transform = 'scale(1.2) rotate(10deg)';
                setTimeout(() => {
                    this.style.transform = '';
                }, 300);
            }
        });
    });
    
    // Mobile hamburger menu
    hamburger.addEventListener('click', function() {
        navMenu.classList.toggle('active');
        hamburger.classList.toggle('active');
        playSound('menu-toggle');
    });
    
    // Update active nav link on scroll
    const sections = document.querySelectorAll('section[id]');
    const navObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const activeLink = document.querySelector(`[href="#${entry.target.id}"]`);
                if (activeLink) {
                    navLinks.forEach(link => link.classList.remove('active'));
                    activeLink.classList.add('active');
                }
            }
        });
    }, { threshold: 0.3 });
    
    sections.forEach(section => {
        navObserver.observe(section);
    });
}

// INTERACTIVE VIDEO SYSTEM
function setupInteractiveVideo() {
    const video = document.getElementById('mainVideo');
    const chaosMeter = document.getElementById('chaosMeter');
    const chaosPercentage = document.getElementById('chaosPercentage');
    const playbackSpeed = document.getElementById('playbackSpeed');
    const subtitleTrack = document.getElementById('subtitleTrack');
    const interactiveButtons = document.querySelectorAll('.interactive-btn');
    const chapterItems = document.querySelectorAll('.chapter-item');
    const videoReactions = document.getElementById('videoReactions');
    
    let chaosLevel = 0;
    let reactionTimeout;
    
    // Video event listeners
    if (video) {
        video.addEventListener('loadedmetadata', function() {
            console.log('Video loaded, duration:', this.duration);
        });
        
        video.addEventListener('timeupdate', function() {
            updateChaosLevel(this.currentTime, this.duration);
            updateChapterHighlight(this.currentTime);
        });
        
        video.addEventListener('play', function() {
            playSound('video-play');
            showVideoReaction('🎬', 'ACTION!');
        });
        
        video.addEventListener('pause', function() {
            showVideoReaction('⏸️', 'PAUSE FOR DRAMA');
        });
        
        video.addEventListener('ended', function() {
            showVideoReaction('🏆', 'MASTERPIECE COMPLETE!');
            playSound('video-end');
        });
    }
    
    // Playback speed control
    if (playbackSpeed) {
        playbackSpeed.addEventListener('change', function() {
            if (video) {
                video.playbackRate = parseFloat(this.value);
                playSound('speed-change');
                
                const messages = {
                    '0.5': 'Savoring the disaster...',
                    '1': 'Normal chaos restored',
                    '1.25': 'Panic mode activated!',
                    '1.5': 'Ludicrous speed!',
                    '2': 'MICROWAVE MODE ENGAGED!'
                };
                
                showVideoReaction('⚡', messages[this.value] || 'Speed changed!');
            }
        });
    }
    
    // Subtitle track control
    if (subtitleTrack) {
        subtitleTrack.addEventListener('change', function() {
            playSound('subtitle-change');
            
            const commentaries = {
                'chef': 'Chef commentary: "What have I done..."',
                'science': 'Scientific analysis: "This defies physics"',
                'comedy': 'Comedy track: "Ba dum tss!"',
                'therapy': 'Therapy session: "It\'s okay, we\'re here for you"'
            };
            
            if (this.value !== 'none') {
                showVideoReaction('🗣️', commentaries[this.value] || 'Commentary activated');
            }
        });
    }
    
    // Interactive buttons
    interactiveButtons.forEach(button => {
        button.addEventListener('click', function() {
            const timestamp = parseInt(this.dataset.timestamp);
            if (video && !isNaN(timestamp)) {
                video.currentTime = timestamp;
                video.play();
                
                const reactions = {
                    'disasterBtn': { emoji: '💥', text: 'DISASTER INCOMING!' },
                    'chaosBtn': { emoji: '🔥', text: 'MAXIMUM CHAOS!' },
                    'wtfBtn': { emoji: '🤯', text: 'WTF MOMENT!' }
                };
                
                const reaction = reactions[this.id];
                if (reaction) {
                    showVideoReaction(reaction.emoji, reaction.text);
                    chaosLevel = Math.min(100, chaosLevel + 25);
                    updateChaosMeter();
                }
                
                playSound('interactive-click');
            }
        });
    });
    
    // Chapter navigation
    chapterItems.forEach(item => {
        item.addEventListener('click', function() {
            const timestamp = parseInt(this.dataset.time);
            if (video && !isNaN(timestamp)) {
                video.currentTime = timestamp;
                video.play();
                playSound('chapter-jump');
                
                showVideoReaction('📚', 'Chapter jumped!');
            }
        });
    });
    
    function updateChaosLevel(currentTime, duration) {
        // Calculate chaos level based on video progress and content
        const progress = (currentTime / duration) * 100;
        
        // Add chaos spikes at specific moments
        const chaosSpikes = {
            30: 20,  // First disaster
            60: 40,  // Maximum chaos
            90: 60,  // WTF moment
            120: 80, // Culinary apocalypse
            150: 90  // Peak chaos
        };
        
        let baseLevel = progress * 0.5; // Base chaos increases with time
        
        // Add spikes
        Object.keys(chaosSpikes).forEach(timestamp => {
            if (Math.abs(currentTime - parseInt(timestamp)) < 5) {
                baseLevel = Math.max(baseLevel, chaosSpikes[timestamp]);
            }
        });
        
        chaosLevel = Math.min(100, baseLevel);
        updateChaosMeter();
    }
    
    function updateChaosMeter() {
        if (chaosMeter && chaosPercentage) {
            chaosMeter.style.width = chaosLevel + '%';
            chaosPercentage.textContent = Math.round(chaosLevel) + '%';
            
            // Change color based on chaos level
            if (chaosLevel > 80) {
                chaosMeter.style.background = 'linear-gradient(45deg, #FF1493, #FF0000)';
            } else if (chaosLevel > 50) {
                chaosMeter.style.background = 'linear-gradient(45deg, #FFD700, #FF1493)';
            } else {
                chaosMeter.style.background = 'linear-gradient(45deg, #FFD700, #40E0D0)';
            }
        }
    }
    
    function updateChapterHighlight(currentTime) {
        chapterItems.forEach(item => {
            const startTime = parseInt(item.dataset.time);
            const nextItem = item.nextElementSibling;
            const endTime = nextItem ? parseInt(nextItem.dataset.time) : Infinity;
            
            if (currentTime >= startTime && currentTime < endTime) {
                item.classList.add('active');
            } else {
                item.classList.remove('active');
            }
        });
    }
    
    function showVideoReaction(emoji, text) {
        const reactionBubble = videoReactions.querySelector('.reaction-bubble');
        if (reactionBubble) {
            const emojiSpan = reactionBubble.querySelector('.reaction-emoji');
            const textSpan = reactionBubble.querySelector('.reaction-text');
            
            emojiSpan.textContent = emoji;
            textSpan.textContent = text;
            
            reactionBubble.style.display = 'flex';
            
            // Clear previous timeout
            if (reactionTimeout) {
                clearTimeout(reactionTimeout);
            }
            
            // Hide after animation
            reactionTimeout = setTimeout(() => {
                reactionBubble.style.display = 'none';
            }, 2000);
        }
    }
}

// CUSTOM CURSOR SYSTEM
function setupCustomCursor() {
    const cursor = document.getElementById('cursor');
    const cursorEmojis = ['🍳', '🔥', '💥', '🧈', '🍌', '🥄', '⚡'];
    let currentEmojiIndex = 0;
    
    document.addEventListener('mousemove', (e) => {
        cursor.style.left = e.clientX + 'px';
        cursor.style.top = e.clientY + 'px';
    });
    
    // Change cursor emoji on clicks
    document.addEventListener('click', () => {
        currentEmojiIndex = (currentEmojiIndex + 1) % cursorEmojis.length;
        cursor.textContent = cursorEmojis[currentEmojiIndex];
        createExplosionEffect(event.clientX, event.clientY);
    });
    
    // Hover effects
    document.querySelectorAll('button, .interactive-item, .sticky-note').forEach(element => {
        element.addEventListener('mouseenter', () => {
            cursor.style.transform = 'scale(1.5) rotate(45deg)';
        });
        
        element.addEventListener('mouseleave', () => {
            cursor.style.transform = 'scale(1) rotate(0deg)';
        });
    });
}

// LANDING SECTION INTERACTIONS
function setupLandingInteractions() {
    const interactiveItems = document.querySelectorAll('.interactive-item');
    const startButton = document.getElementById('startChaos');
    
    interactiveItems.forEach(item => {
        item.addEventListener('click', function() {
            const quote = this.dataset.quote;
            const sound = this.dataset.sound;
            
            showQuoteTooltip(this, quote);
            playSound(sound);
            
            // Random chaos effect
            this.style.transform = `scale(${Math.random() * 0.5 + 1}) rotate(${Math.random() * 720}deg)`;
            
            setTimeout(() => {
                this.style.transform = '';
            }, 1000);
        });
    });
    
    startButton.addEventListener('click', function() {
        playSound('chaos');
        this.classList.add('exploding');
        
        // Scroll to next section with dramatic effect
        setTimeout(() => {
            document.getElementById('heist').scrollIntoView({ 
                behavior: 'smooth',
                block: 'start'
            });
        }, 800);
        
        // Create multiple explosions
        for (let i = 0; i < 10; i++) {
            setTimeout(() => {
                createExplosionEffect(
                    this.offsetLeft + Math.random() * this.offsetWidth,
                    this.offsetTop + Math.random() * this.offsetHeight
                );
            }, i * 100);
        }
    });
}

// HEIST FILES ACCORDION
function setupHeistFiles() {
    const accordionHeaders = document.querySelectorAll('.accordion-header');
    
    accordionHeaders.forEach(header => {
        header.addEventListener('click', function() {
            const targetId = this.dataset.target;
            const content = document.getElementById(targetId);
            const allContents = document.querySelectorAll('.accordion-content');
            
            // Close all others
            allContents.forEach(c => {
                if (c !== content) {
                    c.classList.remove('active');
                }
            });
            
            // Toggle current
            content.classList.toggle('active');
            
            if (content.classList.contains('active')) {
                playSound('file-open');
                // Simulate typing effect for mission notes
                const notes = content.querySelector('.mission-notes');
                if (notes) {
                    typewriterEffect(notes);
                }
            }
        });
    });
}

// INGREDIENTS SECTION
function setupIngredientsSection() {
    const stickyNotes = document.querySelectorAll('.sticky-note');
    const rateButtons = document.querySelectorAll('.rate-btn');
    const recipeGenerator = document.getElementById('randomRecipe');
    const recipeOutput = document.getElementById('recipeOutput');
    
    // Sticky note interactions
    stickyNotes.forEach(note => {
        note.addEventListener('click', function() {
            this.style.transform = `rotate(${Math.random() * 20 - 10}deg) scale(1.1)`;
            playSound('paper-crinkle');
            
            setTimeout(() => {
                this.style.transform = '';
            }, 500);
        });
    });
    
    // Rating buttons
    rateButtons.forEach(button => {
        button.addEventListener('click', function() {
            const item = this.dataset.item;
            showRandomRating(this, item);
        });
    });
    
    // Recipe generator
    recipeGenerator.addEventListener('click', function() {
        generateRandomRecipe();
        playSound('generator');
    });
    
    function generateRandomRecipe() {
        const ingredients = ['Pop-Tart', 'Ketchup', 'Beef Jerky', 'Mystery Cheese', 'Banana', 'Butter'];
        const methods = ['microwave', 'iron', 'kettle steam', 'radiator heat', 'laptop cooling'];
        const descriptors = ['questionable', 'revolutionary', 'traumatic', 'legendary', 'forbidden'];
        
        const randomIngredients = ingredients.sort(() => 0.5 - Math.random()).slice(0, 3);
        const randomMethod = methods[Math.floor(Math.random() * methods.length)];
        const randomDescriptor = descriptors[Math.floor(Math.random() * descriptors.length)];
        
        const recipe = `
            <h3>🔥 ${randomDescriptor.toUpperCase()} CREATION 🔥</h3>
            <p><strong>Ingredients:</strong> ${randomIngredients.join(', ')}</p>
            <p><strong>Method:</strong> ${randomMethod}</p>
            <p><strong>Cook Time:</strong> ${Math.floor(Math.random() * 10) + 1} minutes (or until fire alarm)</p>
            <p><strong>Serves:</strong> ${Math.floor(Math.random() * 4) + 1} brave souls</p>
            <p><em>"${getRandomQuote()}"</em></p>
        `;
        
        recipeOutput.innerHTML = recipe;
        recipeOutput.classList.add('show');
    }
}

// CHOICE PANEL
function setupChoicePanel() {
    const talabatBtn = document.getElementById('talabatBtn');
    const cookBtn = document.getElementById('cookBtn');
    const talabatConsequence = document.getElementById('talabatConsequence');
    const cookConsequence = document.getElementById('cookConsequence');
    
    talabatBtn.addEventListener('click', function() {
        talabatConsequence.classList.add('show');
        cookConsequence.classList.remove('show');
        playSound('money-drain');
        
        // Animate money falling
        createMoneyRain();
    });
    
    cookBtn.addEventListener('click', function() {
        cookConsequence.classList.add('show');
        talabatConsequence.classList.remove('show');
        playSound('fire-alarm');
        
        // Scroll to simulator
        setTimeout(() => {
            document.getElementById('simulator').scrollIntoView({ 
                behavior: 'smooth' 
            });
        }, 1500);
    });
}

// SIMULATOR DRAG AND DROP
function setupSimulator() {
    const draggableItems = document.querySelectorAll('.draggable-item');
    const microwaveInterior = document.getElementById('microwaveInterior');
    const startMicrowave = document.getElementById('startMicrowave');
    const clearMicrowave = document.getElementById('clearMicrowave');
    const reactionDisplay = document.getElementById('reactionDisplay');
    
    let microwaveContents = [];
    
    // Drag and drop functionality
    draggableItems.forEach(item => {
        item.addEventListener('dragstart', function(e) {
            e.dataTransfer.setData('text/plain', this.dataset.ingredient);
            this.classList.add('dragging');
        });
        
        item.addEventListener('dragend', function() {
            this.classList.remove('dragging');
        });
    });
    
    microwaveInterior.addEventListener('dragover', function(e) {
        e.preventDefault();
        this.classList.add('drag-over');
    });
    
    microwaveInterior.addEventListener('dragleave', function() {
        this.classList.remove('drag-over');
    });
    
    microwaveInterior.addEventListener('drop', function(e) {
        e.preventDefault();
        this.classList.remove('drag-over');
        
        const ingredient = e.dataTransfer.getData('text/plain');
        addToMicrowave(ingredient);
    });
    
    function addToMicrowave(ingredient) {
        if (microwaveContents.length < 6) {
            microwaveContents.push(ingredient);
            updateMicrowaveDisplay();
            playSound('microwave-beep');
        } else {
            showReaction("🚨 MICROWAVE OVERLOAD! 🚨", 'error');
        }
    }
    
    function updateMicrowaveDisplay() {
        const dropHint = microwaveInterior.querySelector('.drop-hint');
        if (microwaveContents.length > 0) {
            dropHint.innerHTML = microwaveContents.map(ing => `<div>${getIngredientEmoji(ing)} ${ing}</div>`).join('');
        } else {
            dropHint.innerHTML = 'Drop ingredients here!';
        }
    }
    
    startMicrowave.addEventListener('click', function() {
        if (microwaveContents.length > 0) {
            startMicrowaving();
        } else {
            showReaction("🤔 Add some ingredients first!", 'warning');
        }
    });
    
    clearMicrowave.addEventListener('click', function() {
        microwaveContents = [];
        updateMicrowaveDisplay();
        reactionDisplay.innerHTML = '';
        playSound('microwave-clear');
    });
    
    function startMicrowaving() {
        const microwave = document.getElementById('microwave');
        microwave.classList.add('microwave-running');
        
        let countdown = 30;
        const display = document.querySelector('.microwave-display');
        
        const timer = setInterval(() => {
            display.textContent = `00:${countdown.toString().padStart(2, '0')}`;
            countdown--;
            
            if (countdown < 0) {
                clearInterval(timer);
                finishMicrowaving();
            }
        }, 100);
        
        playSound('microwave-running');
    }
    
    function finishMicrowaving() {
        const microwave = document.getElementById('microwave');
        microwave.classList.remove('microwave-running');
        
        const display = document.querySelector('.microwave-display');
        display.textContent = 'DONE';
        
        const reaction = generateMicrowaveReaction(microwaveContents);
        showReaction(reaction.text, reaction.type);
        
        playSound('microwave-ding');
        
        // Scroll to final plating
        setTimeout(() => {
            document.getElementById('plating').scrollIntoView({ 
                behavior: 'smooth' 
            });
        }, 2000);
    }
}

// FINAL PLATING EFFECTS
function setupFinalPlating() {
    const realityDish = document.getElementById('realityDish');
    
    // Intersection Observer for dramatic reveal
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    playSound('record-scratch');
                    realityDish.classList.add('revealed');
                }, 1000);
            }
        });
    });
    
    observer.observe(realityDish);
}

// BLOOPERS SECTION
function setupBloopers() {
    const blooperItems = document.querySelectorAll('.blooper-item');
    const uploadArea = document.getElementById('uploadArea');
    const disasterUpload = document.getElementById('disasterUpload');
    
    blooperItems.forEach(item => {
        item.addEventListener('click', function() {
            const blooперType = this.dataset.blooper;
            playBlooper(blooперType);
        });
    });
    
    disasterUpload.addEventListener('change', function(e) {
        if (e.target.files[0]) {
            handleDisasterUpload(e.target.files[0]);
        }
    });
}

// SOUND SYSTEM
function setupSoundSystem() {
    // Create audio context for better sound control
    const AudioContext = window.AudioContext || window.webkitAudioContext;
    if (AudioContext) {
        window.audioContext = new AudioContext();
    }
}

function playSound(soundType) {
    // Using Web Audio API to generate fun sounds
    if (!window.audioContext) return;
    
    const ctx = window.audioContext;
    const oscillator = ctx.createOscillator();
    const gainNode = ctx.createGain();
    
    oscillator.connect(gainNode);
    gainNode.connect(ctx.destination);
    
    switch(soundType) {
        case 'squish':
            oscillator.frequency.setValueAtTime(150, ctx.currentTime);
            oscillator.frequency.exponentialRampToValueAtTime(50, ctx.currentTime + 0.2);
            gainNode.gain.setValueAtTime(0.3, ctx.currentTime);
            gainNode.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.2);
            break;
            
        case 'crinkle':
            oscillator.type = 'sawtooth';
            oscillator.frequency.setValueAtTime(800, ctx.currentTime);
            oscillator.frequency.linearRampToValueAtTime(400, ctx.currentTime + 0.1);
            gainNode.gain.setValueAtTime(0.2, ctx.currentTime);
            gainNode.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.1);
            break;
            
        case 'microwave-beep':
            oscillator.frequency.setValueAtTime(880, ctx.currentTime);
            gainNode.gain.setValueAtTime(0.3, ctx.currentTime);
            gainNode.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.1);
            break;
            
        case 'nav-click':
        case 'interactive-click':
            oscillator.frequency.setValueAtTime(600, ctx.currentTime);
            oscillator.frequency.linearRampToValueAtTime(800, ctx.currentTime + 0.1);
            gainNode.gain.setValueAtTime(0.2, ctx.currentTime);
            gainNode.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.1);
            break;
            
        case 'video-play':
            oscillator.type = 'square';
            oscillator.frequency.setValueAtTime(440, ctx.currentTime);
            oscillator.frequency.linearRampToValueAtTime(880, ctx.currentTime + 0.2);
            gainNode.gain.setValueAtTime(0.3, ctx.currentTime);
            gainNode.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.2);
            break;
            
        case 'chapter-jump':
            oscillator.type = 'sawtooth';
            oscillator.frequency.setValueAtTime(220, ctx.currentTime);
            oscillator.frequency.exponentialRampToValueAtTime(880, ctx.currentTime + 0.3);
            gainNode.gain.setValueAtTime(0.2, ctx.currentTime);
            gainNode.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.3);
            break;
            
        case 'chaos':
        case 'fire-alarm':
            // Create chaos sound with multiple oscillators
            for (let i = 0; i < 5; i++) {
                const chaosOsc = ctx.createOscillator();
                const chaosGain = ctx.createGain();
                chaosOsc.connect(chaosGain);
                chaosGain.connect(ctx.destination);
                
                chaosOsc.frequency.setValueAtTime(Math.random() * 1000 + 200, ctx.currentTime);
                chaosGain.gain.setValueAtTime(0.1, ctx.currentTime);
                chaosGain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.5);
                
                chaosOsc.start();
                chaosOsc.stop(ctx.currentTime + 0.5);
            }
            return; // Don't start the main oscillator
            
        default:
            oscillator.frequency.setValueAtTime(440, ctx.currentTime);
            gainNode.gain.setValueAtTime(0.1, ctx.currentTime);
            gainNode.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.2);
    }
    
    oscillator.start();
    oscillator.stop(ctx.currentTime + 0.3);
}

// HELPER FUNCTIONS
function createExplosionEffect(x, y) {
    for (let i = 0; i < 10; i++) {
        const particle = document.createElement('div');
        particle.className = 'explosion-particle';
        particle.style.left = x + 'px';
        particle.style.top = y + 'px';
        particle.style.setProperty('--dx', (Math.random() - 0.5) * 200 + 'px');
        particle.style.setProperty('--dy', (Math.random() - 0.5) * 200 + 'px');
        
        document.body.appendChild(particle);
        
        setTimeout(() => {
            document.body.removeChild(particle);
        }, 1000);
    }
}

function showQuoteTooltip(element, quote) {
    const tooltip = document.createElement('div');
    tooltip.className = 'tooltip';
    tooltip.textContent = quote;
    
    const rect = element.getBoundingClientRect();
    tooltip.style.left = rect.left + 'px';
    tooltip.style.top = rect.bottom + 10 + 'px';
    
    document.body.appendChild(tooltip);
    
    setTimeout(() => {
        tooltip.style.opacity = '1';
    }, 10);
    
    setTimeout(() => {
        if (document.body.contains(tooltip)) {
            document.body.removeChild(tooltip);
        }
    }, 3000);
}

function typewriterEffect(element) {
    const text = element.textContent;
    element.textContent = '';
    let i = 0;
    
    const timer = setInterval(() => {
        element.textContent += text[i];
        i++;
        if (i >= text.length) {
            clearInterval(timer);
        }
    }, 50);
}

function showRandomRating(button, item) {
    const reactions = [
        "🤢 That's a war crime!",
        "😍 Surprisingly edible!",
        "🔥 Gordon Ramsay is crying!",
        "⭐ Michelin star material... maybe?",
        "💀 RIP taste buds",
        "🎭 Performance art at its finest!",
        "🚨 Call the food police!",
        "👑 Dorm royalty approved!"
    ];
    
    const randomReaction = reactions[Math.floor(Math.random() * reactions.length)];
    button.textContent = randomReaction;
    
    setTimeout(() => {
        button.textContent = 'Rate This Chaos';
    }, 3000);
}

function getRandomQuote() {
    const quotes = [
        "This changes everything...",
        "My ancestors are crying.",
        "What have we become?",
        "This is either genius or madness.",
        "Future generations will thank us... or hunt us.",
        "Science has gone too far.",
        "This wasn't in the cookbook.",
        "The microwave is judging us."
    ];
    
    return quotes[Math.floor(Math.random() * quotes.length)];
}

function getIngredientEmoji(ingredient) {
    const emojis = {
        'pop-tart': '🔥',
        'cheese': '🧀',
        'ketchup': '🍅',
        'banana': '🍌',
        'jerky': '🥩',
        'butter': '🧈'
    };
    
    return emojis[ingredient] || '🤔';
}

function generateMicrowaveReaction(contents) {
    const combinations = {
        'pop-tart,cheese': { text: "🔥 You've created the world's first breakfast pizza! It's... actually not terrible?", type: 'success' },
        'ketchup,banana': { text: "😱 This unholy alliance has opened a portal to flavor hell!", type: 'disaster' },
        'jerky,butter': { text: "🥩 Congratulations! You've made jerky... butterier. Somehow.", type: 'weird' },
        'pop-tart,ketchup,cheese': { text: "🍕 It's like pizza's disappointing cousin who lives in the basement!", type: 'chaos' }
    };
    
    const contentStr = contents.sort().join(',');
    
    if (combinations[contentStr]) {
        return combinations[contentStr];
    }
    
    // Generate random reaction based on number of ingredients
    if (contents.length >= 4) {
        return { text: "💥 TOO MUCH CHAOS! The microwave is having an existential crisis!", type: 'explosion' };
    } else if (contents.length === 1) {
        return { text: "🤔 Simple... but are we sure this counts as cooking?", type: 'boring' };
    } else {
        return { text: "🎲 " + getRandomQuote(), type: 'random' };
    }
}

function showReaction(text, type) {
    const reactionDisplay = document.getElementById('reactionDisplay');
    reactionDisplay.innerHTML = `<div class="reaction-${type}">${text}</div>`;
    
    // Add special effects based on type
    if (type === 'explosion') {
        createExplosionEffect(
            reactionDisplay.offsetLeft + reactionDisplay.offsetWidth / 2,
            reactionDisplay.offsetTop + reactionDisplay.offsetHeight / 2
        );
    }
}

function createMoneyRain() {
    for (let i = 0; i < 20; i++) {
        setTimeout(() => {
            const money = document.createElement('div');
            money.textContent = '💸';
            money.style.position = 'fixed';
            money.style.left = Math.random() * window.innerWidth + 'px';
            money.style.top = '-50px';
            money.style.fontSize = '24px';
            money.style.pointerEvents = 'none';
            money.style.zIndex = '9999';
            money.style.animation = 'fall 3s linear forwards';
            
            document.body.appendChild(money);
            
            setTimeout(() => {
                if (document.body.contains(money)) {
                    document.body.removeChild(money);
                }
            }, 3000);
        }, i * 100);
    }
}

function playBlooper(type) {
    const messages = {
        'kettle': "☕ Day 47: The kettle still thinks it's a percussion instrument.",
        'iron': "👔 Plot twist: The iron was never meant for clothes.",
        'rice': "🍚 The Great Rice Flood of 2024. We don't talk about it."
    };
    
    alert(messages[type] || "🎬 Blooper reel coming soon!");
}

function handleDisasterUpload(file) {
    const uploadArea = document.getElementById('uploadArea');
    uploadArea.innerHTML = `
        <p>📸 Disaster uploaded!</p>
        <p><em>"${file.name}" - A masterpiece of chaos</em></p>
        <p>🏆 Your contribution to culinary terrorism has been noted.</p>
    `;
    playSound('chaos');
}

function setupScrollEffects() {
    // Add scroll-triggered animations
    const sections = document.querySelectorAll('section');
    
    const scrollObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.transform = 'translateY(0)';
                entry.target.style.opacity = '1';
            }
        });
    }, { threshold: 0.1 });
    
    sections.forEach(section => {
        section.style.transform = 'translateY(50px)';
        section.style.opacity = '0';
        section.style.transition = 'transform 0.6s ease, opacity 0.6s ease';
        scrollObserver.observe(section);
    });
}

// Add CSS for money falling animation
const style = document.createElement('style');
style.textContent = `
    @keyframes fall {
        to {
            transform: translateY(${window.innerHeight + 100}px) rotate(360deg);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style); 