import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Producto, ProductoCreate, ProductoUpdate } from '../models/producto';
import { environment } from '../../environments/environment';

@Injectable({ providedIn: 'root' })
export class ProductoService {
  private readonly http = inject(HttpClient);
  private readonly base = `${environment.apiUrl}/api/v1/productos`;

  getAll(): Observable<Producto[]> {
    return this.http.get<Producto[]>(`${this.base}/`);
  }

  create(data: ProductoCreate): Observable<Producto> {
    return this.http.post<Producto>(`${this.base}/`, data);
  }

  update(id: number, data: ProductoUpdate): Observable<Producto> {
    return this.http.put<Producto>(`${this.base}/${id}`, data);
  }

  delete(id: number): Observable<Producto> {
    return this.http.delete<Producto>(`${this.base}/${id}`);
  }
}
