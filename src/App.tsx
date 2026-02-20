import { JobList } from './components/JobList';
import './App.css';

const CANDIDATE_EMAIL = import.meta.env.VITE_CANDIDATE_EMAIL;

if (!CANDIDATE_EMAIL) {
  throw new Error(
    'VITE_CANDIDATE_EMAIL is not configured. Please add it to your .env file.'
  );
}

function App() {
  return (
    <div className="app">
      <header className="app-header">
        <h1>Nimble Gravity - Job Application</h1>
      </header>

      <main className="app-main">
        <JobList email={CANDIDATE_EMAIL} />
      </main>

      <footer className="app-footer">
        <p>Nimble Gravity Challenge © 2026</p>
      </footer>
    </div>
  );
}

export default App;
