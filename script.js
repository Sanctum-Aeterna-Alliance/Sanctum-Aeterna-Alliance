// ============================================
// STATE MANAGEMENT
// ============================================
let capturaFiles = [];
let arsenalFile = null;
const MAX_CAPTURA = 5;
const MAX_FILE_SIZE = 8 * 1024 * 1024; // 8MB

// ============================================
// PARTICLES ANIMATION
// ============================================
function createParticles() {
    const particlesContainer = document.getElementById('particles');
    const particleCount = 30;

    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.left = Math.random() * 100 + '%';
        particle.style.animationDuration = (Math.random() * 10 + 10) + 's';
        particle.style.animationDelay = Math.random() * 5 + 's';
        particlesContainer.appendChild(particle);
    }
}

// ============================================
// FILE HANDLING
// ============================================
function setupFileUpload(inputId, previewId, dropId, multiple = false) {
    const input = document.getElementById(inputId);
    const preview = document.getElementById(previewId);
    const dropZone = document.getElementById(dropId);

    input.addEventListener('change', (e) => {
        handleFiles(e.target.files, inputId, preview, multiple);
    });

    dropZone.addEventListener('dragover', (e) => {
        e.preventDefault();
        dropZone.classList.add('dragover');
    });

    dropZone.addEventListener('dragleave', () => {
        dropZone.classList.remove('dragover');
    });

    dropZone.addEventListener('drop', (e) => {
        e.preventDefault();
        dropZone.classList.remove('dragover');
        handleFiles(e.dataTransfer.files, inputId, preview, multiple);
    });
}

function handleFiles(files, inputId, preview, multiple) {
    const fileArray = Array.from(files);
    
    if (inputId === 'capturaImages') {
        if (capturaFiles.length + fileArray.length > MAX_CAPTURA) {
            showAlert(`Maximum ${MAX_CAPTURA} captura images allowed`, 'error');
            return;
        }
    }

    for (const file of fileArray) {
        if (!file.type.startsWith('image/')) {
            showAlert('Only image files are allowed', 'error');
            continue;
        }

        if (file.size > MAX_FILE_SIZE) {
            showAlert(`File ${file.name} exceeds 8MB limit`, 'error');
            continue;
        }

        if (inputId === 'capturaImages') {
            capturaFiles.push(file);
        } else {
            arsenalFile = file;
        }
    }

    updatePreview(inputId, preview);
}

function updatePreview(inputId, preview) {
    preview.innerHTML = '';
    const files = inputId === 'capturaImages' ? capturaFiles : (arsenalFile ? [arsenalFile] : []);

    files.forEach((file, index) => {
        const reader = new FileReader();
        reader.onload = (e) => {
            const div = document.createElement('div');
            div.className = 'preview-item';
            div.innerHTML = `
                <img src="${e.target.result}" alt="Preview">
                <button type="button" class="preview-remove" onclick="removeFile('${inputId}', ${index})">×</button>
            `;
            preview.appendChild(div);
        };
        reader.readAsDataURL(file);
    });

    if (inputId === 'capturaImages') {
        const countEl = document.getElementById('capturaCount');
        countEl.textContent = `${capturaFiles.length} / ${MAX_CAPTURA} images`;
    }
}

window.removeFile = function(inputId, index) {
    if (inputId === 'capturaImages') {
        capturaFiles.splice(index, 1);
        updatePreview(inputId, document.getElementById('capturaPreview'));
    } else {
        arsenalFile = null;
        updatePreview(inputId, document.getElementById('arsenalPreview'));
        document.getElementById(inputId).value = '';
    }
};

// ============================================
// FORM SUBMISSION
// ============================================
async function handleSubmit(e) {
    e.preventDefault();
    
    const submitBtn = document.getElementById('submitBtn');
    const originalText = submitBtn.textContent;
    submitBtn.disabled = true;

    try {
        // Validate arsenal image
        if (!arsenalFile) {
            throw new Error('Arsenal screenshot is required');
        }

        // Get form data
        const formData = new FormData();
        formData.append('inGameName', document.getElementById('inGameName').value);
        formData.append('clan', document.getElementById('clan').value);
        formData.append('warframe', document.getElementById('warframe').value);
        formData.append('notes', document.getElementById('notes').value || '');
        
        // Add images
        capturaFiles.forEach((file, index) => {
            formData.append(`capturaImage${index}`, file);
        });
        formData.append('arsenalImage', arsenalFile);

        // Submit to backend
        showAlert('📤 Uploading submission...', 'info');
        submitBtn.innerHTML = '<span class="loading-spinner"></span> Submitting...';
        
        const response = await fetch('/.netlify/functions/submit-entry', {
            method: 'POST',
            body: formData
        });

        const result = await response.json();

        if (!response.ok) {
            throw new Error(result.error || 'Submission failed');
        }

        showAlert('✨ Entry submitted successfully!', 'success');
        
        // Reset form
        setTimeout(() => {
            document.getElementById('contestForm').reset();
            capturaFiles = [];
            arsenalFile = null;
            document.getElementById('capturaPreview').innerHTML = '';
            document.getElementById('arsenalPreview').innerHTML = '';
            document.getElementById('capturaCount').textContent = '';
            document.getElementById('alertContainer').innerHTML = '';
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }, 3000);

    } catch (error) {
        console.error('Submission error:', error);
        showAlert('❌ ' + error.message, 'error');
    } finally {
        submitBtn.disabled = false;
        submitBtn.textContent = originalText;
    }
}

// ============================================
// ALERTS
// ============================================
function showAlert(message, type) {
    const container = document.getElementById('alertContainer');
    const alert = document.createElement('div');
    alert.className = `alert alert-${type}`;
    alert.innerHTML = `<span>${message}</span>`;
    container.innerHTML = '';
    container.appendChild(alert);

    if (type === 'success') {
        setTimeout(() => {
            alert.remove();
        }, 5000);
    }
}

// ============================================
// INITIALIZATION
// ============================================
document.addEventListener('DOMContentLoaded', () => {
    // Populate event info
    const prizesList = document.getElementById('prizesList');
    const rulesList = document.getElementById('rulesList');
    
    EVENT_INFO.prizes.forEach(prize => {
        const li = document.createElement('li');
        li.innerHTML = prize;
        prizesList.appendChild(li);
    });
    
    EVENT_INFO.rules.forEach(rule => {
        const li = document.createElement('li');
        li.innerHTML = rule;
        rulesList.appendChild(li);
    });
    
    // Setup form
    createParticles();
    setupFileUpload('capturaImages', 'capturaPreview', 'capturaDrop', true);
    setupFileUpload('arsenalImage', 'arsenalPreview', 'arsenalDrop', false);
    document.getElementById('contestForm').addEventListener('submit', handleSubmit);
});
