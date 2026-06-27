// ===== 元气少女缘结神网站 JS =====

document.addEventListener('DOMContentLoaded', function() {
    initSakuraPetals();
    initGalleryModal();
    initGuestbookForm();
});

// ===== 樱花飘落效果 =====
function initSakuraPetals() {
    const sakuraEmojis = ['🌸', '🌺', '💮', '🏵️'];
    
    function createSakura() {
        const petal = document.createElement('div');
        petal.className = 'sakura-petal';
        petal.textContent = sakuraEmojis[Math.floor(Math.random() * sakuraEmojis.length)];
        petal.style.left = Math.random() * 100 + 'vw';
        petal.style.fontSize = (Math.random() * 15 + 10) + 'px';
        petal.style.animationDuration = (Math.random() * 5 + 5) + 's';
        petal.style.animationDelay = Math.random() * 2 + 's';
        document.body.appendChild(petal);
        
        setTimeout(function() {
            petal.remove();
        }, 10000);
    }
    
    setInterval(createSakura, 1500);
    
    for (let i = 0; i < 5; i++) {
        setTimeout(createSakura, i * 300);
    }
}

// ===== 画廊图片模态框 =====
function initGalleryModal() {
    const modal = document.getElementById('imageModal');
    const modalImg = document.getElementById('modalImage');
    const galleryItems = document.querySelectorAll('.gallery-item');
    
    if (!modal || !modalImg || galleryItems.length === 0) return;
    
    galleryItems.forEach(function(item) {
        item.addEventListener('click', function() {
            const img = this.querySelector('img');
            if (img) {
                modalImg.src = img.src;
                modalImg.alt = img.alt;
            }
        });
    });
    
    modal.addEventListener('click', function(e) {
        if (e.target === modal) {
            const bsModal = bootstrap.Modal.getInstance(modal);
            if (bsModal) bsModal.hide();
        }
    });
}

// ===== 留言板表单 =====
function initGuestbookForm() {
    const form = document.getElementById('guestbookForm');
    const successAlert = document.getElementById('successAlert');
    const messagesList = document.getElementById('messagesList');
    
    if (!form || !messagesList) return;
    
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const nameInput = document.getElementById('guestName');
        const messageInput = document.getElementById('guestMessage');
        const charRadios = document.querySelectorAll('input[name="favoriteChar"]:checked');
        
        let isValid = true;
        
        if (!nameInput.value.trim()) {
            nameInput.classList.add('is-invalid');
            isValid = false;
        } else {
            nameInput.classList.remove('is-invalid');
        }
        
        if (!messageInput.value.trim()) {
            messageInput.classList.add('is-invalid');
            isValid = false;
        } else {
            messageInput.classList.remove('is-invalid');
        }
        
        if (!isValid) return;
        
        const favoriteChar = charRadios.length > 0 ? charRadios[0].value : '全部';
        const today = new Date();
        const dateStr = today.getFullYear() + '-' + 
                        String(today.getMonth() + 1).padStart(2, '0') + '-' + 
                        String(today.getDate()).padStart(2, '0');
        
        const messageCard = document.createElement('div');
        messageCard.className = 'message-card bg-white rounded-3 shadow-lg p-5 mb-4 animate-fade-in';
        messageCard.innerHTML = `
            <div class="d-flex justify-content-between align-items-start mb-3">
                <div>
                    <h5 class="mb-1 text-pink">${escapeHtml(nameInput.value.trim())}</h5>
                    <p class="text-muted small mb-0">最喜欢的角色：${escapeHtml(favoriteChar)}</p>
                </div>
                <span class="text-muted small">${dateStr}</span>
            </div>
            <p class="mb-0">${escapeHtml(messageInput.value.trim())}</p>
        `;
        
        messagesList.insertBefore(messageCard, messagesList.firstChild);
        
        if (successAlert) {
            successAlert.classList.remove('d-none');
            setTimeout(function() {
                successAlert.classList.add('d-none');
            }, 3000);
        }
        
        form.reset();
    });
    
    const inputs = form.querySelectorAll('input, textarea');
    inputs.forEach(function(input) {
        input.addEventListener('input', function() {
            if (this.value.trim()) {
                this.classList.remove('is-invalid');
            }
        });
    });
}

// ===== 滚动动画 =====
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(function(entry) {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-fade-in');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    const animatedElements = document.querySelectorAll(
        '.character-card, .info-box, .feature-card, .timeline-item, .message-card, .gallery-item'
    );
    
    animatedElements.forEach(function(el) {
        el.style.opacity = '0';
        observer.observe(el);
    });
}

// ===== HTML转义（防止XSS） =====
function escapeHtml(text) {
    const div = document.createElement('div');
    div.appendChild(document.createTextNode(text));
    return div.innerHTML;
}

// ===== 页面加载完成后的动效 =====
window.addEventListener('load', function() {
    document.body.classList.add('loaded');
});

// ===== 导航栏滚动效果 =====
let lastScrollY = 0;
window.addEventListener('scroll', function() {
    const navbar = document.querySelector('.kamisama-nav');
    if (!navbar) return;
    
    if (window.scrollY > 100) {
        navbar.style.boxShadow = '0 4px 20px rgba(255, 107, 157, 0.4)';
    } else {
        navbar.style.boxShadow = '0 2px 15px rgba(255, 107, 157, 0.3)';
    }
    
    lastScrollY = window.scrollY;
});
