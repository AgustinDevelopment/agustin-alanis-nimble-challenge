// Global type definitions based on API responses

/**
 * Candidate data from GET /api/candidate/get-by-email
 */
export interface Candidate {
  uuid: string;
  candidateId: string;
  applicationId: string;
  firstName: string;
  lastName: string;
  email: string;
}

/**
 * Job position from GET /api/jobs/get-list
 */
export interface Job {
  id: string;
  title: string;
}

/**
 * Payload for POST /api/candidate/apply-to-job
 */
export interface ApplicationPayload {
  uuid: string;
  jobId: string;
  candidateId: string;
  applicationId: string;
  repoUrl: string;
}

/**
 * Response from POST /api/candidate/apply-to-job
 */
export interface ApplicationResponse {
  ok: boolean;
}

/**
 * API error response
 */
export interface ApiError {
  message: string;
  statusCode?: number;
}
