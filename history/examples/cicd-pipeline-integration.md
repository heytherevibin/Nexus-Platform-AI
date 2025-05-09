---
title: CI/CD Pipeline Integration with Nexus Platform AI
version: 1.0.0
date: 2025-05-08
author: Nexus Team
category: Examples
tags: [cicd, integration, jenkins, github-actions, gitlab-ci]
description: Example implementation for integrating Nexus Platform AI with various CI/CD pipelines to enable predictive risk analysis during deployment workflows.
---

## Overview

Nexus Platform AI can integrate with your CI/CD pipelines to:

1. Analyze proposed changes before deployment
2. Calculate risk scores for deployments
3. Provide automated go/no-go decisions based on risk thresholds
4. Suggest targeted testing strategies
5. Recommend optimal deployment approaches

## Supported CI/CD Platforms

- Jenkins
- GitHub Actions
- GitLab CI
- Azure DevOps Pipelines
- CircleCI

## Integration Patterns

### 1. Pre-Deployment Risk Analysis

This pattern runs Nexus risk analysis before deployment and can optionally block high-risk deployments.

### 2. Progressive Deployment Gates

This pattern uses Nexus to determine how broadly to roll out changes (canary percentage, etc.)

### 3. Post-Deployment Validation

This pattern uses Nexus to monitor system behavior after deployment and automate rollbacks if needed.

## Example: Jenkins Integration

### Jenkins Setup

1. Install the Nexus Platform AI Jenkins plugin:

   ```bash
   jenkins-plugin-cli --plugins nexus-platform-ai:1.0.0
   ```

2. Configure the plugin with your Nexus API credentials:

   Navigate to **Manage Jenkins** > **Configure System** > **Nexus Platform AI** and enter:

   - API Endpoint: `https://api.nexusplatform.ai`
   - API Key: Your Nexus Platform API key
   - Risk Threshold: Medium (or your preferred threshold)

### Pipeline Example

```groovy
pipeline {
    agent any
    
    stages {
        stage('Build') {
            steps {
                sh 'mvn clean package'
            }
        }
        
        stage('Nexus Risk Analysis') {
            steps {
                // Run Nexus risk analysis
                nexusRiskAnalysis()
            }
        }
        
        stage('Deploy - Low Risk') {
            when {
                // Only run this stage if risk is LOW
                expression { return env.NEXUS_RISK_LEVEL == 'LOW' }
            }
            steps {
                sh 'kubectl apply -f kubernetes/deployment.yaml'
            }
        }
        
        stage('Deploy - Medium Risk') {
            when {
                // Only run this stage if risk is MEDIUM
                expression { return env.NEXUS_RISK_LEVEL == 'MEDIUM' }
            }
            steps {
                // Deploy with canary strategy for medium risk
                sh 'kubectl apply -f kubernetes/canary-deployment.yaml'
                
                // Run additional targeted tests
                sh './run-targeted-tests.sh'
                
                // If tests pass, complete the rollout
                sh 'kubectl apply -f kubernetes/deployment.yaml'
            }
        }
        
        stage('Deploy - High Risk') {
            when {
                // Only run this stage if risk is HIGH
                expression { return env.NEXUS_RISK_LEVEL == 'HIGH' }
            }
            steps {
                // For high risk, require manual approval
                input "Nexus detected HIGH deployment risk. Proceed anyway?"
                
                // Deploy with extremely cautious strategy
                sh 'kubectl apply -f kubernetes/minimal-canary-deployment.yaml'
                
                // Run comprehensive test suite
                sh './run-comprehensive-tests.sh'
                
                // Manual verification step
                input "Verify canary deployment health before proceeding"
                
                // If all is well, complete the rollout
                sh 'kubectl apply -f kubernetes/deployment.yaml'
            }
        }
    }
    
    post {
        always {
            // Send deployment results back to Nexus for learning
            nexusDeploymentFeedback()
        }
    }
}
```

## Example: GitHub Actions Integration

### GitHub Actions Setup

1. Add the Nexus Platform AI GitHub Action to your repository:
   - Go to your repo settings
   - Add `NEXUS_API_KEY` as a repository secret

### Workflow Example

```yaml
name: Build and Deploy with Nexus Analysis

on:
  push:
    branches: [ main ]
  pull_request:
    branches: [ main ]

jobs:
  build:
    runs-on: ubuntu-latest
    
    steps:
    - uses: actions/checkout@v3
    
    - name: Set up Node.js
      uses: actions/setup-node@v3
      with:
        node-version: '16'
    
    - name: Install dependencies
      run: npm ci
    
    - name: Build
      run: npm run build
    
    - name: Nexus Risk Analysis
      uses: nexus-platform/risk-analysis-action@v1
      with:
        api-key: ${{ secrets.NEXUS_API_KEY }}
      id: risk-analysis
    
    - name: Deploy (Low Risk)
      if: steps.risk-analysis.outputs.risk-level == 'LOW'
      run: |
        echo "Deploying with standard strategy"
        npm run deploy
    
    - name: Deploy (Medium Risk)
      if: steps.risk-analysis.outputs.risk-level == 'MEDIUM'
      run: |
        echo "Deploying with canary strategy"
        npm run deploy-canary
        npm run run-targeted-tests
        npm run complete-deployment
    
    - name: Deploy (High Risk)
      if: steps.risk-analysis.outputs.risk-level == 'HIGH'
      uses: trstringer/manual-approval@v1
      with:
        secret: ${{ secrets.GITHUB_TOKEN }}
        approvers: repo-owner,tech-lead
        minimum-approvals: 2
        message: "Nexus detected HIGH risk! Approve to deploy anyway."
```

## Example: GitLab CI Integration

### GitLab CI Setup

1. Add the Nexus API key to your GitLab CI/CD variables:
   - Go to Settings > CI/CD > Variables
   - Add `NEXUS_API_KEY` as a masked, protected variable

### .gitlab-ci.yml Example

```yaml
stages:
  - build
  - analyze
  - deploy

variables:
  NEXUS_API_ENDPOINT: "https://api.nexusplatform.ai"

build:
  stage: build
  script:
    - echo "Building application..."
    - docker build -t myapp:$CI_COMMIT_SHA .
  artifacts:
    paths:
      - dist/

nexus_analysis:
  stage: analyze
  script:
    - echo "Running Nexus Platform AI risk analysis..."
    - |
      RISK_LEVEL=$(curl -s -X POST "$NEXUS_API_ENDPOINT/analyze" \
        -H "Authorization: Bearer $NEXUS_API_KEY" \
        -H "Content-Type: application/json" \
        -d "{\"repo\": \"$CI_PROJECT_PATH\", \"commit\": \"$CI_COMMIT_SHA\"}" \
        | jq -r '.riskLevel')
    - echo "Risk level: $RISK_LEVEL"
    - echo "RISK_LEVEL=$RISK_LEVEL" >> deploy.env
  artifacts:
    reports:
      dotenv: deploy.env

deploy_low_risk:
  stage: deploy
  script:
    - echo "Deploying with standard strategy..."
    - kubectl apply -f kubernetes/deployment.yaml
  rules:
    - if: $RISK_LEVEL == "LOW"

deploy_medium_risk:
  stage: deploy
  script:
    - echo "Deploying with canary strategy..."
    - kubectl apply -f kubernetes/canary-deployment.yaml
    - ./run-targeted-tests.sh
    - kubectl apply -f kubernetes/deployment.yaml
  rules:
    - if: $RISK_LEVEL == "MEDIUM"

deploy_high_risk:
  stage: deploy
  when: manual
  script:
    - echo "CAUTION: Deploying high-risk changes..."
    - kubectl apply -f kubernetes/minimal-canary-deployment.yaml
    - ./run-comprehensive-tests.sh
    - kubectl apply -f kubernetes/deployment.yaml
  rules:
    - if: $RISK_LEVEL == "HIGH"
```

## Best Practices

1. **Define appropriate risk thresholds** for your organization
2. **Use progressive deployment strategies** for higher-risk changes
3. **Implement automatic rollbacks** for failed deployments
4. **Provide feedback** to Nexus about deployment outcomes
5. **Customize risk analysis** to your specific application domains

## Conclusion

Integrating Nexus Platform AI with your CI/CD pipeline creates an intelligent deployment process that learns from past experiences. This integration enables your organization to deploy with confidence, avoiding the pitfalls of high-risk changes while maintaining deployment velocity.
