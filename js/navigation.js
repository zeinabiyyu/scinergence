// Navigation Logic
document.addEventListener('DOMContentLoaded', function() {
    setupNavigationEvents();
});

function setupNavigationEvents() {
    const navItems = document.querySelectorAll('.nav-item');
    
    navItems.forEach(item => {
        item.addEventListener('click', function() {
            const pageId = this.dataset.page;
            navigateToPage(pageId);
        });
    });
    
    // Handle back/forward browser buttons
    window.addEventListener('popstate', function(event) {
        const pageId = event.state ? event.state.page : 'home';
        loadPage(pageId);
    });
}

function navigateToPage(pageId) {
    // Update navigation
    updateNavigation(pageId);
    
    // Load page content
    loadPage(pageId);
    
    // Update browser history
    history.pushState({ page: pageId }, '', `#${pageId}`);
}

function updateNavigation(pageId) {
    const navItems = document.querySelectorAll('.nav-item');
    
    navItems.forEach(item => {
        if (item.dataset.page === pageId) {
            item.classList.add('active');
        } else {
            item.classList.remove('active');
        }
    });
}