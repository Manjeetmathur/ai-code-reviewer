import React, { useState, useEffect } from 'react';
import Editor from 'react-simple-code-editor';
import { highlight, languages } from 'prismjs/components/prism-core';
import 'prismjs/components/prism-clike';
import 'prismjs/components/prism-javascript';
import 'prismjs/themes/prism.css';
import prism from 'prismjs'
import axios from 'axios'
import Markdown from 'react-markdown'
import rehype from 'rehype-highlight'
import "highlight.js/styles/github-dark.css"



function App() {

  useEffect(() => {
    prism.highlightAll()
  })

  const [code, setcode] = useState(`//put your code here...`)
  const [res, setres] = useState(``)
  const [load, setload] = useState(false)

  const review = async () => {
    try {
      setload(true)
      const data = await axios.post('https://ai-code-reviewer-backend-puo5.onrender.com/ai/get-review', {
        code
      })
      const res = data.data
      setres(res)
    } catch (error) {

    } finally {
      setload(false)
    }
  }
  console.log(res)

  return (
    <div className="">
      <main className='h-[100vh] p-2 bg-black gap-1'>
        <div className="left bg-gray-800  rounded-lg relative overflow-auto">
          <div className="code p-4 pt-18 text-xl">
            <Editor
              value={code}
              onValueChange={setcode}
              highlight={code => highlight(code, languages.js, 'javascript')}
              padding={16}
              style={{  fontFamily: '"Fira code", "Fira Mono", monospace',
                fontSize: 17,
              
              }}
              className='border-2 border-white rounded-lg'
            />


          </div>
         
            {load ? 
            <div className="p-3 ml-6 fixed top-8 left-[35px] rounded-full bg-transparent border-2 border-white bg-gradient-to-bl from-gray-600 via-white to-gray-400 animate-spin"/> : 
            <button className='border-2 fixed top-8 left-[35px]  bg-white border-white px-2 font-bold rounded-md hover:bg-gray-300 cursor-pointer py-[2px] text-blue-950'
              onClick={review}
            > Review</button>}
          </div>

        
        <div className="right bg-gray-900 rounded-lg overflow-y-auto p-4 text-white">
             <Markdown rehypePlugins={[rehype]} >
             {res.result}
             </Markdown>
        </div>
      </main>
    </div>
  )
}



export default App
