// Main Application Logic
document.addEventListener('DOMContentLoaded', function() {
    // Initialize the application
    initializeApp();
});

function initializeApp() {
    // Load home page by default
    loadPage('home');
    
    // Add event listeners for navigation
    setupNavigation();
    
    // Setup theme toggle
    setupTheme();
    
    // Setup assessment functionality
    setupAssessment();
    
    // Setup dialog functionality
    setupDialogs();
}

function setupNavigation() {
    // Navigation is handled by navigation.js
    console.log('Navigation setup complete');
}

function setupTheme() {
    // Theme is handled by theme.js
    console.log('Theme setup complete');
}

function setupAssessment() {
    // Assessment is handled by assessment.js
    console.log('Assessment setup complete');
}

function setupDialogs() {
    const dialogClose = document.getElementById('dialog-close');
    if (dialogClose) {
        dialogClose.addEventListener('click', () => {
            const legalDialog = document.getElementById('legal-dialog');
            legalDialog.classList.remove('active');
        });
    }
}

// Global function to load pages
async function loadPage(pageId) {
    try {
        const response = await fetch(`pages/${pageId}.html`);
        const html = await response.text();
        
        const mainContent = document.getElementById('main-content');
        mainContent.innerHTML = html;
        mainContent.className = `page ${pageId}-page active fade-in`;
        
        // Re-initialize page-specific functionality
        if (pageId === 'assess') {
            initializeAssessmentPage();
        } else if (pageId === 'result') {
            initializeResultPage();
        }
        
        console.log(`Loaded page: ${pageId}`);
    } catch (error) {
        console.error('Error loading page:', error);
        document.getElementById('main-content').innerHTML = `
            <div class="container">
                <div class="error-message">
                    <h2>Terjadi Kesalahan</h2>
                    <p>Gagal memuat halaman. Silakan coba lagi.</p>
                    <button class="btn btn-primary" onclick="loadPage('home')">Kembali ke Beranda</button>
                </div>
            </div>
        `;
    }
}