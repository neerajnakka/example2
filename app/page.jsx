'use client';
import { useState } from 'react';
import Link from 'next/link';

export default function Home() {
  const [copiedCommand, setCopiedCommand] = useState('');

  const copyToClipboard = async (text) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedCommand(text);
      setTimeout(() => setCopiedCommand(''), 2000);
    } catch (err) {
      console.error('Failed to copy: ', err);
    }
  };

  const features = [
    {
      title: 'Next.js 14',
      description: 'App Router, Server Components, Turbopack',
    },
    {
      title: 'Docker Ready',
      description: 'Multi-stage builds, optimized layers',
    },
    {
      title: 'Kubernetes',
      description: 'Deployments, Services, Health Checks',
    },
    {
      title: 'CI/CD Pipeline',
      description: 'GitHub Actions, GHCR, Auto-deploy',
    },
  ];

  const commands = [
    { text: 'npm run dev', description: 'Start local development server' },
    {
      text: 'docker build -t nextjs-app .',
      description: 'Build production image',
    },
    { text: 'kubectl apply -f k8s/', description: 'Deploy to cluster' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-indigo-950 text-white overflow-x-hidden">
      {/* Background Animation */}
      <BackgroundOrbs />

      <div className="relative z-10 flex flex-col min-h-screen max-w-7xl mx-auto px-4 sm:px-6">
        {/* Navigation */}

        {/* Hero Section */}
        <Hero />

        {/* Features Grid */}
        <Features features={features} />

        {/* Commands Section */}
        <Commands
          commands={commands}
          copiedCommand={copiedCommand}
          onCopy={copyToClipboard}
        />

        {/* Status Section */}
        <Status />

        {/* Footer */}
        <Footer />
      </div>
    </div>
  );
}

// Background Orbs Component
function BackgroundOrbs() {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden">
      <div className="absolute top-1/4 -left-1/4 w-[600px] h-[600px] bg-indigo-700 rounded-full blur-[120px] opacity-30 animate-pulse"></div>
      <div className="absolute top-1/3 -right-1/4 w-[500px] h-[500px] bg-cyan-600 rounded-full blur-[100px] opacity-25 animate-pulse animation-delay-2000"></div>
      <div className="absolute bottom-1/4 left-1/3 w-[400px] h-[400px] bg-rose-600 rounded-full blur-[100px] opacity-25 animate-pulse animation-delay-4000"></div>
    </div>
  );
}

// NavLink Component
function NavLink({ href, label, isActive }) {
  return (
    <Link
      href={href}
      className={`px-4 py-2 rounded-lg transition-all duration-200 ${
        isActive
          ? 'text-white bg-purple-700/30'
          : 'text-purple-300 hover:text-white hover:bg-purple-700/20'
      }`}
      aria-current={isActive ? 'page' : undefined}
    >
      {label}
    </Link>
  );
}

// Hero Section
function Hero() {
  return (
    <section className="text-center max-w-4xl mx-auto mb-20 animate-fade-slide-up">
      <span className="inline-block px-4 py-1.5 mb-6 text-sm font-semibold bg-purple-700/30 text-purple-300 rounded-full border border-purple-700/50 tracking-wide select-none">
        DevOps-Ready Next.js Template
      </span>
      <h1 className="text-5xl md:text-6xl font-extrabold tracking-tight mb-6 leading-tight">
        Ship Fast.{' '}
        <span className="bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
          Scale Smart.
        </span>
      </h1>
      <p className="text-lg md:text-xl text-purple-300 max-w-3xl mx-auto mb-12 leading-relaxed">
        A production-grade template with Docker, Kubernetes, and GitHub Actions
        — ready for CI/CD from day one.
      </p>
      <div className="flex flex-col sm:flex-row justify-center gap-6">
        <button
          className="btn-primary focus-visible:ring-4 focus-visible:ring-purple-400 px-8 py-3"
          aria-label="Get Started"
        >
          Get Started
        </button>
        <a
          href="https://github.com/your-repo"
          target="_blank"
          rel="noopener noreferrer"
          className="btn-secondary focus-visible:ring-4 focus-visible:ring-purple-400 px-8 py-3"
          aria-label="View on GitHub"
        >
          View on GitHub
        </a>
      </div>
    </section>
  );
}

// Features Section
function Features({ features }) {
  return (
    <section className="max-w-6xl mx-auto mb-20">
      <header className="text-center mb-16">
        <h2 className="text-4xl font-extrabold mb-4">End-to-End DevOps</h2>
        <p className="text-purple-300 text-lg">
          From local development to cloud deployment — everything you need in
          one .
        </p>
      </header>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {features.map(({ title, description }, i) => (
          <article key={i} className="card p-6">
            <h3 className="text-xl font-semibold mb-2">{title}</h3>
            <p className="text-purple-300 text-sm">{description}</p>
          </article>
        ))}
      </div>
    </section>
  );
}

// Commands Section
function Commands({ commands, copiedCommand, onCopy }) {
  return (
    <section className="max-w-3xl mx-auto mb-20">
      <header className="text-center mb-12">
        <h2 className="text-3xl font-extrabold mb-3">One-Click Deployment</h2>
        <p className="text-purple-300 text-lg">
          Copy and run these commands to deploy anywhere
        </p>
      </header>
      <div className="space-y-5">
        {commands.map(({ text, description }, i) => (
          <div
            key={i}
            className="group card p-5 flex justify-between items-center"
          >
            <div>
              <code className="block text-green-400 font-mono text-base sm:text-lg select-all">
                $ {text}
              </code>
              <p className="text-purple-300 text-sm mt-1">{description}</p>
            </div>
            <button
              onClick={() => onCopy(text)}
              className="flex items-center gap-2 px-4 py-2 bg-purple-700 hover:bg-purple-600 text-white rounded-lg text-sm font-medium transition-colors"
            >
              {copiedCommand === text ? 'Copied!' : 'Copy'}
            </button>
          </div>
        ))}
      </div>
    </section>
  );
}

// Status Section
function Status() {
  return (
    <section className="max-w-6xl mx-auto mb-20">
      <header className="text-center mb-12">
        <h2 className="text-3xl font-extrabold">System Status</h2>
        <p className="text-purple-300 mt-2 text-lg">All services operational</p>
      </header>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <StatusCard
          title="Next.js App"
          status="Operational"
          color="emerald"
          description="v14.2.3 • App Router"
        />
        <StatusCard
          title="Docker"
          status="Ready"
          color="blue"
          description="Multi-stage build • 128MB"
        />
        <StatusCard
          title="Kubernetes"
          status="Deployed"
          color="indigo"
          description="3 pods • 1 service"
        />
      </div>
    </section>
  );
}

// Status Card Component
function StatusCard({ title, status, color, description }) {
  const colorMap = {
    emerald: 'bg-emerald-500',
    blue: 'bg-blue-500',
    indigo: 'bg-indigo-500',
  };

  return (
    <article className="card p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-semibold text-lg">{title}</h3>
        <div className="flex items-center space-x-2">
          <span
            className={`w-2 h-2 rounded-full ${colorMap[color]} animate-pulse`}
          ></span>
          <span className="font-medium text-sm text-emerald-400">{status}</span>
        </div>
      </div>
      <p className="text-purple-300 text-sm">{description}</p>
    </article>
  );
}

// Footer Component
function Footer() {
  return (
    <footer className="py-10 border-t border-purple-700/40 bg-gray-900/80 backdrop-blur-md">
      <div className="max-w-6xl mx-auto text-center text-purple-300 select-none">
        <p className="mb-2">
          Built with ❤️ for DevOps Engineers • Next.js + Docker + Kubernetes
        </p>
        <p className="text-sm">
          Full CI/CD pipeline with GitHub Actions • Ready for production
        </p>
      </div>
    </footer>
  );
}
