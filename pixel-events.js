// Meta Pixel Events Manager
class MetaPixelManager {
    constructor() {
        this.pixelId = 'EAFZAadB3BAUMBPBwBftBWy3p4ZAPsbFM1wUu7G1PGqBwf6zqc9mY2CXEGdVZALMPvhtRTy0R2ZB6d0gSrPc6JCg0vOrylMfX2ABiZA58h92w97E0cAqZCIQ2Ry2XYDKgaggNCRswgJ6DLWXIFwHK7btr9ptAHHF0TckADoIbo5uhZC04W4mNdQWzmlV8LIkBucSiwZDZD';
        this.events = {
            pageView: 'PageView',
            lead: 'Lead',
            purchase: 'Purchase',
            addToCart: 'AddToCart',
            initiateCheckout: 'InitiateCheckout',
            viewContent: 'ViewContent',
            customEvent: 'CustomEvent'
        };
    }

    // Rastrear evento de compra (Purchase)
    trackPurchase(value, currency = 'BRL', additionalData = {}) {
        const eventData = {
            content_name: 'Evento Reforma Tributária 2025',
            content_category: 'Evento',
            value: value,
            currency: currency,
            content_type: 'product',
            ...additionalData
        };
        
        fbq('track', this.events.purchase, eventData);
        console.log('Purchase event tracked:', eventData);
    }

    // Rastrear evento de lead
    trackLead(value = 1, currency = 'BRL', additionalData = {}) {
        const eventData = {
            content_name: 'Evento Reforma Tributária 2025',
            content_category: 'Evento',
            value: value,
            currency: currency,
            ...additionalData
        };
        
        fbq('track', this.events.lead, eventData);
        console.log('Lead event tracked:', eventData);
    }

    // Rastrear evento de adição ao carrinho
    trackAddToCart(value, currency = 'BRL', additionalData = {}) {
        const eventData = {
            content_name: 'Evento Reforma Tributária 2025',
            content_category: 'Evento',
            value: value,
            currency: currency,
            content_type: 'product',
            ...additionalData
        };
        
        fbq('track', this.events.addToCart, eventData);
        console.log('AddToCart event tracked:', eventData);
    }

    // Rastrear evento de início de checkout
    trackInitiateCheckout(value = 1, currency = 'BRL', additionalData = {}) {
        const eventData = {
            content_name: 'Evento Reforma Tributária 2025',
            content_category: 'Evento',
            value: value,
            currency: currency,
            ...additionalData
        };
        
        fbq('track', this.events.initiateCheckout, eventData);
        console.log('InitiateCheckout event tracked:', eventData);
    }

    // Rastrear evento personalizado
    trackCustomEvent(eventName, additionalData = {}) {
        const eventData = {
            event_name: eventName,
            ...additionalData
        };
        
        fbq('track', this.events.customEvent, eventData);
        console.log('Custom event tracked:', eventData);
    }

    // Rastrear visualização de conteúdo
    trackViewContent(contentName, additionalData = {}) {
        const eventData = {
            content_name: contentName,
            content_category: 'Evento',
            content_type: 'video',
            ...additionalData
        };
        
        fbq('track', this.events.viewContent, eventData);
        console.log('ViewContent event tracked:', eventData);
    }

    // Rastrear tempo de permanência na página
    trackTimeOnPage() {
        const startTime = Date.now();
        window.addEventListener('beforeunload', () => {
            const timeSpent = Math.round((Date.now() - startTime) / 1000);
            this.trackCustomEvent('time_on_page', {
                time_spent_seconds: timeSpent
            });
        });
    }

    // Inicializar rastreamento de eventos
    init() {
        // Rastrear cliques nos botões de CTA
        const ctaButtons = document.querySelectorAll('a[href*="sun.eduzz.com"]');
        
        ctaButtons.forEach(button => {
            button.addEventListener('click', () => {
                this.trackLead();
                this.trackInitiateCheckout();
                this.trackCustomEvent('cta_click', {
                    button_text: button.textContent.trim(),
                    button_url: button.href
                });
            });
        });

        // Rastrear visualização do vídeo
        const videoIframe = document.getElementById('heroVideo');
        if (videoIframe) {
            videoIframe.addEventListener('load', () => {
                this.trackViewContent('Vídeo Reforma Tributária 2025');
            });
        }

        // Rastrear tempo de permanência
        this.trackTimeOnPage();

        console.log('Meta Pixel Manager initialized');
    }
}

// Inicializar quando o DOM estiver pronto
document.addEventListener('DOMContentLoaded', function() {
    window.metaPixelManager = new MetaPixelManager();
    window.metaPixelManager.init();
});

// Exemplo de uso para eventos externos (ex: após confirmação de pagamento)
// window.metaPixelManager.trackPurchase(97.00, 'BRL', {order_id: '12345'}); 