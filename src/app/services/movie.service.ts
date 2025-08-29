import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { catchError, Observable, throwError } from "rxjs";
import { Movie } from "../models/movie";

@Injectable({
  providedIn: 'root'
})
export class MovieService {

    private apiUrl = 'http://localhost:3000/movies';

    constructor(private http: HttpClient) {}

    getMovies(): Observable<Movie[]> {
        return this.http.get<Movie[]>(this.apiUrl).pipe(
            catchError(this.handleError)
        )
    }

    getMovieById(id: number): Observable<Movie[]> {
        return this.http.get<Movie[]>(`${this.apiUrl}/${id}`).pipe(
            catchError(this.handleError)
        )
    }

    searchMovies(query: string):Observable<Movie[]> {
        return this.http.get<Movie[]>(`${this.apiUrl}?title=${query}`).pipe(
            catchError(this.handleError)
        )
    }

    handleError(error: HttpErrorResponse) {
        let message = "Произошла ошибка"

        if(error.error instanceof ErrorEvent) {
            message = `Ошибка: ${error.error.message}`;
        } else {
            message = `Код ошибки: ${error.status}\nСообщение: ${error.message}`;
        }

        return throwError(() => new Error(message));
    }
}
