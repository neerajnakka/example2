import Link from 'next/link'; // ✅ Import Link

export default function About() {
  const techStack = [
    {
      name: 'Next.js 14',
      description: 'React framework with App Router',
      color: 'bg-black text-white',
    },
    {
      name: 'Docker',
      description: 'Container platform',
      color: 'bg-blue-500 text-white',
    },
    {
      name: 'Kubernetes',
      description: 'Container orchestration',
      color: 'bg-blue-600 text-white',
    },
    {
      name: 'GitHub Actions',
      description: 'CI/CD automation',
      color: 'bg-gray-800 text-white',
    },
    {
      name: 'Tailwind CSS',
      description: 'Utility-first CSS',
      color: 'bg-cyan-500 text-white',
    },
    {
      name: 'JavaScript',
      description: 'Programming language',
      color: 'bg-yellow-400 text-black',
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-blue-900 text-white">
      {/* Navigation */}

      <div className="max-w-4xl mx-auto px-4 py-16">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold mb-6">About This Project</h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            A complete DevOps assessment template showcasing Next.js
            containerization and Kubernetes deployment.
          </p>
        </div>

        {/* Content */}
        <div className="space-y-12">
          {/* Intro */}
          <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 border border-white/20">
            <h2 className="text-3xl font-bold mb-4 text-cyan-400">
              Project Overview
            </h2>
            <p className="text-gray-300 text-lg leading-relaxed">
              This project demonstrates a complete DevOps workflow: from
              developing a Next.js application, containerizing it with Docker,
              setting up CI/CD with GitHub Actions, to deploying on Kubernetes
              with proper manifests and health checks.
            </p>
          </div>

          {/* Tech Stack */}
          <div>
            <h2 className="text-3xl font-bold mb-8 text-center">
              Technology Stack
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {techStack.map((tech, index) => (
                <div
                  key={index}
                  className="bg-white/5 backdrop-blur-lg rounded-xl p-6 border border-white/10 hover:border-cyan-400/50 transition-all duration-300 hover:transform hover:scale-105"
                >
                  <span
                    className={`inline-block px-3 py-1 rounded-full text-sm font-medium mb-3 ${tech.color}`}
                  >
                    {tech.name}
                  </span>
                  <p className="text-gray-300">{tech.description}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Features List */}
          <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 border border-white/20">
            <h2 className="text-3xl font-bold mb-6 text-cyan-400">
              Implementation Details
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-xl font-semibold text-white mb-4">
                  Application
                </h3>
                <ul className="space-y-3 text-gray-300">
                  <li className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-cyan-400 rounded-full"></div>
                    <span>Next.js 14 with App Router</span>
                  </li>
                  <li className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-cyan-400 rounded-full"></div>
                    <span>Responsive design with Tailwind CSS</span>
                  </li>
                  <li className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-cyan-400 rounded-full"></div>
                    <span>Modern UI with glass morphism effects</span>
                  </li>
                </ul>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-white mb-4">
                  DevOps
                </h3>
                <ul className="space-y-3 text-gray-300">
                  <li className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-cyan-400 rounded-full"></div>
                    <span>Multi-stage Docker builds</span>
                  </li>
                  <li className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-cyan-400 rounded-full"></div>
                    <span>Kubernetes manifests with health checks</span>
                  </li>
                  <li className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-cyan-400 rounded-full"></div>
                    <span>GitHub Actions CI/CD pipeline</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* Back Button */}
          <div className="text-center">
            {/* ✅ Use <Link> here too */}
            <Link
              href="/"
              className="inline-flex items-center space-x-2 bg-gradient-to-r from-blue-500 to-cyan-500 text-white px-6 py-3 rounded-full font-semibold hover:from-blue-600 hover:to-cyan-600 transition-all transform hover:scale-105"
            >
              <span>←</span>
              <span>Back to Home</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
