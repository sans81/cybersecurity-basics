// Session Management System for Cybersecurity Basics

class SessionManager {
    constructor(moduleName) {
        this.moduleName = moduleName;
        this.sessionKey = `cybersecurity_session_${moduleName}`;
        this.progressKey = `cybersecurity_progress_${moduleName}`;
    }

    // Save current progress
    saveProgress(progressData) {
        const sessionData = {
            moduleName: this.moduleName,
            progress: progressData,
            timestamp: new Date().toISOString(),
            paused: true
        };
        localStorage.setItem(this.progressKey, JSON.stringify(sessionData));
        console.log(`✅ Progress saved for ${this.moduleName}`);
    }

    // Load saved progress
    loadProgress() {
        const saved = localStorage.getItem(this.progressKey);
        if (saved) {
            const data = JSON.parse(saved);
            console.log(`✅ Progress loaded for ${this.moduleName}:`, data);
            return data;
        }
        return null;
    }

    // Clear progress
    clearProgress() {
        localStorage.removeItem(this.progressKey);
        console.log(`✅ Progress cleared for ${this.moduleName}`);
    }

    // Get all saved sessions
    getAllSessions() {
        const sessions = [];
        for (let i = 0; i < localStorage.length; i++) {
            const key = localStorage.key(i);
            if (key.startsWith('cybersecurity_progress_')) {
                const data = JSON.parse(localStorage.getItem(key));
                sessions.push(data);
            }
        }
        return sessions;
    }

    // Show resume session banner if available
    showResumeBanner() {
        const saved = this.loadProgress();
        if (saved) {
            const timestamp = new Date(saved.timestamp);
            const timeAgo = this.getTimeAgo(timestamp);
            
            const banner = document.createElement('div');
            banner.id = 'resume-banner';
            banner.className = 'resume-banner';
            banner.innerHTML = `
                <div class="resume-banner-content">
                    <p>📌 You were here ${timeAgo}! Want to pick up where you left off?</p>
                    <div class="resume-buttons">
                        <button onclick="sessionManager.resumeSession()" class="resume-btn-yes">✅ Resume</button>
                        <button onclick="sessionManager.dismissBanner()" class="resume-btn-no">❌ Start Fresh</button>
                    </div>
                </div>
            `;
            
            document.body.insertBefore(banner, document.body.firstChild);
        }
    }

    // Resume session
    resumeSession() {
        const saved = this.loadProgress();
        if (saved && saved.progress) {
            // Trigger custom event that modules can listen to
            window.dispatchEvent(new CustomEvent('resumeSession', { detail: saved.progress }));
            this.dismissBanner();
        }
    }

    // Dismiss banner
    dismissBanner() {
        const banner = document.getElementById('resume-banner');
        if (banner) {
            banner.remove();
        }
    }

    // Helper: calculate time ago
    getTimeAgo(date) {
        const now = new Date();
        const diff = Math.floor((now - date) / 1000);
        
        if (diff < 60) return 'just now';
        if (diff < 3600) return `${Math.floor(diff / 60)} minutes ago`;
        if (diff < 86400) return `${Math.floor(diff / 3600)} hours ago`;
        return `${Math.floor(diff / 86400)} days ago`;
    }
}

// Initialize global session manager
let sessionManager;

function initSessionManager(moduleName) {
    sessionManager = new SessionManager(moduleName);
    sessionManager.showResumeBanner();
}

// Add pause button styling to page
function addPauseButtonStyles() {
    const style = document.createElement('style');
    style.textContent = `
        .pause-button {
            position: fixed;
            top: 20px;
            right: 20px;
            z-index: 999;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: white;
            border: none;
            padding: 12px 20px;
            border-radius: 8px;
            cursor: pointer;
            font-size: 14px;
            font-weight: 600;
            box-shadow: 0 4px 12px rgba(102, 126, 234, 0.3);
            transition: all 0.3s;
        }

        .pause-button:hover {
            transform: translateY(-2px);
            box-shadow: 0 6px 16px rgba(102, 126, 234, 0.4);
        }

        .pause-modal {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.7);
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 1000;
        }

        .pause-modal-content {
            background: white;
            border-radius: 15px;
            padding: 40px;
            text-align: center;
            max-width: 400px;
            box-shadow: 0 10px 40px rgba(0, 0, 0, 0.3);
        }

        .pause-modal-content h2 {
            color: #667eea;
            margin-bottom: 20px;
            font-size: 28px;
        }

        .pause-modal-content p {
            color: #2c3e50;
            margin-bottom: 15px;
            font-size: 16px;
        }

        .pause-modal-buttons {
            display: flex;
            gap: 15px;
            margin-top: 30px;
        }

        .pause-modal-buttons button {
            flex: 1;
            padding: 12px 20px;
            border: none;
            border-radius: 8px;
            cursor: pointer;
            font-weight: 600;
            font-size: 14px;
            transition: all 0.3s;
        }

        .pause-resume-btn {
            background: linear-gradient(135deg, #43e97b 0%, #38f9d7 100%);
            color: white;
        }

        .pause-resume-btn:hover {
            transform: translateY(-2px);
            box-shadow: 0 4px 12px rgba(67, 233, 123, 0.3);
        }

        .pause-home-btn {
            background: #f0f0f0;
            color: #667eea;
        }

        .pause-home-btn:hover {
            background: #e0e0e0;
        }

        .resume-banner {
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: white;
            padding: 15px 20px;
            z-index: 998;
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
        }

        .resume-banner-content {
            max-width: 1200px;
            margin: 0 auto;
            display: flex;
            align-items: center;
            justify-content: space-between;
            gap: 20px;
        }

        .resume-banner-content p {
            margin: 0;
            font-weight: 600;
            flex: 1;
        }

        .resume-buttons {
            display: flex;
            gap: 10px;
        }

        .resume-btn-yes, .resume-btn-no {
            padding: 8px 16px;
            border: none;
            border-radius: 6px;
            cursor: pointer;
            font-weight: 600;
            font-size: 13px;
            transition: all 0.3s;
        }

        .resume-btn-yes {
            background: white;
            color: #667eea;
        }

        .resume-btn-yes:hover {
            transform: scale(1.05);
        }

        .resume-btn-no {
            background: rgba(255, 255, 255, 0.2);
            color: white;
            border: 2px solid white;
        }

        .resume-btn-no:hover {
            background: rgba(255, 255, 255, 0.3);
        }

        @media (max-width: 768px) {
            .pause-button {
                top: 10px;
                right: 10px;
                padding: 10px 15px;
                font-size: 12px;
            }

            .pause-modal-content {
                margin: 20px;
            }

            .resume-banner-content {
                flex-direction: column;
                align-items: flex-start;
            }

            .resume-buttons {
                width: 100%;
            }

            .resume-btn-yes, .resume-btn-no {
                flex: 1;
            }
        }
    `;
    document.head.appendChild(style);
}

// Create pause button
function createPauseButton() {
    addPauseButtonStyles();
    
    const button = document.createElement('button');
    button.className = 'pause-button';
    button.textContent = '⏸️ Pause';
    button.onclick = showPauseModal;
    document.body.appendChild(button);
}

// Show pause modal
function showPauseModal() {
    const modal = document.createElement('div');
    modal.className = 'pause-modal';
    modal.innerHTML = `
        <div class="pause-modal-content">
            <h2>⏸️ Session Paused</h2>
            <p>Your progress has been saved!</p>
            <p style="font-size: 14px; color: #999;">When you come back, you'll pick up exactly where you left off.</p>
            <div class="pause-modal-buttons">
                <button class="pause-resume-btn" onclick="resumePauseModal()">▶️ Resume Learning</button>
                <button class="pause-home-btn" onclick="window.location.href='index.html'">🏠 Go Home</button>
            </div>
        </div>
    `;
    document.body.appendChild(modal);
}

// Resume from pause modal
function resumePauseModal() {
    const modal = document.querySelector('.pause-modal');
    if (modal) {
        modal.remove();
    }
}

// Export for use in modules
window.SessionManager = SessionManager;
