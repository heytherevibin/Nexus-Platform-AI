# Contributing to Nexus Platform AI

Thank you for your interest in contributing to Nexus Platform AI! We welcome contributions from everyone, whether you're fixing a typo, improving documentation, adding examples, or implementing new features.

## Table of Contents

1. [Code of Conduct](#code-of-conduct)
2. [Getting Started](#getting-started)
3. [Development Workflow](#development-workflow)
4. [Pull Request Process](#pull-request-process)
5. [Documentation Guidelines](#documentation-guidelines)
6. [Coding Standards](#coding-standards)
7. [Versioning Guidelines](#versioning-guidelines)

## Code of Conduct

Our project adheres to a Code of Conduct that sets expectations for participation in our community. By participating, you are expected to uphold this code. Please read the [CODE_OF_CONDUCT.md](CODE_OF_CONDUCT.md) for details.

## Getting Started

1. **Fork the repository** on GitHub
2. **Clone your fork** locally
3. **Set up the development environment** following our setup guide
4. **Create a new branch** for your changes

## Development Workflow

### Branching Strategy

We follow a branch naming convention to keep our repository organized:

- `feature/FEATURE-NAME` - For new features
- `bugfix/ISSUE-ID` - For bug fixes
- `docs/TOPIC` - For documentation changes
- `refactor/COMPONENT` - For code refactoring

### Commit Messages

Write clear, concise commit messages that explain the changes you've made. Follow the [Conventional Commits](https://www.conventionalcommits.org/) format:

```text
<type>(<scope>): <description>

[optional body]

[optional footer]
```

Types include:

- `feat`: A new feature
- `fix`: A bug fix
- `docs`: Documentation only changes
- `style`: Changes that do not affect code meaning (formatting, etc)
- `refactor`: Code change that neither fixes a bug nor adds a feature
- `test`: Adding or improving tests
- `chore`: Changes to the build process or auxiliary tools

Example:

```text
feat(risk-analyzer): add support for Go language analysis

Added parsing support for Go language to the risk analyzer component.
This enables change risk analysis for Go repositories.

Closes #123
```

## Pull Request Process

1. **Create a pull request** from your forked repository to our main repository
2. **Fill out the PR template** completely
3. **Ensure all checks pass** (CI/CD, linting, tests)
4. **Request a review** from a maintainer
5. **Address any feedback** from reviewers
6. Once approved, a maintainer will merge your PR

### PR Template

Your pull request description should include:

1. A clear title and description of the changes
2. Reference to any related issues (`Fixes #123`)
3. Screenshots or examples if applicable
4. List of testing performed
5. Any breaking changes or dependencies affected

## Documentation Guidelines

### File Headers

All documentation files should include a standardized header:

```markdown
---
title: Document Title
version: X.Y.Z
date: YYYY-MM-DD
author: Your Name
category: Category
tags: [relevant, tags, here]
description: A brief description of the document's content
---
```

### Documentation Structure

- Use clear headings and subheadings (H1 for title, H2 for major sections, etc.)
- Include a table of contents for longer documents
- Use code blocks with appropriate language syntax highlighting
- Include diagrams where appropriate (using Mermaid.js syntax)

### Tagging System

We use a consistent tagging system across documentation. Common tags include:

- `architecture`, `component`, `infrastructure`, `deployment`
- `guide`, `tutorial`, `reference`, `concept`
- `development`, `operations`, `security`, `performance`

## Coding Standards

### General Guidelines

- Write clean, maintainable code
- Follow the language-specific style guides
- Comment your code appropriately
- Write comprehensive tests

### Code Reviews

During code review, we focus on:

1. Correctness
2. Security considerations
3. Performance implications
4. Maintainability and readability
5. Test coverage

## Versioning Guidelines

We follow [Semantic Versioning](https://semver.org/) (MAJOR.MINOR.PATCH):

- MAJOR: Incompatible API changes
- MINOR: Add functionality in a backward-compatible manner
- PATCH: Backward-compatible bug fixes

### Changelog

All changes should be documented in the [CHANGELOG.md](CHANGELOG.md) file, grouped by version and categorized as:

- Added: New features
- Changed: Changes in existing functionality
- Deprecated: Features that will be removed in upcoming releases
- Removed: Features that were removed
- Fixed: Bug fixes
- Security: Vulnerabilities fixed

## Recognition

Contributors are recognized in our [CONTRIBUTORS.md](CONTRIBUTORS.md) file. We appreciate all your contributions, big or small!
