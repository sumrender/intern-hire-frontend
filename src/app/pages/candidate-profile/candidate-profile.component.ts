import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CandidateService } from '../../services/candidate.service';
import { ChartModule } from 'primeng/chart';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-candidate-profile',
  standalone: true,
  imports: [CommonModule, ChartModule],
  templateUrl: './candidate-profile.component.html',
  styleUrls: ['./candidate-profile.component.scss']
})
export class CandidateProfileComponent implements OnInit {

  candidateId: string;
  candidateData: any;
  chartData: any;

  constructor(
    private route: ActivatedRoute,
    private candidateService: CandidateService
  ) {
    this.candidateId = '';
  }

  ngOnInit() {
    // Get the candidate ID from the route parameters
    this.candidateId = this.route.snapshot.paramMap.get('id')!;
    
    // Fetch candidate data
    this.fetchCandidateData(this.candidateId);
  }

  fetchCandidateData(id: string) {
    this.candidateService.getCandidateById(id).subscribe((data: any) => {
      this.candidateData = data;
      this.setupChart(); // Setup chart data after fetching candidate details
    });
  }

  // Setup data for score visualization in the chart
  setupChart() {
    this.chartData = {
      labels: ['Code Review', 'Resume Review', 'Code Coverage'],
      datasets: [
        {
          label: 'Score',
          backgroundColor: ['#42A5F5', '#66BB6A', '#FFA726'],
          data: [
            this.candidateData.submission[0].code_review_overall_score,
            this.candidateData.submission[0].resume_review_overall_score,
            this.candidateData.submission[0].code_coverge_score
          ]
        }
      ]
    };
  }
}
