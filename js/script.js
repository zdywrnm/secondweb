// 简化的网站交互功能

// 页面初始化
function initializePage() {
    initMobileMenu();
    initScrollEffects();
    initQrCodeModal();
    initSmoothScroll();
}

// 移动端菜单功能
function initMobileMenu() {
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');
    
    if (menuToggle && navLinks) {
        menuToggle.addEventListener('click', function(e) {
            e.stopPropagation();
            navLinks.classList.toggle('active');
            menuToggle.classList.toggle('active');
            document.body.style.overflow = navLinks.classList.contains('active') ? 'hidden' : '';
        });
        
        navLinks.addEventListener('click', function(e) {
            if (e.target.tagName === 'A') {
                setTimeout(() => {
                    navLinks.classList.remove('active');
                    menuToggle.classList.remove('active');
                    document.body.style.overflow = '';
                }, 50);
            }
        });
        
        window.addEventListener('resize', function() {
            if (window.innerWidth > 768) {
                navLinks.classList.remove('active');
                menuToggle.classList.remove('active');
                document.body.style.overflow = '';
            }
        });
    }
}

// 滚动效果
function initScrollEffects() {
    const navbar = document.querySelector('.navbar');
    if (navbar) {
        window.addEventListener('scroll', function() {
            if (window.scrollY > 50) {
                navbar.style.backgroundColor = 'rgba(255, 255, 255, 0.95)';
                navbar.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
            } else {
                navbar.style.backgroundColor = 'rgba(255, 255, 255, 1)';
                navbar.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
            }
        });
    }
}

// 二维码弹窗
function initQrCodeModal() {
    document.querySelectorAll('.social-icon').forEach(icon => {
        icon.addEventListener('click', function(e) {
            e.preventDefault();
            const imagePath = this.getAttribute('data-image');
            const modal = document.getElementById('qrCodeModal');
            const modalImage = document.getElementById('modalImage');
            
            if (modal && modalImage) {
                modalImage.src = imagePath;
                modal.style.display = 'flex';
            }
        });
    });
}

// 平滑滚动
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// 触摸优化
if ('ontouchstart' in window) {
    document.addEventListener('touchstart', function(e) {
        if (e.target.classList.contains('btn') || 
            e.target.classList.contains('btn-primary') || 
            e.target.classList.contains('btn-submit') ||
            e.target.classList.contains('btn-secondary') ||
            e.target.classList.contains('unified-card') ||
            e.target.classList.contains('info-card') ||
            e.target.classList.contains('objective-item')) {
            e.target.style.transform = 'scale(0.98)';
        }
    });
    
    document.addEventListener('touchend', function(e) {
        if (e.target.classList.contains('btn') || 
            e.target.classList.contains('btn-primary') || 
            e.target.classList.contains('btn-submit') ||
            e.target.classList.contains('btn-secondary') ||
            e.target.classList.contains('unified-card') ||
            e.target.classList.contains('info-card') ||
            e.target.classList.contains('objective-item')) {
            setTimeout(() => {
                e.target.style.transform = '';
            }, 150);
        }
    });
}

// 页面加载完成后初始化
document.addEventListener('DOMContentLoaded', initializePage);

