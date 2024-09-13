import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CandidateService } from '../../services/candidate.service';
import { ChartModule } from 'primeng/chart';
import { CommonModule } from '@angular/common';
import { CardModule } from 'primeng/card';
@Component({
  selector: 'app-candidate-profile',
  standalone: true,
  imports: [CommonModule, ChartModule, CardModule],
  templateUrl: './candidate-profile.component.html',
  styleUrls: ['./candidate-profile.component.scss']
})
export class CandidateProfileComponent implements OnInit {
  candidate: any;
  resumeReviewChartData: any;
  codeReviewChartData: any;
  codeCoverageChartData: any;

  chartOptions = {
    responsive: true,
    maintainAspectRatio: false
  };

  constructor(
    private route: ActivatedRoute,
    private candidateService: CandidateService
  ) {}

  ngOnInit(): void {
    const candidateId = this.route.snapshot.paramMap.get('id');
    this.fetchCandidateData(candidateId);
  }

  fetchCandidateData(candidateId: string | null): void {
    this.candidateService.getCandidateById(candidateId as string).subscribe((res) => {
      this.candidate = res.data[0];
      this.createResumeReviewChart();
      this.createCodeReviewChart();
      this.createCodeCoverageChart();
    });
  }

  createResumeReviewChart(): void {
    this.resumeReviewChartData = {
      labels: ['Skill Match', 'Work Experience', 'Project Quality'],
      datasets: [
        {
          label: 'Resume Review',
          data: [
            this.candidate.submission[0].resume_review.resume_review_parameters_summary.skill_match.rating,
            this.candidate.submission[0].resume_review.resume_review_parameters_summary.work_experience.rating,
            this.candidate.submission[0].resume_review.resume_review_parameters_summary.project_quality.rating
          ],
          backgroundColor: 'rgba(75, 192, 192, 0.2)',
          borderColor: 'rgba(75, 192, 192, 1)',
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
          label: 'Code Review',
          data: [
            this.candidate.submission[0].code_review.implementation_closeness,
            this.candidate.submission[0].code_review.code_cleanliness,
            this.candidate.submission[0].code_review.best_practices,
            this.candidate.submission[0].code_review.edge_cases
          ],
          backgroundColor: ['#42A5F5', '#66BB6A', '#FFA726', '#AB47BC']
        }
      ]
    };
  }

  createCodeCoverageChart(): void {
    this.codeCoverageChartData = {
      labels: ['Code Coverage', 'Remaining'],
      datasets: [
        {
          data: [this.candidate.submission[0].code_coverage_score, 100 - this.candidate.submission[0].code_coverage_score],
          backgroundColor: ['#FF6384', '#36A2EB']
        }
      ]
    };
  }
}
