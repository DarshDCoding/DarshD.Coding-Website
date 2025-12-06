import React, { useState, useEffect, useMemo } from 'react';

// --- Global CSS Injection (Moved outside App component) ---
// This ensures the styles are applied only once, preventing DOM manipulation issues during React renders.
const style = document.createElement('style');
style.innerHTML = `
@keyframes pulse-slow {
  0%, 100% { opacity: 1; }
  50% { opacity: 0; }
}
.animate-pulse-slow {
  animation: pulse-slow 1s step-end infinite;
}
.whitespace-pre {
    white-space: pre;
}

/* Hide scrollbar for Chrome, Safari, and Opera */
.scrollbar-hidden::-webkit-scrollbar {
    display: none;
}

/* Hide scrollbar for IE, Edge, and Firefox */
.scrollbar-hidden {
    -ms-overflow-style: none;  /* IE andge */
    scrollbar-width: none;  /* Firefox */
}
`;
if (!document.head.querySelector('[data-custom-styles]')) {
    style.setAttribute('data-custom-styles', true);
    document.head.appendChild(style);
}


// --- Placeholder/Simulated shadcn/ui Components ---
// Defined with updated styles for the iOS segmented control/pill tab look.

// Tabs Container - Outer wrapper
const Tabs = ({ defaultValue, children, className }) => (
    <div className={`w-full ${className}`} data-default-value={defaultValue}>
        {children}
    </div>
);

// Tabs List - The container for the triggers (now styled as a dark-mode pill container)
const TabsList = ({ children, className }) => (
    <div
        // iOS segmented control style: highly rounded corners, slightly lighter background than the editor, space-x-1 for gap
        className={`flex items-center justify-start h-8 p-0.5 space-x-0.5 bg-[#333333] rounded-lg text-gray-400 ${className}`}
        role="tablist"
    >
        {children}
    </div>
);

// Tabs Trigger - The clickable button (now styled as a dark-mode pill)
const TabsTrigger = ({ value, children, isActive, onClick, disabled, className }) => (
    <button
        onClick={onClick}
        disabled={disabled}
        data-state={isActive ? 'active' : 'inactive'}
        value={value}
        className={`inline-flex items-center justify-center whitespace-nowrap px-3 py-1 text-xs font-medium 
      ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 
      h-7 rounded-md cursor-pointer
      ${isActive
            ? 'bg-[#1e1e1e] text-white shadow-md' // Active pill style (matching editor background)
            : 'hover:text-white hover:bg-[#444444]' // Hover for inactive
        } ${className}`}
        role="tab"
        type="button"
    >
        {children}
    </button>
);

// Tabs Content - The content panel
const TabsContent = ({ value, activeTab, children, className }) => (
    <div
        data-state={value === activeTab ? 'active' : 'inactive'}
        className={`mt-0 ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 ${className}`}
        role="tabpanel"
        hidden={value !== activeTab}
    >
        {children}
    </div>
);


// --- Code Snippets ---
const codeSnippets = {
    html: {
        content: `<!DOCTYPE html>
<html>
<head>
  <title>Darsh D. Coding</title>
  <link rel="stylesheet" href="style.css"/>
</head>
<body>
  <h1>Radhe Radhe...</h1>
  <script src="script.js"></script>
</body>
</html>`,
        language: 'HTML',
        filePath: 'index.html',
    },
    css: {
        content: `body {
  font-family: sans-serif;
  text-align: center;
  background-color: #1e1e1e;
}
h1 {
  color: #61DAFB; /* A generic highlight color */
  margin-top: 50px;
}`,
        language: 'CSS',
        filePath: 'style.css',
    },
    js: {
        content: `// The script runs when loaded.
console.log("script.js loaded successfully.");
console.log("HTML, CSS, and JS are connected!");`,
        language: 'JavaScript',
        filePath: 'script.js',
    },
};

// --- TOKENIZATION & SYNTAX LOGIC (Unchanged) ---
const tokenRegex = /(\/\/.*)|(\/\*[\s\S]*?\*\/)|(\n)|(\s+)|([a-zA-Z_$][\w$]*)|(\(|\)|{|}|\[|\]|;|,|:|=|\+|-|\*|\/|\.|<|>|!)|(['"].*?['"])|(\d+)|(<[\/]?[\w$]+[ >])|(&lt;!--.*?--&gt;)/g;

const getSyntaxClass = (token, activeTab) => {
    const trimmedToken = token.trim();

    if (token.match(/^\s+$/)) return '';

    if (activeTab === 'js') {
        if (trimmedToken.startsWith('//')) return 'text-gray-500';
        if (['import', 'export', 'function', 'const', 'let', 'if', 'return', 'document', 'console', 'log', 'getElementById'].includes(trimmedToken)) return 'text-pink-400';
        if (trimmedToken.startsWith('"') || trimmedToken.startsWith("'")) return 'text-yellow-400';
        if (trimmedToken.match(/^\d+$/)) return 'text-yellow-400';
        if (trimmedToken.includes('=')) return 'text-pink-400';
    } else if (activeTab === 'html') {
        if (trimmedToken.match(/^(&lt;!--)/)) return 'text-gray-500';
        if (trimmedToken.match(/['"].*?['"]/)) return 'text-yellow-400';
        if (['rel', 'href', 'src', 'type', 'id', 'class', 'onclick', 'charset', 'name', 'content'].includes(trimmedToken.toLowerCase())) return 'text-pink-400';
        if (trimmedToken === '<' || trimmedToken === '>' || trimmedToken === '/' || trimmedToken === '!') return 'text-gray-400';
        if (['DOCTYPE', 'html', 'head', 'title', 'link', 'meta', 'body', 'h1', 'script'].includes(trimmedToken.toLowerCase())) return 'text-cyan-400';

    } else if (activeTab === 'css') {
        if (trimmedToken.startsWith('/*') || trimmedToken.match(/\*\/$/)) return 'text-gray-500';
        if (['body', 'h1'].includes(trimmedToken.toLowerCase())) return 'text-orange-400';
        if (trimmedToken.match(/[:;{}]/) || trimmedToken === '-') return 'text-pink-400';
        const cssPropertyKeywords = ['font', 'family', 'text', 'align', 'background', 'color', 'margin', 'top'];
        if (cssPropertyKeywords.includes(trimmedToken.toLowerCase())) return 'text-cyan-400';
        return 'text-yellow-400';
    }

    return 'text-gray-200';
};


const App = () => {
    const [activeTab, setActiveTab] = useState('html');

    // States for loop control, tied to the active tab
    const [displayTokenCount, setDisplayTokenCount] = useState(0);
    const [animationMode, setAnimationMode] = useState('typing'); // 'typing' or 'deleting'

    // Memoize tokens for the active file
    const activeTokens = useMemo(() => {
        return Array.from(codeSnippets[activeTab].content.matchAll(tokenRegex), m => m[0]).filter(t => t.length > 0);
    }, [activeTab]);


    // Reset state when tab changes
    useEffect(() => {
        setDisplayTokenCount(0);
        setAnimationMode('typing');
    }, [activeTab]);


    // Typing and Deleting Animation Loop
    useEffect(() => {
        const tokens = activeTokens;
        const totalTokens = tokens.length;

        // Reverted to original speed, retaining 1s pause
        const typingDelay = 40; // 40ms (Original speed)
        const deletingDelay = 20; // 20ms (Original speed)
        const pauseDelay = 1000; // 1s pause when mode reverses

        const delay = animationMode === 'typing' ? typingDelay : deletingDelay;

        let timer = setInterval(() => {
            setDisplayTokenCount(prevCount => {
                let nextCount = prevCount;

                if (animationMode === 'typing') {
                    if (prevCount < totalTokens) {
                        nextCount = prevCount + 1;
                    } else {
                        // Completed typing: set the mode to reverse after the pause
                        clearInterval(timer);
                        setTimeout(() => {
                            setAnimationMode('deleting');
                        }, pauseDelay);
                        return prevCount;
                    }
                } else { // 'deleting'
                    if (prevCount > 0) {
                        nextCount = prevCount - 1;
                    } else {
                        // Completed deleting: set the mode to type after the pause
                        clearInterval(timer);
                        setTimeout(() => {
                            setAnimationMode('typing');
                        }, pauseDelay);
                        return 0;
                    }
                }

                return nextCount;
            });
        }, delay);

        // Cleanup function: clears the interval when component unmounts or dependencies change
        return () => clearInterval(timer);
    }, [activeTab, activeTokens.length, animationMode]); // Re-runs when tab, token length, or mode changes


    const handleTabClick = (tab) => {
        setActiveTab(tab);
    };

    const renderCode = (tabKey) => {
        const isCurrentlyActive = tabKey === activeTab;

        let tokensToRender;

        if (isCurrentlyActive) {
            // For the active tab, render based on the current displayTokenCount slice
            tokensToRender = activeTokens.slice(0, displayTokenCount);
        } else {
            // For inactive tabs, render the full content (non-animated)
            tokensToRender = Array.from(codeSnippets[tabKey].content.matchAll(tokenRegex), m => m[0]).filter(t => t.length > 0);
        }


        let lineContent = [];
        let lines = [];
        let lineCounter = 1;
        let isCursorAdded = false;

        tokensToRender.forEach((token) => {
            const isNewline = token === '\n';

            if (isNewline) {
                lines.push(
                    <div key={`line-${tabKey}-${lineCounter}`} className="h-6 flex items-start leading-6">
                        <code className="flex-1 whitespace-pre">
                            {lineContent}
                        </code>
                    </div>
                );
                lineContent = [];
                lineCounter++;
                return;
            }

            lineContent.push(
                <span key={`${tabKey}-${lineCounter}-${lineContent.length}`} className={getSyntaxClass(token, tabKey)}>
          {token}
        </span>
            );
        });

        // Cursor Logic (only for the currently active tab which is looping)
        if (isCurrentlyActive) {
            // Only show the cursor if we are currently typing or deleting
            const isAnimationActive = animationMode === 'typing' || animationMode === 'deleting';

            if (isAnimationActive) {
                lineContent.push(
                    <span key="cursor" className="inline-block w-2 h-4 bg-gray-300 ml-0.5 animate-pulse-slow"></span>
                );
                isCursorAdded = true;
            }
        }


        if (lineContent.length > 0 || isCurrentlyActive && (isCursorAdded || displayTokenCount === 0)) {
            lines.push(
                <div key={`line-${tabKey}-${lineCounter}`} className="h-6 flex items-start leading-6">
                    <code className="flex-1 whitespace-pre">
                        {lineContent}
                    </code>
                </div>
            );
            lineCounter++;
        }

        return { lines, totalLines: lineCounter - 1 };
    };

    const { totalLines } = renderCode(activeTab);


    return (
        <Tabs
            defaultValue="html"
            activeTab={activeTab}
            className="bg-[#1e1e1e] flex flex-col min-h-[400px] border border-gray-800/50 rounded-lg overflow-hidden"
        >

            {/* Header Bar for left-aligned iOS-style tabs */}
            <div className="flex flex-shrink-0 bg-[#252526] p-2 border-b border-gray-700/50 justify-start">
                <TabsList className="rounded-lg">
                    {Object.entries(codeSnippets).map(([key, snippet]) => (
                        <TabsTrigger
                            key={key}
                            value={key}
                            isActive={activeTab === key}
                            onClick={() => handleTabClick(key)}
                            // Removed previous disabling logic as all tabs now run the animation loop
                            title={`Open ${snippet.language} file`}
                        >
                            <span className="text-gray-300">{snippet.filePath}</span>
                        </TabsTrigger>
                    ))}
                </TabsList>
            </div>

            {/* Code Editor Area */}
            <div className="flex flex-1 overflow-hidden font-mono text-sm">

                {/* Line Numbers - Renders based on the active tab's content */}
                <div className="flex-shrink-0 w-8 md:w-10 bg-[#1e1e1e] text-gray-600 pt-1 px-2 text-right select-none">
                    {Array.from({ length: totalLines }, (_, i) => (
                        <div key={i} className="h-6 leading-6">
                            {i + 1}
                        </div>
                    ))}
                </div>

                {/* Tab Contents - Use TabsContent for each file */}
                {Object.entries(codeSnippets).map(([key]) => (
                    <TabsContent key={key} value={key} activeTab={activeTab} className="flex-1 p-2 pt-1 overflow-y-auto scrollbar-hidden">
                        {/* Render the code for the specific tab key */}
                        {renderCode(key).lines}
                    </TabsContent>
                ))}
            </div>
        </Tabs>
    );
};

export default App;