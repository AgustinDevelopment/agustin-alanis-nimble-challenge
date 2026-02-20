import { apiClient, ApiError } from '../api/client';
import type {
  Candidate,
  Job,
  ApplicationPayload,
  ApplicationResponse,
} from '../types';

/**
 * Fetches candidate data by email
 * GET /api/candidate/get-by-email?email={email}
 */
export async function getCandidateByEmail(
  email: string
): Promise<Candidate> {
  const { data } = await apiClient.get<Candidate>(
    '/api/candidate/get-by-email',
    { params: { email } }
  );
  return data;
}

/**
 * Fetches the list of available job positions
 * GET /api/jobs/get-list
 */
export async function getJobs(): Promise<Job[]> {
  const { data } = await apiClient.get<Job[]>('/api/jobs/get-list');
  return data;
}

/**
 * Submits a job application
 * POST /api/candidate/apply-to-job
 */
export async function applyToJob(
  payload: ApplicationPayload
): Promise<ApplicationResponse> {
  const { data } = await apiClient.post<ApplicationResponse>(
    '/api/candidate/apply-to-job',
    payload
  );

  if (!data?.ok) {
    throw new ApiError('Failed to submit application');
  }

  return data;
}
