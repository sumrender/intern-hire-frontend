import { Submission } from "./submission.model";

export interface Candidate {
    candidate_id: string;
    email: string;
    mobile_number: string;
    full_name: string;
    college_name: string;
    year_of_passing: string;
    current_status: string;
    current_hiring_eligibility: boolean;
    submission: Submission[];
}