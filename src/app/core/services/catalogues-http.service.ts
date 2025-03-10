import {inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {environment} from '@env/environment';
import {ServerResponse, CatalogueModel} from '@core/interfaces';
import {CatalogueTypeEnum} from "@core/enums";
import {MessageDialogService} from '@core/services/message-dialog.service';

@Injectable({
  providedIn: 'root'
})
export class CataloguesHttpService {
  private readonly API_URL = `${environment.API_URL}/catalogues`;
  private readonly httpClient = inject(HttpClient);
  private readonly messageDialogService = inject(MessageDialogService);

  constructor() {
  }

  create(payload: CatalogueModel): Observable<CatalogueModel> {
    const url = `${this.API_URL}`;
    return this.httpClient.post<ServerResponse>(url, payload).pipe(
      map(response => {
        this.messageDialogService.successHttp(response);
        return response.data;
      })
    );
  }

  findAll(): Observable<CatalogueModel[]> {
    const url = this.API_URL;

    return this.httpClient.get<ServerResponse>(url).pipe(
      map(response => {
        sessionStorage.setItem('catalogues', JSON.stringify(response.data));
        return response.data;
      })
    );
  }

  findOne(id: string): Observable<CatalogueModel> {
    const url = `${this.API_URL}/${id}`;
    return this.httpClient.get<ServerResponse>(url).pipe(
      map(response => response.data)
    );
  }

  update(id: string, payload: CatalogueModel): Observable<CatalogueModel> {
    const url = `${this.API_URL}/${id}`;
    return this.httpClient.put<ServerResponse>(url, payload).pipe(
      map(response => {
        this.messageDialogService.successHttp(response);
        return response.data;
      })
    );
  }

  remove(id: string): Observable<boolean> {
    const url = `${this.API_URL}/${id}`;
    return this.httpClient.delete<ServerResponse>(url).pipe(
      map(response => {
        this.messageDialogService.successHttp(response);
        return response.data;
      })
    );
  }

  removeAll(id: CatalogueModel[]): Observable<boolean> {
    const url = `${this.API_URL}/${id}`;
    return this.httpClient.delete<ServerResponse>(url).pipe(
      map(response => {
        this.messageDialogService.successHttp(response);
        return response.data;
      })
    );
  }

  loadCache(): void {
    const url = `${this.API_URL}`;

    this.httpClient.get<ServerResponse>(url).subscribe(response => {
      sessionStorage.setItem('catalogues', JSON.stringify(response.data));
    });
  }

  findByType(type: CatalogueTypeEnum): CatalogueModel[] {
    const catalogues: CatalogueModel[] = JSON.parse(String(sessionStorage.getItem('catalogues')));

    if (catalogues) {
      return catalogues.filter(catalogue => catalogue.type === type);
    }

    return [];
  }

  findByCode(code: string, type: CatalogueTypeEnum): CatalogueModel | undefined {
    const catalogues: CatalogueModel[] = JSON.parse(String(sessionStorage.getItem('catalogues')));

    return catalogues.find(catalogue => catalogue.type === type && catalogue.code === code);
  }

  findByParent(parentId: string): CatalogueModel[] {
    const catalogues: CatalogueModel[] = JSON.parse(String(sessionStorage.getItem('catalogues')));

    if (catalogues) {
      if (parentId) {
        return catalogues.filter(catalogue => catalogue.parent?.id === parentId);
      }
    }

    return [];
  }
}
