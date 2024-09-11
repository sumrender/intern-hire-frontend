import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TableModule } from 'primeng/table';

@Component({
  selector: 'app-job-list',
  standalone: true,
  imports: [TableModule, RouterLink],
  templateUrl: './job-list.component.html',
  styleUrl: './job-list.component.scss'
})
export class JobListComponent {
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
}
