/**
 * Theme Toggle Logic
 * Handles light/dark mode switching and persistence.
 */

(function() {
    const STORAGE_KEY = 'theme-preference'; // Stores 'light', 'dark', 'high-contrast'
    const DARK_CLASS = 'dark-mode';
    const HC_CLASS = 'high-contrast';
    
    const DARK_BTN_SELECTOR = '[aria-label="Toggle Dark Mode"]';
    const HC_BTN_SELECTOR = '[aria-label="Toggle High Contrast Mode"]';
    
    // Check system preference
    const getSystemPreference = () => {
        return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    };

    // Load saved preference or fallback to system
    const loadPreference = () => {
        const saved = localStorage.getItem(STORAGE_KEY);
        if (saved) return saved;
        return getSystemPreference();
    };

    // Apply theme
    const applyTheme = (theme) => {
        document.body.classList.remove(DARK_CLASS, HC_CLASS);
        
        if (theme === 'dark') {
            document.body.classList.add(DARK_CLASS);
        } else if (theme === 'high-contrast') {
            document.body.classList.add(HC_CLASS);
        }
        
        // Update button states (active class and icons)
        updateButtonStates(theme);
    };

    const updateButtonStates = (theme) => {
        const darkButtons = document.querySelectorAll(DARK_BTN_SELECTOR);
        const hcButtons = document.querySelectorAll(HC_BTN_SELECTOR);

        darkButtons.forEach(btn => {
            const icon = btn.querySelector('.material-symbols-outlined');
            if (theme === 'dark') {
                btn.classList.add('active');
                if (icon) icon.textContent = 'light_mode'; // Sun icon
            } else {
                btn.classList.remove('active');
                if (icon) icon.textContent = 'dark_mode'; // Moon icon
            }
        });

        hcButtons.forEach(btn => {
            if (theme === 'high-contrast') btn.classList.add('active');
            else btn.classList.remove('active');
        });
    };

    // Initialize
    const currentTheme = loadPreference();
    applyTheme(currentTheme);

    // Event Listener setup
    document.addEventListener('DOMContentLoaded', () => {
        const darkButtons = document.querySelectorAll(DARK_BTN_SELECTOR);
        const hcButtons = document.querySelectorAll(HC_BTN_SELECTOR);
        
        // Re-apply states after DOM load (to ensure all matching buttons are updated)
        updateButtonStates(loadPreference());

        // Dark Mode Toggle
        darkButtons.forEach(btn => {
            btn.addEventListener('click', () => {
                let newTheme = 'dark';
                if (document.body.classList.contains(DARK_CLASS)) {
                    newTheme = 'light';
                }
                applyTheme(newTheme);
                localStorage.setItem(STORAGE_KEY, newTheme);
            });
        });

        // High Contrast Toggle
        hcButtons.forEach(btn => {
            btn.addEventListener('click', () => {
                let newTheme = 'high-contrast';
                if (document.body.classList.contains(HC_CLASS)) {
                    newTheme = 'light';
                }
                applyTheme(newTheme);
                localStorage.setItem(STORAGE_KEY, newTheme);
            });
        });

        // Hamburger Menu Toggle Logic
        const menuBtn = document.querySelector('.menu-btn');
        const closeMenuBtn = document.querySelector('.close-menu-btn');
        const menuOverlay = document.getElementById('menuOverlay');
        const body = document.body;

        const toggleMenu = () => {
            body.classList.toggle('menu-open');
        };

        if (menuBtn) menuBtn.addEventListener('click', toggleMenu);
        if (closeMenuBtn) closeMenuBtn.addEventListener('click', toggleMenu);
        if (menuOverlay) menuOverlay.addEventListener('click', toggleMenu);
    });

    // Listen for system changes (only if no preference saved)
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
        if (!localStorage.getItem(STORAGE_KEY)) {
            const newTheme = e.matches ? 'dark' : 'light';
            applyTheme(newTheme);
        }
    });

})();
