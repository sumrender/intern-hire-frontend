import { Component, Input, input, OnInit } from '@angular/core';
import { CandidateService } from '../../services/candidate.service';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms'; 
import { TableModule } from 'primeng/table';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { DropdownModule } from 'primeng/dropdown';
import { DialogModule } from 'primeng/dialog';
import { CheckboxModule } from 'primeng/checkbox';  
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-candidate-list',
  standalone: true,
  imports: [CommonModule, FormsModule, TableModule, InputTextModule, ButtonModule, DropdownModule, DialogModule, CheckboxModule, ReactiveFormsModule],
  templateUrl: './candidate-list.component.html',
  styleUrls: ['./candidate-list.component.scss']
})
export class CandidateListComponent implements OnInit {

  @Input() jobId!: string; 

  candidates: any[] = [];
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
  selectedCandidate: any;
  statusChange: boolean = false;
  
  columns: any[] = [
    { field: 'full_name', header: 'Full Name', visible: true },
    { field: 'email', header: 'Email', visible: true },
    { field: 'mobile_number', header: 'Mobile Number', visible: true },
    { field: 'college_name', header: 'College', visible: true },
    { field: 'year_of_passing', header: 'Year of Passing', visible: true },
    { field: 'current_status', header: 'Status', visible: true },
    { field: 'submission[0].position', header: 'Position', visible: true },
    { field: 'submission[0].code_review_overall_score', header: 'Code Review Score', visible: true },
    { field: 'submission[0].resume_review_overall_score', header: 'Resume Review Score', visible: true }
  ];

  visibleColumns: any[] = this.columns.filter(col => col.visible);
  filterDialogVisible = false;
  bulkStatusUpdateDialogVisible = false;
  manageColumnsVisible = false;
  codeScoreFilter: any = { value: null, operator: 'gt' };
  reasonForm: FormGroup;
  statusForm: FormGroup;
  rowData: any;

  constructor(private candidateService: CandidateService, private router: Router, private fb: FormBuilder, private http: HttpClient) {
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
        this.candidates = response?.data; 
        this.totalRecords = response?.count; 
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

