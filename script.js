// Smooth scroll to contact
function scrollToContato() {
    const contatoSection = document.getElementById('contato');
    contatoSection.scrollIntoView({ behavior: 'smooth' });
}

// Agendar serviço
function agendarServico(servico) {
    const form = document.getElementById('contactForm');
    const serviceSelect = form.querySelector('select');
    
    // Pré-preencher o serviço selecionado
    for (let option of serviceSelect.options) {
        if (option.textContent.includes(servico)) {
            option.selected = true;
            break;
        }
    }
    
    scrollToContato();
}

// Toggle FAQ
function toggleFAQ(element) {
    const faqItem = element.parentElement;
    faqItem.classList.toggle('open');
}

// Form submission
document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const nome = this.querySelector('input[type="text"]').value;
            const email = this.querySelector('input[type="email"]').value;
            const telefone = this.querySelector('input[type="tel"]').value;
            const servico = this.querySelector('select').value;
            const mensagem = this.querySelector('textarea').value;
            
            // Criar mensagem para WhatsApp com informações do formulário
            const whatsappMessage = encodeURIComponent(
                `🎀 *NOVO AGENDAMENTO* 🎀\n\n` +
                `👤 Nome: ${nome}\n` +
                `📧 Email: ${email}\n` +
                `📞 Telefone: ${telefone}\n` +
                `💅 Serviço: ${servico}\n` +
                `💬 Mensagem: ${mensagem || 'Sem mensagem adicional'}\n\n` +
                `Estou interessado em agendar! 😊`
            );
            
            // Redirecionar para WhatsApp com número correto
            window.open(`https://wa.me/5511910526709?text=${whatsappMessage}`, '_blank');
            
            // Limpar formulário
            this.reset();
        });
    }
    
    // Pop-up de desconto após 30 segundos
    setTimeout(showDiscountPopup, 30000);
    
    // Mobile menu (hamburger)
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    
    if (hamburger) {
        hamburger.addEventListener('click', function() {
            navLinks.classList.toggle('active');
            hamburger.classList.toggle('active');
        });
    }
    
    // Fechar menu ao clicar em um link
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', function() {
            if (navLinks) {
                navLinks.classList.remove('active');
                hamburger.classList.remove('active');
            }
        });
    });
    
    // Fechar menu ao clicar fora
    document.addEventListener('click', function(event) {
        const isClickInsideNav = navLinks?.contains(event.target);
        const isClickInsideHamburger = hamburger?.contains(event.target);
        
        if (!isClickInsideNav && !isClickInsideHamburger && navLinks?.classList.contains('active')) {
            navLinks.classList.remove('active');
            hamburger.classList.remove('active');
        }
    });
    
    // Animação ao scroll
    observeElements();
});

// Mostrar pop-up de desconto
function showDiscountPopup() {
    const popup = document.getElementById('discountPopup');
    if (popup && !popup.classList.contains('show')) {
        popup.classList.add('show');
    }
}

// Fechar pop-up
function closePopup() {
    const popup = document.getElementById('discountPopup');
    if (popup) {
        popup.classList.remove('show');
    }
}

// Fechar pop-up ao clicar fora dele
document.addEventListener('click', function(event) {
    const popup = document.getElementById('discountPopup');
    if (popup && event.target === popup) {
        popup.classList.remove('show');
    }
});

// Observar elementos para animação ao scroll
function observeElements() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, {
        threshold: 0.1
    });
    
    // Observar cards e sections
    document.querySelectorAll('.benefit-card, .service-card, .gallery-item, .testimonial-card').forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(20px)';
        element.style.transition = 'all 0.6s ease';
        observer.observe(element);
    });
}

// Analytics (Google Analytics exemplo)
function trackEvent(eventName, eventCategory, eventLabel) {
    if (window.gtag) {
        gtag('event', eventName, {
            'event_category': eventCategory,
            'event_label': eventLabel
        });
    }
}

// Rastrear cliques em botões CTA
document.querySelectorAll('.btn-primary').forEach(button => {
    button.addEventListener('click', function() {
        trackEvent('cta_click', 'engagement', this.textContent);
    });
});

// Rastrear clique em WhatsApp
const whatsappButton = document.querySelector('.whatsapp-float a');
if (whatsappButton) {
    whatsappButton.addEventListener('click', function() {
        trackEvent('whatsapp_click', 'engagement', 'Floating WhatsApp Button');
    });
}

// Lazy loading de imagens
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                if (img.dataset.src) {
                    img.src = img.dataset.src;
                    img.classList.add('loaded');
                    observer.unobserve(img);
                }
            }
        });
    });
    
    document.querySelectorAll('img[data-src]').forEach(img => {
        imageObserver.observe(img);
    });
}

// Validação de Email
function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

// Validação de Telefone
function validatePhone(phone) {
    const re = /^[\d\s\-\(\)]+$/;
    return re.test(phone) && phone.replace(/\D/g, '').length >= 10;
}

// Performance: Defer non-critical scripts
window.addEventListener('load', function() {
    console.log('🎀 Landing page Tatiane Unhas carregada com sucesso!');
});

// Detectar dispositivo
function isMobileDevice() {
    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
}

// Adicionar classe ao body se for mobile
if (isMobileDevice()) {
    document.body.classList.add('mobile-device');
}

// Suavizar scroll em navegadores antigos
if (!('scrollBehavior' in document.documentElement.style)) {
    console.log('Scroll behavior não suportado, usando fallback');
}

// Verificar se o usuário está no WhatsApp
function isWhatsAppBrowser() {
    return /WhatsApp/i.test(navigator.userAgent);
}

// Scroll para topo ao recarregar a página
window.addEventListener('beforeunload', function() {
    window.scrollTo(0, 0);
});
