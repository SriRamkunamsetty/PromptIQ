# PromptIQ → Google Cloud Migration & Cloud Run Deployment Guide

This guide has been adapted for a **Vite + React** frontend running behind an **Nginx** server, rather than Next.js + Node, to match the current architecture.

## Deployment Architecture

```text
Frontend (Vite SPA)
        ↓
Cloud Run (Nginx Container)
        ↓
Google Services
 ├── Firebase Auth
 ├── Firestore
 ├── Gemini API
 ├── Secret Manager
 ├── Cloud Logging
 ├── Cloud Monitoring
 └── Artifact Registry
```

## Step 1 – 9: Firebase & GCP Setup

Follow the original steps to configure your GCP project (`qiscet-smart-connect`), enable APIs, set up Firebase, create Firestore (with the provided rules), configure Firebase Auth, configure environment variables in Secret Manager.

## Step 10: Production Dockerfile

Because this is a Vite-based single-page application (SPA), the optimal way to serve it in production on Cloud Run is using an **Nginx** alpine image, not Node.

See the configured `Dockerfile` in the root of the project. It builds the static assets and then copies them to an Nginx container.

## Step 11: .dockerignore

See the newly created `.dockerignore` file in the root which prevents `node_modules` and other local development artifacts from being uploaded during the build.

## Step 12 – 20: Cloud Run Deployment

Configure your Artifact Registry, build the Docker image, and run `gcloud run deploy`. Note the provided GitHub action takes care of the deployment phase. 

Cloud run optimization settings mentioned (Min instances 1, Max instances 10, Concurrency 80, Timeout 300) are solid defaults for an Nginx container.

## Step 21: GitHub Actions Auto Deployment

The GitHub Actions workflow has been added to `.github/workflows/deploy.yml`. It handles Docker builds and deployment to Cloud Run upon pushes to the `main` branch.

## Step 23: Production Security Hardening

Because the app operates on Nginx in production rather than `next.config.js`, the equivalent security headers (X-Frame-Options, X-Content-Type-Options, Referrer-Policy) have been added to the production `nginx.conf` config file.

## Environment Variables & Firebase Config Note

Instead of Next.js `.env.local` variables, this Vite project directly initializes Firebase using the `firebase-applet-config.json` file in the root directory. 

To migrate to your new Firebase project (`qiscet-smart-connect`), you **must** update the `firebase-applet-config.json` file with your new application credentials before pushing to GitHub or deploying.

*(Note: Vite expects any browser-facing environment variables inside `.env` to begin with `VITE_`, not `NEXT_PUBLIC_`)*
