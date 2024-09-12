import { Component, Input } from '@angular/core';
import { CardModule } from 'primeng/card';
import { FileUploadModule, FileBeforeUploadEvent, UploadEvent } from 'primeng/fileupload';
import { environment } from '../../../environment';
import { CandidateListComponent } from '../../components/candidate-list/candidate-list.component';
import { DialogModule } from 'primeng/dialog';


@Component({
  selector: 'app-job',
  standalone: true,
  imports: [FileUploadModule, CardModule, CandidateListComponent, DialogModule],
  templateUrl: './job.component.html',
  styleUrl: './job.component.scss'
})
export class JobComponent {
  @Input() jobId: string = '';

  uploadUrl = environment.uploadExcelUrl;
  showJobDetails: boolean = false;

  jobs = [
    {
      jobId: "1",
      jobTitle: "Frontend Intern",
      jobDomain: "FE",
      jobDesc: 'On the other hand, we denounce with righteous indignation and dislike men who are so beguiled and demoralized by the charms of pleasure of the moment, so blinded by desire, that they cannot foresee the pain and trouble that are bound to ensue; and equal blame belongs to those who fail in their duty through weakness of will, which is the same as saying through shrinking from toil and pain. These cases are perfectly simple and easy to distinguish. In a free hour, when our power of choice is untrammelled and when nothing prevents our being able to do what we like best, every pleasure is to be welcomed and every pain avoided. But in certain circumstances and owing to the claims of duty or the obligations of business it will frequently occur that pleasures have to be repudiated and annoyances accepted. The wise man therefore always holds in these matters to this principle of selection: he rejects pleasures to secure other greater pleasures, or else he endures pains to avoid worse pains.',
      codeCoverage: 98,
      codeReviewScore: 10,
      resumeScore: 10,
      is_active: true
    },
    {
      jobId: "2",
      jobTitle: "Backend Intern",
      jobDomain: "BE",
      jobDesc: 'On the other hand, we denounce with righteous indignation and dislike men who are so beguiled and demoralized by the charms of pleasure of the moment, so blinded by desire, that they cannot foresee the pain and trouble that are bound to ensue; and equal blame belongs to those who fail in their duty through weakness of will, which is the same as saying through shrinking from toil and pain. These cases are perfectly simple and easy to distinguish. In a free hour, when our power of choice is untrammelled and when nothing prevents our being able to do what we like best, every pleasure is to be welcomed and every pain avoided. But in certain circumstances and owing to the claims of duty or the obligations of business it will frequently occur that pleasures have to be repudiated and annoyances accepted. The wise man therefore always holds in these matters to this principle of selection: he rejects pleasures to secure other greater pleasures, or else he endures pains to avoid worse pains.',
      codeCoverage: 98,
      codeReviewScore: 10,
      resumeScore: 10,
      is_active: true
    }
  ]

  job: any;
  ngOnInit() {
    this.job = this.jobs.find((job) => job.jobId === this.jobId);
  }

  onBeforeSend(event: FileBeforeUploadEvent) {
    const id = Date.now();
    event.formData.append('jobId', id.toString());
  }

  onUpload(event: UploadEvent) {
    console.log("file upload", event);
  }

  openJobModal() {
    this.showJobDetails = true;
  }

}
