# 🚀 Next.js DevOps Assessment - Complete Guide

## 📋 What You'll Learn

This guide walks through the complete DevOps pipeline I built for containerizing and deploying a Next.js application. No code dumps - just clear explanations of what each component does and how to use them.

## 🎯 Project Architecture Overview

```
Next.js App → Docker Container → GitHub Actions → GHCR → Kubernetes (Minikube)
```

## 1️⃣ LOCAL DEVELOPMENT SETUP

### Prerequisites Installation
```bash
# Install Node.js (for local development)
# Install Docker Desktop
# Install Minikube for local Kubernetes
# Install kubectl CLI tool
```

### Running the Application Locally
```bash
npm install          # Install dependencies
npm run dev         # Start development server
npm run build       # Build for production  
npm start           # Start production server
```
**Access at:** `http://localhost:3000`

## 2️⃣ DOCKER CONTAINERIZATION

### Docker Strategy Explained
I used a **multi-stage build** approach for optimal security and performance:

**Stage 1: Dependencies** - Install only production dependencies  
**Stage 2: Builder** - Build the Next.js application  
**Stage 3: Runner** - Create minimal final image with non-root user

### Key Docker Commands
```bash
# Build the image
docker build -t nextjs-app .

# Run locally
docker run -p 3000:3000 nextjs-app

# Pull my pre-built image
docker pull ghcr.io/neerajnakka/nextjs-app:latest
```

## 3️⃣ CI/CD PIPELINE (GitHub Actions)

### Workflow Steps
1. **Trigger**: On every push to `main` branch
2. **Checkout**: Get the latest code
3. **Setup**: Configure Docker Buildx for better builds
4. **Login**: Authenticate with GitHub Container Registry
5. **Build & Push**: Create and upload Docker image with proper tags

### Smart Image Tagging
- **`latest`**: Always points to most recent stable build
- **SHA tags**: Unique identifier for each commit (`abc123def`)
- **Branch tags**: For testing feature branches

### Required Setup
Create GitHub secret `GHCR_PAT` with `write:packages` permission

## 4️⃣ KUBERNETES DEPLOYMENT

### Minikube Cluster Setup
```bash
# Start your local Kubernetes cluster
minikube start

# Verify everything is running
minikube status
kubectl get nodes
```

### Deployment Configuration
My Kubernetes setup includes:

**High Availability**: 2 replicas - if one fails, traffic routes to the other  
**Resource Management**: CPU and memory limits to prevent resource hogging  
**Health Monitoring**: 
- **Liveness Probe**: Checks if app is running (after 10s)
- **Readiness Probe**: Checks if app can accept traffic (after 5s)

**Image Policy**: `Always` pull to ensure latest version

### Service Exposure
**NodePort Service**: Exposes app on port 30001 across all cluster nodes

### Deployment Commands
```bash
# Apply all Kubernetes configurations
kubectl apply -f k8s/

# Check deployment status
kubectl get deployments
kubectl get pods
kubectl get services
```

## 5️⃣ ACCESSING YOUR APPLICATION

### Method 1: Minikube Service (Easiest)
```bash
# Get direct URL to your application
minikube service nextjs-service --url

# Output: http://192.168.49.2:30001
# Open this URL in your browser
```

### Method 2: Manual NodePort Access
```bash
# Get cluster IP
minikube ip
# Output: 192.168.49.2

# Access at: http://192.168.49.2:30001
```

### Method 3: Port Forwarding (Development)
```bash
# Forward local port to Kubernetes service
kubectl port-forward service/nextjs-service 8080:80
# Access at: http://localhost:8080
```

## 6️⃣ MONITORING & TROUBLESHOOTING

### Verification Commands
```bash
# Check if pods are healthy
kubectl get pods -l app=nextjs

# View application logs
kubectl logs -l app=nextjs

# Check service details
kubectl describe service nextjs-service

# Monitor resource usage
kubectl top pods
```

### Common Issues & Solutions
- **Pods not starting**: Check `kubectl describe pod <pod-name>`
- **Image pull errors**: Verify GHCR permissions
- **Service not accessible**: Ensure Minikube is running
- **Health check failures**: Check application logs

## 🏆 What Makes This Production-Ready

✅ **Security**: Non-root user in containers  
✅ **Reliability**: Multiple replicas with health checks  
✅ **Efficiency**: Multi-stage Docker builds  
✅ **Automation**: Full CI/CD pipeline  
✅ **Monitoring**: Built-in health probes  
✅ **Resource Management**: CPU/Memory limits  
✅ **Proper Tagging**: Versioned container images  

## 🚀 Quick Deployment Summary

1. **Start Minikube**: `minikube start`
2. **Deploy Application**: `kubectl apply -f k8s/`
3. **Get Access URL**: `minikube service nextjs-service --url`
4. **Monitor**: `kubectl get pods -l app=nextjs`

Your Next.js application is now running in a production-like Kubernetes environment with automated deployments, health monitoring, and proper resource management!
