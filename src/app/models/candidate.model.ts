import { Submission } from "./submission.model";

export interface Candidate {
    candidate_id: string;
    email: string;
    mobile_number: string;
    full_name: string;
    college_name: string;
    year_of_passing: string;
    current_status: string;
    current_job_id: string;
    current_hiring_eligibility: boolean;
    reapplied_time_gap: string;
    submission: Submission[];
  }