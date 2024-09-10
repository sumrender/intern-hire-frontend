import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TableModule } from 'primeng/table';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [TableModule, RouterLink],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {
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
