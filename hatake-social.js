// HatakeSocial Enhanced JavaScript Functionality
// This file provides enhanced features for the community platform

class HatakeSocial {
    constructor() {
        this.currentUser = this.loadUserData();
        this.theme = localStorage.getItem('theme') || 'light';
        this.isAuthenticated = localStorage.getItem('isAuthenticated') === 'true';
        this.friends = this.loadFriends();
        this.messages = this.loadMessages();
        this.notifications = this.loadNotifications();
        
        this.init();
    }

    init() {
        this.setupTheme();
        this.setupAuthentication();
        this.setupMessenger();
        this.setupNotifications();
        this.setupSearch();
        this.setupPostCreation();
        this.setupRealTimeUpdates();
        this.setupMobileOptimizations();
    }

    // Theme Management
    setupTheme() {
        const darkModeToggle = document.getElementById('darkModeToggle');
        if (!darkModeToggle) return;

        // Apply saved theme
        document.body.setAttribute('data-theme', this.theme);
        this.updateToggleIcon(this.theme);

        // Auto-detect system preference if no saved preference
        if (!localStorage.getItem('theme')) {
            const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
            this.theme = prefersDark ? 'dark' : 'light';
            document.body.setAttribute('data-theme', this.theme);
            localStorage.setItem('theme', this.theme);
            this.updateToggleIcon(this.theme);
        }

        // Toggle event listener
        darkModeToggle.addEventListener('click', () => {
            this.toggleTheme();
        });

        // Listen for system theme changes
        window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
            if (!localStorage.getItem('theme-manual')) {
                this.theme = e.matches ? 'dark' : 'light';
                document.body.setAttribute('data-theme', this.theme);
                this.updateToggleIcon(this.theme);
            }
        });
    }

    toggleTheme() {
        this.theme = this.theme === 'dark' ? 'light' : 'dark';
        document.body.setAttribute('data-theme', this.theme);
        localStorage.setItem('theme', this.theme);
        localStorage.setItem('theme-manual', 'true'); // User manually changed theme
        this.updateToggleIcon(this.theme);
        
        // Smooth transition effect
        document.body.style.transition = 'all 0.3s ease';
        setTimeout(() => {
            document.body.style.transition = '';
        }, 300);
    }

    updateToggleIcon(theme) {
        const icon = document.querySelector('#darkModeToggle i');
        if (icon) {
            icon.className = theme === 'dark' ? 'fas fa-sun' : 'fas fa-moon';
        }
    }

    // Authentication Management
    setupAuthentication() {
        this.checkAuthStatus();
        this.setupSocialLogin();
    }

    checkAuthStatus() {
        if (this.isAuthenticated) {
            this.updateUIForAuthenticatedUser();
        } else {
            this.updateUIForGuestUser();
        }
    }

    setupSocialLogin() {
        // Google Login
        const googleLoginBtn = document.getElementById('googleLogin');
        if (googleLoginBtn) {
            googleLoginBtn.addEventListener('click', () => {
                this.loginWithGoogle();
            });
        }

        // Facebook Login
        const facebookLoginBtn = document.getElementById('facebookLogin');
        if (facebookLoginBtn) {
            facebookLoginBtn.addEventListener('click', () => {
                this.loginWithFacebook();
            });
        }

        // Email Login
        const emailLoginBtn = document.getElementById('emailLogin');
        if (emailLoginBtn) {
            emailLoginBtn.addEventListener('click', () => {
                this.loginWithEmail();
            });
        }
    }

    async loginWithGoogle() {
        try {
            // Simulate Google OAuth flow
            console.log('Initiating Google login...');
            this.showLoading('Connecting to Google...');
            
            // In real implementation, use Google OAuth
            setTimeout(() => {
                this.completeLogin({
                    id: 'google_user_123',
                    name: 'Ernst-William Hertz',
                    email: 'ernst@hatake.eu',
                    avatar: 'EH',
                    provider: 'google'
                });
            }, 2000);
        } catch (error) {
            this.showError('Google login failed. Please try again.');
        }
    }

    async loginWithFacebook() {
        try {
            console.log('Initiating Facebook login...');
            this.showLoading('Connecting to Facebook...');
            
            // In real implementation, use Facebook SDK
            setTimeout(() => {
                this.completeLogin({
                    id: 'facebook_user_123',
                    name: 'Ernst-William Hertz',
                    email: 'ernst@hatake.eu',
                    avatar: 'EH',
                    provider: 'facebook'
                });
            }, 2000);
        } catch (error) {
            this.showError('Facebook login failed. Please try again.');
        }
    }

    completeLogin(userData) {
        this.currentUser = userData;
        this.isAuthenticated = true;
        localStorage.setItem('isAuthenticated', 'true');
        localStorage.setItem('userData', JSON.stringify(userData));
        localStorage.setItem('loginTimestamp', Date.now().toString());
        
        this.updateUIForAuthenticatedUser();
        this.hideLoading();
        this.showSuccess('Welcome back, ' + userData.name + '!');
    }

    logout() {
        this.isAuthenticated = false;
        this.currentUser = null;
        localStorage.removeItem('isAuthenticated');
        localStorage.removeItem('userData');
        localStorage.removeItem('loginTimestamp');
        
        this.updateUIForGuestUser();
        this.showSuccess('You have been logged out successfully.');
    }

    updateUIForAuthenticatedUser() {
        const userAvatar = document.getElementById('userAvatar');
        if (userAvatar && this.currentUser) {
            userAvatar.textContent = this.currentUser.avatar;
            userAvatar.title = this.currentUser.name;
        }

        // Show authenticated features
        document.querySelectorAll('.auth-required').forEach(el => {
            el.style.display = 'block';
        });

        // Hide guest features
        document.querySelectorAll('.guest-only').forEach(el => {
            el.style.display = 'none';
        });
    }

    updateUIForGuestUser() {
        const userAvatar = document.getElementById('userAvatar');
        if (userAvatar) {
            userAvatar.textContent = '?';
            userAvatar.title = 'Guest User';
        }

        // Hide authenticated features
        document.querySelectorAll('.auth-required').forEach(el => {
            el.style.display = 'none';
        });

        // Show guest features
        document.querySelectorAll('.guest-only').forEach(el => {
            el.style.display = 'block';
        });
    }

    // Messenger System
    setupMessenger() {
        const messengerToggle = document.getElementById('messengerToggle');
        const messengerPanel = document.getElementById('messengerPanel');
        const messengerClose = document.getElementById('messengerClose');

        if (!messengerToggle || !messengerPanel) return;

        messengerToggle.addEventListener('click', () => {
            this.toggleMessenger();
        });

        if (messengerClose) {
            messengerClose.addEventListener('click', () => {
                this.closeMessenger();
            });
        }

        // Close messenger when clicking outside
        document.addEventListener('click', (e) => {
            if (!messengerToggle.contains(e.target) && !messengerPanel.contains(e.target)) {
                this.closeMessenger();
            }
        });

        // Setup chat functionality
        this.setupChatFeatures();
    }

    toggleMessenger() {
        const messengerPanel = document.getElementById('messengerPanel');
        if (messengerPanel) {
            messengerPanel.classList.toggle('active');
            if (messengerPanel.classList.contains('active')) {
                this.loadRecentChats();
            }
        }
    }

    closeMessenger() {
        const messengerPanel = document.getElementById('messengerPanel');
        if (messengerPanel) {
            messengerPanel.classList.remove('active');
        }
    }

    setupChatFeatures() {
        // Chat item clicks
        document.addEventListener('click', (e) => {
            const chatItem = e.target.closest('.chat-item');
            if (chatItem) {
                const userName = chatItem.querySelector('h4').textContent;
                this.openChatWindow(userName);
            }
        });

        // Friend item clicks
        document.addEventListener('click', (e) => {
            const friendItem = e.target.closest('.friend-item');
            if (friendItem) {
                const userName = friendItem.querySelector('h4').textContent;
                this.openChatWindow(userName);
            }
        });
    }

    openChatWindow(userName) {
        console.log('Opening chat with:', userName);
        // In real implementation, open a dedicated chat window or navigate to chat page
        this.showInfo(`Chat with ${userName} - Feature coming soon!`);
    }

    loadRecentChats() {
        // Simulate loading recent chats
        console.log('Loading recent chats...');
        // In real implementation, fetch from API
    }

    // Notification System
    setupNotifications() {
        this.updateNotificationBadges();
        
        const notificationsBtn = document.getElementById('notificationsBtn');
        if (notificationsBtn) {
            notificationsBtn.addEventListener('click', () => {
                this.showNotifications();
            });
        }
    }

    updateNotificationBadges() {
        const badges = {
            notifications: this.notifications.filter(n => !n.read).length,
            messages: this.messages.filter(m => !m.read).length,
            cart: this.getCartItemCount()
        };

        // Update notification badge
        const notificationBadge = document.querySelector('#notificationsBtn .badge');
        if (notificationBadge) {
            notificationBadge.textContent = badges.notifications;
            notificationBadge.style.display = badges.notifications > 0 ? 'flex' : 'none';
        }

        // Update message badge
        const messageBadge = document.querySelector('#messagesBtn .badge');
        if (messageBadge) {
            messageBadge.textContent = badges.messages;
            messageBadge.style.display = badges.messages > 0 ? 'flex' : 'none';
        }

        // Update cart badge
        const cartBadge = document.querySelector('#cartBtn .badge');
        if (cartBadge) {
            cartBadge.textContent = badges.cart;
            cartBadge.style.display = badges.cart > 0 ? 'flex' : 'none';
        }

        // Update messenger badge
        const messengerBadge = document.querySelector('.messenger-badge');
        if (messengerBadge) {
            messengerBadge.textContent = badges.messages;
            messengerBadge.style.display = badges.messages > 0 ? 'flex' : 'none';
        }
    }

    showNotifications() {
        // Create notification dropdown or modal
        console.log('Showing notifications...');
        this.showInfo('Notifications panel - Feature coming soon!');
    }

    // Search Functionality
    setupSearch() {
        const searchInput = document.getElementById('searchInput');
        if (!searchInput) return;

        let searchTimeout;
        searchInput.addEventListener('input', (e) => {
            clearTimeout(searchTimeout);
            searchTimeout = setTimeout(() => {
                this.performSearch(e.target.value);
            }, 300);
        });

        // Search suggestions
        searchInput.addEventListener('focus', () => {
            this.showSearchSuggestions();
        });

        searchInput.addEventListener('blur', () => {
            setTimeout(() => this.hideSearchSuggestions(), 200);
        });
    }

    performSearch(query) {
        if (query.length < 2) return;
        
        console.log('Searching for:', query);
        // In real implementation, call search API
        this.showSearchResults(query);
    }

    showSearchSuggestions() {
        // Show popular searches or recent searches
        console.log('Showing search suggestions...');
    }

    hideSearchSuggestions() {
        console.log('Hiding search suggestions...');
    }

    showSearchResults(query) {
        // Display search results
        console.log('Search results for:', query);
    }

    // Post Creation and Management
    setupPostCreation() {
        const postBtn = document.getElementById('postBtn');
        const postInput = document.getElementById('postInput');

        if (!postBtn || !postInput) return;

        postBtn.addEventListener('click', () => {
            this.createPost();
        });

        postInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                this.createPost();
            }
        });

        // Setup post actions
        this.setupPostActions();
    }

    createPost() {
        const postInput = document.getElementById('postInput');
        const content = postInput.value.trim();
        
        if (!content) {
            this.showWarning('Please enter some content for your post.');
            return;
        }

        if (!this.isAuthenticated) {
            this.showWarning('Please log in to create posts.');
            return;
        }

        const feedContent = document.getElementById('feedContent');
        if (!feedContent) return;

        const post = this.createPostElement(content);
        feedContent.insertBefore(post, feedContent.firstChild);
        postInput.value = '';

        // Animate new post
        this.animateNewPost(post);
        
        this.showSuccess('Post created successfully!');
    }

    createPostElement(content) {
        const post = document.createElement('div');
        post.className = 'post';
        post.innerHTML = `
            <div class="post-header">
                <div class="post-avatar">${this.currentUser?.avatar || 'U'}</div>
                <div class="post-info">
                    <h4>${this.currentUser?.name || 'User'}</h4>
                    <div class="post-time">Just now</div>
                </div>
            </div>
            <div class="post-content">${this.escapeHtml(content)}</div>
            <div class="post-actions">
                <div class="post-action" data-action="like">
                    <i class="fas fa-heart"></i>
                    <span>0</span>
                </div>
                <div class="post-action" data-action="comment">
                    <i class="fas fa-comment"></i>
                    <span>Comment</span>
                </div>
                <div class="post-action" data-action="share">
                    <i class="fas fa-share"></i>
                    <span>Share</span>
                </div>
            </div>
        `;
        return post;
    }

    animateNewPost(post) {
        post.style.opacity = '0';
        post.style.transform = 'translateY(-20px)';
        setTimeout(() => {
            post.style.transition = 'all 0.3s ease';
            post.style.opacity = '1';
            post.style.transform = 'translateY(0)';
        }, 10);
    }

    setupPostActions() {
        document.addEventListener('click', (e) => {
            const action = e.target.closest('.post-action');
            if (!action) return;

            const actionType = action.dataset.action;
            this.handlePostAction(actionType, action);
        });
    }

    handlePostAction(actionType, actionElement) {
        switch (actionType) {
            case 'like':
                this.toggleLike(actionElement);
                break;
            case 'comment':
                this.showComments(actionElement);
                break;
            case 'share':
                this.sharePost(actionElement);
                break;
        }
    }

    toggleLike(actionElement) {
        const icon = actionElement.querySelector('i');
        const count = actionElement.querySelector('span');
        const currentCount = parseInt(count.textContent) || 0;

        actionElement.classList.toggle('liked');
        
        if (actionElement.classList.contains('liked')) {
            count.textContent = currentCount + 1;
            icon.style.animation = 'pulse 0.3s ease-in-out';
        } else {
            count.textContent = Math.max(0, currentCount - 1);
        }

        setTimeout(() => {
            icon.style.animation = '';
        }, 300);
    }

    showComments(actionElement) {
        console.log('Showing comments...');
        this.showInfo('Comments feature coming soon!');
    }

    sharePost(actionElement) {
        console.log('Sharing post...');
        if (navigator.share) {
            navigator.share({
                title: 'HatakeSocial Post',
                text: 'Check out this post on HatakeSocial!',
                url: window.location.href
            });
        } else {
            this.showInfo('Share feature coming soon!');
        }
    }

    // Real-time Updates
    setupRealTimeUpdates() {
        // Simulate real-time updates
        setInterval(() => {
            this.updateOnlineStatus();
            this.checkForNewMessages();
            this.checkForNewNotifications();
        }, 30000); // Every 30 seconds

        // Simulate random activity
        setInterval(() => {
            this.simulateActivity();
        }, 10000); // Every 10 seconds
    }

    updateOnlineStatus() {
        // Update online indicators
        const onlineIndicators = document.querySelectorAll('.online-indicator, .friend-status');
        onlineIndicators.forEach(indicator => {
            // Randomly toggle online status for demo
            if (Math.random() > 0.9) {
                indicator.style.backgroundColor = indicator.style.backgroundColor === 'var(--success)' ? 
                    'var(--text-light)' : 'var(--success)';
            }
        });
    }

    checkForNewMessages() {
        // Simulate new messages
        if (Math.random() > 0.95) {
            this.addNewMessage();
        }
    }

    checkForNewNotifications() {
        // Simulate new notifications
        if (Math.random() > 0.97) {
            this.addNewNotification();
        }
    }

    simulateActivity() {
        // Randomly update badges and counters
        const badges = document.querySelectorAll('.badge:not(.messenger-badge)');
        badges.forEach(badge => {
            if (Math.random() > 0.95) {
                const current = parseInt(badge.textContent) || 0;
                badge.textContent = current + 1;
                badge.style.animation = 'pulse 0.5s ease-in-out';
                setTimeout(() => {
                    badge.style.animation = '';
                }, 500);
            }
        });
    }

    addNewMessage() {
        this.messages.push({
            id: Date.now(),
            from: 'New User',
            content: 'Hello! Want to trade some cards?',
            timestamp: new Date(),
            read: false
        });
        this.updateNotificationBadges();
    }

    addNewNotification() {
        this.notifications.push({
            id: Date.now(),
            type: 'like',
            content: 'Someone liked your post',
            timestamp: new Date(),
            read: false
        });
        this.updateNotificationBadges();
    }

    // Mobile Optimizations
    setupMobileOptimizations() {
        // Touch gestures
        this.setupTouchGestures();
        
        // Mobile navigation
        this.setupMobileNavigation();
        
        // Responsive adjustments
        this.setupResponsiveAdjustments();
    }

    setupTouchGestures() {
        // Swipe gestures for mobile
        let startX, startY;
        
        document.addEventListener('touchstart', (e) => {
            startX = e.touches[0].clientX;
            startY = e.touches[0].clientY;
        });

        document.addEventListener('touchend', (e) => {
            if (!startX || !startY) return;

            const endX = e.changedTouches[0].clientX;
            const endY = e.changedTouches[0].clientY;
            
            const diffX = startX - endX;
            const diffY = startY - endY;

            // Swipe detection
            if (Math.abs(diffX) > Math.abs(diffY) && Math.abs(diffX) > 50) {
                if (diffX > 0) {
                    // Swipe left
                    this.handleSwipeLeft();
                } else {
                    // Swipe right
                    this.handleSwipeRight();
                }
            }

            startX = null;
            startY = null;
        });
    }

    handleSwipeLeft() {
        // Open messenger on swipe left
        if (window.innerWidth <= 768) {
            this.toggleMessenger();
        }
    }

    handleSwipeRight() {
        // Close messenger on swipe right
        if (window.innerWidth <= 768) {
            this.closeMessenger();
        }
    }

    setupMobileNavigation() {
        // Mobile menu toggle
        const mobileMenuToggle = document.getElementById('mobileMenuToggle');
        if (mobileMenuToggle) {
            mobileMenuToggle.addEventListener('click', () => {
                this.toggleMobileMenu();
            });
        }
    }

    toggleMobileMenu() {
        const nav = document.querySelector('nav');
        if (nav) {
            nav.classList.toggle('mobile-active');
        }
    }

    setupResponsiveAdjustments() {
        // Adjust layout based on screen size
        const handleResize = () => {
            const width = window.innerWidth;
            
            if (width <= 768) {
                this.enableMobileMode();
            } else {
                this.disableMobileMode();
            }
        };

        window.addEventListener('resize', handleResize);
        handleResize(); // Initial call
    }

    enableMobileMode() {
        document.body.classList.add('mobile-mode');
        
        // Adjust messenger for mobile
        const messengerPanel = document.getElementById('messengerPanel');
        if (messengerPanel) {
            messengerPanel.style.width = 'calc(100vw - 40px)';
            messengerPanel.style.right = '-10px';
        }
    }

    disableMobileMode() {
        document.body.classList.remove('mobile-mode');
        
        // Reset messenger for desktop
        const messengerPanel = document.getElementById('messengerPanel');
        if (messengerPanel) {
            messengerPanel.style.width = '350px';
            messengerPanel.style.right = '0';
        }
    }

    // Utility Functions
    loadUserData() {
        const userData = localStorage.getItem('userData');
        return userData ? JSON.parse(userData) : null;
    }

    loadFriends() {
        const friends = localStorage.getItem('friends');
        return friends ? JSON.parse(friends) : [];
    }

    loadMessages() {
        const messages = localStorage.getItem('messages');
        return messages ? JSON.parse(messages) : [];
    }

    loadNotifications() {
        const notifications = localStorage.getItem('notifications');
        return notifications ? JSON.parse(notifications) : [];
    }

    getCartItemCount() {
        const cart = localStorage.getItem('cart');
        return cart ? JSON.parse(cart).length : 0;
    }

    escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }

    // UI Feedback Methods
    showLoading(message = 'Loading...') {
        this.showToast(message, 'info', 0);
    }

    hideLoading() {
        this.hideToast();
    }

    showSuccess(message) {
        this.showToast(message, 'success');
    }

    showError(message) {
        this.showToast(message, 'error');
    }

    showWarning(message) {
        this.showToast(message, 'warning');
    }

    showInfo(message) {
        this.showToast(message, 'info');
    }

    showToast(message, type = 'info', duration = 3000) {
        // Remove existing toast
        this.hideToast();

        const toast = document.createElement('div');
        toast.className = `toast toast-${type}`;
        toast.innerHTML = `
            <div class="toast-content">
                <i class="fas ${this.getToastIcon(type)}"></i>
                <span>${message}</span>
            </div>
            <button class="toast-close" onclick="this.parentElement.remove()">
                <i class="fas fa-times"></i>
            </button>
        `;

        // Add toast styles if not already present
        if (!document.getElementById('toast-styles')) {
            const styles = document.createElement('style');
            styles.id = 'toast-styles';
            styles.textContent = `
                .toast {
                    position: fixed;
                    top: 20px;
                    right: 20px;
                    background: var(--card-bg);
                    border: 1px solid var(--card-border);
                    border-radius: 8px;
                    padding: 1rem;
                    box-shadow: var(--shadow);
                    z-index: 10000;
                    display: flex;
                    align-items: center;
                    gap: 1rem;
                    max-width: 400px;
                    animation: slideIn 0.3s ease-out;
                }
                .toast-success { border-left: 4px solid var(--success); }
                .toast-error { border-left: 4px solid var(--error); }
                .toast-warning { border-left: 4px solid var(--warning); }
                .toast-info { border-left: 4px solid var(--info); }
                .toast-content { display: flex; align-items: center; gap: 0.5rem; flex: 1; }
                .toast-close { background: none; border: none; cursor: pointer; color: var(--text-light); }
                @keyframes slideIn {
                    from { transform: translateX(100%); opacity: 0; }
                    to { transform: translateX(0); opacity: 1; }
                }
            `;
            document.head.appendChild(styles);
        }

        document.body.appendChild(toast);

        if (duration > 0) {
            setTimeout(() => {
                if (toast.parentElement) {
                    toast.remove();
                }
            }, duration);
        }
    }

    hideToast() {
        const existingToast = document.querySelector('.toast');
        if (existingToast) {
            existingToast.remove();
        }
    }

    getToastIcon(type) {
        const icons = {
            success: 'fa-check-circle',
            error: 'fa-exclamation-circle',
            warning: 'fa-exclamation-triangle',
            info: 'fa-info-circle'
        };
        return icons[type] || icons.info;
    }
}

// Initialize HatakeSocial when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.hatakeSocial = new HatakeSocial();
    console.log('HatakeSocial Enhanced Platform Initialized');
});

// Export for module usage
if (typeof module !== 'undefined' && module.exports) {
    module.exports = HatakeSocial;
}

