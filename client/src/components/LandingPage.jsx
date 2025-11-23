import { Link } from 'react-router-dom'

const LandingPage = () => {
  const features = [
    {
      icon: '🤖',
      title: 'AI-Powered Reviews',
      description: 'Get intelligent code reviews powered by Google Gemini AI'
    },
    {
      icon: '💻',
      title: 'Multi-Language Support',
      description: 'Supports JavaScript, TypeScript, Python, Java, CSS, and HTML'
    },
    {
      icon: '🎯',
      title: 'Focused Review Modes',
      description: 'Choose from General, Security, Performance, or Best Practices reviews'
    },
    {
      icon: '📋',
      title: 'Code Templates',
      description: 'Quick start with pre-written code templates for each language'
    },
    {
      icon: '📝',
      title: 'Review History',
      description: 'Save and access your previous code reviews anytime'
    },
    {
      icon: '📤',
      title: 'Export & Share',
      description: 'Export reviews as Markdown files for documentation'
    }
  ]

  const reviewModes = [
    { name: 'General Review', desc: 'Comprehensive code analysis' },
    { name: 'Security Focus', desc: 'Identify vulnerabilities' },
    { name: 'Performance', desc: 'Optimization suggestions' },
    { name: 'Best Practices', desc: 'Code quality improvements' }
  ]

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Navigation */}
      <nav className="border-b border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <div className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
                AI Code Reviewer
              </div>
            </div>
            <Link
              to="/ai"
              className="px-6 py-2 bg-white text-black font-semibold rounded-md hover:bg-gray-200 transition-colors duration-200"
            >
              Get Started
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-32">
          <div className="text-center">
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6">
              <span className="bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 bg-clip-text text-transparent">
                AI-Powered Code Reviews
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-400 mb-8 max-w-3xl mx-auto">
              Get instant, intelligent code reviews powered by Google Gemini AI. 
              Improve code quality, security, and performance with actionable insights.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/ai"
                className="px-8 py-4 bg-white text-black font-semibold rounded-lg hover:bg-gray-200 transition-all duration-200 text-lg shadow-lg hover:shadow-xl transform hover:-translate-y-1 text-center"
              >
                Start Reviewing Code
              </Link>
              <button
                onClick={() => {
                  document.getElementById('features').scrollIntoView({ behavior: 'smooth' })
                }}
                className="px-8 py-4 border-2 border-gray-700 text-white font-semibold rounded-lg hover:border-gray-600 transition-all duration-200 text-lg"
              >
                Learn More
              </button>
            </div>
          </div>

          {/* Code Preview */}
          <div className="mt-16 max-w-4xl mx-auto">
            <div className="bg-gray-900 rounded-lg border border-gray-800 overflow-hidden">
              <div className="bg-gray-800 px-4 py-2 flex items-center gap-2 border-b border-gray-700">
                <div className="w-3 h-3 rounded-full bg-red-500"></div>
                <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                <div className="w-3 h-3 rounded-full bg-green-500"></div>
                <span className="ml-4 text-gray-400 text-sm">example.js</span>
              </div>
              <div className="p-6 font-mono text-sm">
                <div className="text-gray-500">// Your code review will appear here</div>
                <div className="mt-4 text-green-400">✓ Code quality: Excellent</div>
                <div className="text-blue-400">→ Performance: Optimized</div>
                <div className="text-yellow-400">⚠ Security: Minor improvements suggested</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 bg-gray-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Powerful Features
            </h2>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              Everything you need for comprehensive code reviews
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className="bg-gray-900 rounded-lg p-6 border border-gray-800 hover:border-gray-700 transition-all duration-200 hover:transform hover:-translate-y-1"
              >
                <div className="text-4xl mb-4">{feature.icon}</div>
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-gray-400">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Review Modes Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Review Modes
            </h2>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              Choose the type of review that fits your needs
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {reviewModes.map((mode, index) => (
              <div
                key={index}
                className="bg-gradient-to-br from-gray-900 to-gray-950 rounded-lg p-6 border border-gray-800"
              >
                <h3 className="text-lg font-semibold mb-2">{mode.name}</h3>
                <p className="text-gray-400 text-sm">{mode.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Supported Languages */}
      <section className="py-20 bg-gray-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Supported Languages
            </h2>
            <p className="text-xl text-gray-400">
              Review code in multiple programming languages
            </p>
          </div>
          <div className="flex flex-wrap justify-center gap-4">
            {['JavaScript', 'TypeScript', 'Python', 'Java', 'CSS', 'HTML'].map((lang, index) => (
              <div
                key={index}
                className="px-6 py-3 bg-gray-900 rounded-lg border border-gray-800 text-lg font-medium hover:border-gray-700 transition-colors"
              >
                {lang}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Ready to Improve Your Code?
          </h2>
          <p className="text-xl text-gray-400 mb-8">
            Start getting AI-powered code reviews in seconds. No signup required.
          </p>
          <Link
            to="/ai"
            className="inline-block px-10 py-5 bg-gradient-to-r from-blue-500 to-purple-600 text-white font-semibold rounded-lg hover:from-blue-600 hover:to-purple-700 transition-all duration-200 text-lg shadow-lg hover:shadow-xl transform hover:-translate-y-1"
          >
            Get Started Now
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-gray-800 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center text-gray-400">
            <p>© 2024 AI Code Reviewer. Powered by Google Gemini AI.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default LandingPage

