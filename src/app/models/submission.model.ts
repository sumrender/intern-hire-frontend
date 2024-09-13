export interface ResumeReviewParameters {
    rating: number;
    reason: string;
  }
  
  export interface ResumeReview {
    resume_review_parameters_summary: {
      skill_match: ResumeReviewParameters;
      work_experience: ResumeReviewParameters;
      project_quality: ResumeReviewParameters;
    };
    resume_review_overall_score: number;
    resume_review_overall_summary: string;
  }
  
  export interface CodeReview {
    implementation_closeness: number;
    code_cleanliness: number;
    best_practices: number;
    edge_cases: number;
    overall_score: number;
    summary: string;
  }
  
  export interface Submission {
    submission_id: string;
    job_id: string;
    position: string;
    submitted_timestamp: string;
    status: string;
    repo_link: string;
    time_taken: string;
    video_link: string;
    resume_link: string;
    resume_review: ResumeReview;
    code_review: CodeReview;
    code_coverage_score: number;
    code_coverage_description: string;
    last_updated: string;
  }