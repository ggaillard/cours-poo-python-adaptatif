// Configuration principale du cours
const COURSE_CONFIG = {
    // Configuration des niveaux
    levels: {
        debutant: {
            id: 'debutant',
            name: 'Débutant',
            icon: '🌱',
            difficulty: 1,
            stepTitles: [
                "Premier Contact",
                "Qu'est-ce qu'une Classe",
                "Constructeur Simple", 
                "Plusieurs Attributs",
                "Première Méthode",
                "Méthodes Intelligentes",
                "Découverte Héritage",
                "Projet Final"
            ],
            totalSteps: 8,
            maxStepId: 7,
            duration: '45 minutes',
            description: 'Pour qui : Première fois en programmation',
            features: [
                'Explications très détaillées',
                'Analogies du quotidien',
                'Exercices guidés',
                '8 étapes progressives'
            ]
        },
        intermediaire: {
            id: 'intermediaire',
            name: 'Intermédiaire',
            icon: '🚀',
            difficulty: 2,
            stepTitles: [
                "Premier Contact",
                "Classes et Objets",
                "Constructeurs Avancés", 
                "Plusieurs Attributs",
                "Méthodes d'Instance",
                "Méthodes Intelligentes",
                "Héritage Simple",
                "Polymorphisme",
                "Méthodes Spéciales",
                "Properties",
                "Projet Intermédiaire"
            ],
            totalSteps: 11,
            maxStepId: 10,
            duration: '75 minutes',
            description: 'Pour qui : Connaît déjà un langage de programmation',
            features: [
                'Concepts POO approfondis',
                'Méthodes spéciales Python',
                'Properties et validation',
                '12 étapes avec défis'
            ]
        },
        avance: {
            id: 'avance',
            name: 'Avancé - BTS SLAM',
            icon: '🎓',
            difficulty: 3,
            stepTitles: [
                "Introduction POO",
                "Classes Professionnelles",
                "Constructeurs et Validation", 
                "Méthodes Spéciales Python",
                "Properties et Descripteurs",
                "Méthodes de Classe/Statiques",
                "Héritage Multiple",
                "Polymorphisme Avancé",
                "Composition vs Héritage",
                "Design Patterns",
                "Tests Unitaires",
                "Projet BTS Final"
            ],
            totalSteps: 12,
            maxStepId: 12,
            duration: '120 minutes',
            description: 'Pour qui : Étudiants BTS SLAM',
            features: [
                'Patterns professionnels',
                'Projet métier complet',
                'Tests et documentation',
                '15 étapes + évaluation'
            ]
        }
    },

    // Messages de succès et d'erreur
    messages: {
        success: {
            debutant: '🎉 Félicitations ! Vous maîtrisez les bases de la POO Python !',
            intermediaire: '🎉 Excellent ! Vous avez un niveau solide en POO Python !',
            avance: '🎉 Bravo ! Vous êtes prêt pour les défis professionnels BTS SLAM !'
        },
        hints: {
            avance: '💪 Niveau avancé : Aucun indice disponible ! Faites confiance à vos compétences.'
        }
    },

    // Configuration des badges
    badges: {
        micro1: { id: 'badge-micro1', name: '🤔 Observateur' },
        micro2: { id: 'badge-micro2', name: '🏗️ Créateur' },
        micro3: { id: 'badge-micro3', name: '⚙️ Configurateur' },
        micro4: { id: 'badge-micro4', name: '📝 Détailleur' },
        micro5: { id: 'badge-micro5', name: '🎭 Animateur' },
        micro6: { id: 'badge-micro6', name: '🧠 Logicien' },
        micro7: { id: 'badge-micro7', name: '🧬 Héritier' },
        micro8: { id: 'badge-micro8', name: '🏆 Maître du Zoo' },
        micro9: { id: 'badge-micro9', name: '✨ Magicien' },
        micro10: { id: 'badge-micro10', name: '🛡️ Validateur' },
        micro11: { id: 'badge-micro11', name: '🛒 E-commerce Master' },
        micro12: { id: 'badge-micro12', name: '🏭 Architecte' },
        micro13: { id: 'badge-micro13', name: '🎓 Expert BTS SLAM' },
        complete: { id: 'badge-complete', name: '🎓 Diplômé POO' },
        pro: { id: 'badge-pro', name: '💼 Développeur Pro' }
    },

    // URLs des templates de contenu
    contentTemplates: {
        levelSelection: 'templates/level-selection.html',
        steps: {
            debutant: 'templates/steps-debutant.html',
            intermediaire: 'templates/steps-intermediaire.html',
            avance: 'templates/steps-avance.html'
        }
    }
};

// Configuration des validations par difficulté
const VALIDATION_CONFIG = {
    difficultyLevels: {
        1: 'easy',    // Débutant
        2: 'medium',  // Intermédiaire  
        3: 'hard',    // Avancé
        'pro': 'professional' // BTS
    },

    // Critères de validation par micro-défi et niveau
    microValidations: {
        1: { // Premier Contact
            easy: { minLength: 15, required: ['caractéristique', 'action'] },
            medium: { minLength: 30, required: ['caractéristique', 'action', 'voiture'] },
            hard: { minLength: 50, required: ['attribut', 'méthode', 'encapsulation'] }
        },
        2: { // Classes
            easy: { required: ['class chat', 'pass'] },
            medium: { required: ['class chat', 'pass', ':'], forbidden: ['def'] },
            hard: { required: ['class chat', 'pass', ':', '"""'], pattern: /class\s+chat\s*:/i }
        },
        3: { // Constructeurs
            easy: { required: ['def __init__', 'self.nom = nom'] },
            medium: { required: ['def __init__', 'self.nom = nom', 'self, nom', 'if'] },
            hard: { required: ['def __init__', 'self.nom = nom', 'isinstance', 'raise'] }
        }
        // ... autres validations
    }
};

// Export pour utilisation dans d'autres modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { COURSE_CONFIG, VALIDATION_CONFIG };
}