/**
 * Script principal du cours POO Python
 * Initialise tous les composants et gère les interactions globales
 */

// Variables globales
let courseManager;
let uiManager;

/**
 * Initialisation principale
 */
async function initializeApp() {
    try {
        console.log('🐍 Initialisation du cours POO Python...');
        
        // Afficher l'état de chargement
        showLoadingState(true, 'Initialisation du cours...');
        
        // Créer les instances des gestionnaires
        courseManager = new CourseManager();
        uiManager = new UIManager();
        
        // Lier les gestionnaires
        courseManager.uiManager = uiManager;
        window.CourseManager = courseManager;
        window.UIManager = uiManager;
        
        // Initialiser les composants
        await courseManager.init();
        uiManager.init();
        
        // Tenter de charger une progression sauvegardée
        const hasProgress = courseManager.loadProgress();
        if (hasProgress) {
            uiManager.showNotification('Progression précédente chargée', 'info');
        }
        
        // Démarrer le suivi de session
        courseManager.startSession();
        
        // Sauvegarder périodiquement
        setInterval(() => {
            courseManager.saveProgress();
        }, 30000); // Toutes les 30 secondes
        
        // Cacher l'état de chargement
        showLoadingState(false);
        
        console.log('✅ Cours POO Python initialisé avec succès !');
        console.log('📚 3 niveaux disponibles : Débutant, Intermédiaire, Avancé BTS SLAM');
        
    } catch (error) {
        console.error('❌ Erreur lors de l\'initialisation:', error);
        showErrorState('Erreur lors de l\'initialisation du cours');
        showLoadingState(false);
    }
}

/**
 * Fonctions globales pour les boutons HTML (compatibilité)
 */
function selectLevel(level) {
    if (courseManager) {
        courseManager.selectLevel(level);
    } else {
        console.error('CourseManager non initialisé');
    }
}

function nextStep() {
    if (courseManager) {
        courseManager.nextStep();
    } else {
        uiManager?.showNotification('Veuillez d\'abord sélectionner un niveau !', 'warning');
    }
}

function previousStep() {
    if (courseManager) {
        courseManager.previousStep();
    }
}

function checkMicro(microNumber) {
    if (courseManager) {
        courseManager.checkMicro(microNumber);
    } else {
        console.error('CourseManager non initialisé');
    }
}

function showHint(hintId) {
    if (courseManager) {
        courseManager.showHint(hintId);
    }
}

/**
 * Fonctions utilitaires
 */
                        z-index: 99999;
                    ">
                        <div>${message}</div>
                        <div style="margin-top: 10px;">🐍</div>
                    </div>
                `;
                document.body.appendChild(loader);
            }
        } else {
            if (loader) {
                loader.remove();
            }
        }
    }
}

function showErrorState(message) {
    const errorDiv = document.createElement('div');
    errorDiv.innerHTML = `
        <div style="
            position: fixed;
            top: 20px;
            right: 20px;
            background: #e74c3c;
            color: white;
            padding: 15px;
            border-radius: 5px;
            z-index: 10000;
        ">
            ❌ ${message}
        </div>
    `;
    document.body.appendChild(errorDiv);
    
    setTimeout(() => errorDiv.remove(), 5000);
}

/**
 * Gestion des erreurs globales
 */
window.addEventListener('error', (event) => {
    console.error('Erreur JavaScript:', event.error);
    if (uiManager) {
        uiManager.showNotification('Une erreur inattendue s\'est produite', 'error');
    }
});

window.addEventListener('unhandledrejection', (event) => {
    console.error('Promesse rejetée:', event.reason);
    if (uiManager) {
        uiManager.showNotification('Erreur de chargement', 'error');
    }
});

/**
 * Gestion de la visibilité de la page (pause/reprise)
 */
document.addEventListener('visibilitychange', () => {
    if (courseManager) {
        if (document.hidden) {
            // Page cachée - sauvegarder
            courseManager.saveProgress();
        } else {
            // Page visible - reprendre
            if (courseManager.selectedLevel) {
                console.log('Reprise de la session');
            }
        }
    }
});

/**
 * Nettoyage avant fermeture de page
 */
window.addEventListener('beforeunload', () => {
    if (courseManager) {
        courseManager.saveProgress();
    }
});

/**
 * Fonctions de débogage (développement)
 */
window.debugCourse = {
    info: () => {
        if (courseManager) {
            courseManager.debug();
        }
    },
    stats: () => {
        if (courseManager) {
            console.table(courseManager.exportStats());
        }
    },
    reset: () => {
        if (confirm('Réinitialiser complètement le cours ?')) {
            localStorage.removeItem('poo-course-progress');
            location.reload();
        }
    },
    testValidation: (microNumber, code) => {
        if (courseManager) {
            const level = courseManager.getDifficultyLevel(microNumber);
            const result = courseManager.validator.validate(microNumber, code, level);
            console.log(`Validation micro ${microNumber} (${level}):`, result);
            return result;
        }
    }
};

/**
 * Fonctions spéciales pour les projets BTS
 */
function showBTSSolution() {
    const solution = `# Système de Gestion de Bibliothèque - BTS SLAM
import re
from datetime import datetime

class BibliothequeError(Exception):
    '''Exception personnalisée pour la bibliothèque'''
    pass

class Livre:
    '''Classe représentant un livre dans la bibliothèque'''
    def __init__(self, isbn, titre, auteur, genre):
        self.isbn = self._valider_isbn(isbn)
        self.titre = titre
        self.auteur = auteur
        self.genre = genre
        self.emprunte = False
        self.date_emprunt = None
    
    def _valider_isbn(self, isbn):
        if not re.match(r'^\\d{13}, isbn):
            raise ValueError("ISBN invalide")
        return isbn
    
    def __str__(self):
        return f"{self.titre} par {self.auteur}"
    
    @property
    def disponible(self):
        return not self.emprunte

class Utilisateur:
    '''Classe représentant un utilisateur de la bibliothèque'''
    def __init__(self, nom, email):
        self.nom = nom
        self.email = self._valider_email(email)
        self.livres_empruntes = []
    
    def _valider_email(self, email):
        pattern = r'^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}
        if not re.match(pattern, email):
            raise ValueError("Email invalide")
        return email
    
    def peut_emprunter(self):
        return len(self.livres_empruntes) < 3

class Bibliotheque:
    '''Classe principale - Pattern Singleton'''
    _instance = None
    
    def __new__(cls):
        if cls._instance is None:
            cls._instance = super().__new__(cls)
            cls._instance.livres = []
            cls._instance.utilisateurs = []
        return cls._instance
    
    def ajouter_livre(self, livre):
        if not isinstance(livre, Livre):
            raise TypeError("Objet Livre attendu")
        self.livres.append(livre)
    
    @classmethod
    def generer_rapport(cls):
        instance = cls()
        total_livres = len(instance.livres)
        livres_disponibles = sum(1 for livre in instance.livres if livre.disponible)
        return f"Total: {total_livres}, Disponibles: {livres_disponibles}"

# Test du système
if __name__ == '__main__':
    biblio = Bibliotheque()
    livre = Livre("1234567890123", "Python POO", "Expert Dev", "Informatique")
    biblio.ajouter_livre(livre)
    print(biblio.generer_rapport())`;

    if (uiManager) {
        uiManager.showModal('Solution Professionnelle BTS SLAM', solution);
    } else {
        alert('Solution affichée dans la console (F12)');
        console.log(solution);
    }
}

/**
 * Fonctions d'aide et de comparaison
 */
function compareAllLevels() {
    const comparison = `
📊 COMPARAISON COMPLÈTE DES NIVEAUX

🌱 DÉBUTANT (8 étapes - 45 minutes) :
• Classes & Objets : Syntaxe basique + pass
• Constructeurs : __init__ simple  
• Attributs : Assignation directe
• Méthodes : Actions de base
• Héritage : class Chat(Animal)
• Polymorphisme : Concept de base
→ Projet : Zoo virtuel simple (3 classes)

🚀 INTERMÉDIAIRE (11 étapes - 75 minutes) :
• Tous les concepts débutants avec exigences renforcées
• + Encapsulation : Attributs privés + conventions
• + Méthodes Spéciales : __str__, __len__, __eq__
• + Properties : @property + validation
• + Gestion d'Erreurs : ValueError + try/except
→ Projet : E-commerce avec validation complète

🎓 AVANCÉ BTS (12 étapes - 120 minutes) :
• Tous les concepts précédents avec expertise technique
• + Design Patterns : Singleton, Factory, Observer
• + Tests Unitaires : unittest, TDD, coverage
• + Architecture Métier : Modèles professionnels
→ Projet : Système bibliothèque niveau entreprise

📝 ADAPTATION DES QUESTIONS :
• Même concept = 3 niveaux de difficulté différents
• Validation progressive : basique → logique → robuste
• Exigences croissantes : syntaxe → bonnes pratiques → architecture

💡 Chaque niveau est complet et adapté à votre expérience !
    `;
    
    if (uiManager) {
        uiManager.showModal('Comparaison des Niveaux', comparison);
    } else {
        alert(comparison);
    }
}

/**
 * Analytics et suivi (optionnel)
 */
function trackEvent(eventName, properties = {}) {
    // Ici on pourrait intégrer Google Analytics, Mixpanel, etc.
    if (typeof gtag !== 'undefined') {
        gtag('event', eventName, properties);
    }
    
    console.log('📊 Event tracked:', eventName, properties);
}

/**
 * Fonctions d'export/import
 */
function exportProgress() {
    if (!courseManager) return;
    
    const data = {
        progress: courseManager.exportStats(),
        timestamp: new Date().toISOString(),
        version: '1.0'
    };
    
    const blob = new Blob([JSON.stringify(data, null, 2)], {
        type: 'application/json'
    });
    
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `poo-course-progress-${new Date().toISOString().split('T')[0]}.json`;
    a.click();
    
    URL.revokeObjectURL(url);
    
    if (uiManager) {
        uiManager.showNotification('Progression exportée', 'success');
    }
}

function importProgress() {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.json';
    
    input.onchange = (event) => {
        const file = event.target.files[0];
        if (!file) return;
        
        const reader = new FileReader();
        reader.onload = (e) => {
            try {
                const data = JSON.parse(e.target.result);
                
                if (data.progress && courseManager) {
                    // Ici on pourrait restaurer la progression
                    console.log('Progression importée:', data);
                    
                    if (uiManager) {
                        uiManager.showNotification('Progression importée', 'success');
                    }
                }
            } catch (error) {
                console.error('Erreur lors de l\'import:', error);
                if (uiManager) {
                    uiManager.showNotification('Erreur lors de l\'import', 'error');
                }
            }
        };
        
        reader.readAsText(file);
    };
    
    input.click();
}

/**
 * Initialisation au chargement du DOM
 */
document.addEventListener('DOMContentLoaded', initializeApp);

/**
 * Support pour les anciennes versions de navigateurs
 */
if (!window.Promise) {
    console.warn('Ce navigateur ne supporte pas les Promises. Certaines fonctionnalités peuvent ne pas fonctionner.');
}

if (!window.fetch) {
    console.warn('Ce navigateur ne supporte pas fetch. Le chargement de contenu externe peut ne pas fonctionner.');
}

/**
 * Messages de développement
 */
console.log(`
🐍 Cours POO Python - Version Modulaire
📁 Architecture:
   ├── index.html (page principale)
   ├── js/
   │   ├── config.js (configuration)
   │   ├── validators.js (validation)
   │   ├── content-loader.js (chargement contenu)
   │   ├── course-manager.js (gestion cours)
   │   ├── ui-manager.js (interface)
   │   └── main.js (script principal)
   └── css/
       ├── main.css (styles principaux)
       ├── components.css (composants)
       └── responsive.css (responsive)

🎯 Fonctionnalités:
   • 3 niveaux adaptatifs
   • Sauvegarde automatique
   • Validation intelligente
   • Interface accessible
   • Mode debug

🚀 Pour déboguer: window.debugCourse
`);

// Export pour compatibilité
window.CourseApp = {
    courseManager,
    uiManager,
    init: initializeApp,
    debug: window.debugCourse
};