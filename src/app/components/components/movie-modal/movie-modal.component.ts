import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Movie } from '../../../models/movie';

@Component({
  selector: 'app-movie-modal',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './movie-modal.component.html',
  styleUrl: './movie-modal.component.css'
})
export class MovieModalComponent {
  @Input() movie: Movie | null = null;
  @Input() isVisible = false;
  @Output() close = new EventEmitter<void>();

  closeModal() {
    this.close.emit();
  }

  onOverlayClick(event: MouseEvent) {
    if (event.target === event.currentTarget) {
      this.closeModal();
    }
  }

  onContentClick(event: MouseEvent) {
    event.stopPropagation();
  }
}
