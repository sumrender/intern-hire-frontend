import { Component, OnInit, Input } from '@angular/core';
import { CandidateService } from '../../services/candidate.service';
import { Candidate } from '../../models/candidate.model';  // Import the interfaces
import { Submission } from '../../models/submission.model';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { TableModule } from 'primeng/table';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { DropdownModule } from 'primeng/dropdown';
import { DialogModule } from 'primeng/dialog';
import { CheckboxModule } from 'primeng/checkbox';  
import { Router } from '@angular/router';

@Component({
  selector: 'app-candidate-list',
  standalone: true,
  imports: [CommonModule, FormsModule, TableModule, InputTextModule, ButtonModule, DropdownModule, DialogModule, CheckboxModule, ReactiveFormsModule],
  templateUrl: './candidate-list.component.html',
  styleUrls: ['./candidate-list.component.scss']
})
export class CandidateListComponent implements OnInit {

  @Input() jobId!: string; 

  candidates: Candidate[] = [];  // Explicitly use the Candidate type
  totalRecords: number = 0;
  globalFilter: string = '';
  rowsPerPage: number = 10;
  selectedCandidates: any[] = [];
  rowsOptions = [
    { label: '10', value: 10 },
    { label: '20', value: 20 },
    { label: '50', value: 50 }
  ];
  sortField: string = 'full_name';
  sortOrder: number = 1;
  statusChange: boolean = false;
  
  columns: any[] = [
    { field: 'full_name', header: 'Full Name', visible: true, sortable: true },
    { field: 'email', header: 'Email', visible: true, sortable: true },
    { field: 'mobile_number', header: 'Mobile Number', visible: true, sortable: true },
    { field: 'college_name', header: 'College', visible: true, sortable: true },
    { field: 'year_of_passing', header: 'Year of Passing', visible: true, sortable: true },
    { field: 'current_status', header: 'Status', visible: true, sortable: false },
    { field: 'current_job_id', header: 'Current Job ID', visible: true, sortable: false },
    { field: 'current_hiring_eligibility', header: 'Hiring Eligibility', visible: true, sortable: false },  // Not sortable
    { field: 'reapplied_time_gap', header: 'Reapplied Time Gap', visible: true, sortable: false },  // Not sortable
    
    // Fields from the latest submission
    { field: 'submission_status', header: 'Submission Status', visible: true, sortable: true },
    { field: 'repo_link', header: 'Repo Link', visible: true, sortable: false },  // Not sortable
    { field: 'video_link', header: 'Video Link', visible: true, sortable: false },  // Not sortable
    { field: 'resume_link', header: 'Resume Link', visible: true, sortable: false },  // Not sortable
    { field: 'resume_review_overall_score', header: 'Resume Review Score', visible: true, sortable: true },
    { field: 'code_review_overall_score', header: 'Code Review Score', visible: true, sortable: true },
    { field: 'code_coverage_score', header: 'Code Coverage Score', visible: true, sortable: true },
    { field: 'last_updated', header: 'Last Updated', visible: true, sortable: true }
  ];
  

  visibleColumns: any[] = this.columns.filter(col => col.visible);
  filterDialogVisible = false;
  bulkStatusUpdateDialogVisible = false;
  manageColumnsVisible = false;
  codeScoreFilter: any = { value: null, operator: 'gt' };
  reasonForm: FormGroup;
  statusForm: FormGroup;
  rowData: any;

  constructor(private candidateService: CandidateService, private router: Router, private fb: FormBuilder) {
    this.reasonForm = this.fb.group({
      reason: ['', Validators.required]
    });

    this.statusForm = this.fb.group({
      status: ['', Validators.required]
    })
  }

  ngOnInit() {
    this.loadCandidates({ first: 0, rows: this.rowsPerPage });
  }

  loadCandidates(event: any) {
    const { first, rows, sortField, sortOrder } = event;

    this.candidateService.getCandidates(first, rows, sortField, sortOrder, this.globalFilter, this.jobId)
      .subscribe(response => {
        this.candidates = response?.data.map((candidate: Candidate) => {
          const latestSubmission: Submission = candidate.submission?.length > 0
            ? candidate.submission[candidate.submission.length - 1]
            : {} as Submission;  // Cast empty object as Submission

          return {
            ...candidate, // Spread the candidate object
            submission_status: latestSubmission.status || 'N/A',
            repo_link: latestSubmission.repo_link || 'N/A',
            video_link: latestSubmission.video_link || 'N/A',
            resume_link: latestSubmission.resume_link || 'N/A',
            resume_review_overall_score: latestSubmission.resume_review?.resume_review_overall_score || 'N/A',
            code_review_overall_score: latestSubmission.code_review?.overall_score || 'N/A',
            code_coverage_score: latestSubmission.code_coverage_score || 'N/A',
            last_updated: latestSubmission.last_updated || 'N/A'
          };
        }) || [];

        this.totalRecords = response?.count || 0;
      }, error => {
        console.error('Error fetching candidates', error);
      });
  }

  onGlobalFilter(event: any) {
    this.globalFilter = event.target.value;
    this.loadCandidates({ first: 0, rows: this.rowsPerPage });
  }

  applyFilters(candidates: any[]): any[] {
    if (this.codeScoreFilter.value) {
      return candidates.filter(candidate => {
        const score = candidate.submission[0]?.code_review_overall_score;
        if (this.codeScoreFilter.operator === 'gt') {
          return score > this.codeScoreFilter.value;
        } else if (this.codeScoreFilter.operator === 'lt') {
          return score < this.codeScoreFilter.value;
        }
        return true;
      });
    }
    return candidates;
  }

  navigateToProfile(event: any) {
    console.log("checint the user profile", event);
    const candidateId = event.data.id;
    this.router.navigate(['/candidates', candidateId]);
  }

  showFilterDialog() {
    this.filterDialogVisible = true;
  }

  manageColumns() {
    this.manageColumnsVisible = true;
  }

  updateVisibleColumns() {
    this.visibleColumns = this.columns.filter(col => col.visible);
  }

  statusOptions = [
    { label: 'task_submitted', value: 'task_submitted'},
    { label: 'ongoing_ai_review', value: 'ongoing_ai_review'},
    { label: 'ai_reviewed', value: 'ai_reviewed'},
    { label: 'rejected', value: 'rejected'},
    { label: 'interview_1', value: 'interview_1'},
    { label: 'interview_2', value: 'interview_2'},
    { label: 'interview_3', value: 'interview_3'},
    { label: 'offer_letter_sent', value: 'offer_letter_sent'},
    { label: 'offer_letter_accepted', value: 'offer_letter_accepted'},
    { label: 'joined', value: 'joined'}
  ]
  
  onStatusChange(rowData: any) {
    this.rowData = rowData;
    this.statusChange = true;
  }

  submitForm() {
    if (this.reasonForm.valid) {
      const reason = this.reasonForm.get('reason')?.value;
      const payload = {
        rowData: this.rowData,
        reason: reason
      };
      console.log(payload);
    }
  }

  onDialogClose() {
    window.location.reload();
  }

  showBulkStatusUpdateDialog() {
    this.bulkStatusUpdateDialogVisible = true;
  }

  submitBulkStatus() {
    console.log(this.selectedCandidates, this.statusForm.get('status')?.value);
  }

  sendEmail(status: String) {
    console.log(this.selectedCandidates, status);
  }
}

