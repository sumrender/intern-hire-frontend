import { Component, OnInit } from '@angular/core';
import { CandidatesService } from '../../services/candidates.service';
import { Candidate } from '../../models/candidate.model';
import { CommonModule } from '@angular/common';
import { TableModule } from 'primeng/table';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { PaginatorModule } from 'primeng/paginator';
import { FormsModule } from '@angular/forms';
import { CheckboxModule } from 'primeng/checkbox'

@Component({
    selector: 'app-candidate-list',
    standalone: true,
    imports: [CommonModule, TableModule, InputTextModule, ButtonModule, PaginatorModule, FormsModule, CheckboxModule],
    templateUrl: './candidate-list.component.html',
    styleUrls: ['./candidate-list.component.scss']
})
export class CandidateListComponent implements OnInit {
    candidates: Candidate[] = [];
    filteredCandidates: Candidate[] = [];
    searchTerm: string = '';
    totalRecords: number = 0;
    rows: number = 10;

    columns: { field: string; header: string; visible: boolean }[] = [
        { field: 'full_name', header: 'Full Name', visible: true },
        { field: 'email', header: 'Email', visible: true },
        { field: 'mobile_number', header: 'Mobile', visible: true },
        { field: 'college_name', header: 'College', visible: true },
        { field: 'year_of_passing', header: 'Year of Passing', visible: true },
        { field: 'current_status', header: 'Status', visible: true },
        { field: 'current_hiring_eligibility', header: 'Hiring Eligibility', visible: true },
    ];

    constructor(private candidateService: CandidatesService) {}

    ngOnInit(): void {
        this.candidateService.getCandidates().subscribe(data => {
            this.candidates = data;
            this.filteredCandidates = data;
            this.totalRecords = this.filteredCandidates.length;
        });
    }

    filterCandidates() {
        this.filteredCandidates = this.candidates.filter(candidate =>
            candidate.full_name.toLowerCase().includes(this.searchTerm.toLowerCase())
        );
        this.totalRecords = this.filteredCandidates.length;
    }
}