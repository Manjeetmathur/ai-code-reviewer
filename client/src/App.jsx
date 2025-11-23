import { useState, useEffect, useCallback } from 'react'
import Editor from 'react-simple-code-editor'
import { highlight, languages } from 'prismjs/components/prism-core'
// Import base languages first (required dependencies)
import 'prismjs/components/prism-clike'
// Then import dependent languages
import 'prismjs/components/prism-javascript'
import 'prismjs/components/prism-python'
import 'prismjs/components/prism-typescript'
import 'prismjs/components/prism-java'
import 'prismjs/components/prism-css'
import 'prismjs/components/prism-markup'
import 'prismjs/themes/prism.css'
import axios from 'axios'
import Markdown from 'react-markdown'
import rehype from 'rehype-highlight'
import 'highlight.js/styles/github-dark.css'

// Language configuration
const languageConfig = {
  javascript: { lang: languages.js, name: 'JavaScript', prismId: 'javascript' },
  typescript: { lang: languages.js, name: 'TypeScript', prismId: 'typescript' },
  python: { lang: languages.python, name: 'Python', prismId: 'python' },
  java: { lang: languages.java, name: 'Java', prismId: 'java' },
  css: { lang: languages.css, name: 'CSS', prismId: 'css' },
  html: { lang: languages.markup, name: 'HTML', prismId: 'markup' }
}

// Code templates
const codeTemplates = {
  javascript: `// JavaScript Example
function calculateSum(arr) {
  let sum = 0;
  for (let i = 0; i < arr.length; i++) {
    sum += arr[i];
  }
  return sum;
}

const numbers = [1, 2, 3, 4, 5];
console.log(calculateSum(numbers));`,
  typescript: `// TypeScript Example
interface User {
  id: number;
  name: string;
  email: string;
}

function getUserById(users: User[], id: number): User | undefined {
  return users.find(user => user.id === id);
}`,
  python: `# Python Example
def calculate_factorial(n):
    if n == 0 or n == 1:
        return 1
    return n * calculate_factorial(n - 1)

result = calculate_factorial(5)
print(f"Factorial: {result}")`,
  java: `// Java Example
public class Calculator {
    public int add(int a, int b) {
        return a + b;
    }
    
    public int multiply(int a, int b) {
        return a * b;
    }
}`,
  css: `/* CSS Example */
.container {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100vh;
}

.button {
  padding: 10px 20px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 5px;
}`,
  html: `<!-- HTML Example -->
<!DOCTYPE html>
<html>
<head>
  <title>Example</title>
</head>
<body>
  <h1>Hello World</h1>
  <p>This is an example HTML document.</p>
</body>
</html>`
}

// Review modes
const reviewModes = [
  { value: 'general', label: 'General Review' },
  { value: 'security', label: 'Security Focus' },
  { value: 'performance', label: 'Performance Focus' },
  { value: 'bestPractices', label: 'Best Practices' }
]

function App () {
  // Use relative path - Vite proxy handles /ai routes in development
  // In production, same origin is used
  const backlLink = ''
  
  const [code, setcode] = useState(`//put your code here...\n`)
  const [res, setres] = useState(``)
  const [load, setload] = useState(false)
  const [selectedLanguage, setSelectedLanguage] = useState('javascript')
  const [reviewMode, setReviewMode] = useState('general')
  const [copySuccess, setCopySuccess] = useState({ code: false, review: false })
  const [reviewHistory, setReviewHistory] = useState([])
  const [showHistory, setShowHistory] = useState(false)

  // Load review history from localStorage
  useEffect(() => {
    const savedHistory = localStorage.getItem('reviewHistory')
    if (savedHistory) {
      try {
        setReviewHistory(JSON.parse(savedHistory))
      } catch (e) {
        console.error('Error loading review history:', e)
      }
    }
  }, [])

  // Note: react-simple-code-editor handles highlighting internally
  // No need to call prism.highlightAll() which can cause DOM conflicts

  // Get language for highlighting (memoized)
  const getLanguageForHighlight = useCallback(() => {
    const config = languageConfig[selectedLanguage]
    if (!config || !config.lang) {
      return languages.js
    }
    return config.lang
  }, [selectedLanguage])

  // Get Prism language identifier (memoized)
  const getPrismLanguageId = useCallback(() => {
    const config = languageConfig[selectedLanguage]
    return config?.prismId || 'javascript'
  }, [selectedLanguage])

  // Memoized highlight function to prevent DOM conflicts
  const highlightCode = useCallback((codeToHighlight) => {
    try {
      const langObj = getLanguageForHighlight()
      const langId = getPrismLanguageId()
      if (langObj) {
        return highlight(codeToHighlight, langObj, langId)
      }
      // Fallback to JavaScript
      return highlight(codeToHighlight, languages.js, 'javascript')
    } catch (error) {
      // Fallback to JavaScript if language fails
      console.warn('Language highlighting failed, using JavaScript:', error)
      return highlight(codeToHighlight, languages.js, 'javascript')
    }
  }, [getLanguageForHighlight, getPrismLanguageId])

  // Handle code review
  const handleReview = async () => {
    if (!code.trim() || code.trim() === '//put your code here...\n') {
      alert('Please enter some code to review')
      return
    }

    try {
      setload(true)
      const data = await axios.post(`${backlLink}/ai/get-review`, {
        code,
        reviewMode,
        language: selectedLanguage
      })
      const result = data.data
      setres(result)

      // Save to history
      const historyItem = {
        id: Date.now(),
        code: code.substring(0, 100) + (code.length > 100 ? '...' : ''),
        review: result.result,
        language: selectedLanguage,
        mode: reviewMode,
        timestamp: new Date().toISOString()
      }
      const updatedHistory = [historyItem, ...reviewHistory].slice(0, 20) // Keep last 20
      setReviewHistory(updatedHistory)
      localStorage.setItem('reviewHistory', JSON.stringify(updatedHistory))
    } catch (error) {
      console.error('Error reviewing code:', error)
      alert(error.response?.data?.message || 'Error reviewing code. Please try again.')
    } finally {
      setload(false)
    }
  }

  // Copy code to clipboard
  const handleCopyCode = async () => {
    try {
      await navigator.clipboard.writeText(code)
      setCopySuccess({ ...copySuccess, code: true })
      setTimeout(() => setCopySuccess({ ...copySuccess, code: false }), 2000)
    } catch (err) {
      console.error('Failed to copy code:', err)
    }
  }

  // Copy review to clipboard
  const handleCopyReview = async () => {
    if (!res?.result) return
    try {
      await navigator.clipboard.writeText(res.result)
      setCopySuccess({ ...copySuccess, review: true })
      setTimeout(() => setCopySuccess({ ...copySuccess, review: false }), 2000)
    } catch (err) {
      console.error('Failed to copy review:', err)
    }
  }

  // Export review as markdown
  const handleExportReview = () => {
    if (!res?.result) return
    
    try {
      const markdownContent = `# Code Review\n\n**Language:** ${languageConfig[selectedLanguage]?.name || selectedLanguage}\n**Review Mode:** ${reviewModes.find(m => m.value === reviewMode)?.label || reviewMode}\n**Date:** ${new Date().toLocaleString()}\n\n---\n\n${res.result}`
      
      const blob = new Blob([markdownContent], { type: 'text/markdown' })
      const url = URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = `code-review-${Date.now()}.md`
      a.style.display = 'none'
      
      // Safely append and remove
      if (document.body) {
        document.body.appendChild(a)
        a.click()
        // Use setTimeout to safely remove after click
        setTimeout(() => {
          if (document.body && document.body.contains(a)) {
            document.body.removeChild(a)
          }
          URL.revokeObjectURL(url)
        }, 100)
      }
    } catch (error) {
      console.error('Error exporting review:', error)
      alert('Failed to export review. Please try again.')
    }
  }

  // Load template
  const handleLoadTemplate = () => {
    const template = codeTemplates[selectedLanguage] || codeTemplates.javascript
    setcode(template)
  }

  // Clear code
  const handleClearCode = () => {
    if (confirm('Are you sure you want to clear the code editor?')) {
      setcode('')
    }
  }

  // Clear review
  const handleClearReview = () => {
    if (confirm('Are you sure you want to clear the review?')) {
      setres('')
    }
  }

  // Load from history
  const handleLoadFromHistory = (historyItem) => {
    setcode(historyItem.code)
    setres({ result: historyItem.review })
    setSelectedLanguage(historyItem.language)
    setReviewMode(historyItem.mode)
    setShowHistory(false)
  }

  // Format code (basic formatting)
  const handleFormatCode = () => {
    try {
      if (selectedLanguage === 'javascript' || selectedLanguage === 'typescript') {
        // Basic formatting - in production, use a proper formatter like prettier
        const formatted = code
          .replace(/\s*{\s*/g, ' {\n  ')
          .replace(/;\s*/g, ';\n')
          .replace(/\n\s*\n/g, '\n')
        setcode(formatted)
      } else {
        alert('Code formatting is currently only available for JavaScript/TypeScript')
      }
    } catch (err) {
      console.error('Error formatting code:', err)
      alert('Error formatting code')
    }
  }

  return (
    <div className="w-full h-screen bg-black overflow-hidden">
      <main className="h-full w-full p-3 md:p-4 bg-black flex flex-col md:flex-row gap-3 md:gap-4">
        {/* Left Panel - Code Editor */}
        <div className="flex-1 min-w-0 bg-gray-800 rounded-lg flex flex-col relative overflow-hidden">
          {/* Header with Controls */}
          <div className="flex flex-col gap-2 p-3 md:p-4 border-b border-gray-700 bg-gray-800/50 backdrop-blur-sm">
            <div className="flex items-center justify-between">
              <h2 className="text-white text-sm md:text-base font-semibold">
                Code Editor
              </h2>
              <div className="flex items-center gap-2">
                {load ? (
                  <div className="w-8 h-8 rounded-full border-2 border-white border-t-transparent animate-spin" />
                ) : (
                  <button
                    className="px-4 py-2 bg-white text-blue-950 font-semibold rounded-md hover:bg-gray-200 active:bg-gray-300 transition-colors duration-200 cursor-pointer text-sm md:text-base"
                    onClick={handleReview}
                    disabled={load}
                    aria-label="Review code"
                  >
                    Review
                  </button>
                )}
              </div>
            </div>
            
            {/* Controls Row */}
            <div className="flex flex-wrap items-center gap-2">
              {/* Language Selector */}
              <select
                value={selectedLanguage}
                onChange={(e) => setSelectedLanguage(e.target.value)}
                className="px-3 py-1.5 bg-gray-700 text-white rounded-md text-sm border border-gray-600 hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                aria-label="Select programming language"
              >
                {Object.entries(languageConfig).map(([key, config]) => (
                  <option key={key} value={key}>{config.name}</option>
                ))}
              </select>

              {/* Review Mode Selector */}
              <select
                value={reviewMode}
                onChange={(e) => setReviewMode(e.target.value)}
                className="px-3 py-1.5 bg-gray-700 text-white rounded-md text-sm border border-gray-600 hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                aria-label="Select review mode"
              >
                {reviewModes.map((mode) => (
                  <option key={mode.value} value={mode.value}>{mode.label}</option>
                ))}
              </select>

              {/* Action Buttons */}
              <button
                onClick={handleLoadTemplate}
                className="px-3 py-1.5 bg-gray-700 text-white rounded-md text-sm hover:bg-gray-600 transition-colors"
                aria-label="Load template"
                title="Load template"
              >
                Template
              </button>
              <button
                onClick={handleFormatCode}
                className="px-3 py-1.5 bg-gray-700 text-white rounded-md text-sm hover:bg-gray-600 transition-colors"
                aria-label="Format code"
                title="Format code"
              >
                Format
              </button>
              <button
                onClick={handleCopyCode}
                className="px-3 py-1.5 bg-gray-700 text-white rounded-md text-sm hover:bg-gray-600 transition-colors"
                aria-label="Copy code"
                title="Copy code"
              >
                {copySuccess.code ? '✓ Copied' : 'Copy'}
              </button>
              <button
                onClick={handleClearCode}
                className="px-3 py-1.5 bg-red-700 text-white rounded-md text-sm hover:bg-red-600 transition-colors"
                aria-label="Clear code"
                title="Clear code"
              >
                Clear
              </button>
              <button
                onClick={() => setShowHistory(!showHistory)}
                className="px-3 py-1.5 bg-gray-700 text-white rounded-md text-sm hover:bg-gray-600 transition-colors"
                aria-label="Toggle history"
                title="Review history"
              >
                History
              </button>
            </div>
          </div>

          {/* History Panel */}
          {showHistory && (
            <div className="absolute top-20 left-0 right-0 bg-gray-900 border-b border-gray-700 z-10 max-h-60 overflow-y-auto">
              {reviewHistory.length === 0 ? (
                <div className="p-4 text-gray-400 text-sm text-center">No review history</div>
              ) : (
                <div className="p-2">
                  {reviewHistory.map((item) => (
                    <button
                      key={item.id}
                      onClick={() => handleLoadFromHistory(item)}
                      className="w-full text-left p-2 mb-1 bg-gray-800 hover:bg-gray-700 rounded text-sm text-white"
                    >
                      <div className="flex justify-between items-center">
                        <span className="truncate">{item.code}</span>
                        <span className="text-xs text-gray-400 ml-2">
                          {new Date(item.timestamp).toLocaleDateString()}
                        </span>
                      </div>
                      <div className="text-xs text-gray-500 mt-1">
                        {languageConfig[item.language]?.name} • {reviewModes.find(m => m.value === item.mode)?.label}
                      </div>
                    </button>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Code Editor Container */}
          <div className="flex-1 overflow-auto p-4">
            <Editor
              key={selectedLanguage}
              value={code}
              onValueChange={setcode}
              highlight={highlightCode}
              padding={16}
              style={{
                fontFamily: '"Fira Code", "Fira Mono", monospace',
                fontSize: '14px',
                lineHeight: '1.6',
                minHeight: '100%'
              }}
              className="w-full h-full border-2 border-gray-600 rounded-lg bg-gray-900 text-white focus-within:border-gray-400 transition-colors"
            />
          </div>
        </div>

        {/* Right Panel - Review Results */}
        <div className="flex-1 min-w-0 bg-gray-900 rounded-lg overflow-hidden flex flex-col">
          {/* Header */}
          <div className="flex items-center justify-between p-3 md:p-4 border-b border-gray-700 bg-gray-900/50 backdrop-blur-sm">
            <h2 className="text-white text-sm md:text-base font-semibold">
              Code Review
            </h2>
            <div className="flex items-center gap-2">
              {res?.result && (
                <>
                  <button
                    onClick={handleCopyReview}
                    className="px-3 py-1.5 bg-gray-700 text-white rounded-md text-sm hover:bg-gray-600 transition-colors"
                    aria-label="Copy review"
                    title="Copy review"
                  >
                    {copySuccess.review ? '✓ Copied' : 'Copy'}
                  </button>
                  <button
                    onClick={handleExportReview}
                    className="px-3 py-1.5 bg-gray-700 text-white rounded-md text-sm hover:bg-gray-600 transition-colors"
                    aria-label="Export review"
                    title="Export as markdown"
                  >
                    Export
                  </button>
                  <button
                    onClick={handleClearReview}
                    className="px-3 py-1.5 bg-red-700 text-white rounded-md text-sm hover:bg-red-600 transition-colors"
                    aria-label="Clear review"
                    title="Clear review"
                  >
                    Clear
                  </button>
                </>
              )}
            </div>
          </div>

          {/* Review Content */}
          <div className="flex-1 overflow-y-auto p-4 md:p-6 text-white prose prose-invert max-w-none">
            {res?.result ? (
              <Markdown rehypePlugins={[rehype]}>
                {res.result}
              </Markdown>
            ) : (
              <div className="flex items-center justify-center h-full text-gray-500">
                <div className="text-center">
                  <p className="text-sm md:text-base mb-2">
                    Your code review will appear here
                  </p>
                  <p className="text-xs text-gray-600">
                    Select a review mode and click &quot;Review&quot; to get started
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  )
}

export default App
