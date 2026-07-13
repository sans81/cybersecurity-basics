// Darbz - Your Cybersecurity Guide
// A supportive and educational companion

const Darbz_RESPONSES = {
  welcome: [
    "Hey! I'm Darbz. Ready to learn real cybersecurity? 🔒",
    "Let's protect the internet together. You've got this. 💪",
    "Welcome to the course. Let's make you a security expert.",
    "I'm here to help you understand digital safety.",
  ],
  correct: [
    "Excellent! You got that right. 🎯",
    "That's correct! You're getting it. 💡",
    "Perfect! You understand this well. 🏆",
    "Correct! Your cyber security knowledge is growing. 📈",
    "Great job! You nailed that. ✓",
    "That's the right answer. Keep this momentum going!",
  ],
  incorrect: [
    "Not quite. Review the concept and try again. 📖",
    "That's not it, but you're on the right track. Try once more.",
    "Close, but not correct. Let's look at this again.",
    "Not this time. But learning is about practice!",
  ],
  password: [
    "Strong passwords are your first line of defense.",
    "Mix uppercase, lowercase, numbers, and symbols for real security.",
    "Length matters. Aim for 12+ characters minimum.",
    "Never use personal information or common words.",
  ],
  phishing: [
    "That email is definitely suspicious. Good catch! 🎣",
    "Phishing emails try to trick you into revealing passwords.",
    "Always check the sender address carefully.",
    "When in doubt, don't click. That's the safe choice.",
  ],
  twofa: [
    "2FA adds serious protection to your accounts. Smart move.",
    "Two-Factor Authentication: something you know + something you have.",
    "Enabling 2FA significantly reduces account compromise risk.",
    "Most attacks fail when 2FA is enabled. Use it everywhere.",
  ],
  updates: [
    "Updates aren't just new features—they patch security holes.",
    "Hackers exploit known vulnerabilities. Staying updated matters.",
    "Apply security updates as soon as they're available.",
    "Outdated software is one of the biggest security risks.",
  ],
  random: [
    "Digital security skills are valuable for your entire future.",
    "The skills you learn here apply everywhere online.",
    "You're becoming more aware of digital threats. That matters.",
    "Knowledge is your best defense against cyber attacks.",
    "You're already thinking like a security professional.",
  ],
  encouragement: [
    "You're making real progress. 💪",
    "This is challenging material—and you're handling it well.",
    "One more module and you'll be complete!",
    "Your dedication to learning is impressive.",
    "You're building skills that will last a lifetime.",
  ],
};

// Audio Functions
function playSound(type) {
  // Create audio context
  const audioContext = new (window.AudioContext || window.webkitAudioContext)();
  
  if (type === 'correct') {
    // Success sound: ascending beep
    playTone(audioContext, 800, 0.1);
    setTimeout(() => playTone(audioContext, 1000, 0.1), 100);
    setTimeout(() => playTone(audioContext, 1200, 0.1), 200);
  } else if (type === 'incorrect') {
    // Error sound: descending buzz
    playTone(audioContext, 400, 0.1);
    setTimeout(() => playTone(audioContext, 300, 0.1), 100);
    setTimeout(() => playTone(audioContext, 200, 0.1), 200);
  } else if (type === 'woof') {
    // Dog bark sound: multiple tones
    playTone(audioContext, 500, 0.15);
    setTimeout(() => playTone(audioContext, 600, 0.15), 150);
  }
}

function playTone(audioContext, frequency, duration) {
  const oscillator = audioContext.createOscillator();
  const gainNode = audioContext.createGain();
  
  oscillator.connect(gainNode);
  gainNode.connect(audioContext.destination);
  
  oscillator.frequency.value = frequency;
  oscillator.type = 'sine';
  
  gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
  gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + duration);
  
  oscillator.start(audioContext.currentTime);
  oscillator.stop(audioContext.currentTime + duration);
}

// Mascot Initialization
function initDarbz() {
  const mascotContainer = document.querySelector('.mascot-container');
  
  if (!mascotContainer) {
    console.log('Mascot container not found');
    return;
  }
  
  const mascot = mascotContainer.querySelector('.mascot');
  mascot.addEventListener('click', () => {
    playSound('woof');
    showRandomResponse('random');
  });
  
  // Show welcome message on page load
  setTimeout(() => {
    showRandomResponse('welcome');
  }, 500);
}

// Display Response
function showRandomResponse(category) {
  const responses = Darbz_RESPONSES[category] || Darbz_RESPONSES.random;
  const response = responses[Math.floor(Math.random() * responses.length)];
  displayResponse(response);
}

function displayResponse(text) {
  let bubble = document.querySelector('.speech-bubble');
  
  if (!bubble) {
    const mascotContainer = document.querySelector('.mascot-container');
    bubble = document.createElement('div');
    bubble.className = 'speech-bubble';
    mascotContainer.appendChild(bubble);
  }
  
  bubble.textContent = text;
  bubble.style.display = 'block';
  
  // Auto-hide after 5 seconds
  setTimeout(() => {
    bubble.style.opacity = '0';
    setTimeout(() => {
      bubble.style.display = 'none';
      bubble.style.opacity = '1';
    }, 300);
  }, 5000);
}

// Enhanced Quiz Handler
function checkAnswer(element, isCorrect, category = null) {
  const parent = element.parentElement;
  const feedbackDiv = element.parentElement.parentElement.querySelector('[id^="feedback"]');
  
  // Reset all options
  parent.querySelectorAll('.quiz-option').forEach(opt => {
    opt.classList.remove('correct', 'incorrect');
  });
  
  element.classList.add(isCorrect ? 'correct' : 'incorrect');
  
  setTimeout(() => {
    if (isCorrect) {
      playSound('correct');
      showRandomResponse('correct');
      if (feedbackDiv) {
        feedbackDiv.innerHTML = '<div class="feedback feedback-correct">✅ That\'s correct!</div>';
      }
    } else {
      playSound('incorrect');
      showRandomResponse('incorrect');
      if (feedbackDiv) {
        feedbackDiv.innerHTML = '<div class="feedback feedback-incorrect">❌ That\'s not right. Try again!</div>';
      }
    }
    
    // Show category-specific response
    if (category) {
      setTimeout(() => showRandomResponse(category), 1000);
    }
  }, 300);
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', initDarbz);
