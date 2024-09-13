import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CandidateListComponent } from '../../components/candidate-list/candidate-list.component';

@Component({
  selector: 'app-candidates',
  standalone: true,
  imports: [CandidateListComponent],
  templateUrl: './candidates.component.html',
  styleUrls: ['./candidates.component.scss']
})
export class CandidatesComponent implements OnInit {
  jobId: string = '';
  status: string = '';

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    // Extract query params from the URL
    this.route.queryParams.subscribe(params => {
      this.jobId = params['jobId'];
      this.status = params['status'];
    });
  }
}
