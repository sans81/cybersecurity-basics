// Dabzr - The Chocolate Lab Puppy Mascot
// A friendly, funny, and educational companion

const DABZR_RESPONSES = {
  welcome: [
    "Woof! 🐕 Hey buddy! I'm Dabzr, your cyber puppy sidekick!",
    "Bark bark! 🎓 Ready to learn some awesome cybersecurity stuff?",
    "Ruff! 🔒 Let's protect the internet together!",
    "Woof woof! 🐕 I'm so excited to learn with you!",
  ],
  correct: [
    "WOOF WOOF! 🎉 That's PAWSOME! You got it right!",
    "Bark bark! 🌟 You're a CYBER DOG EXPERT!",
    "Ruff! 🏆 That's RIGHT! Give yourself a treat!",
    "Woof! 🐕 You nailed it! *tail wagging intensifies*",
    "Bark bark! 💪 You're CRUSHING it!",
    "Ruff ruff! 🎊 BONE-US POINTS FOR YOU!",
  ],
  incorrect: [
    "Awww... 🐶 Not quite, but you'll get it! Try again!",
    "Woof woof 🤔 Hmm, that's not it... but no worries!",
    "Bark bark 😅 Oopsie! Let's try again!",
    "Ruff! 📖 Check the lesson again - you got this!",
  ],
  password: [
    "Woof! 🔐 Passwords are like my SECRET TREAT HIDING SPOT!",
    "Bark bark! 🐕 Use LONG passwords with MIX-UPS!",
    "Ruff! 💪 Strong passwords = STRONG PROTECTION!",
  ],
  phishing: [
    "WOOF WOOF! 🚨 That's phishing! I never click links from strangers!",
    "Bark bark! ⚠️ That email LOOKS FISHY! 🐟",
    "Ruff! 🎣 Even we puppy experts can be tricked!",
  ],
  twofactor: [
    "Woof! 🔐🔐 Two locks = TWICE the SECURITY!",
    "Bark bark! 📱 2FA is like having a SUPER GUARD!",
    "Ruff! 🛡️ Double protection = DOUBLE PAWSOME!",
  ],
  updates: [
    "Woof! ⚡ ALWAYS update! It's like getting STRONGER!",
    "Bark bark! 🔄 Updates = PROTECTION UPGRADE!",
    "Ruff! 💪 New patches = NEW SUPERPOWERS!",
  ],
  random: [
    "Woof! 🐕 Did you know? I'm a chocolate lab!",
    "Bark bark! 🍫 My favorite thing? Chocolate AND SECURITY!",
    "Ruff! 🦴 Want to pet me? Just don't hack my treat jar!",
    "Woof woof! 🎾 I can fetch bugs AND cyber threats!",
    "Bark bark! 🐕‍🦺 Fun fact: I'm ADORABLE AND SMART!",
  ],
  encouragement: [
    "Woof! 🌟 You're doing GREAT! Keep going!",
    "Bark bark! 💪 One more and you'll be a master!",
    "Ruff! 🏆 You're learning SO FAST!",
    "Woof woof! 🎓 I'm so proud of you!",
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
function initDabzr() {
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
  const responses = DABZR_RESPONSES[category] || DABZR_RESPONSES.random;
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
        feedbackDiv.innerHTML = '<div class="feedback feedback-correct">✅ YES! You got it right! PAWSOME job!</div>';
      }
    } else {
      playSound('incorrect');
      showRandomResponse('incorrect');
      if (feedbackDiv) {
        feedbackDiv.innerHTML = '<div class="feedback feedback-incorrect">❌ Oops! Try again or review the section!</div>';
      }
    }
    
    // Show category-specific response
    if (category) {
      setTimeout(() => showRandomResponse(category), 1000);
    }
  }, 300);
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', initDabzr);
