export interface Submission {
    submission_id: string;
    position: string;
    submitted_timestamp: string;
    status: string;
    repo_link: string;
    time_taken: string;
    video_link: string;
    resume_link: string;
    code_review_overall_score?: number;
    resume_review_overall_score?: number;
    code_coverge_score?: number;
    last_updated: string;
}