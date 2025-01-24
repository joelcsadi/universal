'use client'
import { useState } from 'react'

export default function PromptPage() {
  const [prompt, setPrompt] = useState('')
  const [result, setResult] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      const res = await fetch('http://localhost:8000/prompt', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ prompt })
      })
      const data = await res.json()
      setResult(data.message)
      setPrompt('')
    } catch (error) {
      console.error('Error:', error)
    }
  }

  return (
    <div className="p-4">
      <h1 className="text-2xl mb-4">AI Chatbot</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="Enter your prompt..."
          className="w-full p-2 border rounded text-gray-900"
        />
        <button 
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Submit
        </button>
      </form>
      {result && (
        <div className="mt-4 p-4 bg-gray-100 rounded">
          <h2 className="text-sm uppercase tracking-wide text-gray-600 font-semibold mb-2">Response:</h2>
          <p className="text-gray-900 whitespace-pre-wrap text-lg">{result}</p>
        </div>
      )}
    </div>
  )
}