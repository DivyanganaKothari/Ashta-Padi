// Ashta Padi - Enhanced Demo Application
// State Management
let appState = {
    currentScreen: 'welcome',
    selectedProfession: null,
    currentSutraIndex: 0,
    currentVocabIndex: 0,
    currentQuizIndex: 0,
    quizAnswers: [],
    sutrasCompleted: new Set(),
    termsLearned: 0,
    grammarData: null,
    sutraData: null,
    vocabData: null
};

// --- DATA CONSTANTS (Inlined to avoid Cross-Origin errors on local file system) ---

const YOGA_SUTRAS_DATA = {
    "demo_info": {
        "title": "Ashta Padi: Yoga Sutras Learning Demo",
        "scripture": "Patanjali Yoga Sutras",
        "section": "Samadhi Pada (Chapter 1)"
    },
    "vocabulary_prelearning": [
        {
            "id": 1,
            "term": "योग",
            "transliteration": "yoga",
            "root": "युज् (yuj)",
            "root_meaning": "to join, to unite",
            "meanings": ["union", "discipline", "practice", "spiritual path"],
            "part_of_speech": "noun (masculine)",
            "example_usage": { "sanskrit": "योगश्चित्तवृत्तिनिरोधः", "translation": "Yoga is the cessation of mental fluctuations" }
        },
        {
            "id": 2,
            "term": "चित्त",
            "transliteration": "citta",
            "root": "चित् (cit)",
            "root_meaning": "to perceive, to be conscious",
            "meanings": ["mind-field", "consciousness", "mental substance"],
            "part_of_speech": "noun (neuter)",
            "example_usage": { "sanskrit": "योगश्चित्तवृत्तिनिरोधः", "translation": "Yoga is the cessation of mental fluctuations" }
        },
        {
            "id": 3,
            "term": "वृत्ति",
            "transliteration": "vṛtti",
            "root": "वृत् (vṛt)",
            "root_meaning": "to turn, to revolve",
            "meanings": ["fluctuation", "modification", "pattern", "wave"],
            "part_of_speech": "noun (feminine)",
            "example_usage": { "sanskrit": "वृत्तिसारूप्यमितरत्र", "translation": "At other times, identification with the fluctuations" }
        },
        {
            "id": 4,
            "term": "निरोध",
            "transliteration": "nirodha",
            "root": "नि + रुध् (rudh)",
            "root_meaning": "to obstruct, to stop",
            "meanings": ["cessation", "restraint", "control"],
            "part_of_speech": "noun (masculine)",
            "example_usage": { "sanskrit": "योगश्चित्तवृत्तिनिरोधः", "translation": "Yoga is the cessation of mental fluctuations" }
        },
        {
            "id": 5,
            "term": "द्रष्टृ",
            "transliteration": "draṣṭṛ",
            "root": "दृश् (dṛś)",
            "root_meaning": "to see",
            "meanings": ["seer", "witness", "observer"],
            "part_of_speech": "noun (masculine)",
            "example_usage": { "sanskrit": "तदा द्रष्टुः स्वरूपेऽवस्थानम्", "translation": "Then the seer abides in its own true nature" }
        },
        {
            "id": 6,
            "term": "स्वरूप",
            "transliteration": "svarūpa",
            "root": "स्व (sva) + रूप (rūpa)",
            "root_meaning": "own + form",
            "meanings": ["own nature", "true form", "essence"],
            "part_of_speech": "noun (neuter)",
            "example_usage": { "sanskrit": "द्रष्टुः स्वरूपेऽवस्थानम्", "translation": "The seer abides in its own true nature" }
        }
    ],
    "sutras": [
        {
            "id": 1,
            "number": "1.1",
            "sanskrit": "अथ योगानुशासनम्",
            "transliteration": "atha yogānuśāsanam",
            "word_breakdown": [
                { "word": "अथ", "transliteration": "atha", "meaning": "now, thus, here begins", "grammatical_info": "indeclinable particle" },
                { "word": "योग", "transliteration": "yoga", "meaning": "union, discipline, practice", "grammatical_info": "masculine noun, stem form" },
                { "word": "अनुशासनम्", "transliteration": "anuśāsanam", "meaning": "instruction, teaching", "grammatical_info": "neuter noun, nominative singular" }
            ],
            "translation": "Now, the teaching of Yoga begins.",
            "commentary": "This is the opening sutra, marking the auspicious beginning of the instruction on Yoga.",
            "key_terms": ["योग", "अनुशासनम्"]
        },
        {
            "id": 2,
            "number": "1.2",
            "sanskrit": "योगश्चित्तवृत्तिनिरोधः",
            "transliteration": "yogaś-citta-vṛtti-nirodhaḥ",
            "word_breakdown": [
                { "word": "योगः", "transliteration": "yogaḥ", "meaning": "yoga, union", "grammatical_info": "masculine noun, nominative singular" },
                { "word": "चित्त", "transliteration": "citta", "meaning": "mind, consciousness", "grammatical_info": "neuter noun, stem form" },
                { "word": "वृत्ति", "transliteration": "vṛtti", "meaning": "fluctuations, modifications", "grammatical_info": "feminine noun, stem form" },
                { "word": "निरोधः", "transliteration": "nirodhaḥ", "meaning": "cessation, restraint", "grammatical_info": "masculine noun, nominative singular" }
            ],
            "translation": "Yoga is the cessation of the fluctuations of the mind.",
            "commentary": "This is the most famous sutra, defining the essence of Yoga practice.",
            "key_terms": ["योग", "चित्त", "वृत्ति", "निरोध"]
        },
        {
            "id": 3,
            "number": "1.3",
            "sanskrit": "तदा द्रष्टुः स्वरूपेऽवस्थानम्",
            "transliteration": "tadā draṣṭuḥ svarūpe'vasthānam",
            "word_breakdown": [
                { "word": "तदा", "transliteration": "tadā", "meaning": "then, at that time", "grammatical_info": "indeclinable adverb" },
                { "word": "द्रष्टुः", "transliteration": "draṣṭuḥ", "meaning": "of the seer", "grammatical_info": "masculine noun, genitive singular" },
                { "word": "स्वरूपे", "transliteration": "svarūpe", "meaning": "in own nature", "grammatical_info": "neuter noun, locative singular" },
                { "word": "अवस्थानम्", "transliteration": "avasthānam", "meaning": "abiding, resting", "grammatical_info": "neuter noun, nominative singular" }
            ],
            "translation": "Then the seer abides in its own true nature.",
            "commentary": "When the mind is still, the true Self is revealed.",
            "key_terms": ["द्रष्टुः", "स्वरूप", "अवस्थानम्"]
        },
        {
            "id": 4,
            "number": "1.4",
            "sanskrit": "वृत्तिसारूप्यमितरत्र",
            "transliteration": "vṛtti-sārūpyam-itaratra",
            "word_breakdown": [
                { "word": "वृत्ति", "transliteration": "vṛtti", "meaning": "fluctuations", "grammatical_info": "feminine noun, stem form" },
                { "word": "सारूप्यम्", "transliteration": "sārūpyam", "meaning": "identification", "grammatical_info": "neuter noun, nominative singular" },
                { "word": "इतरत्र", "transliteration": "itaratra", "meaning": "at other times", "grammatical_info": "indeclinable adverb" }
            ],
            "translation": "At other times, there is identification with the fluctuations.",
            "commentary": "When not in the state of Yoga, consciousness identifies with mental patterns.",
            "key_terms": ["वृत्ति", "सारूप्यम्"]
        },
        {
            "id": 5,
            "number": "1.5",
            "sanskrit": "वृत्तयः पञ्चतय्यः क्लिष्टाक्लिष्टाः",
            "transliteration": "vṛttayaḥ pañcatayyaḥ kliṣṭākliṣṭāḥ",
            "word_breakdown": [
                { "word": "वृत्तयः", "transliteration": "vṛttayaḥ", "meaning": "fluctuations", "grammatical_info": "feminine noun, nominative plural" },
                { "word": "पञ्चतय्यः", "transliteration": "pañcatayyaḥ", "meaning": "fivefold", "grammatical_info": "adjective" },
                { "word": "क्लिष्टाः", "transliteration": "kliṣṭāḥ", "meaning": "afflicted", "grammatical_info": "adjective" },
                { "word": "अक्लिष्टाः", "transliteration": "akliṣṭāḥ", "meaning": "non-afflicted", "grammatical_info": "adjective" }
            ],
            "translation": "The fluctuations are of five kinds, either afflicted or non-afflicted.",
            "commentary": "This sutra introduces the classification of mental modifications.",
            "key_terms": ["वृत्ति", "पञ्चतय्य", "क्लिष्ट", "अक्लिष्ट"]
        }
    ]
};

const GRAMMAR_DATA = {
    "grammar_modules": [
        {
            "module_id": "foundations",
            "module_name": "Vyākaraṇa Foundations",
            "description": "Core grammatical concepts for Sanskrit learning",
            "lessons": [
                {
                    "id": "vyakarana_intro",
                    "title": "1. Vyākaraṇa - The Science of Grammar",
                    "sanskrit": "व्याकरण",
                    "transliteration": "Vyākaraṇa",
                    "definition": "The science of grammar",
                    "simple_explanation": "Vyākaraṇa teaches how words are formed and how sentences work."
                },
                {
                    "id": "varna",
                    "title": "2. Varṇa - Sounds and Letters",
                    "sanskrit": "वर्ण",
                    "transliteration": "Varṇa",
                    "definition": "Sound / letter",
                    "concept": "Sanskrit is based on precise pronunciation",
                    "main_groups": [
                        { "type": "स्वर (Svaras)", "meaning": "vowels", "examples": "अ आ इ ई उ ऊ ऋ etc." },
                        { "type": "व्यञ्जन (Vyañjana)", "meaning": "consonants", "examples": "क ख ग…" }
                    ]
                },
                {
                    "id": "sandhi",
                    "title": "3. Sandhi - Joining of Sounds",
                    "sanskrit": "सन्धि",
                    "transliteration": "Sandhi",
                    "definition": "Joining of sounds when words come together",
                    "simple_idea": "When two words meet, their sounds change smoothly",
                    "examples": [
                        { "before": "योग + अनुशासनम्", "after": "योगानुशासनम्", "rule": "a + a = ā" },
                        { "before": "सत् + चित्", "after": "सच्चित्", "rule": "consonant assimilation" }
                    ]
                },
                {
                    "id": "pada",
                    "title": "4. Pada - Word",
                    "sanskrit": "पद",
                    "transliteration": "Pada",
                    "definition": "A usable word in a sentence",
                    "two_main_types": [
                        { "type": "सुप्-पद (Sup-pada)", "meaning": "noun forms", "examples": "रामः, रामम् etc." },
                        { "type": "तिङ्-पद (Tiṅ-pada)", "meaning": "verb forms", "examples": "गच्छति, पठति" }
                    ]
                },
                {
                    "id": "vibhakti",
                    "title": "7. Vibhakti - Case Endings",
                    "sanskrit": "विभक्ति",
                    "transliteration": "Vibhakti",
                    "definition": "Case endings of nouns",
                    "purpose": "They show the role of a word in a sentence",
                    "main_groups": [
                        { "type": "Prathamā (1st)", "meaning": "Subject (Rama goes)", "examples": "रामः" },
                        { "type": "Dvitīyā (2nd)", "meaning": "Object (sees Rama)", "examples": "रामम्" },
                        { "type": "Ṣaṣṭhī (6th)", "meaning": "Possessive (Rama's)", "examples": "रामस्य" }
                    ]
                }
            ]
        }
    ]
};

// --- END DATA CONSTANTS ---

// Load data on page load
document.addEventListener('DOMContentLoaded', () => {
    // Directly assign data instead of fetching
    appState.sutraData = YOGA_SUTRAS_DATA.sutras;
    appState.vocabData = YOGA_SUTRAS_DATA.vocabulary_prelearning;
    appState.grammarData = GRAMMAR_DATA;

    console.log("Data loaded internally:", appState);
    initializeApp();
});

// Initialize app
function initializeApp() {
    showScreen('welcomeScreen');
}

// Screen Management
function showScreen(screenId) {
    document.querySelectorAll('.screen').forEach(screen => {
        screen.classList.remove('active');
    });
    const currentScreen = document.getElementById(screenId);
    if (currentScreen) {
        currentScreen.classList.add('active');
        appState.currentScreen = screenId;
    } else {
        console.error(`Screen ID '${screenId}' not found!`);
    }
}

// Navigation Functions
function showProfessionSelection() {
    showScreen('professionScreen');
}

function selectProfession(profession) {
    appState.selectedProfession = profession;

    if (profession === 'economist') {
        alert('Economist/Accountant track coming soon! For now, please try the Yoga Practitioner track.');
        return;
    }

    // Show vocabulary intro screen
    showVocabularyIntro();
}

function goHome() {
    appState.currentSutraIndex = 0;
    appState.currentVocabIndex = 0;
    showScreen('welcomeScreen');
}

// Vocabulary Pre-Learning Functions
function showVocabularyIntro() {
    showScreen('vocabularyIntroScreen');
    appState.currentVocabIndex = 0; // Reset index explicitly
    renderVocabTerm();
    renderVocabProgressDots();
}

function renderVocabTerm() {
    if (!appState.vocabData || appState.vocabData.length === 0) return;

    // Safety check for index
    if (appState.currentVocabIndex < 0) appState.currentVocabIndex = 0;
    if (appState.currentVocabIndex >= appState.vocabData.length) appState.currentVocabIndex = appState.vocabData.length - 1;

    const term = appState.vocabData[appState.currentVocabIndex];

    document.getElementById('currentTermNum').textContent = appState.currentVocabIndex + 1;
    document.getElementById('vocabTerm').textContent = term.term;
    document.getElementById('vocabTranslit').textContent = term.transliteration;
    document.getElementById('vocabRoot').textContent = `${term.root} - "${term.root_meaning}"`;

    // Render meanings
    const meaningsList = document.getElementById('vocabMeanings');
    meaningsList.innerHTML = term.meanings.map(m => `<li>${m}</li>`).join('');

    // Render example
    document.getElementById('vocabExample').textContent = term.example_usage.sanskrit;
    document.getElementById('vocabExampleTrans').textContent = term.example_usage.translation;

    // Update button states
    document.getElementById('vocabPrevBtn').disabled = appState.currentVocabIndex === 0;

    const nextBtn = document.getElementById('vocabNextBtn');
    if (appState.currentVocabIndex === appState.vocabData.length - 1) {
        nextBtn.textContent = 'Start Learning Sutras →';
    } else {
        nextBtn.textContent = 'Next →';
    }

    // Update progress dots
    updateVocabProgressDots();
}

function renderVocabProgressDots() {
    const container = document.getElementById('vocabProgressDots');
    container.innerHTML = '';

    for (let i = 0; i < appState.vocabData.length; i++) {
        const dot = document.createElement('div');
        dot.className = 'progress-dot';
        if (i === appState.currentVocabIndex) {
            dot.classList.add('active');
        }
        container.appendChild(dot);
    }
}

function updateVocabProgressDots() {
    const dots = document.querySelectorAll('.progress-dot');
    dots.forEach((dot, index) => {
        if (index === appState.currentVocabIndex) {
            dot.classList.add('active');
        } else {
            dot.classList.remove('active');
        }
    });
}

function previousVocabTerm() {
    if (appState.currentVocabIndex > 0) {
        appState.currentVocabIndex--;
        renderVocabTerm();
    }
}

function nextVocabTerm() {
    if (appState.currentVocabIndex < appState.vocabData.length - 1) {
        appState.currentVocabIndex++;
        renderVocabTerm();
    } else {
        // All vocabulary learned, move to sutras
        appState.termsLearned = appState.vocabData.length;
        showSutraScreen();
    }
}

// Sutra Learning Functions
function showSutraScreen() {
    showScreen('sutraScreen');
    appState.currentSutraIndex = 0;
    renderSutra();
    renderGrammarPanel();
    updateProgress();
}

function renderSutra() {
    if (!appState.sutraData || appState.sutraData.length === 0) return;

    const sutra = appState.sutraData[appState.currentSutraIndex];

    document.getElementById('sutraNumber').textContent = sutra.number;
    document.getElementById('sanskritText').textContent = sutra.sanskrit;
    document.getElementById('transliteration').textContent = sutra.transliteration;
    document.getElementById('translation').textContent = sutra.translation;
    document.getElementById('commentary').textContent = sutra.commentary;

    // Render word breakdown
    renderWordBreakdown(sutra.word_breakdown);

    // Update navigation buttons
    document.getElementById('prevBtn').disabled = appState.currentSutraIndex === 0;

    const nextBtn = document.getElementById('nextBtn');
    if (appState.currentSutraIndex === appState.sutraData.length - 1) {
        nextBtn.textContent = 'Finish Learning →';
        nextBtn.disabled = false;
    } else {
        nextBtn.textContent = 'Next →';
        nextBtn.disabled = false;
    }

    // Update progress
    updateProgress();
}

function renderWordBreakdown(words) {
    const container = document.getElementById('wordBreakdown');
    container.innerHTML = '';

    words.forEach(word => {
        const wordDiv = document.createElement('div');
        wordDiv.className = 'word-item';
        wordDiv.innerHTML = `
            <div class="word-sanskrit">${word.word}</div>
            <div class="word-transliteration">${word.transliteration}</div>
            <div class="word-meaning">${word.meaning}</div>
            <div class="word-grammar">${word.grammatical_info}</div>
        `;
        container.appendChild(wordDiv);
    });
}

function showBreakdown() {
    const breakdown = document.getElementById('wordBreakdown');
    const btn = document.querySelector('.toggle-btn');

    // Fix: Explicitly check display style, defaulting to 'none' if empty
    const currentDisplay = window.getComputedStyle(breakdown).display;

    if (currentDisplay === 'none') {
        breakdown.style.display = 'grid';
        btn.textContent = 'Hide Breakdown';
    } else {
        breakdown.style.display = 'none';
        btn.textContent = 'Show Breakdown';
    }
}

function previousSutra() {
    if (appState.currentSutraIndex > 0) {
        appState.currentSutraIndex--;
        renderSutra();
    }
}

function nextSutra() {
    if (appState.currentSutraIndex < appState.sutraData.length - 1) {
        appState.sutrasCompleted.add(appState.currentSutraIndex);
        appState.currentSutraIndex++;
        renderSutra();
    } else {
        // Mark the last sutra as completed
        appState.sutrasCompleted.add(appState.currentSutraIndex);
        updateProgress();

        // Show completion message
        alert("🎉 Congratulations! You have completed the Sutra reading. Now let's test your knowledge!");
        showQuiz();
    }
}

function updateProgress() {
    const progress = ((appState.currentSutraIndex + 1) / appState.sutraData.length) * 100;
    document.getElementById('progressFill').style.width = `${progress}%`;
    document.getElementById('sutraProgress').textContent = `Sutra ${appState.currentSutraIndex + 1} of ${appState.sutraData.length}`;
    document.getElementById('sutrasCompleted').textContent = appState.sutrasCompleted.size;
    document.getElementById('termsLearned').textContent = appState.termsLearned;
}

// Grammar Panel Functions
function renderGrammarPanel() {
    const container = document.getElementById('grammarAccordion');
    container.innerHTML = '';

    // Fix: Robust check for data presence
    if (!appState.grammarData || !appState.grammarData.grammar_modules) {
        console.warn("Grammar data missing!", appState.grammarData);
        container.innerHTML = "<p>Grammar data not available</p>";
        return;
    }

    const foundationsModule = appState.grammarData.grammar_modules[0];
    if (foundationsModule && foundationsModule.lessons) {
        const lessonsToShow = foundationsModule.lessons; // Show all available in simplified data

        lessonsToShow.forEach(lesson => {
            const lessonDiv = createGrammarLesson(lesson);
            container.appendChild(lessonDiv);
        });
    }
}

function createGrammarLesson(lesson) {
    const div = document.createElement('div');
    div.className = 'grammar-lesson';
    div.id = `lesson-${lesson.id}`;

    div.innerHTML = `
        <div class="lesson-header" onclick="toggleGrammarLesson('${lesson.id}')">
            <span class="toggle-icon">▶</span>
            <h4>${lesson.title}</h4>
        </div>
        <div class="lesson-content">
            <div class="sanskrit-term">${lesson.sanskrit} (${lesson.transliteration})</div>
            <div class="definition">${lesson.definition}</div>
            <div class="explanation">${lesson.simple_explanation || lesson.concept}</div>
            ${renderGrammarExamples(lesson)}
        </div>
    `;

    return div;
}

function renderGrammarExamples(lesson) {
    if (!lesson.examples && !lesson.main_groups && !lesson.two_main_types && !lesson.cases) return '';

    let html = '<div class="examples">';

    if (lesson.examples && Array.isArray(lesson.examples)) {
        lesson.examples.forEach(ex => {
            if (typeof ex === 'object') {
                html += `<div class="example-item">`;
                if (ex.word) html += `<strong>${ex.word}</strong> - ${ex.meaning}<br>`;
                if (ex.before) html += `${ex.before} → ${ex.after}<br>`;
                if (ex.rule) html += `<em>(${ex.rule})</em>`;
                html += `</div>`;
            }
        });
    }

    if (lesson.main_groups) {
        lesson.main_groups.forEach(group => {
            html += `<div class="example-item"><strong>${group.type}:</strong> ${group.meanings || group.meaning || ''} <br> ${group.examples}</div>`;
        });
    }

    if (lesson.two_main_types) {
        lesson.two_main_types.forEach(type => {
            html += `<div class="example-item"><strong>${type.type}:</strong> ${type.examples}</div>`;
        });
    }

    // Added for vibhakti handling
    if (lesson.cases) {
        lesson.cases.forEach(c => {
            html += `<div class="example-item"><strong>${c.name}:</strong> ${c.meaning} (${c.example})</div>`;
        });
    }

    html += '</div>';
    return html;
}

function toggleGrammarLesson(lessonId) {
    const lesson = document.getElementById(`lesson-${lessonId}`);
    if (lesson) {
        lesson.classList.toggle('expanded');
    }
}

// Quiz Functions
function showQuiz() {
    showScreen('quizScreen');
    appState.currentQuizIndex = 0;
    appState.quizAnswers = [];
    renderQuizQuestion();
}

const quizQuestions = [
    {
        question: "What does 'योग' (yoga) mean?",
        options: ["Sleep", "Union, discipline", "Food", "Water"],
        correct: 1,
        explanation: "योग (yoga) comes from the root युज् (yuj) meaning 'to join' or 'to unite'."
    },
    {
        question: "What does 'चित्त' (citta) refer to?",
        options: ["Body", "Mind-field, consciousness", "Breath", "Soul"],
        correct: 1,
        explanation: "चित्त (citta) refers to the mind-field or consciousness, which includes thoughts, emotions, and memory."
    },
    {
        question: "What does 'निरोध' (nirodha) mean?",
        options: ["Movement", "Cessation, restraint", "Beginning", "Expansion"],
        correct: 1,
        explanation: "निरोध (nirodha) means cessation, restraint, or stilling of the mind's fluctuations."
    },
    {
        question: "In the sandhi: योग + अनुशासनम् = योगानुशासनम्, what rule is applied?",
        options: ["a + i = e", "a + a = ā", "a + u = o", "visarga sandhi"],
        correct: 1,
        explanation: "When a short 'a' is followed by another short 'a', they combine to form a long 'ā' (Savarna Dirgha Sandhi)."
    },
    {
        question: "The term 'द्रष्टृ' (draṣṭṛ) refers to:",
        options: ["The Seen (Object)", "The Seer (Subject)", "The Process of Seeing", "The Eye"],
        correct: 1,
        explanation: "द्रष्टृ (draṣṭṛ) is the 'Seer' or the Witness consciousness (Purusha)."
    },
    {
        question: "What does 'वृत्ति' (vṛtti) mean?",
        options: ["Silence", "Fluctuation, modification", "Study", "Posture"],
        correct: 1,
        explanation: "वृत्ति (vṛtti) refers to the fluctuations, modifications, or waves in the mind-field."
    },
    {
        question: "Which case (Vibhakti) usually indicates 'possession' or 'relationship' (of)?",
        options: ["Prathamā (1st)", "Dvitīyā (2nd)", "Ṣaṣṭhī (6th)", "Saptamī (7th)"],
        correct: 2,
        explanation: "The Ṣaṣṭhī (6th) case, or Genitive case, indicates possession or relationship (e.g., Rama's)."
    },
    {
        question: "What does the root 'दृश्' (dṛś) mean?",
        options: ["To do", "To go", "To see", "To speak"],
        correct: 2,
        explanation: "The root दृश् (dṛś) means 'to see', from which words like द्रष्टृ (seer) and दर्शन (sight/philosophy) are derived."
    },
    {
        question: "How many chapters (Padas) are there in the Yoga Sutras?",
        options: ["Two", "Four", "Eight", "Ten"],
        correct: 1,
        explanation: "The Yoga Sutras are divided into four chapters (Padas): Samadhi, Sadhana, Vibhuti, and Kaivalya."
    },
    {
        question: "Who is the traditional author of the Yoga Sutras?",
        options: ["Vyasa", "Patanjali", "Shankaracharya", "Kapila"],
        correct: 1,
        explanation: "Maharishi Patanjali is the traditional compiler/author of the Yoga Sutras."
    }
];

function renderQuizQuestion() {
    const question = quizQuestions[appState.currentQuizIndex];

    document.getElementById('quizProgress').textContent = `Question ${appState.currentQuizIndex + 1} of ${quizQuestions.length}`;
    const progress = ((appState.currentQuizIndex + 1) / quizQuestions.length) * 100;
    document.getElementById('quizProgressFill').style.width = `${progress}%`;

    document.getElementById('questionText').textContent = question.question;

    const optionsContainer = document.getElementById('quizOptions');
    optionsContainer.innerHTML = '';

    question.options.forEach((option, index) => {
        const optionDiv = document.createElement('div');
        optionDiv.className = 'quiz-option';
        optionDiv.textContent = option;
        optionDiv.onclick = () => selectQuizOption(index);
        optionsContainer.appendChild(optionDiv);
    });

    document.getElementById('quizPrevBtn').disabled = appState.currentQuizIndex === 0;

    const nextBtn = document.getElementById('quizNextBtn');
    if (appState.currentQuizIndex === quizQuestions.length - 1) {
        nextBtn.textContent = 'Finish Test →';
    } else {
        nextBtn.textContent = 'Next →';
    }

    document.getElementById('quizFeedback').style.display = 'none';
}

function selectQuizOption(optionIndex) {
    const options = document.querySelectorAll('.quiz-option');
    options.forEach((opt, idx) => {
        opt.classList.remove('selected');
        if (idx === optionIndex) {
            opt.classList.add('selected');
        }
    });

    appState.quizAnswers[appState.currentQuizIndex] = optionIndex;

    const question = quizQuestions[appState.currentQuizIndex];
    const feedback = document.getElementById('quizFeedback');
    const isCorrect = optionIndex === question.correct;

    feedback.innerHTML = `<strong>${isCorrect ? '✓ Correct!' : '✗ Incorrect'}</strong><br>${question.explanation}`;
    feedback.style.display = 'block';

    options[optionIndex].classList.add(isCorrect ? 'correct' : 'incorrect');
    if (!isCorrect) {
        options[question.correct].classList.add('correct');
    }
}

function previousQuestion() {
    if (appState.currentQuizIndex > 0) {
        appState.currentQuizIndex--;
        renderQuizQuestion();
    }
}

function nextQuestion() {
    if (appState.currentQuizIndex < quizQuestions.length - 1) {
        appState.currentQuizIndex++;
        renderQuizQuestion();
    } else {
        showQuizResults();
    }
}

function showQuizResults() {
    document.querySelector('.quiz-container').style.display = 'none';
    document.getElementById('quizResults').style.display = 'block';

    let score = 0;
    quizQuestions.forEach((q, idx) => {
        if (appState.quizAnswers[idx] === q.correct) {
            score++;
        }
    });

    document.getElementById('finalScore').textContent = score;

    // Passing score logic (7 out of 10)
    const passingScore = 7;
    const proceedBtn = document.getElementById('proceedToMentorBtn');
    const messageEl = document.getElementById('scoreMessage');

    if (score >= passingScore) {
        messageEl.innerHTML = `🎉 <strong>Excellent! You scored ${score}/10.</strong><br>You have passed the test and qualified for Step 3: Mentor Selection.`;
        messageEl.style.color = '#2e7d32'; // Green
        if (proceedBtn) proceedBtn.style.display = 'inline-block';
    } else {
        messageEl.innerHTML = `📚 <strong>You scored ${score}/10.</strong><br>You need at least ${passingScore}/10 to proceed to the next step.<br>Please examine the explanations for incorrect answers and try again.`;
        messageEl.style.color = '#d32f2f'; // Red
        if (proceedBtn) proceedBtn.style.display = 'none';
    }
}

function retakeQuiz() {
    document.querySelector('.quiz-container').style.display = 'block';
    document.getElementById('quizResults').style.display = 'none';
    appState.currentQuizIndex = 0;
    appState.quizAnswers = [];
    renderQuizQuestion();
}

// Step 3: Mentor Selection Functions
function showMentorSelection() {
    showScreen('mentorScreen');
}

function selectMentor(mentorName) {
    alert(`Thank you! You have selected ${mentorName}. We will notify you when their next Q&A session is scheduled.`);
}

// Ecosystem Integration Functions
function toggleToolsPanel() {
    const panel = document.getElementById('toolsPanel');
    if (panel.classList.contains('open')) {
        panel.classList.remove('open');
    } else {
        panel.classList.add('open');
    }
}
