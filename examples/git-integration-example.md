---
title: Nexus Platform AI - Git Integration Example
version: 1.0.0
date: 2025-05-08
author: Nexus Team
category: Examples
tags: [git, integration, webhook, implementation]
description: Sample implementation showing how to integrate Nexus Platform AI with Git repositories.
---

## Git Repository Integration Example

This example demonstrates how to integrate Nexus Platform AI with a GitHub repository to analyze pull requests for potential risks.

## Setup Steps

### 1. Create a GitHub App

1. Go to your GitHub organization settings
2. Navigate to GitHub Apps
3. Create a new GitHub App with the following permissions:
   - Repository permissions:
     - Contents: Read
     - Pull requests: Read & Write
     - Code: Read
     - Webhooks: Read & Write
4. Generate and save a private key
5. Install the app to your repositories

### 2. Configure Nexus Platform AI

```json
{
  "integrations": {
    "github": {
      "appId": "YOUR_APP_ID",
      "privateKeyPath": "/path/to/private-key.pem",
      "webhookSecret": "YOUR_WEBHOOK_SECRET"
    }
  },
  "analysis": {
    "riskThresholds": {
      "low": 0.3,
      "medium": 0.6,
      "high": 0.8
    },
    "scope": ["code", "dependencies", "configuration"],
    "notifyOn": ["medium", "high"]
  }
}
```

### 3. Deploy the Webhook Handler

Deploy the webhook handler service that will receive GitHub events:

```bash
docker run -p 3000:3000 -v /path/to/config.json:/app/config.json nexus-platform-ai/webhook-handler
```

## Example Workflow

1. Developer creates a pull request
2. GitHub sends a webhook event to Nexus Platform AI
3. Nexus analyzes the changes for risk
4. Nexus posts a comment on the PR with risk assessment
5. If high-risk changes are detected, Nexus adds a label "high-risk"

## Sample Assessment Output

```markdown
## Nexus Platform AI Risk Assessment

### Overall Risk: Medium (0.65)

#### Key Findings:
- **High Risk**: Authentication middleware changes could affect 3 dependent services
- **Medium Risk**: Database query optimization introduces potential performance regression
- **Low Risk**: UI component changes are isolated with minimal dependencies

#### Recommended Actions:
- Add integration tests for the authentication flow
- Include performance benchmarks in CI pipeline
- Consider a canary deployment strategy

[View Full Report](https://nexus.example.com/reports/pr-123)
```

## Integration Code

Sample webhook handler code:

```javascript
const express = require("express");
const { App } = require("@octokit/app");
const { createNodeMiddleware } = require("@octokit/webhooks");
const NexusAnalyzer = require("./nexus-analyzer");

const app = express();
const port = 3000;

// Initialize GitHub App
const githubApp = new App({
  appId: process.env.APP_ID,
  privateKey: process.env.PRIVATE_KEY,
  webhooks: {
    secret: process.env.WEBHOOK_SECRET
  }
});

// Initialize Nexus Analyzer
const analyzer = new NexusAnalyzer();

// Handle pull request events
githubApp.webhooks.on("pull_request.opened", async ({ octokit, payload }) => {
  const repo = payload.repository.name;
  const owner = payload.repository.owner.login;
  const prNumber = payload.number;
  
  // Get PR diff
  const diff = await octokit.rest.pulls.get({
    owner,
    repo,
    pull_number: prNumber,
    mediaType: { format: "diff" }
  });
  
  // Analyze the changes
  const analysis = await analyzer.analyzeChanges(diff.data);
  
  // Post comment with assessment
  await octokit.rest.issues.createComment({
    owner,
    repo,
    issue_number: prNumber,
    body: formatAssessment(analysis)
  });
  
  // Add risk label if needed
  if (analysis.overallRisk >= 0.8) {
    await octokit.rest.issues.addLabels({
      owner,
      repo,
      issue_number: prNumber,
      labels: ["high-risk"]
    });
  }
});

// Create middleware
const middleware = createNodeMiddleware(githubApp.webhooks, { path: "/webhook" });

// Use middleware
app.use(middleware);

// Start server
app.listen(port, () => {
  console.log(`Webhook handler listening at http://localhost:${port}`);
});

function formatAssessment(analysis) {
  // Format the assessment as a Markdown comment
  // ...implementation...
}
```

## Best Practices

1. **Store secrets securely** - Use environment variables or secret management services
2. **Implement retry logic** - Handle GitHub API rate limits and temporary failures
3. **Add monitoring** - Track webhook processing success rates and analysis times
4. **Cache results** - Avoid redundant analysis for unchanged files
5. **Use signed webhooks** - Verify webhook signatures to prevent spoofing
