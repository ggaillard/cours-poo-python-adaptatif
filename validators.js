/**
 * Système de validation des micro-défis
 */
class MicroValidator {
    constructor() {
        this.validationRules = VALIDATION_CONFIG.microValidations;
    }

    /**
     * Valide un micro-défi selon le niveau de difficulté
     * @param {number} microNumber - Numéro du micro-défi
     * @param {string} userCode - Code de l'utilisateur
     * @param {string} difficultyLevel - Niveau de difficulté
     * @returns {boolean} - Résultat de la validation
     */
    validate(microNumber, userCode, difficultyLevel) {
        const cleanCode = userCode.trim().toLowerCase();
        
        switch(microNumber) {
            case 1: return this.validateMicro1(cleanCode, difficultyLevel);
            case 2: return this.validateMicro2(cleanCode, difficultyLevel);
            case 3: return this.validateMicro3(cleanCode, difficultyLevel);
            case 4: return this.validateMicro4(cleanCode, difficultyLevel);
            case 5: return this.validateMicro5(cleanCode, difficultyLevel);
            case 6: return this.validateMicro6(cleanCode, difficultyLevel);
            case 7: return this.validateMicro7(cleanCode, difficultyLevel);
            case 8: return this.validateMicro8(cleanCode, difficultyLevel);
            case 9: return this.validateMicro9(cleanCode, difficultyLevel);
            case 10: return this.validateMicro10(cleanCode, difficultyLevel);
            case 11: return this.validateMicro11(cleanCode, difficultyLevel);
            case 12: return this.validateMicro12(cleanCode, difficultyLevel);
            case 13: return this.validateMicro13(cleanCode, difficultyLevel);
            default: return false;
        }
    }

    /**
     * Validation générique basée sur les règles de configuration
     */
    validateWithRules(code, rules) {
        if (!rules) return false;

        // Vérifier la longueur minimale
        if (rules.minLength && code.length < rules.minLength) {
            return false;
        }

        // Vérifier les éléments requis
        if (rules.required) {
            for (const requirement of rules.required) {
                if (!code.includes(requirement.toLowerCase())) {
                    return false;
                }
            }
        }

        // Vérifier les éléments interdits
        if (rules.forbidden) {
            for (const forbidden of rules.forbidden) {
                if (code.includes(forbidden.toLowerCase())) {
                    return false;
                }
            }
        }

        // Vérifier le pattern regex
        if (rules.pattern && !rules.pattern.test(code)) {
            return false;
        }

        return true;
    }

    // Validations spécifiques par micro-défi
    validateMicro1(code, level) {
        switch(level) {
            case 'easy':
                return code.length > 15 && (code.includes('caractéristique') || code.includes('action'));
            case 'medium':
                return code.length > 30 && code.includes('caractéristique') && 
                       code.includes('action') && code.includes('voiture');
            case 'hard':
                return code.length > 50 && code.includes('attribut') && 
                       code.includes('méthode') && code.includes('encapsulation');
            default:
                return false;
        }
    }

    validateMicro2(code, level) {
        const hasClass = code.includes('class chat');
        const hasPass = code.includes('pass');
        const hasColon = code.includes(':');
        
        switch(level) {
            case 'easy':
                return hasClass && hasPass;
            case 'medium':
                return hasClass && hasPass && hasColon && !code.includes('def');
            case 'hard':
                return hasClass && hasPass && hasColon && 
                       code.match(/class\s+chat\s*:/i) && code.includes('"""');
            default:
                return false;
        }
    }

    validateMicro3(code, level) {
        const hasInit = code.includes('def __init__');
        const hasNom = code.includes('self.nom = nom');
        const hasParam = code.includes('self, nom');
        
        switch(level) {
            case 'easy':
                return hasInit && hasNom;
            case 'medium':
                return hasInit && hasNom && hasParam && code.includes('if');
            case 'hard':
                return hasInit && hasNom && hasParam && 
                       (code.includes('isinstance') || code.includes('type')) && 
                       code.includes('raise');
            default:
                return false;
        }
    }

    validateMicro4(code, level) {
        const hasNom = code.includes('self.nom = nom');
        const hasCouleur = code.includes('self.couleur = couleur');
        const hasAge = code.includes('self.age = age');
        
        switch(level) {
            case 'easy':
                return hasNom && hasCouleur && hasAge;
            case 'medium':
                return hasNom && hasCouleur && hasAge && code.includes('if');
            case 'hard':
                return hasNom && hasCouleur && hasAge && 
                       code.includes('_') && code.includes('@property');
            default:
                return false;
        }
    }

    validateMicro5(code, level) {
        const hasMethode = code.includes('def miauler');
        const hasSelf = code.includes('self');
        const hasMiaou = code.includes('miaou');
        
        switch(level) {
            case 'easy':
                return hasMethode && hasSelf && hasMiaou;
            case 'medium':
                return hasMethode && hasSelf && hasMiaou && 
                       code.includes('return') && code.includes('f"');
            case 'hard':
                return hasMethode && hasSelf && hasMiaou && 
                       code.includes('return') && 
                       (code.includes('random') || code.includes('if'));
            default:
                return false;
        }
    }

    validateMicro6(code, level) {
        const hasGrandir = code.includes('def grandir') || code.includes('def anniversaire');
        const hasAgeIncrement = code.includes('self.age += 1') || code.includes('self.age = self.age + 1');
        
        switch(level) {
            case 'easy':
                return hasGrandir && hasAgeIncrement;
            case 'medium':
                return hasGrandir && hasAgeIncrement && 
                       code.includes('if') && code.includes('return');
            case 'hard':
                return hasGrandir && hasAgeIncrement && code.includes('if') && 
                       (code.includes('max') || code.includes('raise'));
            default:
                return false;
        }
    }

    validateMicro7(code, level) {
        const hasHeritage = code.includes('class chat(animal)');
        const hasMethode = code.includes('def miauler');
        
        switch(level) {
            case 'easy':
                return hasHeritage && hasMethode;
            case 'medium':
                return hasHeritage && hasMethode && code.includes('super()');
            case 'hard':
                return hasHeritage && hasMethode && code.includes('super()') && 
                       code.includes('def __init__');
            default:
                return false;
        }
    }

    validateMicro8(code, level) {
        const hasAnimal = code.includes('class animal');
        const hasLion = code.includes('class lion');
        const hasChat = code.includes('class chat');
        const hasInheritance = code.includes('(animal)');
        
        switch(level) {
            case 'easy':
                return hasAnimal && (hasLion || hasChat) && hasInheritance;
            case 'medium':
                return hasAnimal && hasLion && hasChat && hasInheritance && 
                       code.includes('def faire_du_bruit');
            case 'hard':
                return hasAnimal && hasLion && hasChat && hasInheritance && 
                       code.includes('class zoo') && code.includes('def ajouter');
            default:
                return false;
        }
    }

    // Validations pour les niveaux avancés
    validateMicro9(code, level) {
        const hasStr = code.includes('def __str__');
        const hasLen = code.includes('def __len__');
        const hasEq = code.includes('def __eq__');
        
        return hasStr && hasLen && hasEq;
    }

    validateMicro10(code, level) {
        const hasProperty = code.includes('@property');
        const hasSetter = code.includes('.setter');
        const hasValidation = code.includes('if') || code.includes('raise');
        
        return hasProperty && hasSetter && hasValidation;
    }

    validateMicro11(code, level) {
        const hasProduitClass = code.includes('class produit');
        const hasPanierClass = code.includes('class panier');
        const hasValidation = code.includes('@property') || code.includes('raise');
        const hasMethodes = code.includes('def ajouter') || code.includes('def total');
        
        return hasProduitClass && hasPanierClass && hasValidation && hasMethodes;
    }

    validateMicro12(code, level) {
        const hasSingleton = code.includes('_instance = none');
        const hasNew = code.includes('def __new__');
        const hasLogMethod = code.includes('def log');
        
        return hasSingleton && hasNew && hasLogMethod;
    }

    validateMicro13(code, level) {
        const hasLivreClass = code.includes('class livre');
        const hasUtilisateurClass = code.includes('class utilisateur');
        const hasBibliothequeClass = code.includes('class bibliotheque');
        const hasException = code.includes('bibliothequeerror');
        const hasSingleton = code.includes('_instance = none');
        const hasValidation = code.includes('regex') || code.includes('re.match');
        
        return hasLivreClass && hasUtilisateurClass && hasBibliothequeClass && 
               hasException && hasSingleton && hasValidation;
    }
}

/**
 * Système de feedback adapté au niveau
 */
class FeedbackManager {
    constructor() {
        this.successMessages = {
            1: { easy: '🎉 Bien ! Vous comprenez les objets !', medium: '🎉 Excellent ! Vous maîtrisez les concepts !', hard: '🎉 Parfait ! Analyse professionnelle !' },
            2: { easy: '🎉 Votre première classe !', medium: '🎉 Syntaxe parfaite !', hard: '🎉 Code professionnel avec documentation !' },
            3: { easy: '🎉 Constructeur créé !', medium: '🎉 Constructeur avec validation !', hard: '🎉 Constructeur robuste et sécurisé !' }
            // ... autres messages
        };

        this.errorMessages = {
            1: { easy: '❌ Donnez plus de détails sur les caractéristiques et actions', medium: '❌ Mentionnez explicitement "caractéristiques", "actions" et "voiture"', hard: '❌ Utilisez les termes techniques "attributs", "méthodes" et "encapsulation"' },
            2: { easy: '❌ Vérifiez la syntaxe : class Chat: puis pass', medium: '❌ Syntaxe incorrecte. Évitez def dans une classe vide', hard: '❌ Ajoutez une docstring avec """ pour documenter votre classe' },
            3: { easy: '❌ Ajoutez def __init__(self, nom): et self.nom = nom', medium: '❌ Ajoutez une validation avec if pour vérifier les paramètres', hard: '❌ Utilisez isinstance() ou type() et raise pour la validation' }
            // ... autres messages
        };
    }

    getSuccessFeedback(microNumber, level) {
        return this.successMessages[microNumber]?.[level] || '🎉 Excellent travail !';
    }

    getErrorFeedback(microNumber, level) {
        return this.errorMessages[microNumber]?.[level] || '❌ Vérifiez votre code selon le niveau requis';
    }
}

// Export des classes
window.MicroValidator = MicroValidator;
window.FeedbackManager = FeedbackManager;