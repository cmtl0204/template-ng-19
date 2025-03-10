import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {environment} from '@env/environment';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {MenuModel, ServerResponse} from '@core/interfaces';
import {CoreService, MessageDialogService} from '@core/services';

@Injectable({
  providedIn: 'root'
})
export class MenusHttpService {
  API_URL = `${environment.API_URL}/menus`;

  constructor(
    private coreService: CoreService,
    private httpClient: HttpClient,
    private messageService: MessageDialogService,
  ) {
  }

  getMenusByRole(roleId: string): Observable<MenuModel[]> {
    const url = `${this.API_URL}/roles/${roleId}`;

    return this.httpClient.get<ServerResponse>(url).pipe(
      map((response) => {
        return response.data;
      })
    );
  }
}
