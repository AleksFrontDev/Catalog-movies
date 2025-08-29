import { CommonModule } from '@angular/common';
import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { ReactiveFormsModule, FormControl } from '@angular/forms';

@Component({
  selector: 'app-movie-search',
  standalone: true,
  imports: [CommonModule,ReactiveFormsModule],
  templateUrl: './movie-search.component.html',
  styleUrl: './movie-search.component.css'
})
export class MovieSearchComponent implements OnInit{
  searchControl = new FormControl('')

  @Output() search = new EventEmitter<string>();

  ngOnInit(): void {
    this.setupSearch()
  }

  setupSearch() {
    this.searchControl.valueChanges.subscribe((value)=> {
      if(value !== null) {
        const cleanQuery = this.processCleanQuery(value);
        this.search.emit(cleanQuery)
      }
    })
  }

  processCleanQuery(query: string): string {
    return query.trim().toLowerCase()
  }
}
