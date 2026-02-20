# Nimble Gravity Job Application

React application for submitting job applications to Nimble Gravity positions.

## Setup

Install dependencies:
```bash
npm install
```

Create a `.env` file based on `.env.example` and add your credentials:
```env
VITE_API_BASE_URL=https://your-api-base-url.com
VITE_CANDIDATE_EMAIL=your.email@example.com
```

Run the development server:
```bash
npm run dev
```

## Tech Stack

- React 19 with TypeScript
- Vite for build tooling
- Axios for API calls
- Custom hooks for state management

## Project Structure

```
src/
├── api/          # Axios configuration and interceptors
├── components/   # React components (JobList, JobItem, ErrorMessage)
├── hooks/        # Custom hooks (useJobs)
├── services/     # API service functions
├── types/        # TypeScript type definitions
└── config/       # Environment configuration
```

## Development

The application retrieves available slots from the API and allows users to submit the GitHub repository URL to request one. Input validation for GitHub URLs is handled client-side, and error statuses are displayed in the user interface when necessary.

Available commands:
- `npm run dev` - Start dev server
- `npm run build` - Build for production
- `npm run lint` - Run linter

