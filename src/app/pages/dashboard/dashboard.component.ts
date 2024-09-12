import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CardModule } from 'primeng/card';
import { CommonModule } from '@angular/common';

interface CandidateStat {
  _id: string;
  count: number;
}

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule,CardModule],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  stats: CandidateStat[] = [];

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.http.get<CandidateStat[]>('http://localhost:5000/candidate-stats').subscribe(
      (data) => {
        this.stats = data;
      },
      (error) => {
        console.error('Error fetching stats:', error);
      }
    );
  }

  
  getStatusLabel(status: string): string {
    const statusLabels: { [key: string]: string } = {
      'AI_REVIEWED': 'AI Reviewed',
      'INTERVIEW_1': 'Interview 1',
      'SELECTED': 'Selected',
      'REJECTED': 'Rejected',
      'SUBMITTED': 'Submitted',
    };
    return statusLabels[status] || status;
  }
}
