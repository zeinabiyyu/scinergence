// Assessment Logic
let currentAssessmentData = {};

function initializeAssessmentPage() {
    const textarea = document.getElementById('story');
    const charCount = document.getElementById('char-count');
    const likertButtons = document.querySelectorAll('.likert-btn');
    const progressFill = document.getElementById('progress-fill');
    const submitButton = document.getElementById('submit-assessment');
    const consentCheckbox = document.getElementById('consent');
    const legalDialogTriggers = document.querySelectorAll('.legal-dialog-trigger');

    // Character count
    if (textarea && charCount) {
        textarea.addEventListener('input', updateCharacterCount);
    }

    // Likert buttons
    likertButtons.forEach(button => {
        button.addEventListener('click', handleLikertClick);
    });

    // Consent checkbox
    if (consentCheckbox) {
        consentCheckbox.addEventListener('change', updateProgress);
    }

    // Submit button
    if (submitButton) {
        submitButton.addEventListener('click', handleAssessmentSubmit);
    }

    // Legal dialog triggers
    legalDialogTriggers.forEach(trigger => {
        trigger.addEventListener('click', () => {
            document.getElementById('legal-dialog').classList.add('active');
        });
    });

    // Initial progress update
    updateProgress();
}

function updateCharacterCount() {
    const textarea = document.getElementById('story');
    const charCount = document.getElementById('char-count');
    
    if (textarea && charCount) {
        const count = textarea.value.length;
        charCount.textContent = `${count}/2000`;
        updateProgress();
    }
}

function handleLikertClick(event) {
    const button = event.currentTarget;
    const parent = button.parentElement;
    
    // Remove active class from all buttons in the same group
    parent.querySelectorAll('.likert-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    
    // Add active class to clicked button
    button.classList.add('active');
    updateProgress();
}

function updateProgress() {
    let progress = 0;
    const textarea = document.getElementById('story');
    const consentCheckbox = document.getElementById('consent');
    const progressFill = document.getElementById('progress-fill');
    const submitButton = document.getElementById('submit-assessment');

    // Text area (40%)
    if (textarea && textarea.value.length >= 20) {
        progress += 40;
    }
    
    // Likert scales (20% each)
    const likertGroups = document.querySelectorAll('.likert-options');
    likertGroups.forEach(group => {
        if (group.querySelector('.likert-btn.active')) {
            progress += 20;
        }
    });
    
    if (progressFill) {
        progressFill.style.width = `${progress}%`;
    }
    
    // Update submit button state
    if (submitButton) {
        if (progress >= 60 && consentCheckbox && consentCheckbox.checked) {
            submitButton.disabled = false;
        } else {
            submitButton.disabled = true;
        }
    }
}

function handleAssessmentSubmit() {
    const submitButton = document.getElementById('submit-assessment');
    const textarea = document.getElementById('story');
    
    if (submitButton.disabled) return;
    
    // Collect assessment data
    currentAssessmentData = {
        text: textarea ? textarea.value : '',
        sleep: getLikertValue('sleep'),
        mood: getLikertValue('mood'),
        energy: getLikertValue('energy'),
        timestamp: new Date().toISOString()
    };
    
    // Show loading state
    submitButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Menganalisis...';
    submitButton.disabled = true;
    
    // Simulate API call
    setTimeout(() => {
        // Navigate to result page
        navigateToPage('result');
        
        // Reset button (in case user goes back)
        setTimeout(() => {
            submitButton.innerHTML = 'Jalankan AI <i class="fas fa-chevron-right"></i>';
            submitButton.disabled = false;
        }, 1000);
    }, 2000);
}

function getLikertValue(name) {
    const activeButton = document.querySelector(`[data-name="${name}"] .likert-btn.active`);
    return activeButton ? parseInt(activeButton.dataset.value) : null;
}

function initializeResultPage() {
    // Display assessment results
    displayAssessmentResults();
    
    // Setup result page buttons
    const assessAgainBtn = document.querySelector('[data-action="assess-again"]');
    const learnBtn = document.querySelector('[data-action="learn"]');
    const professionalsBtn = document.querySelector('[data-action="professionals"]');
    
    if (assessAgainBtn) {
        assessAgainBtn.addEventListener('click', () => navigateToPage('assess'));
    }
    
    if (learnBtn) {
        learnBtn.addEventListener('click', () => navigateToPage('learn'));
    }
    
    if (professionalsBtn) {
        professionalsBtn.addEventListener('click', () => navigateToPage('professionals'));
    }
}

function displayAssessmentResults() {
    // In a real app, this would display actual assessment results
    // For now, we'll use mock data
    const results = {
        confidences: {
            kecemasan: 0.72,
            depresi: 0.45,
            stres: 0.38
        },
        highlights: [
            "sulit tidur menjelang ujian",
            "mudah lelah dan cemas"
        ]
    };
    
    // Update confidence bars
    Object.keys(results.confidences).forEach(condition => {
        const confidence = results.confidences[condition];
        const confidenceElement = document.querySelector(`[data-condition="${condition}"]`);
        
        if (confidenceElement) {
            const fill = confidenceElement.querySelector('.confidence-fill');
            const value = confidenceElement.querySelector('.confidence-value');
            
            if (fill) fill.style.width = `${confidence * 100}%`;
            if (value) value.textContent = `${Math.round(confidence * 100)}%`;
        }
    });
    
    // Update highlights
    const highlightsList = document.querySelector('.highlights-list');
    if (highlightsList) {
        highlightsList.innerHTML = results.highlights
            .map(highlight => `<li>${highlight}</li>`)
            .join('');
    }
}