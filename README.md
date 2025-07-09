# 🍰 Study Cake - Reading Buddy

AI-powered English learning web application with retro-inspired design - An interactive tool for learning vocabulary and grammar through reading comprehension.

## ✨ Features

- 🎨 **Retro Study Cake Design**: Clean, vintage-inspired colorful interface
- 📖 **Interactive Reading**: Click on words to see Vietnamese translations
- 🤔 **Fill-in-the-blanks Questions**: AI-generated questions from text passages
- 🔊 **Text-to-Speech**: Listen to text pronunciation in English
- ✅ **Instant Feedback**: Real-time answer checking
- 🎯 **Mock Data Ready**: Prepared for future API integration
- 📱 **Responsive Design**: Works on mobile, tablet, and desktop
- ♿ **Accessible**: Screen reader friendly with proper focus management

## 🏗️ Monorepo Structure

```
MiniReadingBuddy/
├── frontend/              # React + Vite + TypeScript
│   ├── src/
│   │   ├── components/    # Reusable UI components
│   │   ├── styles/        # Theme and styling
│   │   ├── types/         # TypeScript type definitions
│   │   ├── utils/         # Utilities and mock data
│   │   └── App.tsx        # Main application component
├── backend/               # Node.js + Express + Langchain
├── package.json           # Root package.json with workspace
└── README.md
```

## 🎨 Component Architecture

### Frontend Components
- **Header**: App title and subtitle
- **TextInput**: Text input area with processing button
- **TextDisplay**: Shows processed text with clickable words
- **QuestionSection**: Fill-in-the-blank questions interface
- **Word**: Individual clickable word component with tooltip

### Styling System
- **Retro Theme**: Vintage colors inspired by study cake aesthetics
- **Consistent Design**: Unified color palette and typography
- **No Complex Animations**: Simple, clean transitions
- **Accessibility First**: High contrast support and focus management

## 🚀 Installation

### System Requirements
- Node.js >= 18.0.0
- npm >= 9.0.0

### 1. Clone repository
```bash
git clone <repository-url>
cd MiniReadingBuddy
```

### 2. Install dependencies
```bash
# Install root dependencies
npm install

# Install dependencies for frontend and backend
npm run install:all
```

### 3. Backend Configuration (Optional)
```bash
# Create environment file in backend folder
cd backend
cp .env.example .env

# Edit .env file with your API keys
# OPENAI_API_KEY=your_openai_api_key_here
```

## 🎮 Running the Application

### Run Both Frontend and Backend
```bash
npm run dev
```

### Run Individually
```bash
# Frontend only (http://localhost:5173)
npm run dev:frontend

# Backend only (http://localhost:3001)
npm run dev:backend
```

## 🎯 How to Use

1. **Enter Text**: Paste an English paragraph into the text area
2. **Process Text**: Click the "✨ Process Text" button
3. **Interact with Words**: 
   - Click on highlighted words to see Vietnamese translations
   - Tooltips will show translations for 3 seconds
4. **Answer Questions**: 
   - Fill in the blanks in the generated questions
   - Click the check button to verify answers
5. **Listen to Pronunciation**: Click the 🔊 button to hear the text read aloud

## 🛠️ Technology Stack

### Frontend
- **React 18** - UI Library
- **Vite** - Build tool and dev server
- **TypeScript** - Type safety
- **Styled Components** - CSS-in-JS styling
- **Framer Motion** - Smooth animations
- **Material-UI Icons** - Icon library
- **Web Speech API** - Text-to-speech functionality

### Backend
- **Node.js** - JavaScript runtime
- **Express** - Web framework
- **TypeScript** - Type safety
- **Langchain** - AI framework for LLMs
- **OpenAI** - Language model integration
- **CORS** - Cross-origin requests
- **Helmet** - Security middleware

## 🎨 Design System

### Color Palette (Retro Study Cake Theme)
- `#FF6B9D` - Soft Pink (Primary)
- `#A8E6CF` - Mint Green (Secondary)
- `#FFD93D` - Golden Yellow (Accent)
- `#6BCF7F` - Soft Green (Tertiary)
- `#87CEEB` - Sky Blue (Quaternary)
- `#FFF8E7` - Cream (Background)
- `#2C3E50` - Dark Blue-Gray (Text)

### Typography
- Primary Font: Comic Sans MS, Quicksand
- Font weights: 400 (normal) to 700 (bold)
- Responsive sizing with rem units
- Clean, readable hierarchy

## 📱 Responsive Design

Optimized for:
- 📱 Mobile devices (320px+)
- 📟 Tablets (768px+)
- 💻 Desktop computers (1024px+)

## ♿ Accessibility Features

- Keyboard navigation support
- Screen reader compatible
- High contrast mode support
- Focus indicators for all interactive elements
- Reduced motion support for users with vestibular disorders

## 🔄 Roadmap

- [ ] Real OpenAI API integration
- [ ] Multiple question types (multiple choice, matching)
- [ ] User progress tracking
- [ ] Difficulty levels
- [ ] Dictionary API integration
- [ ] Gamification features (points, badges)
- [ ] Multi-language support
- [ ] Offline mode support

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Create a Pull Request

### Development Guidelines
- Follow TypeScript best practices
- Use the established component structure
- Maintain accessibility standards
- Test on multiple devices and browsers
- Keep the retro aesthetic consistent

## 📝 License

Distributed under the MIT License. See `LICENSE` for more information.

## 📧 Contact

- Project Link: [https://github.com/yourusername/MiniReadingBuddy](https://github.com/yourusername/MiniReadingBuddy)

---

💡 **Tip**: For the best experience, use English text passages that are 2-3 sentences long with common vocabulary words. 