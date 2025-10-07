'use client';
import { useState } from 'react';
import Link from 'next/link'; // ✅ Import Link

export default function Deploy() {
  const [activeTab, setActiveTab] = useState('docker');

  const deploymentSteps = {
    docker: [
      {
        step: 1,
        command: 'docker build -t nextjs-app .',
        description: 'Build Docker image',
      },
      {
        step: 2,
        command: 'docker run -p 3000:3000 nextjs-app',
        description: 'Run container locally',
      },
      {
        step: 3,
        command: 'docker tag nextjs-app ghcr.io/neerajnakka/nextjs-app:latest',
        description: 'Tag for GHCR',
      },
      {
        step: 4,
        command: 'docker push ghcr.io/neerajnakka/nextjs-app:latest',
        description: 'Push to registry',
      },
    ],
    kubernetes: [
      {
        step: 1,
        command: 'kubectl apply -f k8s/',
        description: 'Apply all manifests',
      },
      { step: 2, command: 'kubectl get pods', description: 'Check pod status' },
      {
        step: 3,
        command: 'kubectl get services',
        description: 'Check service exposure',
      },
      {
        step: 4,
        command: 'minikube service nextjs-service',
        description: 'Access application',
      },
    ],
    github: [
      { step: 1, description: 'Push code to main branch' },
      { step: 2, description: 'GitHub Actions builds image automatically' },
      { step: 3, description: 'Image pushed to GitHub Container Registry' },
      { step: 4, description: 'Ready for deployment to Kubernetes' },
    ],
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 to-purple-900 text-white">
      <div className="max-w-6xl mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold mb-4">Deployment Guide</h1>
          <p className="text-xl text-gray-300">
            Step-by-step instructions to deploy this application
          </p>
        </div>

        {/* Tabs */}
        <div className="flex justify-center mb-8">
          <div className="bg-gray-800 rounded-lg p-1 flex space-x-1">
            {['docker', 'kubernetes', 'github'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-6 py-2 rounded-md capitalize transition-all ${
                  activeTab === tab
                    ? 'bg-purple-600 text-white'
                    : 'text-gray-300 hover:text-white'
                }`}
              >
                {tab === 'github' ? 'GitHub Actions' : tab}
              </button>
            ))}
          </div>
        </div>

        {/* Content */}
        <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 border border-white/20">
          <div className="grid md:grid-cols-2 gap-8">
            {/* Steps */}
            <div>
              <h2 className="text-2xl font-bold mb-6 text-purple-400 capitalize">
                {activeTab === 'github'
                  ? 'CI/CD Pipeline'
                  : `${activeTab} Deployment`}{' '}
                Steps
              </h2>
              <div className="space-y-4">
                {deploymentSteps[activeTab].map((item) => (
                  <div
                    key={item.step}
                    className="flex items-start space-x-4 bg-gray-900 rounded-lg p-4 border border-gray-700"
                  >
                    <div className="w-8 h-8 bg-purple-600 rounded-full flex items-center justify-center text-white font-bold text-sm">
                      {item.step}
                    </div>
                    <div>
                      {item.command && (
                        <code className="text-green-400 font-mono text-sm block mb-1">
                          {item.command}
                        </code>
                      )}
                      <p className="text-gray-300">{item.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Explanation */}
            <div>
              <h2 className="text-2xl font-bold mb-6 text-purple-400">
                Explanation
              </h2>
              {activeTab === 'docker' && (
                <div className="text-gray-300 space-y-4">
                  <p>Docker containerization provides:</p>
                  <ul className="space-y-2">
                    <li>
                      • Consistent environments across development and
                      production
                    </li>
                    <li>• Easy dependency management</li>
                    <li>• Scalable deployment options</li>
                    <li>• Version control for your application environment</li>
                  </ul>
                </div>
              )}
              {activeTab === 'kubernetes' && (
                <div className="text-gray-300 space-y-4">
                  <p>Kubernetes orchestration offers:</p>
                  <ul className="space-y-2">
                    <li>• Automatic scaling and load balancing</li>
                    <li>• Self-healing capabilities</li>
                    <li>• Rolling updates and rollbacks</li>
                    <li>• Service discovery and load balancing</li>
                  </ul>
                </div>
              )}
              {activeTab === 'github' && (
                <div className="text-gray-300 space-y-4">
                  <p>GitHub Actions provides:</p>
                  <ul className="space-y-2">
                    <li>• Automated build and test workflows</li>
                    <li>• Secure container registry with GHCR</li>
                    <li>• Automatic deployment triggers</li>
                    <li>• Integrated security scanning</li>
                  </ul>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="text-center mt-8">
          {/* ✅ Use <Link> here too */}
          <Link
            href="/"
            className="text-purple-400 hover:text-purple-300 transition-colors"
          >
            ← Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
}
