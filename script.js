// Funcionalidade para as tabs de soluções
document.addEventListener('DOMContentLoaded', function () {
    // Tab functionality
    const tabButtons = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.tab-content');

    tabButtons.forEach(button => {
        button.addEventListener('click', () => {
            const tabId = button.getAttribute('data-tab');

            // Remove active class from all buttons and contents
            tabButtons.forEach(btn => btn.classList.remove('active'));
            tabContents.forEach(content => content.classList.remove('active'));

            // Add active class to clicked button and corresponding content
            button.classList.add('active');
            document.getElementById(tabId).classList.add('active');
        });
    });

    // Header scroll effect
    const header = document.querySelector('.header');
    let lastScrollY = window.scrollY;

    window.addEventListener('scroll', () => {
        const currentScrollY = window.scrollY;

        if (currentScrollY > 100) {
            header.style.background = 'rgba(255, 255, 255, 0.98)';
            header.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
        } else {
            header.style.background = 'rgba(255, 255, 255, 0.95)';
            header.style.boxShadow = 'none';
        }

        lastScrollY = currentScrollY;
    });

    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Animation on scroll
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Observe elements for animation
    const animateElements = document.querySelectorAll(
        '.feature-category, .solution-item, .story-card, .metric-card'
    );

    animateElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });

    // Counter animation for hero stats
    const counters = document.querySelectorAll('.stat-number');
    const speed = 200; // Adjust animation speed

    const countUp = (counter) => {
        const target = parseInt(counter.innerText.replace(/\./g, ''));
        const increment = target / speed;
        let current = 0;

        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                counter.innerText = target.toLocaleString('pt-BR');
                clearInterval(timer);
            } else {
                counter.innerText = Math.floor(current).toLocaleString('pt-BR');
            }
        }, 10);
    };

    // Trigger counter animation when hero section is visible
    const heroObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                counters.forEach(counter => {
                    countUp(counter);
                });
                heroObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    const heroStats = document.querySelector('.hero-stats');
    if (heroStats) {
        heroObserver.observe(heroStats);
    }

    // Mobile menu toggle (for future implementation)
    const createMobileMenu = () => {
        const navMenu = document.querySelector('.nav-menu');
        const navActions = document.querySelector('.nav-actions');

        if (window.innerWidth <= 768) {
            // Add mobile menu button if not exists
            if (!document.querySelector('.mobile-menu-btn')) {
                const mobileMenuBtn = document.createElement('button');
                mobileMenuBtn.className = 'mobile-menu-btn';
                mobileMenuBtn.innerHTML = '<i class="fas fa-bars"></i>';
                mobileMenuBtn.style.cssText = `
                    background: none;
                    border: none;
                    font-size: 20px;
                    color: #666;
                    cursor: pointer;
                    display: block;
                `;

                document.querySelector('.nav-container').appendChild(mobileMenuBtn);

                mobileMenuBtn.addEventListener('click', () => {
                    navMenu.style.display = navMenu.style.display === 'flex' ? 'none' : 'flex';
                });
            }
        }
    };

    // Check on load and resize
    createMobileMenu();
    window.addEventListener('resize', createMobileMenu);

    // Form validation (for future forms)
    const validateEmail = (email) => {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    };

    // Add click tracking for buttons and links (analytics ready)
    document.querySelectorAll('button, a, .btn-primary, .btn-secondary').forEach(button => {
        button.addEventListener('click', (e) => {
            const buttonText = e.target.innerText;
            const buttonClass = e.target.className;

            // Log button clicks (can be extended for analytics)
            console.log(`Button clicked: ${buttonText} (${buttonClass})`);

            // Add visual feedback
            e.target.style.transform = 'scale(0.95)';
            setTimeout(() => {
                e.target.style.transform = '';
            }, 150);
        });
    });

    // Lazy loading for images (when added)
    const lazyImages = document.querySelectorAll('img[data-src]');
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                imageObserver.unobserve(img);
            }
        });
    });

    lazyImages.forEach(img => imageObserver.observe(img));

    // Particle effect for hero section (optional enhancement)
    const createParticles = () => {
        const hero = document.querySelector('.hero');
        const particleCount = 20;

        for (let i = 0; i < particleCount; i++) {
            const particle = document.createElement('div');
            particle.className = 'particle';
            particle.style.cssText = `
                position: absolute;
                width: 4px;
                height: 4px;
                background: rgba(255, 107, 107, 0.3);
                border-radius: 50%;
                pointer-events: none;
                animation: float ${3 + Math.random() * 4}s infinite ease-in-out;
                left: ${Math.random() * 100}%;
                top: ${Math.random() * 100}%;
                animation-delay: ${Math.random() * 2}s;
            `;

            hero.appendChild(particle);
        }

        // Add CSS animation for particles
        if (!document.querySelector('#particle-styles')) {
            const style = document.createElement('style');
            style.id = 'particle-styles';
            style.textContent = `
                @keyframes float {
                    0%, 100% { transform: translateY(0px) rotate(0deg); }
                    50% { transform: translateY(-20px) rotate(180deg); }
                }
                .hero { position: relative; overflow: hidden; }
            `;
            document.head.appendChild(style);
        }
    };

    // Initialize particles
    createParticles();

    // Video Overlay e Controles Customizados
    const videoOverlay = document.getElementById('videoOverlay');
    const heroVideo = document.querySelector('.hero-video');
    const customControls = document.getElementById('customControls');
    const playPauseBtn = document.getElementById('playPauseBtn');
    const volumeBtn = document.getElementById('volumeBtn');
    const volumeSlider = document.getElementById('volumeSlider');

    if (videoOverlay && heroVideo && customControls) {
        // Clique no overlay para iniciar o vídeo
        videoOverlay.addEventListener('click', function() {
            // Esconder o overlay
            videoOverlay.classList.add('hidden');
            
            // Mostrar controles customizados
            customControls.style.display = 'flex';
            
            // Reproduzir vídeo
            heroVideo.play().catch(e => {
                console.log('Erro ao reproduzir vídeo:', e);
                // Se houver erro, mostrar overlay novamente
                videoOverlay.classList.remove('hidden');
                customControls.style.display = 'none';
            });
        });

        // Botão Play/Pause customizado
        if (playPauseBtn) {
            playPauseBtn.addEventListener('click', function() {
                if (heroVideo.paused) {
                    heroVideo.play();
                    playPauseBtn.innerHTML = '<i class="fas fa-pause"></i><span>Pausar</span>';
                } else {
                    heroVideo.pause();
                    playPauseBtn.innerHTML = '<i class="fas fa-play"></i><span>Reproduzir</span>';
                }
            });
        }

        // Controle de volume customizado
        if (volumeSlider) {
            volumeSlider.addEventListener('input', function() {
                heroVideo.volume = this.value / 100;
                updateVolumeIcon();
            });
        }

        // Botão mute/unmute
        if (volumeBtn) {
            volumeBtn.addEventListener('click', function() {
                if (heroVideo.muted) {
                    heroVideo.muted = false;
                    volumeSlider.value = heroVideo.volume * 100;
                } else {
                    heroVideo.muted = true;
                }
                updateVolumeIcon();
            });
        }

        // Função para atualizar ícone do volume
        function updateVolumeIcon() {
            const volumeIcon = volumeBtn.querySelector('i');
            const volumeText = volumeBtn.querySelector('span');
            
            if (heroVideo.muted || heroVideo.volume === 0) {
                volumeIcon.className = 'fas fa-volume-mute';
                volumeText.textContent = 'Som';
            } else if (heroVideo.volume < 0.5) {
                volumeIcon.className = 'fas fa-volume-down';
                volumeText.textContent = 'Volume';
            } else {
                volumeIcon.className = 'fas fa-volume-up';
                volumeText.textContent = 'Volume';
            }
        }

        // Quando o vídeo for pausado
        heroVideo.addEventListener('pause', function() {
            if (!heroVideo.ended) {
                playPauseBtn.innerHTML = '<i class="fas fa-play"></i><span>Reproduzir</span>';
            }
        });

        // Quando o vídeo for reproduzido
        heroVideo.addEventListener('play', function() {
            playPauseBtn.innerHTML = '<i class="fas fa-pause"></i><span>Pausar</span>';
        });

        // Quando o vídeo terminar
        heroVideo.addEventListener('ended', function() {
            videoOverlay.classList.remove('hidden');
            customControls.style.display = 'none';
            playPauseBtn.innerHTML = '<i class="fas fa-play"></i><span>Reproduzir</span>';
        });

        // Prevenir menu de contexto (clique direito) no vídeo
        heroVideo.addEventListener('contextmenu', function(e) {
            e.preventDefault();
            return false;
        });

        // Inicializar volume
        updateVolumeIcon();
    }

    // Toast notification system removido - usando implementação melhorada abaixo
});

// Funcionalidades para a landing page do evento de reforma tributária
document.addEventListener('DOMContentLoaded', function () {
    // Header scroll effect
    const header = document.querySelector('.header');
    let lastScrollY = window.scrollY;

    window.addEventListener('scroll', () => {
        const currentScrollY = window.scrollY;

        if (currentScrollY > 100) {
            header.style.background = 'rgba(255, 255, 255, 0.98)';
            header.style.boxShadow = '0 4px 30px rgba(0, 0, 0, 0.1)';
            header.style.top = '0px';
        } else {
            header.style.background = 'rgba(255, 255, 255, 0.95)';
            header.style.boxShadow = 'none';
            header.style.top = '30px';
        }

        lastScrollY = currentScrollY;
    });

    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Animation on scroll
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';

                // Add specific animations based on element - speaker cards sem animação
                if (entry.target.classList.contains('audience-card')) {
                    entry.target.classList.add('animate-fade-in-up');
                } else if (entry.target.classList.contains('speaker-card')) {
                    // Sem animação para speaker cards
                } else if (entry.target.classList.contains('stat-card')) {
                    entry.target.classList.add('animate-slide-in-right');
                }
            }
        });
    }, observerOptions);

    // Observe elements for animation
    const animateElements = document.querySelectorAll(
        '.audience-card, .speaker-card, .stat-card, .choice-option, .info-card'
    );

    animateElements.forEach(el => {
        // Speaker cards sem transições para evitar animações
        if (el.classList.contains('speaker-card')) {
            el.style.opacity = '1';
            el.style.transform = 'translateY(0)';
        } else {
            el.style.opacity = '0';
            el.style.transform = 'translateY(20px)';
            el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        }
        observer.observe(el);
    });

    // Counter animation for metrics
    const animateCounters = () => {
        const counters = document.querySelectorAll('.metric-value, .stat-number');

        counters.forEach(counter => {
            const target = parseInt(counter.innerText.replace(/[^\d]/g, ''));
            if (target > 0) {
                const increment = target / 100;
                let current = 0;

                const timer = setInterval(() => {
                    current += increment;
                    if (current >= target) {
                        if (counter.classList.contains('stat-number')) {
                            counter.innerText = target + '%';
                        } else {
                            counter.innerText = target + (counter.innerText.includes('M') ? 'M+' : '+');
                        }
                        clearInterval(timer);
                    } else {
                        const displayValue = Math.floor(current);
                        if (counter.classList.contains('stat-number')) {
                            counter.innerText = displayValue + '%';
                        } else {
                            counter.innerText = displayValue + (counter.innerText.includes('M') ? 'M+' : '+');
                        }
                    }
                }, 20);
            }
        });
    };

    // Trigger counter animation when metrics are visible
    const metricsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounters();
                metricsObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    const metricsSection = document.querySelector('.impact-metrics, .stats-grid');
    if (metricsSection) {
        metricsObserver.observe(metricsSection);
    }

    // Spots countdown
    let spotsLeft = 23;
    const spotsElement = document.getElementById('spots-left');

    const updateSpots = () => {
        if (spotsLeft > 5 && Math.random() < 0.3) {
            spotsLeft--;
            spotsElement.textContent = spotsLeft;

            // Add visual feedback
            spotsElement.style.color = '#ef4444';
            spotsElement.style.transform = 'scale(1.2)';

            setTimeout(() => {
                spotsElement.style.color = '#fbbf24';
                spotsElement.style.transform = 'scale(1)';
            }, 300);
        }
    };

    // Update spots every 30-60 seconds
    setInterval(updateSpots, Math.random() * 30000 + 30000);

    // CTA button and link interactions
    document.querySelectorAll('button, a, .btn-primary, .btn-primary-large, .btn-primary-massive').forEach(button => {
        button.addEventListener('click', (e) => {
            const buttonText = e.target.innerText || e.target.textContent;

            // Log button clicks for analytics
            console.log(`CTA Button clicked: ${buttonText}`);

            // Add ripple effect
            const ripple = document.createElement('span');
            const rect = e.target.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;

            ripple.style.cssText = `
                position: absolute;
                width: ${size}px;
                height: ${size}px;
                left: ${x}px;
                top: ${y}px;
                background: rgba(255, 255, 255, 0.6);
                border-radius: 50%;
                transform: scale(0);
                animation: ripple 0.6s linear;
                pointer-events: none;
            `;

            e.target.style.position = 'relative';
            e.target.style.overflow = 'hidden';
            e.target.appendChild(ripple);

            setTimeout(() => {
                ripple.remove();
            }, 600);

            // Apenas log para botões que não são CTAs de inscrição
            // Os links de inscrição agora redirecionam diretamente via href
        });
    });

    // Add CSS for ripple animation
    if (!document.querySelector('#ripple-styles')) {
        const style = document.createElement('style');
        style.id = 'ripple-styles';
        style.textContent = `
            @keyframes ripple {
                to {
                    transform: scale(4);
                    opacity: 0;
                }
            }
        `;
        document.head.appendChild(style);
    }

    // Parallax effect for hero section - REMOVED
    // Animação removida para evitar que o vídeo fique torto durante o scroll

    // Removed typing effect to prevent HTML tag issues

    // Progressive disclosure for context section
    const contextText = document.querySelector('.context-text');
    if (contextText) {
        const paragraphs = contextText.querySelectorAll('p');

        paragraphs.forEach((p, index) => {
            p.style.opacity = '0';
            p.style.transform = 'translateY(20px)';
            p.style.transition = 'opacity 0.6s ease, transform 0.6s ease';

            setTimeout(() => {
                p.style.opacity = '1';
                p.style.transform = 'translateY(0)';
            }, 500 + (index * 200));
        });
    }

    // Countdown timer (example for event urgency)
    const createCountdown = () => {
        const eventDate = new Date('2025-09-25T08:00:00').getTime();

        const updateCountdown = () => {
            const now = new Date().getTime();
            const distance = eventDate - now;

            if (distance > 0) {
                const days = Math.floor(distance / (1000 * 60 * 60 * 24));
                const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
                const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));

                // You can add a countdown display element if needed
                console.log(`Tempo restante: ${days}d ${hours}h ${minutes}m`);
            }
        };

        setInterval(updateCountdown, 60000); // Update every minute
        updateCountdown(); // Initial call
    };

    createCountdown();

    // Mouse tracking for interactive elements - MODIFICADO
    // Removido video-container para evitar rotações indesejadas
    // Mouse tracking removido para evitar animações nos cards
    // const trackMouse = (e) => {
    //     const cards = document.querySelectorAll('.audience-card, .speaker-card');
    //     // Função removida para eliminar animações de rotação 3D
    // };

    // Form validation for future contact forms
    window.validateForm = (formData) => {
        const email = formData.get('email');
        const name = formData.get('name');
        const company = formData.get('company');

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!name || name.length < 2) {
            showToast('Nome deve ter pelo menos 2 caracteres', 'error');
            return false;
        }

        if (!emailRegex.test(email)) {
            showToast('Por favor, insira um email válido', 'error');
            return false;
        }

        if (!company || company.length < 2) {
            showToast('Nome da empresa é obrigatório', 'error');
            return false;
        }

        return true;
    };

    // Enhanced toast notification system
    window.showToast = (message, type = 'success', duration = 3000) => {
        // Remove existing toasts
        document.querySelectorAll('.toast').forEach(toast => toast.remove());

        const toast = document.createElement('div');
        toast.className = `toast toast-${type}`;

        const icon = type === 'success' ? '✓' : type === 'error' ? '✗' : 'ℹ';

        toast.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            padding: 16px 24px;
            background: ${type === 'success' ? '#10b981' : type === 'error' ? '#ef4444' : '#3b82f6'};
            color: white;
            border-radius: 12px;
            box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
            z-index: 10000;
            transform: translateX(100%);
            transition: transform 0.3s ease;
            display: flex;
            align-items: center;
            gap: 8px;
            font-weight: 500;
            max-width: 300px;
        `;

        toast.innerHTML = `<span style="font-size: 18px;">${icon}</span> ${message}`;

        document.body.appendChild(toast);

        setTimeout(() => {
            toast.style.transform = 'translateX(0)';
        }, 100);

        setTimeout(() => {
            toast.style.transform = 'translateX(100%)';
            setTimeout(() => {
                if (toast.parentNode) {
                    toast.parentNode.removeChild(toast);
                }
            }, 300);
        }, duration);
    };

    // Performance monitoring
    const trackPerformance = () => {
        const navigation = performance.getEntriesByType('navigation')[0];
        const loadTime = navigation.loadEventEnd - navigation.loadEventStart;

        console.log(`Página carregada em: ${loadTime}ms`);

        // Track scroll depth
        let maxScroll = 0;
        window.addEventListener('scroll', () => {
            const scrollPercent = Math.round((window.scrollY / (document.body.scrollHeight - window.innerHeight)) * 100);
            maxScroll = Math.max(maxScroll, scrollPercent);
        });

        // Log max scroll on page unload
        window.addEventListener('beforeunload', () => {
            console.log(`Scroll máximo: ${maxScroll}%`);
        });
    };

    trackPerformance();

    // Add hover effects for timeline items
    const timelineItems = document.querySelectorAll('.timeline-item');
    timelineItems.forEach((item, index) => {
        item.addEventListener('mouseenter', () => {
            item.classList.add('active');
            item.style.transform = 'translateX(10px)';
        });

        item.addEventListener('mouseleave', () => {
            if (index !== 0) { // Keep first item active
                item.classList.remove('active');
            }
            item.style.transform = 'translateX(0)';
        });
    });

    // Initialize all systems
    console.log('Landing page do evento inicializada com sucesso!');

    // Show welcome message after everything loads
    setTimeout(() => {
        showToast('Bem-vindo ao evento Reforma Tributária 2025!', 'success', 4000);
    }, 1500);
}); 