import { Component, OnInit } from '@angular/core';
import { ErrorService } from '../../services/error.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-error-modal',
  standalone: true, 
  imports: [CommonModule],
  templateUrl: './error-modal.component.html',
  styleUrls: ['./error-modal.component.scss']
})
export class ErrorModalComponent implements OnInit {
  errorMessage: string | null = null;

  constructor(private errorService: ErrorService) {}

  ngOnInit(): void {
    this.errorService.getErrorMessage().subscribe(message => {
      this.errorMessage = message;
    });
  }

  closeModal(): void {
    this.errorService.clearError();
  }
}
