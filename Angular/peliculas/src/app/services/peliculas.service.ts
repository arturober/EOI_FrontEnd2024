import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PeliculasService {
  http = inject(HttpClient);
  peliculasUrl = 'https://api.themoviedb.org/3/movie/popular?api_key=4b48db10576542e32758261ba7bbc4fb&language=es&page=1';

  constructor() { }

  getPeliculas() {
    return this.http.get<any>(this.peliculasUrl).pipe(
      map(resp => {
          return resp.results; // Listado de películas
      })
    );
  }
}
