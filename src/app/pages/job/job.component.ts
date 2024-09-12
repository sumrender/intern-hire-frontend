import { Component, Input } from '@angular/core';
import { CardModule } from 'primeng/card';
import { FileUploadModule, FileBeforeUploadEvent, UploadEvent } from 'primeng/fileupload';
import { environment } from '../../../environment';


@Component({
  selector: 'app-job',
  standalone: true,
  imports: [FileUploadModule, CardModule],
  templateUrl: './job.component.html',
  styleUrl: './job.component.scss'
})
export class JobComponent {
  @Input() jobId: string = '';

  uploadUrl = environment.uploadExcelUrl;

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

  onBeforeSend(event: FileBeforeUploadEvent) {
    const id = Date.now();
    event.formData.append('jobId', id.toString());
  }

  onUpload(event: UploadEvent) {
    console.log("file upload", event);
  }

}
