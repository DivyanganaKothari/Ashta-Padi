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

// Load data on page load
document.addEventListener('DOMContentLoaded', async () => {
    await loadData();
    initializeApp();
});

// Load JSON data
async function loadData() {
    try {
        // Load sutra data
        const sutraResponse = await fetch('yoga_sutras_demo_data.json');
        const sutraJson = await sutraResponse.json();
        appState.sutraData = sutraJson.sutras;
        appState.vocabData = sutraJson.vocabulary_prelearning;
        
        // Load grammar data
        const grammarResponse = await fetch('grammar_content.json');
        appState.grammarData = await grammarResponse.json();
        
        console.log('Data loaded successfully');
    } catch (error) {
        console.error('Error loading data:', error);
        // Fallback to minimal data if files don't load
        appState.sutraData = [];
        appState.vocabData = [];
        appState.grammarData = { grammar_modules: [] };
    }
}

// Initialize app
function initializeApp() {
    showScreen('welcomeScreen');
}

// Screen Management
function showScreen(screenId) {
    document.querySelectorAll('.screen').forEach(screen => {
        screen.classList.remove('active');
    });
    document.getElementById(screenId).classList.add('active');
    appState.currentScreen = screenId;
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
    appState.currentVocabIndex = 0;
    renderVocabTerm();
    renderVocabProgressDots();
}

function renderVocabTerm() {
    if (!appState.vocabData || appState.vocabData.length === 0) return;
    
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
    document.getElementById('nextBtn').disabled = appState.currentSutraIndex === appState.sutraData.length - 1;
    
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
    
    if (breakdown.style.display === 'none' || !breakdown.style.display) {
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
    
    if (!appState.grammarData || !appState.grammarData.grammar_modules) return;
    
    // Render first module (Foundations) - first 5 lessons only for simplified version
    const foundationsModule = appState.grammarData.grammar_modules[0];
    if (foundationsModule && foundationsModule.lessons) {
        const lessonsToShow = foundationsModule.lessons.slice(0, 5); // Show first 5 lessons
        
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
    if (!lesson.examples && !lesson.main_groups && !lesson.two_main_types) return '';
    
    let html = '<div class="examples">';
    
    if (lesson.examples && Array.isArray(lesson.examples)) {
        lesson.examples.forEach(ex => {
            if (typeof ex === 'object') {
                html += `<div class="example-item">`;
                if (ex.word) html += `<strong>${ex.word}</strong> - ${ex.meaning}<br>`;
                if (ex.before) html += `${ex.before} → ${ex.after}<br>`;
                html += `</div>`;
            }
        });
    }
    
    if (lesson.main_groups) {
        lesson.main_groups.forEach(group => {
            html += `<div class="example-item"><strong>${group.type}:</strong> ${group.examples}</div>`;
        });
    }
    
    if (lesson.two_main_types) {
        lesson.two_main_types.forEach(type => {
            html += `<div class="example-item"><strong>${type.type}:</strong> ${type.examples}</div>`;
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
        explanation: "योग (yoga) comes from the root युज् (yuj) meaning 'to join'. It means union, discipline, or practice."
    },
    {
        question: "What does 'चित्त' (citta) refer to?",
        options: ["Body", "Mind-field, consciousness", "Breath", "Soul"],
        correct: 1,
        explanation: "चित्त (citta) refers to the mind-field or consciousness, from the root चित् (cit) - 'to perceive'."
    },
    {
        question: "What does 'निरोध' (nirodha) mean?",
        options: ["Movement", "Cessation, restraint", "Beginning", "Expansion"],
        correct: 1,
        explanation: "निरोध (nirodha) means cessation or restraint, from नि + रुध् (rudh) - 'to obstruct'."
    },
    {
        question: "In the sandhi: योग + अनुशासनम् = योगानुशासनम्, what rule is applied?",
        options: ["a + i = e", "a + a = ā", "a + u = o", "consonant doubling"],
        correct: 1,
        explanation: "When 'a' meets 'a', they combine to form 'ā' (long a)."
    },
    {
        question: "What is an 'अवयव' (avyaya)?",
        options: ["A verb", "An indeclinable word", "A noun", "An adjective"],
        correct: 1,
        explanation: "अवयव (avyaya) are indeclinable words that never change form."
    },
    {
        question: "How many cases (vibhakti) are there in Sanskrit?",
        options: ["5", "6", "7", "8"],
        correct: 3,
        explanation: "Sanskrit has 8 cases (vibhakti) that show the role of a word in a sentence."
    },
    {
        question: "What does 'द्रष्टृ' (draṣṭṛ) mean?",
        options: ["Doer", "Seer, witness", "Speaker", "Listener"],
        correct: 1,
        explanation: "द्रष्टृ (draṣṭṛ) means seer or witness, from दृश् (dṛś) - 'to see'."
    },
    {
        question: "What is a 'समास' (samāsa)?",
        options: ["A verb tense", "A compound word", "A case ending", "A pronunciation rule"],
        correct: 1,
        explanation: "समास (samāsa) is the combining of two or more words into one compound."
    },
    {
        question: "In Yoga Sutras, what is often omitted?",
        options: ["Nouns", "Verbs", "Adjectives", "Compounds"],
        correct: 1,
        explanation: "Yoga Sutras use nominal style where verbs are often implied, not stated."
    },
    {
        question: "What does 'स्वरूप' (svarūpa) mean?",
        options: ["Foreign form", "Own nature, true form", "Changed state", "External appearance"],
        correct: 1,
        explanation: "स्वरूप (svarūpa) means own nature or true form, from स्व (own) + रूप (form)."
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
    
    // Update navigation
    document.getElementById('quizPrevBtn').disabled = appState.currentQuizIndex === 0;
    
    const nextBtn = document.getElementById('quizNextBtn');
    if (appState.currentQuizIndex === quizQuestions.length - 1) {
        nextBtn.textContent = 'Finish Test →';
    } else {
        nextBtn.textContent = 'Next →';
    }
    
    // Hide feedback
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
    
    // Store answer
    appState.quizAnswers[appState.currentQuizIndex] = optionIndex;
    
    // Show feedback
    const question = quizQuestions[appState.currentQuizIndex];
    const feedback = document.getElementById('quizFeedback');
    const isCorrect = optionIndex === question.correct;
    
    feedback.innerHTML = `
        <strong>${isCorrect ? '✓ Correct!' : '✗ Incorrect'}</strong><br>
        ${question.explanation}
    `;
    feedback.style.display = 'block';
    
    // Highlight correct/incorrect
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
    
    // Calculate score
    let score = 0;
    quizQuestions.forEach((q, idx) => {
        if (appState.quizAnswers[idx] === q.correct) {
            score++;
        }
    });
    
    document.getElementById('finalScore').textContent = score;
    
    let message = '';
    if (score >= 9) {
        message = '🎉 Excellent! You have a strong understanding of Yoga Sutras vocabulary and grammar!';
    } else if (score >= 7) {
        message = '👍 Great job! You\'re making good progress in your Sanskrit learning journey.';
    } else if (score >= 5) {
        message = '📚 Good effort! Review the vocabulary and grammar lessons to strengthen your knowledge.';
    } else {
        message = '💪 Keep practicing! Go through the vocabulary and grammar sections again.';
    }
    
    document.getElementById('scoreMessage').textContent = message;
}

function retakeQuiz() {
    document.querySelector('.quiz-container').style.display = 'block';
    document.getElementById('quizResults').style.display = 'none';
    appState.currentQuizIndex = 0;
    appState.quizAnswers = [];
    renderQuizQuestion();
}

// Keyboard shortcuts
document.addEventListener('keydown', (e) => {
    if (appState.currentScreen === 'sutraScreen') {
        if (e.key === 'ArrowLeft') {
            previousSutra();
        } else if (e.key === 'ArrowRight') {
            nextSutra();
        }
    }
});
