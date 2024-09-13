import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CandidateService } from '../../services/candidate.service';
import { ChartModule } from 'primeng/chart';
import { CommonModule } from '@angular/common';
import { CardModule } from 'primeng/card';
import { JobPostService } from '../../services/job-post.service';
@Component({
  selector: 'app-candidate-profile',
  standalone: true,
  imports: [CommonModule, ChartModule, CardModule],
  templateUrl: './candidate-profile.component.html',
  styleUrls: ['./candidate-profile.component.scss']
})
export class CandidateProfileComponent implements OnInit {
  candidate: any;
  job: any; // To store job standards
  resumeReviewChartData: any;
  codeReviewChartData: any;
  codeCoverageChartData: any;
  fitEvaluation: string = ''; // To store "Best Fit" or "Not a Good Fit"

  chartOptions = {
    responsive: true,
    maintainAspectRatio: false
  };

  constructor(
    private route: ActivatedRoute,
    private candidateService: CandidateService,
    private jobPostService: JobPostService
  ) {}

  ngOnInit(): void {
    const candidateId = this.route.snapshot.paramMap.get('id');
    this.fetchCandidateData(candidateId as string);
  }

  fetchCandidateData(candidateId: string): void {
    this.candidateService.getCandidateById(candidateId).subscribe((res) => {
      console.log("cnere", res);
      this.candidate = res.data[0];
      this.fetchJobData(this.candidate.submission[0].job_id);
    });
  }

  fetchJobData(jobId: string): void {
    this.jobPostService.getJobById(jobId).subscribe((jobRes) => {
      console.log("cjheing job", jobRes);
      this.job = jobRes.data[0];
      this.evaluateCandidateFit(); // Compare candidate's scores with job standards
      this.createResumeReviewChart();
      this.createCodeReviewChart();
      this.createCodeCoverageChart();
    });
  }

  evaluateCandidateFit(): void {
    const candidateResumeScore = this.candidate.submission[0]?.resume_review?.resume_review_overall_score || 0;
    const candidateCodeReviewScore = this.candidate.submission[0]?.code_review?.overall_score || 0;
    const candidateCodeCoverage = this.candidate.submission[0]?.code_coverage_score || 0;

    const jobResumeScore = this.job.resume_score;
    const jobCodeReviewScore = this.job.code_review_score;
    const jobCodeCoverage = this.job.code_coverage;

    if (
      candidateResumeScore >= jobResumeScore &&
      candidateCodeReviewScore >= jobCodeReviewScore &&
      candidateCodeCoverage >= jobCodeCoverage
    ) {
      this.fitEvaluation = 'Best Fit';
    } else {
      this.fitEvaluation = 'Not a Good Fit';
    }
  }

  createResumeReviewChart(): void {
    this.resumeReviewChartData = {
      labels: ['Skill Match', 'Work Experience', 'Project Quality'],
      datasets: [
        {
          label: 'Candidate Resume Review',
          data: [
            this.candidate.submission[0].resume_review.resume_review_parameters_summary.skill_match.rating,
            this.candidate.submission[0].resume_review.resume_review_parameters_summary.work_experience.rating,
            this.candidate.submission[0].resume_review.resume_review_parameters_summary.project_quality.rating
          ],
          backgroundColor: 'rgba(75, 192, 192, 0.2)',
          borderColor: 'rgba(75, 192, 192, 1)',
          borderWidth: 1
        },
        {
          label: 'Job Standards',
          data: [this.job.resume_score, this.job.resume_score, this.job.resume_score],
          backgroundColor: 'rgba(255, 99, 132, 0.2)',
          borderColor: 'rgba(255, 99, 132, 1)',
          borderWidth: 1
        }
      ]
    };
  }

  createCodeReviewChart(): void {
    this.codeReviewChartData = {
      labels: ['Implementation Closeness', 'Code Cleanliness', 'Best Practices', 'Edge Cases'],
      datasets: [
        {
          label: 'Candidate Code Review',
          data: [
            this.candidate.submission[0].code_review.implementation_closeness,
            this.candidate.submission[0].code_review.code_cleanliness,
            this.candidate.submission[0].code_review.best_practices,
            this.candidate.submission[0].code_review.edge_cases
          ],
          backgroundColor: '#42A5F5'
        },
        {
          label: 'Job Standards',
          data: [this.job.code_review_score, this.job.code_review_score, this.job.code_review_score, this.job.code_review_score],
          backgroundColor: '#FF6384'
        }
      ]
    };
  }

  createCodeCoverageChart(): void {
    this.codeCoverageChartData = {
      labels: ['Candidate Code Coverage', 'Job Code Coverage'],
      datasets: [
        {
          data: [this.candidate.submission[0].code_coverage_score, this.job.code_coverage],
          backgroundColor: ['#FF6384', '#36A2EB']
        }
      ]
    };
  }
}
