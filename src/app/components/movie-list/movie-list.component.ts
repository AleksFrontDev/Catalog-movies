import { Component, OnInit } from '@angular/core';
import { MovieService } from '../../services/movie.service';
import { Observable } from 'rxjs';
import { Movie } from '../../models/movie';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-movie-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './movie-list.component.html',
  styleUrl: './movie-list.component.css'
})
export class MovieListComponent implements OnInit {
  movies$!: Observable<Movie[]>;
  isLoading = true
  error: string | null = null

  constructor(private movieService: MovieService) {
  }

  ngOnInit() {
    this.loadMovieList()
  }

  loadMovieList(): void {
    this.movies$ = this.movieService.getMovies();

    this.movies$.subscribe({
      next: () => this.isLoading = false,
      error: (error) => {
        this.error = error.message;
        this.isLoading = false;
      },
    })
  }
}
