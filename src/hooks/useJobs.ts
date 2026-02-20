import { useState, useEffect } from 'react';
import {
  getCandidateByEmail,
  getJobs,
  applyToJob,
} from '../services/jobs.service';
import type { Candidate, Job } from '../types';
import { ApiError } from '../api/client';

export function useJobs(email: string) {
  const [candidate, setCandidate] = useState<Candidate | null>(null);
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;

    async function fetchData() {
      try {
        setLoading(true);
        setError(null);

        const [candidateData, jobsData] = await Promise.all([
          getCandidateByEmail(email),
          getJobs(),
        ]);

        if (!isMounted) return;

        setCandidate(candidateData);
        setJobs(jobsData);
      } catch (err) {
        if (!isMounted) return;

        const message =
          err instanceof ApiError
            ? err.message
            : 'Failed to load data';

        setError(message);
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    }

    fetchData();

    return () => {
      isMounted = false;
    };
  }, [email]);

  async function handleApply(jobId: string, repoUrl: string) {
    if (!candidate) {
      throw new Error('Candidate data not loaded');
    }

    try {
      return await applyToJob({
        uuid: candidate.uuid,
        jobId,
        candidateId: candidate.candidateId,
        repoUrl,
      });
    } catch (err) {
      const message =
        err instanceof ApiError
          ? err.message
          : 'Failed to apply to job';

      throw new Error(message);
    }
  }

  return {
    candidate,
    jobs,
    loading,
    error,
    handleApply,
  };
}
