import { Component } from '@angular/core';
import { CandidateListComponent } from '../../components/candidate-list/candidate-list.component';

@Component({
  selector: 'app-candidates',
  standalone: true,
  imports: [CandidateListComponent],
  templateUrl: './candidates.component.html',
  styleUrls: ['./candidates.component.scss']
})
export class CandidatesComponent {
  
}

