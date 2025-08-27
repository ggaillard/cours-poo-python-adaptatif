/**
 * Gestionnaire de chargement dynamique du contenu
 */
class ContentLoader {
    constructor() {
        this.contentCache = new Map();
        this.templateCache = new Map();
    }

    /**
     * Charge le contenu de sélection de niveau
     */
    async loadLevelSelection() {
        const levelSelectionHTML = this.generateLevelSelectionHTML();
        const container = document.getElementById('content-container');
        if (container) {
            container.innerHTML = levelSelectionHTML;
            this.attachLevelSelectionEvents();
        }
    }

    /**
     * Charge les étapes pour un niveau donné
     */
    async loadStepsForLevel(level) {
        const stepsHTML = this.generateStepsHTML(level);
        const container = document.getElementById('content-container');
        if (container) {
            container.innerHTML = stepsHTML;
        }
    }

    /**
     * Génère le HTML de sélection de niveau
     */
    generateLevelSelectionHTML() {
        return `
            <div class="step-content active" id="level-selection">
                <div class="step-header">
                    <div class="step-number">🎯</div>
                    <div class="step-title">Choisissez votre niveau</div>
                </div>
                
                <div class="concept-intro">
                    <h3>🎓 Adaptez le cours à votre profil</h3>
                    <p>Sélectionnez le niveau qui correspond le mieux à votre expérience en programmation</p>
                </div>

                <div class="level-grid">
                    ${this.generateLevelCards()}
                </div>

                ${this.generateConceptComparison()}
                ${this.generateChoiceGuide()}
                ${this.generateLevelInfo()}
            </div>
        `;
    }

    /**
     * Génère les cartes de niveau
     */
    generateLevelCards() {
        return Object.values(COURSE_CONFIG.levels).map(level => `
            <div class="level-card" data-level="${level.id}">
                <div class="level-icon">${level.icon}</div>
                <h3>${level.name}</h3>
                <div class="level-difficulty">
                    ${this.generateStars(level.difficulty)}
                </div>
                <p><strong>${level.description}</strong></p>
                <ul>
                    ${level.features.map(feature => `<li>${feature}</li>`).join('')}
                </ul>
                <div class="level-duration">⏱️ ${level.duration}</div>
            </div>
        `).join('');
    }

    /**
     * Génère les étoiles de difficulté
     */
    generateStars(difficulty) {
        const maxStars = 3;
        let stars = '';
        for (let i = 1; i <= maxStars; i++) {
            const isActive = i <= difficulty ? 'active' : '';
            stars += `<span class="star ${isActive}">⭐</span>`;
        }
        return stars;
    }

    /**
     * Génère le tableau de comparaison des concepts
     */
    generateConceptComparison() {
        return `
            <div class="concept-comparison">
                <h3>📋 Concepts abordés par niveau</h3>
                <p style="text-align: center; color: #666; margin-bottom: 20px;">
                    Chaque concept a un niveau de difficulté de ⭐ à ⭐⭐⭐. Le niveau avancé suit un scénario professionnel différent.
                </p>
                <div class="concept-table-container">
                    ${this.generateConceptTable()}
                </div>
            </div>
        `;
    }

    /**
     * Génère le tableau des concepts
     */
    generateConceptTable() {
        const concepts = [
            {
                name: 'Classes et Objets',
                debutant: { level: '⭐', content: 'Analogie moule à gâteau<br><code>class Chat: pass</code><br>Comprendre la différence classe/objet' },
                intermediaire: { level: '⭐⭐', content: 'Classes avec état<br><code>class Chat: __slots__ = [\'nom\']</code><br>Conventions, attributs privés' },
                avance: { level: '🏢', content: 'Architecture métier<br><code>class Livre(BaseModel)</code><br>Modèles de données professionnels' }
            },
            {
                name: 'Constructeurs',
                debutant: { level: '⭐', content: '__init__ basique<br><code>def __init__(self, nom):</code><br>1-2 paramètres simples' },
                intermediaire: { level: '⭐⭐', content: 'Constructeurs robustes<br><code>def __init__(self, nom, **kwargs):</code><br>Validation, paramètres par défaut' },
                avance: { level: '🏢', content: 'Factory methods<br><code>@classmethod from_dict(cls, data)</code><br>Constructeurs alternatifs' }
            }
            // ... autres concepts
        ];

        const tableHeader = `
            <table class="concept-table">
                <thead>
                    <tr>
                        <th>Concept POO</th>
                        <th>🌱 Débutant</th>
                        <th>🚀 Intermédiaire</th>
                        <th>🎓 Avancé BTS</th>
                    </tr>
                </thead>
                <tbody>
        `;

        const tableRows = concepts.map(concept => `
            <tr class="concept-row" data-concept="${concept.name.toLowerCase().replace(/\s+/g, '-')}">
                <td><strong>${concept.name}</strong></td>
                <td class="level-1">
                    <div class="difficulty">${concept.debutant.level}</div>
                    <div class="concept-content">${concept.debutant.content}</div>
                </td>
                <td class="level-2">
                    <div class="difficulty">${concept.intermediaire.level}</div>
                    <div class="concept-content">${concept.intermediaire.content}</div>
                </td>
                <td class="level-pro">
                    <div class="difficulty">${concept.avance.level}</div>
                    <div class="concept-content">${concept.avance.content}</div>
                </td>
            </tr>
        `).join('');

        return tableHeader + tableRows + '</tbody></table>';
    }

    /**
     * Génère le guide de choix
     */
    generateChoiceGuide() {
        return `
            <div class="choice-guide">
                <h3>🎯 Quel niveau choisir selon vos objectifs ?</h3>
                <div class="choice-grid">
                    <div class="choice-card">
                        <div class="choice-icon">🌱</div>
                        <h4>Choisissez DÉBUTANT