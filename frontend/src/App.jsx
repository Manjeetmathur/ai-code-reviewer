import React, { useState, useEffect } from 'react'
import Editor from 'react-simple-code-editor'
import { highlight, languages } from 'prismjs/components/prism-core'
import 'prismjs/components/prism-clike'
import 'prismjs/components/prism-javascript'
import 'prismjs/themes/prism.css'
import prism from 'prismjs'
import axios from 'axios'
import Markdown from 'react-markdown'
import rehype from 'rehype-highlight'
import 'highlight.js/styles/github-dark.css'

function App () {
  const backlLink = 'https://ai-code-reviewer-backend-puo5.onrender.com'
  // const backlLink = 'http://localhost:3000'
  
  useEffect(() => {
    prism.highlightAll()
  })

  const [code, setcode] = useState(`//put your code here...\n`)
  const [res, setres] = useState(``)
  const [load, setload] = useState(false)

  const handleReview = async () => {
    try {
      setload(true)
      const data = await axios.post(`${backlLink}/ai/get-review`, {
        code
      })
      const res = data.data
      setres(res)
    } catch (error) {
      console.error('Error reviewing code:', error)
    } finally {
      setload(false)
    }
  }

  return (
    <div className="w-full h-screen bg-black">
      <main className="h-full w-full p-3 md:p-4 bg-black flex flex-col md:flex-row gap-3 md:gap-4">
        {/* Left Panel - Code Editor */}
        <div className="flex-1 min-w-0 bg-gray-800 rounded-lg flex flex-col relative overflow-hidden">
          {/* Header with Review Button */}
          <div className="flex items-center justify-between p-3 md:p-4 border-b border-gray-700 bg-gray-800/50 backdrop-blur-sm">
            <h2 className="text-white text-sm md:text-base font-semibold">
              Code Editor
            </h2>
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

          {/* Code Editor Container */}
          <div className="flex-1 overflow-auto p-4">
            <Editor
              value={code}
              onValueChange={setcode}
              highlight={code => highlight(code, languages.js, 'javascript')}
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
          <div className="p-3 md:p-4 border-b border-gray-700 bg-gray-900/50 backdrop-blur-sm">
            <h2 className="text-white text-sm md:text-base font-semibold">
              Code Review
            </h2>
          </div>

          {/* Review Content */}
          <div className="flex-1 overflow-y-auto p-4 md:p-6 text-white prose prose-invert max-w-none">
            {res?.result ? (
              <Markdown rehypePlugins={[rehype]}>
                {res.result}
              </Markdown>
            ) : (
              <div className="flex items-center justify-center h-full text-gray-500">
                <p className="text-center text-sm md:text-base">
                  Your code review will appear here
                </p>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  )
}

export default App
