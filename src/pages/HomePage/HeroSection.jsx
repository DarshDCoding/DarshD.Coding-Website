import React, { useState, useEffect, useMemo } from 'react';
import { ArrowRight, FileText, Video, Github } from 'lucide-react';

// --- Placeholder for CodeSnippet Component (Continuous Loop, 10 Lines Max) ---
const CodeSnippet = () => {
    // 1. Define multiple code files (max 10 lines each)
    const codeFiles = useMemo(() => ({
        // CHANGED: Content reduced to exactly 10 lines
        'Hero.jsx': `import React, { useEffect, useState } from 'react';\nimport { fetchUserData } from './API';\n\nconst Hero = ({ userId }) => {\n  const [data, setData] = useState(null);\n  // Fetch data on component mount\n  useEffect(() => {\n    fetchUserData(userId).then(setData);\n  }, [userId]);\n};`,

        'styles.css': `/* Global styles (Tailwind base) */\n@tailwind base;\n@tailwind components;\n@tailwind utilities;\n\n/* Custom hero section background */\n.hero-section {\n  background-color: theme('colors.gray.900');\n  padding: 4rem;\n}`,

        'API.js': `// Function to fetch project data asynchronously\nexport const fetchProjects = async () => {\n  const URL = '/api/projects';\n  try {\n    const response = await fetch(URL);\n    const data = await response.json();\n    return data;\n  } catch (error) {\n    console.error("Fetch error:", error);\n  }\n};`
    }), []);


    // 2. State for active file and animation control
    const [activeFile, setActiveFile] = useState('Hero.jsx');
    const fullMockCode = codeFiles[activeFile];

    const [displayedCode, setDisplayedCode] = useState('');
    const [isDeleting, setIsDeleting] = useState(false);
    const [typingSpeed, setTypingSpeed] = useState(30);
    const [loopNum, setLoopNum] = useState(0);

    // 3. useEffect to handle the continuous typing/deleting loop AND file switching
    useEffect(() => {
        // Reset state completely if the file changes
        if (displayedCode !== '' && !fullMockCode.startsWith(displayedCode)) {
            setDisplayedCode('');
            setIsDeleting(false);
            setTypingSpeed(30);
            return; // Skip execution until reset is complete
        }

        const handleTyping = () => {
            // Determine if we are typing (appending) or deleting (backspacing)
            setDisplayedCode(isDeleting
                ? fullMockCode.substring(0, displayedCode.length - 1)
                : fullMockCode.substring(0, displayedCode.length + 1)
            );

            // Set typing speed (faster deletion)
            setTypingSpeed(isDeleting ? 10 : 30);

            if (!isDeleting && displayedCode.length === fullMockCode.length) {
                // Done typing, start deleting after a pause
                setTimeout(() => setIsDeleting(true), 2000);
            } else if (isDeleting && displayedCode.length === 0) {
                // Done deleting, start typing again after a brief pause
                setIsDeleting(false);
                setLoopNum(loopNum + 1);
                setTypingSpeed(100);
            }
        };

        const timer = setTimeout(handleTyping, typingSpeed);
        return () => clearTimeout(timer);
    }, [displayedCode, isDeleting, typingSpeed, fullMockCode, activeFile, loopNum]);


    // 4. Generate line numbers dynamically based on the currently displayed code
    const currentLineCount = displayedCode.split('\n').length;
    // Ensure line numbering starts at 1, even if the code is empty.
    const lineNumbers = Array.from({ length: currentLineCount || 1 }, (_, i) => i + 1);

    // Determine footer status
    const statusText = displayedCode.length === fullMockCode.length ? 'Code compiled successfully.' : (isDeleting ? 'Deleting...' : 'Typing...');

    return (
        // min-h-[450px] provides stable height for 15 lines
        <div className="p-3 sm:p-5 bg-slate-900 rounded-xl shadow-2xl flex flex-col justify-between overflow-hidden border border-slate-700/50 min-h-[450px]">
            {/* Header / Tabs */}
            <div className="flex justify-between items-center mb-4 border-b border-slate-800 pb-3">

                {/* File Tabs */}
                <div className="flex space-x-2">
                    {Object.keys(codeFiles).map((fileName) => (
                        <button
                            key={fileName}
                            onClick={() => setActiveFile(fileName)}
                            className={`px-3 py-1 text-xs sm:text-sm font-mono rounded-t-lg transition-colors duration-200 focus:outline-none 
                                ${activeFile === fileName
                                ? 'bg-slate-800 text-cyan-400 border-b-2 border-cyan-400/80 shadow-md'
                                : 'text-slate-500 hover:text-slate-300 hover:bg-slate-800/50'
                            }`}
                        >
                            {fileName}
                        </button>
                    ))}
                </div>

                {/* Window Controls */}
                <div className="flex space-x-2">
                    <div className="w-3 h-3 bg-red-500 rounded-full cursor-pointer hover:scale-110 transition"></div>
                    <div className="w-3 h-3 bg-yellow-500 rounded-full cursor-pointer hover:scale-110 transition"></div>
                    <div className="w-3 h-3 bg-green-500 rounded-full cursor-pointer hover:scale-110 transition"></div>
                </div>
            </div>

            {/* Mock Code Body container */}
            <div className="flex flex-grow overflow-auto text-xs sm:text-sm">
                {/* Line Numbers Column */}
                <div className="text-right pr-4 pt-1 text-slate-600 select-none sticky left-0 z-10">
                    <pre>
                        {lineNumbers.map((num, index) => (
                            // Ensuring line height consistency between numbers and code
                            <span key={index} className="block leading-relaxed" style={{lineHeight: '1.5rem'}}>{num}</span>
                        ))}
                    </pre>
                </div>

                {/* Code Content Column */}
                <pre className="text-slate-200 flex-grow pt-1">
                    <code
                        className="whitespace-pre-wrap font-mono text-xs sm:text-sm leading-relaxed text-cyan-400 block"
                        style={{lineHeight: '1.5rem'}}
                    >
                        {displayedCode}
                        {/* Blinking cursor appears during typing/deleting */}
                        <span className="animate-blink text-slate-100">|</span>
                    </code>
                </pre>
            </div>


            {/* Footer */}
            <div className="mt-4 pt-3 border-t border-slate-800 text-slate-500 text-xs flex justify-between">
                <span>{statusText}</span>
                <span className="text-cyan-400/80">React 18.2.0</span>
            </div>
        </div>
    );
};


// --- Main DigitalBlueprintHero Component ---
const DigitalBlueprintHero = () => {
    // --- Typewriter Logic ---
    const [text, setText] = useState('');
    const [isDeleting, setIsDeleting] = useState(false);
    const [loopNum, setLoopNum] = useState(0);
    const [typingSpeed, setTypingSpeed] = useState(150);

    // Updated services/content types for a personal online presence
    const contentTypes = [
        "Latest Projects (Code)",
        "New Vlogs (Video)",
        "Technical Blogs (Writing)",
        "Latest Updates"
    ];

    useEffect(() => {
        const handleTyping = () => {
            const i = loopNum % contentTypes.length;
            const fullText = contentTypes[i];

            setText(isDeleting
                ? fullText.substring(0, text.length - 1)
                : fullText.substring(0, text.length + 1)
            );

            setTypingSpeed(isDeleting ? 30 : 150);

            if (!isDeleting && text === fullText) {
                setTimeout(() => setIsDeleting(true), 2000); // Pause at end of word
            } else if (isDeleting && text === '') {
                setIsDeleting(false);
                setLoopNum(loopNum + 1);
                setTypingSpeed(500);
            }
        };

        const timer = setTimeout(handleTyping, typingSpeed);
        return () => clearTimeout(timer);
    }, [text, isDeleting, loopNum, contentTypes, typingSpeed]);

    return (
        <div className="relative h-auto flex flex-col md:flex-row bg-white dark:bg-white overflow-hidden font-sans md:py-16 px-4 sm:px-8">
            <div className="w-full max-w-7xl mx-auto flex flex-col lg:flex-row gap-10 md:gap-16 lg:gap-20">

                {/*Left Area Content*/}
                <div className="relative z-10 w-full lg:w-1/2 pt-0 pb-0 flex flex-col justify-center min-h-[50vh] md:min-h-0">
                    {/* Main Headline */}
                    <div className="animate-slide-in-left">
                        <p
                            className="text-lg md:text-xl font-medium text-blue-500 dark:text-blue-400 mb-4 tracking-wider uppercase"
                        >
                            Developer | Creator | Thinker
                        </p>
                        <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-gray-900 dark:text-gray-900 leading-snug tracking-tight">
                            Building <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-cyan-400">Digital</span> Experiences:
                        </h1>

                        <div className="mt-6 border-l-4 border-cyan-500 pl-6">
                            <span
                                className="text-base md:text-xl lg:text-2xl font-light text-gray-600 dark:text-gray-600 block"
                            >
                                My space for Projects, Vlogs, Blogs, and more.
                            </span>
                        </div>
                    </div>

                    {/* Secondary Typing Line */}
                    <div
                        className="mt-10 flex flex-col sm:flex-row sm:items-center text-base md:text-xl font-mono text-cyan-500 h-16 sm:min-h-[2.5rem]"
                    >
                        <span className="mr-3 text-gray-500 dark:text-gray-500 font-sans font-medium tracking-widest text-sm uppercase mb-2 sm:mb-0">Check out my ::</span>
                        <div className="flex items-center">
                            <span className="text-cyan-600 dark:text-cyan-300 font-semibold">{text}</span>
                            {/* Cursor: Removed rounded-sm for a sharp look */}
                            <span className="w-2 h-5 bg-cyan-600 dark:bg-cyan-400 ml-1 animate-blink shadow-[0_0_10px_rgba(6,182,212,0.8)]"></span>
                        </div>
                    </div>

                    {/* Call to Action Buttons */}
                    <div className="mt-8 flex flex-wrap gap-3 opacity-0 animate-fade-in-up" style={{ animationDelay: '0.8s', animationFillMode: 'forwards' }}>

                        {/* Primary Button - Get in Touch */}
                        <button className="group flex items-center gap-2 bg-gradient-to-r from-blue-500 to-cyan-400 text-white font-semibold py-2 px-4 md:py-3 md:px-6 text-sm md:text-base rounded-full transition-all duration-300 shadow-xl shadow-gray-500/30 transform hover:scale-[1.02] active:scale-95 ring-4 ring-blue-800/20"> Get in Touch
                            <ArrowRight className="w-3 h-3 md:w-4 md:h-4 ml-1 transition-transform group-hover:translate-x-1" />
                        </button>

                        {/* Primary Button - Github*/}
                        <button className="group flex items-center gap-2 bg-gray-900 text-white font-semibold py-2 px-4 md:py-3 md:px-6 text-sm md:text-base rounded-full transition-all duration-300 shadow-xl shadow-gray-500/30 transform hover:scale-[1.02] active:scale-95">
                            <Github className="w-4 h-4 md:w-5 md:h-5 transition-transform group-hover:rotate-6" /> View My Code
                            <ArrowRight className="w-3 h-3 md:w-4 md:h-4 ml-1 transition-transform group-hover:translate-x-1" />
                        </button>

                        {/* Primary Button - Blog */}
                        <button className="group flex items-center gap-2  font-semibold py-2 px-4 md:py-3 md:px-6 text-sm md:text-base rounded-full text-yellow-500 dark:text-yellow-300 bg-yellow-500/10 hover:bg-yellow-500/20 border border-yellow-500/50 dark:border-yellow-400/50  transition-all duration-300 shadow-xl shadow-gray-500/30 transform hover:scale-[1.02] active:scale-95">
                            <FileText className="w-4 h-4 md:w-5 md:h-5 text-yellow-500 dark:text-yellow-400" /> Read Blog
                            <ArrowRight className="w-3 h-3 md:w-4 md:h-4 ml-1 transition-transform group-hover:translate-x-1" />
                        </button>

                        {/* Primary Button - Vlog */}
                        <button className="group flex items-center gap-2  font-semibold py-2 px-4 md:py-3 md:px-6 text-sm md:text-base rounded-full text-red-400 dark:text-red-300 bg-red-500/10 hover:bg-red-500/20 border border-red-500/50 dark:border-red-400/50  transition-all duration-300 shadow-xl shadow-gray-500/30 transform hover:scale-[1.02] active:scale-95">
                            <Video className="w-4 h-4 md:w-5 md:h-5 text-red-500 dark:text-red-400" /> Watch Vlog
                            <ArrowRight className="w-3 h-3 md:w-4 md:h-4 ml-1 transition-transform group-hover:translate-x-1" />
                        </button>
                    </div>

                </div>

                {/* Right Open Area: Code Snippet (Centered) */}
                <div
                    className="w-full lg:w-1/2 lg:min-h-0 pt-8 lg:pt-0 opacity-0 animate-fade-in-up flex items-center justify-center lg:h-full" // Added flex, items-center, justify-center, and lg:h-full
                    style={{ animationDelay: '0.6s', animationFillMode: 'forwards' }}
                >
                    <CodeSnippet/>
                </div>
            </div>


            {/* Global Styles for Keyframe Animations (Unchanged) */}
            <style>{`
                /* Note: I've added subtle dark/light text color changes (e.g., dark:text-white) */
                /* to ensure readability in both light (default) and dark environments. */
                
                @keyframes slideInLeft {
                  from {
                    opacity: 0;
                    transform: translateX(-100px);
                  }
                  to {
                    opacity: 1;
                    transform: translateX(0);
                  }
                }
                @keyframes fadeInUp {
                  from {
                    opacity: 0;
                    transform: translateY(40px);
                  }
                  to {
                    opacity: 1;
                    transform: translateY(0);
                  }
                }
                @keyframes blink {
                  0%, 100% { opacity: 1; }
                  50% { opacity: 0; }
                }
                .animate-slide-in-left {
                  animation: slideInLeft 1.2s cubic-bezier(0.2, 0.8, 0.2, 1) forwards;
                }
                .animate-fade-in-up {
                  animation: fadeInUp 0.8s cubic-bezier(0.2, 0.8, 0.2, 1) forwards;
                }
                .animate-blink {
                  animation: blink 1s step-end infinite;
                }
            `}</style>
        </div>
    );
};

// Main App Component
const App = () => {
    return <DigitalBlueprintHero />;
};

export default App;