import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { saveAs } from 'file-saver';
import { map, tap } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ArchivosService {

  private url: string = `${ environment.API_URL }/api`;

  constructor(
    private http: HttpClient
  ) { }

  getFile(name: string, url: string, type: string) {
    return this.http.get(url, { responseType: 'blob'})
    .pipe(
      tap(response => {
        const blob = new Blob([response], { type: type });
        saveAs(blob, name);
      }),
      map(() => true)
    );
  }

  uploadFile(file: Blob) {
    const form = new FormData();
    form.append('file', file);
    return this.http.post(`${this.url}/files/upload`, form, {
      headers: {
        'Content-type': 'multipart/form-data'
      }
    });
  }

}
