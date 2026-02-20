import { useState } from 'react';
import type { Job } from '../types';
import type { ApplicationResponse } from '../types';

interface JobItemProps {
  job: Job;
  onApply: (jobId: string, repoUrl: string) => Promise<ApplicationResponse>;
}

function isValidGitHubUrl(url: string): boolean {
  try {
    const parsed = new URL(url);
    return parsed.hostname === 'github.com';
  } catch {
    return false;
  }
}

export function JobItem({ job, onApply }: JobItemProps) {
  const [repoUrl, setRepoUrl] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    const trimmedUrl = repoUrl.trim();

    if (!trimmedUrl) {
      setError('Please enter a repository URL');
      return;
    }

    if (!isValidGitHubUrl(trimmedUrl)) {
      setError('Please enter a valid GitHub repository URL');
      return;
    }

    try {
      setSubmitting(true);
      setError(null);

      await onApply(job.id, trimmedUrl);

      setSuccess(true);
      setRepoUrl('');
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : 'Failed to submit application'
      );
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="job-item">
      <h3 className="job-title">{job.title}</h3>

      <form onSubmit={handleSubmit} className="job-form">
        <input
          type="url"
          value={repoUrl}
          onChange={(e) => setRepoUrl(e.target.value)}
          placeholder="https://github.com/username/repo"
          disabled={submitting || success}
          className="repo-input"
        />

        <button
          type="submit"
          disabled={submitting || success}
          className="submit-button"
        >
          {submitting ? 'Submitting...' : success ? 'Applied ✓' : 'Submit'}
        </button>
      </form>

      {error && <p className="error-text">{error}</p>}
      {success && <p className="success-text">Application submitted successfully!</p>}
    </div>
  );
}
