import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-job',
  standalone: true,
  imports: [],
  templateUrl: './job.component.html',
  styleUrl: './job.component.scss'
})
export class JobComponent {
  @Input() jobId: string = '';

  jobs = [
    {
      id: "1",
      title: "Frontend Intern",
      numCandidates: 200,
      closingDate: "01 July 2024"
    },
    {
      id: "2",
      title: "Backend Intern",
      numCandidates: 200,
      closingDate: "01 July 2024"
    }
  ]

  job: any;

  ngOnInit() {
    this.job = this.jobs.find((job) => job.id === this.jobId);
  }

}
