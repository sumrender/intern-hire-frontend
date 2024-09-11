import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { Router } from '@angular/router';

@Component({
  selector: 'app-job-list',
  standalone: true,
  imports: [TableModule, RouterLink, ButtonModule],
  templateUrl: './job-list.component.html',
  styleUrl: './job-list.component.scss'
})
export class JobListComponent {
  constructor(private router: Router) {} 

  jobs = [
    {
      id: 1,
      title: "Frontend Intern",
      numCandidates: 200,
      closingDate: "01 July 2024"
    },
    {
      id: 2,
      title: "Backend Intern",
      numCandidates: 200,
      closingDate: "01 July 2024"
    }
  ]

  goToCreateJob() {
    this.router.navigate(['/create-job']);
  }
}
