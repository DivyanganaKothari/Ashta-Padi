# Ashta Padi - Sanskrit Scripture Learning Platform

## 🎯 Overview

**Ashta Padi** (अष्टपदी - "Eight Steps") is a comprehensive university-integrated learning framework for Indian scriptures that combines profession-based personalization with formal certification pathways. This demo showcases the foundational steps (1-3) using Patanjali's Yoga Sutras.

**Demo for:** ISCLS 2026 (8th International Sanskrit Computational Linguistics Symposium)  
**Submission Deadline:** January 31, 2026

---

## 🌟 The Complete Ashta Padi Model

The full 8-step framework provides a structured pathway from beginner to PhD-level Sanskrit scholarship:

### **Step 1: Profession Selection**
- Choose your professional domain (Economist, Yoga Practitioner, Wellness Coach, Philosopher, Psychologist)
- Exploits cognitive anchoring - humans retain terminology relevant to their interests more effectively

### **Step 2: Profession-Specific Glossary & Testing**
- Sanskrit terms specific to your field (e.g., Arthashastra for economists)
- Interactive assessments to build foundational domain knowledge

### **Step 3: General Sanskrit Grammar & Certification**
- Comprehensive grammar: sandhi, samāsa, declensions, conjugations
- Proficiency tests leading to **Grammar Certification (Exit Point 1)**

### **Step 4: Scripture Selection & Mentor Assignment** ⏳
- System auto-selects 5 relevant scriptures (easy → difficult)
- Mentor assignment: university professor or private Acharya
- Offline examination option for Bachelor's degree credit

### **Step 5: Scripture Structure & Translation** ⏳
- Explanation of sutra vs. shloka formats
- Native language translations
- Master's-level study depth

### **Step 6: Teacher-Guided Learning Path** ⏳
- Live classes with Acharyas/professors
- Recorded lecture series
- PhD-track intensive study option

### **Step 7: University-Integrated Certification** ⏳
- **Certificate** (1 scripture, 6 months)
- **Diploma** (2 scriptures, 1 year)
- **Bachelor's Degree** (5 scriptures + university exams)
- Integration with university platforms for transcript recording

### **Step 8: Career & Research Pathways** ⏳
- Employment opportunities (teaching, wellness, research)
- Advanced course recommendations
- Research program applications (Master's/PhD)

**Legend:** ✅ Implemented in demo | ⏳ Designed, under development

---

## ✨ Current Demo Features (Enhanced Version)

### **1. Profession Selection**
- Choose between Yoga Practitioner or Economist/Accountant
- Personalized learning path based on profession
- (Economist track marked as "Coming Soon" for demo)

### **2. Vocabulary Pre-Learning** ⭐ NEW
- **6 key Sanskrit terms** presented as interactive flashcards
- Learn vocabulary BEFORE encountering in sutras
- Each term includes:
  - Sanskrit (Devanagari) and IAST transliteration
  - Root etymology (dhātu) and meaning
  - Multiple contextual meanings
  - Example usage from actual sutras
- Progress tracking with visual dots
- Sequential navigation through all terms

### **3. Dual-Panel Sutra Learning Interface** ⭐ NEW
**LEFT PANEL (Main Content):**
- 5 sutras from Samadhi Pada (Chapter 1)
- Sanskrit text in Devanagari with IAST transliteration
- Word-by-word grammatical breakdown
- Translation and commentary
- Previous/Next navigation

**RIGHT PANEL (Grammar Reference):**
- Persistent grammar sidebar (always visible)
- 5 collapsible grammar lessons:
  1. Vyākaraṇa - The Science of Grammar
  2. Varṇa - Sounds and Letters
  3. Sandhi - Joining of Sounds
  4. Pada - Word
  5. Dhātu - Verb Root
- Click to expand/collapse each lesson
- Examples and explanations included
- No context-switching needed!

### **4. Practice Quiz** ⭐ NEW
- **10 comprehensive questions** covering:
  - Vocabulary (6 questions)
  - Grammar concepts (4 questions)
- Multiple choice format
- Instant feedback with explanations
- Final score display with encouraging message
- Retake option available

### **5. Progress Tracking**
- Track sutras completed (0-5)
- Monitor vocabulary learned (6 terms)
- Visual progress indicators
- Progress bar showing current position

### **6. Navigation & UX**
- Smooth screen transitions
- Back to Home button
- Previous/Next buttons
- Keyboard shortcuts (Arrow keys for sutras)
- Responsive design (works on mobile)
- Professional Sanskrit-inspired color scheme

---

## 🚀 How to Run

### **Option 1: Use a Local Server (Recommended)**

**Using Python:**
```bash
# Python 3
python -m http.server 8000

# Then open: http://localhost:8000
```

**Using Node.js:**
```bash
npx http-server -p 8000

# Then open: http://localhost:8000
```

**Using VS Code:**
- Install "Live Server" extension
- Right-click `index.html` → "Open with Live Server"

### **Option 2: Open Directly in Browser**
1. Navigate to the project folder
2. Double-click `index.html`
3. The demo will open in your default browser
   - **Note:** Some features may require a local server due to CORS restrictions

---

## 📁 Project Structure

```
Ashta-Padi/
├── index.html                          # Main HTML structure
├── styles.css                          # Sanskrit-inspired design system
├── app.js                              # Application logic and state management
├── yoga_sutras_demo_data.json         # Sutra data, vocabulary, and grammar
├── README.md                           # This file
│
├── ashta_padi_paper_simple.tex         # ISCLS 2026 paper (LaTeX)
├── ashta_padi_paper_simple.pdf         # Compiled PDF
├── complete_ashta_padi_model.png       # 8-step model diagram
│
└── scl.sty, acl.bst, iscls.bib        # ISCLS LaTeX template files
```

---

## 🎨 Design Features

- **Sanskrit-Inspired Color Palette**: Warm tones (saffron, deep brown, gold) reminiscent of ancient manuscripts
- **Devanagari Typography**: Noto Sans Devanagari font for authentic Sanskrit display
- **Smooth Animations**: Fade-in transitions and hover effects
- **Responsive Design**: Works on desktop, tablet, and mobile
- **Accessible**: WCAG-compliant contrast ratios and readable fonts
- **Modern UI/UX**: Glassmorphism effects, gradient backgrounds, micro-interactions

---

## 📊 Data Structure

The demo uses `yoga_sutras_demo_data.json` which contains:

### **Sutras Array**
Each sutra includes:
- `sanskrit`: Devanagari text
- `transliteration`: IAST format
- `word_breakdown`: Array of words with grammatical analysis
- `translation`: English translation
- `commentary`: Contextual explanation
- `key_terms`: Related vocabulary

### **Vocabulary Array**
Each term includes:
- `term`: Sanskrit in Devanagari
- `transliteration`: IAST
- `meanings`: Array of contextual meanings
- `root`: Dhātu (root) derivation
- `part_of_speech`: Grammatical category
- `related_terms`: Cross-references

### **Grammar Lessons Array**
Each lesson includes:
- `title`: Lesson name
- `concept`: Explanation
- `examples`: Array with rules and demonstrations
- `quiz`: Interactive questions with explanations

---

## 🔧 Customization

### **Adding More Sutras**
Edit `yoga_sutras_demo_data.json` and add to the `sutras` array:

```json
{
  "id": 6,
  "number": "1.6",
  "sanskrit": "प्रमाणविपर्ययविकल्पनिद्रास्मृतयः",
  "transliteration": "pramāṇa-viparyaya-vikalpa-nidrā-smṛtayaḥ",
  "word_breakdown": [...],
  "translation": "...",
  "commentary": "...",
  "key_terms": [...]
}
```

### **Adding Vocabulary**
Add to the `vocabulary` array in the JSON file.

### **Changing Colors**
Edit CSS variables in `styles.css`:

```css
:root {
    --primary: #8B4513;        /* Saddle brown */
    --accent: #DAA520;         /* Goldenrod */
    --sanskrit: #8B0000;       /* Dark red for Sanskrit text */
    /* ... more colors */
}
```

---

## 🎓 Research Contributions

This project demonstrates:

1. **Profession-Based Personalization**: Novel approach using cognitive anchoring
2. **University Integration**: Formal certification pathways (Certificate → PhD)
3. **Mentor Matching**: Connection with university professors and traditional Acharyas
4. **Progressive Credentialing**: Structured learning with exit points
5. **Scalable Architecture**: Framework applicable to all Sanskrit scriptures
6. **Traditional + Modern**: Preserves traditional scholarship while democratizing access

---

## 📝 Technical Stack

- **Frontend**: HTML5, CSS3, JavaScript (Vanilla)
- **Fonts**: Google Fonts (Inter, Noto Sans Devanagari)
- **Data Format**: JSON
- **Paper**: LaTeX with ISCLS template
- **No Dependencies**: Pure vanilla JavaScript for maximum compatibility

---

## 📄 ISCLS 2026 Submission

### **Paper Files**
- `ashta_padi_paper_simple.tex` - LaTeX source
- `ashta_padi_paper_simple.pdf` - Compiled PDF (currently 4 pages, needs trimming to 2)
- `complete_ashta_padi_model.png` - 8-step model diagram

### **Key Points**
- **Track**: Demonstrations
- **Page Limit**: 2 pages
- **Deadline**: January 31, 2026 (AoE)
- **Submission Portal**: https://cmt3.research.microsoft.com/ISCLS2026

---

## 👥 Credits

**Developed by:**
- Divya Sharma - System Architecture & Development
- [Acharya Name] - Sanskrit Content & Philological Annotations

**For:** ISCLS 2026 Demo Submission

---

## 📧 Contact

For questions or feedback:
- Email: divyangana.kothari@domain.com
- Conference: iscls@outlook.com

---

## 🙏 Acknowledgments

- Patanjali for the timeless Yoga Sutras
- ISCLS organizing committee
- Sanskrit scholars and educators who preserve this knowledge
- University partners for certification integration (planned)

---

## 📄 License

This demo is created for educational and research purposes as part of the ISCLS 2026 submission.

---

**Built with dedication to making Sanskrit accessible to all through structured, credentialed learning pathways.** 🕉️

**Ashta Padi**: Eight steps from beginner to scholar, from curiosity to credential.
