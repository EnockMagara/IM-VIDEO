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

// INTERACTIVE VIDEO SYSTEM WITH YOUTUBE API
let player;
let currentVideoState = 'initial';
let choiceShown = false;

function setupInteractiveVideo() {
    // Setup choice buttons first
    setupChoiceButtons();
    
    // Update video info display
    updateVideoInfo('initial');
    
    // Load YouTube API if not already loaded
    if (typeof YT === 'undefined') {
        console.log('Loading YouTube API...');
        const tag = document.createElement('script');
        tag.src = 'https://www.youtube.com/iframe_api';
        tag.onerror = function() {
            console.error('Failed to load YouTube API');
            showFallbackMessage('Failed to load YouTube API');
        };
        const firstScriptTag = document.getElementsByTagName('script')[0];
        firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
        
        // Set up the callback for when API is ready
        window.onYouTubeIframeAPIReady = function() {
            console.log('YouTube API ready');
            initializePlayer();
        };
    } else if (typeof YT.Player !== 'undefined') {
        // API already loaded
        console.log('YouTube API already loaded');
        initializePlayer();
    } else {
        // API is loading, wait for it
        console.log('YouTube API loading, waiting...');
        window.onYouTubeIframeAPIReady = function() {
            console.log('YouTube API ready');
            initializePlayer();
        };
    }
}

function initializePlayer() {
    const playerElement = document.getElementById('mainVideoPlayer');
    if (!playerElement) {
        console.error('Video player element not found');
        return;
    }
    
    // Check if YT is available
    if (typeof YT === 'undefined' || typeof YT.Player === 'undefined') {
        console.error('YouTube API not loaded');
        setTimeout(initializePlayer, 1000); // Retry after 1 second
        return;
    }
    
    try {
        player = new YT.Player('mainVideoPlayer', {
            videoId: 'QKfo0UiNG3c',
            playerVars: {
                'enablejsapi': 1,
                'rel': 0,
                'modestbranding': 1,
                'fs': 1,
                'cc_load_policy': 0,
                'iv_load_policy': 3,
                'autohide': 1,
                'origin': window.location.origin
            },
            events: {
                'onReady': onPlayerReady,
                'onStateChange': onPlayerStateChange,
                'onError': onPlayerError
            }
        });
    } catch (error) {
        console.error('Error initializing YouTube player:', error);
        showFallbackMessage();
    }
}

function onPlayerError(event) {
    console.error('YouTube player error:', event.data);
    let errorMessage = 'Video unavailable';
    
    switch(event.data) {
        case 2:
            errorMessage = 'Invalid video ID';
            break;
        case 5:
            errorMessage = 'Video cannot be played in an HTML5 player';
            break;
        case 100:
            errorMessage = 'Video not found or private';
            break;
        case 101:
        case 150:
            errorMessage = 'Video owner has restricted embedding';
            break;
        default:
            errorMessage = 'Unknown video error';
    }
    
    showFallbackMessage(errorMessage);
}

function showFallbackMessage(message = 'Video unavailable') {
    const playerElement = document.getElementById('mainVideoPlayer');
    if (playerElement) {
        playerElement.innerHTML = `
            <div style="
                display: flex;
                flex-direction: column;
                align-items: center;
                justify-content: center;
                height: 100%;
                background: #333;
                color: white;
                font-family: 'Comic Neue', cursive;
                text-align: center;
                padding: 2rem;
            ">
                <div style="font-size: 3rem; margin-bottom: 1rem;">⚠️</div>
                <h3 style="margin-bottom: 1rem; color: #FFD700;">${message}</h3>
                <p style="margin-bottom: 2rem; opacity: 0.8;">Try using simple iframe embed or watch directly on YouTube:</p>
                <div style="display: flex; flex-direction: column; gap: 1rem; width: 100%;">
                    <button onclick="trySimpleEmbed()" style="
                        background: #FFD700;
                        color: #333;
                        padding: 1rem 2rem;
                        border-radius: 10px;
                        border: none;
                        font-weight: bold;
                        cursor: pointer;
                        font-family: 'Comic Neue', cursive;
                    ">🔄 Try Simple Video Embed</button>
                    <a href="https://youtu.be/QKfo0UiNG3c" target="_blank" style="
                        background: #FF1493;
                        color: white;
                        padding: 1rem 2rem;
                        border-radius: 10px;
                        text-decoration: none;
                        font-weight: bold;
                        text-align: center;
                    ">🎬 Watch Initial Video on YouTube</a>
                    <a href="https://youtu.be/ZwLZw_CWIP8" target="_blank" style="
                        background: #40E0D0;
                        color: white;
                        padding: 1rem 2rem;
                        border-radius: 10px;
                        text-decoration: none;
                        font-weight: bold;
                        text-align: center;
                    ">📱 Watch Talabat Choice on YouTube</a>
                    <a href="https://youtu.be/itIWt3OlerI" target="_blank" style="
                        background: #CC5500;
                        color: white;
                        padding: 1rem 2rem;
                        border-radius: 10px;
                        text-decoration: none;
                        font-weight: bold;
                        text-align: center;
                    ">👨‍🍳 Watch Cook Choice on YouTube</a>
                </div>
            </div>
        `;
    }
}

function trySimpleEmbed() {
    const playerElement = document.getElementById('mainVideoPlayer');
    if (playerElement) {
        console.log('Trying simple iframe embed...');
        playerElement.innerHTML = `
            <iframe 
                src="https://www.youtube.com/embed/QKfo0UiNG3c?rel=0&modestbranding=1&autoplay=0" 
                frameborder="0" 
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
                allowfullscreen
                style="width: 100%; height: 100%; border-radius: 15px;"
                onload="console.log('Simple iframe loaded successfully')"
                onerror="console.log('Simple iframe failed to load')">
            </iframe>
        `;
        
        // Hide choice overlay since we can't control simple iframe
        const choiceOverlay = document.getElementById('choiceOverlay');
        if (choiceOverlay) {
            choiceOverlay.style.display = 'none';
        }
        
        // Update video info
        updateVideoInfo('simple');
        
        // Show manual choice buttons
        setTimeout(showManualChoiceButtons, 3000);
    }
}

function showManualChoiceButtons() {
    const videoInfo = document.querySelector('.video-info');
    if (videoInfo) {
        const manualChoices = document.createElement('div');
        manualChoices.innerHTML = `
            <div style="margin-top: 2rem; text-align: center;">
                <h4 style="color: #FFD700; margin-bottom: 1rem; font-family: 'Permanent Marker', cursive;">
                    Make Your Choice (Manual):
                </h4>
                <div style="display: flex; gap: 1rem; justify-content: center; flex-wrap: wrap;">
                                         <button onclick="switchToVideo('ZwLZw_CWIP8')" style="
                         background: #40E0D0;
                         color: white;
                         padding: 1rem 2rem;
                         border-radius: 10px;
                         border: none;
                         cursor: pointer;
                         font-weight: bold;
                         font-family: 'Comic Neue', cursive;
                     ">📱 Order from Talabat</button>
                     <button onclick="switchToVideo('itIWt3OlerI')" style="
                         background: #CC5500;
                         color: white;
                         padding: 1rem 2rem;
                         border-radius: 10px;
                         border: none;
                         cursor: pointer;
                         font-weight: bold;
                         font-family: 'Comic Neue', cursive;
                     ">👨‍🍳 Cook in Dorm</button>
                </div>
            </div>
        `;
        videoInfo.appendChild(manualChoices);
    }
}

function switchToVideo(videoId) {
    const playerElement = document.getElementById('mainVideoPlayer');
    if (playerElement) {
        playerElement.innerHTML = `
            <iframe 
                src="https://www.youtube.com/embed/${videoId}?rel=0&modestbranding=1&autoplay=1" 
                frameborder="0" 
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
                allowfullscreen
                style="width: 100%; height: 100%; border-radius: 15px;">
            </iframe>
        `;
        
        // Update video info based on choice
        if (videoId === 'ZwLZw_CWIP8') {
            updateVideoInfo('talabat');
        } else if (videoId === 'itIWt3OlerI') {
            updateVideoInfo('cook');
        }
    }
}

function onPlayerReady(event) {
    console.log('YouTube player ready');
    // Start checking for choice point
    startTimeTracking();
}

function onPlayerStateChange(event) {
    if (event.data == YT.PlayerState.PLAYING) {
        console.log('Video playing');
        if (!choiceShown && currentVideoState === 'initial') {
            startTimeTracking();
        }
    } else if (event.data == YT.PlayerState.ENDED) {
        console.log('Video ended');
        // Reset for replay
        setTimeout(() => {
            resetToInitial();
        }, 3000);
    }
}

function startTimeTracking() {
    if (!player) return;
    
    const checkTime = setInterval(() => {
        if (player && player.getCurrentTime) {
            const currentTime = player.getCurrentTime();
            
            // Show choice overlay at 3:02 (182 seconds)
            if (currentTime >= 182 && !choiceShown && currentVideoState === 'initial') {
                showChoiceOverlay();
                choiceShown = true;
                clearInterval(checkTime);
            }
            
            // Clear interval if video is no longer playing
            if (player.getPlayerState() !== YT.PlayerState.PLAYING) {
                clearInterval(checkTime);
            }
        }
    }, 1000);
}

function showChoiceOverlay() {
    const overlay = document.getElementById('choiceOverlay');
    if (overlay) {
        overlay.style.display = 'flex';
        // Pause the video when overlay shows
        if (player) {
            player.pauseVideo();
        }
        playSound('choice-appear');
    }
}

function hideChoiceOverlay() {
    const overlay = document.getElementById('choiceOverlay');
    if (overlay) {
        overlay.style.display = 'none';
    }
}

function setupChoiceButtons() {
    const talabatBtn = document.getElementById('talabatChoice');
    const cookBtn = document.getElementById('cookChoice');
    
    if (talabatBtn) {
        talabatBtn.addEventListener('click', function() {
            selectVideo('talabat', 'ZwLZw_CWIP8');
        });
    }
    
    if (cookBtn) {
        cookBtn.addEventListener('click', function() {
            selectVideo('cook', 'itIWt3OlerI');
        });
    }
}

function selectVideo(choice, videoId) {
    hideChoiceOverlay();
    
    if (player && player.loadVideoById) {
        player.loadVideoById(videoId);
        currentVideoState = choice;
        updateVideoInfo(choice);
        playSound('choice-select');
        
        // Show selection feedback
        const messages = {
            'talabat': 'Ordering from Talabat - the easy way out!',
            'cook': 'Cooking in the dorm - the adventurous path!'
        };
        
        setTimeout(() => {
            showVideoReaction('🎬', messages[choice]);
        }, 1000);
    }
}

function updateVideoInfo(state) {
    const titleElement = document.getElementById('currentVideoTitle');
    const descriptionElement = document.getElementById('currentVideoDescription');
    
    const videoInfo = {
        'initial': {
            title: 'Dorm Gourmet: From D2 to Decision',
            description: 'Watch the journey from D2 dining hall to the convenience store, leading to the ultimate choice...'
        },
        'simple': {
            title: 'Dorm Gourmet: From D2 to Decision (Simple Mode)',
            description: 'Watch the journey and manually select your choice below when ready!'
        },
        'talabat': {
            title: 'The Safe Option: Talabat Delivery',
            description: 'But wait... there\'s a plot twist! The Talabat bag contains something unexpected.'
        },
        'cook': {
            title: 'The Experimental Path: Dorm Kitchen Creation',
            description: 'No heating required - just canned drink over bread, squeezed tomato, and whatever\'s in that mystery can!'
        }
    };
    
    if (titleElement && videoInfo[state]) {
        titleElement.textContent = videoInfo[state].title;
    }
    
    if (descriptionElement && videoInfo[state]) {
        descriptionElement.textContent = videoInfo[state].description;
    }
}

function resetToInitial() {
    if (player && player.loadVideoById) {
        player.loadVideoById('QKfo0UiNG3c');
        currentVideoState = 'initial';
        choiceShown = false;
        updateVideoInfo('initial');
        hideChoiceOverlay();
    }
}

// Legacy video functions for compatibility
function showVideoReaction(emoji, text) {
    // Create a simple reaction display
    const reactionDisplay = document.createElement('div');
    reactionDisplay.className = 'video-reaction-popup';
    reactionDisplay.innerHTML = `<span class="reaction-emoji">${emoji}</span><span class="reaction-text">${text}</span>`;
    reactionDisplay.style.cssText = `
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        background: rgba(0, 0, 0, 0.9);
        color: white;
        padding: 1rem 2rem;
        border-radius: 25px;
        border: 2px solid #FFD700;
        z-index: 1000;
        font-family: 'Comic Neue', cursive;
        font-size: 1.2rem;
        animation: reactionPop 2s ease-out forwards;
        pointer-events: none;
    `;
    
    document.body.appendChild(reactionDisplay);
    
    setTimeout(() => {
        if (reactionDisplay.parentNode) {
            reactionDisplay.parentNode.removeChild(reactionDisplay);
        }
         }, 2000);
}

// Legacy video functions removed - replaced with YouTube API functionality above

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