import { useJobs } from '../hooks/useJobs';
import { JobItem } from './JobItem';
import { ErrorMessage } from './ErrorMessage';

interface JobListProps {
  email: string;
}

export function JobList({ email }: JobListProps) {
  const { candidate, jobs, loading, error, handleApply } = useJobs(email);

  if (loading) {
    return (
      <div className="loading-container">
        <p>Loading positions...</p>
      </div>
    );
  }

  if (error) {
    return <ErrorMessage message={error} />;
  }

  if (!candidate) {
    return null;
  }

  if (jobs.length === 0) {
    return (
      <div className="empty-state">
        <p>No positions available at the moment.</p>
      </div>
    );
  }

  return (
    <section className="job-list">
      <header className="candidate-info">
        <h2>Welcome, {candidate.firstName} {candidate.lastName}!</h2>
        <p className="candidate-email">{candidate.email}</p>
      </header>

      <div className="jobs-container">
        {jobs.map((job) => (
          <JobItem key={job.id} job={job} onApply={handleApply} />
        ))}
      </div>
    </section>
  );
}
