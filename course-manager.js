/**
 * Gestionnaire d'interface utilisateur
 */
class UIManager {
    constructor() {
        this.tooltips = new Map();
        this.animations = new Map();
        this.modals = [];
    }

    /**
     * Initialise les interactions UI
     */
    init() {
        this.initKeyboardShortcuts();
        this.initTooltips();
        this.initAnimations();
        this.initAccessibility();
    }

    /**
     * Initialise les raccourcis clavier
     */
    initKeyboardShortcuts() {
        document.addEventListener('keydown', (event) => {
            if (window.CourseManager && window.CourseManager.selectedLevel) {
                switch(event.key) {
                    case 'ArrowRight':
                        if (!this.isInputFocused()) {
                            window.CourseManager.nextStep();
                        }
                        break;
                    case 'ArrowLeft':
                        if (!this.isInputFocused()) {
                            window.CourseManager.previousStep();
                        }
                        break;
                    case 'h':
                    case 'H':
                        if (event.ctrlKey) {
                            event.preventDefault();
                            this.showHelpModal();
                        }
                        break;
                    case 'Escape':
                        this.closeAllModals();
                        break;
                }
            }
        });
    }

    /**
     * Vérifie si un champ de saisie est actif
     */
    isInputFocused() {
        const activeElement = document.activeElement;
        return activeElement && (
            activeElement.tagName === 'INPUT' || 
            activeElement.tagName === 'TEXTAREA' || 
            activeElement.contentEditable === 'true'
        );
    }

    /**
     * Initialise les tooltips
     */
    initTooltips() {
        // Tooltips pour les concepts
        document.addEventListener('mouseenter', (event) => {
            const conceptRow = event.target.closest('.concept-row');
            if (conceptRow) {
                const conceptName = conceptRow.querySelector('td strong')?.textContent;
                if (conceptName) {
                    this.showTooltip(event, conceptName);
                }
            }
        }, true);

        document.addEventListener('mouseleave', (event) => {
            const conceptRow = event.target.closest('.concept-row');
            if (conceptRow) {
                this.hideTooltip();
            }
        }, true);
    }

    /**
     * Affiche un tooltip
     */
    showTooltip(event, conceptName) {
        const tooltip = document.createElement('div');
        tooltip.className = 'concept-tooltip show';
        tooltip.innerHTML = this.getTooltipContent(conceptName);
        
        document.body.appendChild(tooltip);
        
        // Position du tooltip
        const rect = event.target.getBoundingClientRect();
        tooltip.style.left = rect.left + 'px';
        tooltip.style.top = (rect.top - tooltip.offsetHeight - 10) + 'px';
        
        this.tooltips.set('current', tooltip);
        
        setTimeout(() => tooltip.classList.add('show'), 10);
    }

    /**
     * Cache le tooltip actuel
     */
    hideTooltip() {
        const tooltip = this.tooltips.get('current');
        if (tooltip) {
            tooltip.remove();
            this.tooltips.delete('current');
        }
    }

    /**
     * Génère le contenu du tooltip
     */
    getTooltipContent(conceptName) {
        const conceptInfo = {
            'Classes et Objets': {
                description: 'Concept fondamental de la POO',
                levels: {
                    1: '⭐ Syntaxe basique + pass',
                    2: '⭐⭐ Conventions + validation',
                    3: '⭐⭐⭐ Architecture + documentation'
                }
            },
            'Constructeurs': {
                description: 'Initialisation des objets',
                levels: {
                    1: '⭐ __init__ simple',
                    2: '⭐⭐ Validation + **kwargs',
                    3: '⭐⭐⭐ Factory methods + robustesse'
                }
            }
            // ... autres concepts
        };

        const info = conceptInfo[conceptName];
        if (info) {
            return `
                <h6>${conceptName}</h6>
                <p>${info.description}</p>
                <div class="difficulty-levels">
                    <div class="level-detail level-1-detail">${info.levels[1]}</div>
                    <div class="level-detail level-2-detail">${info.levels[2]}</div>
                    <div class="level-detail level-3-detail">${info.levels[3]}</div>
                </div>
                <small>Cliquez pour plus de détails</small>
            `;
        }
        
        return `<h6>${conceptName}</h6><p>Cliquez pour voir les détails</p>`;
    }

    /**
     * Initialise les animations
     */
    initAnimations() {
        // Animation des barres de progression
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    this.animateProgressBars(entry.target);
                }
            });
        }, { threshold: 0.1 });

        // Observer les sections avec des barres de progression
        document.querySelectorAll('.concept-progression, .choice-guide').forEach(section => {
            observer.observe(section);
        });
    }

    /**
     * Anime les barres de progression
     */
    animateProgressBars(container) {
        const progressFills = container.querySelectorAll('.progression-fill');
        progressFills.forEach((fill, index) => {
            setTimeout(() => {
                fill.style.transform = 'scaleX(1)';
                fill.style.opacity = '1';
            }, index * 100);
        });
    }

    /**
     * Initialise l'accessibilité
     */
    initAccessibility() {
        // Améliorer l'accessibilité des boutons
        document.querySelectorAll('button').forEach(button => {
            if (!button.getAttribute('aria-label') && button.textContent) {
                button.setAttribute('aria-label', button.textContent.trim());
            }
        });

        // Améliorer l'accessibilité des zones interactives
        document.querySelectorAll('.level-card, .concept-row').forEach(element => {
            element.setAttribute('role', 'button');
            element.setAttribute('tabindex', '0');
            
            // Gestion des événements clavier
            element.addEventListener('keydown', (event) => {
                if (event.key === 'Enter' || event.key === ' ') {
                    event.preventDefault();
                    element.click();
                }
            });
        });
    }

    /**
     * Affiche les détails d'un concept
     */
    showConceptDetails(conceptName) {
        const conceptDetails = {
            'Classes et Objets': {
                debutant: 'Niveau ⭐ - Analogie du moule à gâteau. Classe vide avec pass. Questions : syntaxe basique, comprendre classe vs objet.',
                intermediaire: 'Niveau ⭐⭐ - Classes avec conventions Python, attributs privés. Questions : validation, __slots__, bonnes pratiques.',
                avance: 'Niveau 🏢 - Architecture métier, dataclass, documentation. Questions : métaclasses, descripteurs, patterns avancés.'
            },
            'Constructeurs': {
                debutant: 'Niveau ⭐ - __init__ basique avec 1-2 paramètres. Questions : initialisation simple des attributs.',
                intermediaire: 'Niveau ⭐⭐ - Constructeurs avec validation, **kwargs. Questions : gestion d\'erreurs, paramètres par défaut.',
                avance: 'Niveau 🏢 - Factory methods, validation métier complexe. Questions : isinstance(), type(), exceptions robustes.'
            },
            'Héritage': {
                debutant: 'Niveau ⭐ - Héritage simple class Enfant(Parent). Questions : relation parent/enfant basique.',
                intermediaire: 'Niveau ⭐⭐ - super(), redéfinition de méthodes. Questions : chaîne d\'héritage, résolution.',
                avance: 'Niveau 🏢 - MRO, composition vs héritage. Questions : architecture complexe, mixins.'
            }
            // ... autres concepts
        };

        const details = conceptDetails[conceptName];
        if (details) {
            let message = `📚 CONCEPT : ${conceptName}\n\n`;
            message += `🌱 DÉBUTANT :\n${details.debutant}\n\n`;
            message += `🚀 INTERMÉDIAIRE :\n${details.intermediaire}\n\n`;
            message += `🎓 AVANCÉ BTS :\n${details.avance}\n\n`;
            message += `💡 Les concepts peuvent évoluer sur 3 niveaux de difficulté selon votre progression.`;
            
            this.showModal('Détails du Concept', message);
        }
    }

    /**
     * Affiche la modal d'aide
     */
    showHelpModal() {
        const helpContent = `
🎯 AIDE DU COURS POO PYTHON

📝 Navigation :
• ← → : Naviguer entre les étapes
• Ctrl+H : Afficher cette aide
• Échap : Fermer les modales

📚 Fonctionnalités :
• Clic sur concept : Voir détails par niveau
• Validation adaptée au niveau choisi
• Badges de progression automatiques
• Sauvegarde automatique de progression

🎓 Conseils :
• Testez votre code dans chaque exercice
• Lisez les messages d'erreur attentivement
• N'hésitez pas à utiliser les indices (sauf niveau avancé)

🚀 Niveaux :
• Débutant : Apprentissage en douceur avec analogies
• Intermédiaire : Concepts avancés avec applications
• Avancé BTS : Formation professionnelle complète

⌨️ Raccourcis :
• Ctrl+H : Aide
• Échap : Fermer
• ← → : Navigation
        `;
        
        this.showModal('Aide du Cours', helpContent);
    }

    /**
     * Affiche une modal générique
     */
    showModal(title, content) {
        const modal = document.createElement('div');
        modal.className = 'modal-overlay';
        modal.innerHTML = `
            <div class="modal-content">
                <div class="modal-header">
                    <h3>${title}</h3>
                    <button class="modal-close" onclick="this.closest('.modal-overlay').remove()">×</button>
                </div>
                <div class="modal-body">
                    <pre style="white-space: pre-wrap; font-family: inherit;">${content}</pre>
                </div>
                <div class="modal-footer">
                    <button class="btn" onclick="this.closest('.modal-overlay').remove()">Fermer</button>
                </div>
            </div>
        `;
        
        document.body.appendChild(modal);
        this.modals.push(modal);
        
        // Fermeture par clic sur l'overlay
        modal.addEventListener('click', (event) => {
            if (event.target === modal) {
                modal.remove();
                this.modals = this.modals.filter(m => m !== modal);
            }
        });
    }

    /**
     * Ferme toutes les modales
     */
    closeAllModals() {
        this.modals.forEach(modal => modal.remove());
        this.modals = [];
    }

    /**
     * Affiche une notification
     */
    showNotification(message, type = 'info', duration = 3000) {
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.textContent = message;
        
        // Styles inline pour la notification
        Object.assign(notification.style, {
            position: 'fixed',
            top: '20px',
            right: '20px',
            padding: '15px 20px',
            borderRadius: '5px',
            color: 'white',
            fontWeight: 'bold',
            zIndex: '10000',
            transform: 'translateX(100%)',
            transition: 'transform 0.3s ease'
        });
        
        // Couleurs selon le type
        const colors = {
            info: '#3498db',
            success: '#2ecc71',
            warning: '#f39c12',
            error: '#e74c3c'
        };
        notification.style.backgroundColor = colors[type] || colors.info;
        
        document.body.appendChild(notification);
        
        // Animation d'entrée
        setTimeout(() => {
            notification.style.transform = 'translateX(0)';
        }, 10);
        
        // Suppression automatique
        setTimeout(() => {
            notification.style.transform = 'translateX(100%)';
            setTimeout(() => notification.remove(), 300);
        }, duration);
    }

    /**
     * Met à jour l'indicateur de progression visuel
     */
    updateProgressVisual(currentStep, totalSteps) {
        const percentage = Math.round((currentStep / totalSteps) * 100);
        
        // Mise à jour de la barre de progression
        const progressBar = document.getElementById('progressBar');
        if (progressBar) {
            progressBar.style.width = `${percentage}%`;
            progressBar.style.transition = 'width 0.5s ease';
        }
        
        // Animation des étapes
        document.querySelectorAll('.step').forEach((step, index) => {
            setTimeout(() => {
                if (index < currentStep) {
                    step.classList.add('completed');
                } else if (index === currentStep) {
                    step.classList.add('active');
                } else {
                    step.classList.remove('active', 'completed');
                }
            }, index * 50);
        });
    }

    /**
     * Gère les animations de badges
     */
    animateBadge(badgeId) {
        const badge = document.getElementById(badgeId);
        if (badge) {
            badge.classList.add('earned');
            
            // Animation de célébration
            badge.style.animation = 'badgeEarn 0.6s ease-out';
            
            // Effet de particules (optionnel)
            this.createParticleEffect(badge);
        }
    }

    /**
     * Crée un effet de particules pour les badges
     */
    createParticleEffect(element) {
        const rect = element.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        
        for (let i = 0; i < 10; i++) {
            const particle = document.createElement('div');
            particle.className = 'particle';
            
            Object.assign(particle.style, {
                position: 'fixed',
                left: centerX + 'px',
                top: centerY + 'px',
                width: '4px',
                height: '4px',
                backgroundColor: '#ffd700',
                borderRadius: '50%',
                pointerEvents: 'none',
                zIndex: '10000'
            });
            
            document.body.appendChild(particle);
            
            // Animation de la particule
            const angle = (i / 10) * Math.PI * 2;
            const distance = 50 + Math.random() * 50;
            const duration = 800 + Math.random() * 400;
            
            particle.animate([
                { 
                    transform: 'translate(0, 0) scale(1)',
                    opacity: 1
                },
                { 
                    transform: `translate(${Math.cos(angle) * distance}px, ${Math.sin(angle) * distance}px) scale(0)`,
                    opacity: 0
                }
            ], {
                duration: duration,
                easing: 'ease-out'
            }).onfinish = () => particle.remove();
        }
    }

    /**
     * Gère l'état de chargement
     */
    setLoading(isLoading, message = 'Chargement...') {
        let loader = document.getElementById('global-loader');
        
        if (isLoading) {
            if (!loader) {
                loader = document.createElement('div');
                loader.id = 'global-loader';
                loader.innerHTML = `
                    <div class="loader-content">
                        <div class="loader-spinner"></div>
                        <div class="loader-message">${message}</div>
                    </div>
                `;
                
                Object.assign(loader.style, {
                    position: 'fixed',
                    top: '0',
                    left: '0',
                    width: '100%',
                    height: '100%',
                    backgroundColor: 'rgba(0, 0, 0, 0.7)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    zIndex: '99999',
                    color: 'white'
                });
                
                document.body.appendChild(loader);
            }
            loader.querySelector('.loader-message').textContent = message;
        } else {
            if (loader) {
                loader.remove();
            }
        }
    }
}

// Export
window.UIManager = UIManager;