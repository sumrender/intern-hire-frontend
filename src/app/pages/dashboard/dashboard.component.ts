import { Component, OnInit } from '@angular/core';
import { CardModule } from 'primeng/card';
import { CommonModule } from '@angular/common';
import { CandidateService } from '../../services/candidate.service';
import { Router } from '@angular/router';

// Define the structure of a phase
interface Phase {
  phase: string;
  count: number;
}

// Define the structure of a job
interface Job {
  job_id: string;
  job_title: string;
  phases: Phase[];
}

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CardModule, CommonModule],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  stats: Job[] = []; // Explicitly define stats as an array of Job objects

  constructor(private router: Router, private candidateService: CandidateService) {}

  // Method to format the phase title to uppercase with spaces
  formatPhaseTitle(phase: string): string {
    return phase.replace(/_/g, ' ').toUpperCase();
  }

  // Method to redirect to the candidates page with query params
  redirectToCandidates(jobId: string, phase: string) {
    this.router.navigate(['/candidates'], {
      queryParams: { jobId: jobId, status: phase }
    });
  }
 
  ngOnInit(): void {
    this.candidateService.getCandidateStats().subscribe((res: Job[]) => {
      this.stats = res;
    });
  }
}
