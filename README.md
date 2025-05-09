# Nexus Platform AI

## Overview

Nexus Platform AI is a comprehensive platform intelligence system designed to provide predictive change risk analysis for modern software systems. It connects previously siloed data sources and applies machine learning to predict the potential impact of changes before deployment, transforming reactive incident management into proactive risk mitigation.

## Key Features

- **Predictive Risk Analysis**: Identify potential issues before they impact production
- **Integration with Development Workflows**: Seamlessly connects with Git repositories and CI/CD pipelines
- **Cross-Platform Compatibility**: Works across multi-cloud and on-premises environments
- **Intelligent Dashboard**: Modern React-based UI with comprehensive analytics and insights

## Technology Stack

- **Frontend**: React 18, TypeScript, Tailwind CSS
- **State Management**: React Context API, React Query
- **UI Components**: Radix UI, Material UI, custom components
- **Routing**: React Router v6
- **Authentication**: Multiple providers including Auth0 and Firebase
- **Visualization**: ApexCharts, React Leaflet
- **Form Handling**: Formik, Yup
- **Build Tools**: Vite, TypeScript, ESLint, Prettier

## Getting Started

### Prerequisites

- Node.js (v18+)
- npm or yarn

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/heytherevibin/Nexus-Platform-AI.git
   cd Nexus-Platform-AI
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Create environment variables file:

   ```bash
   cp .env.example .env
   ```

4. Start the development server:

   ```bash
   npm run dev
   ```

The application will be available at `http://localhost:5173/`.

### Build

To build the project for production:

```bash
npm run build
```

## Project Structure

```asci
src/
├── components/       # Reusable UI components
├── config/           # Application configuration
├── layouts/          # Layout components
├── pages/            # Page components
├── providers/        # Context providers
├── routing/          # Routing configuration
├── services/         # API services
├── styles/           # Global styles
├── types/            # TypeScript type definitions
├── utils/            # Utility functions
└── App.tsx           # Main application component
```

## Core Capabilities

1. **Change Intelligence**
   - Analyzes code diffs for complexity and risk patterns
   - Evaluates infrastructure-as-code modifications
   - Identifies dependency updates and potential ripple effects

2. **Integration & Infrastructure**
   - Connects with Git repositories and CI/CD pipelines
   - Works across multi-cloud and on-premises environments
   - Provides real-time analytics and insights

3. **Predictive Analysis**
   - Uses machine learning to forecast potential issues
   - Identifies patterns from historical data
   - Provides actionable recommendations

## Documentation

For more detailed documentation, refer to the [`/docs`](docs/) directory:

- [Concept Documents](docs/concept/)
- [Technical Specifications](docs/technical/)
- [Development Documentation](docs/development/)

## Contributing

Please read [CONTRIBUTING.md](CONTRIBUTING.md) for details on our code of conduct and the process for submitting pull requests.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.