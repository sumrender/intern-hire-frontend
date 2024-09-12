import { Component, OnInit } from '@angular/core';
import { CardModule } from 'primeng/card';
import { CommonModule } from '@angular/common';
import { CandidateService } from '../../services/candidate.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CardModule, CommonModule],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  constructor(private candidateService: CandidateService) {}
  stats: any[] = [
    {
      phases: [
        {
          phase: 'task_submitted',
          count: 1
        }
      ],
      job_id: null,
      job_title: 'da'
    },
    {
      phases: [
        {
          phase: 'task_submitted',
          count: 137
        }
      ],
      job_id: '1726132392587',
      job_title: 'Frontend Intern'
    }
  ];

  ngOnInit(): void {
    this.candidateService.getCandidateStats().subscribe((res)=>{
      this.stats = res;
    })
  }
}
