import { Component, OnInit } from '@angular/core';
import { MovieService } from '../../../services/movie.service';
import { catchError, map, Observable, of } from 'rxjs';
import { Movie } from '../../../models/movie';
import { CommonModule } from '@angular/common';
import { MovieModalComponent } from '../movie-modal/movie-modal.component';
import { MovieSearchComponent } from "../movie-search/movie-search.component";

@Component({
  selector: 'app-movie-list',
  standalone: true,
  imports: [CommonModule, MovieModalComponent, MovieSearchComponent],
  templateUrl: './movie-list.component.html',
  styleUrl: './movie-list.component.css'
})
export class MovieListComponent implements OnInit {
  movies$!: Observable<Movie[]>;
  isLoading = true
  error: string | null = null
  selectedMovie: Movie | null = null;
  isModalVisible = false;

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

  openMovieModal(movie: Movie) {
    this.selectedMovie = movie;
    this.isModalVisible = true;
  }

  closeMovieModal() {
    this.isModalVisible = false;
    this.selectedMovie = null;
  }

  onSearch(searchQuery: string) {
    if (!searchQuery.trim()) {
      this.loadMovieList();
      return;
    }

    this.isLoading = true;

    this.movies$ = this.movieService.getMovies().pipe(
      map(movies => {
        const filteredMovies = movies.filter(movie =>
          movie.title.toLowerCase().includes(searchQuery.toLowerCase())
        );

        this.isLoading = false;
        return filteredMovies;
      }),
      catchError(error => {
        this.error = error.message;
        this.isLoading = false;
        return of([]);
      })
    );
  }
}
