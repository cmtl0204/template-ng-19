import {inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Router} from '@angular/router';
import {Observable, throwError} from 'rxjs';
import {catchError, map} from 'rxjs/operators';
import {environment} from '@env/environment';
import {LoginModel, PasswordChangeModel, PasswordResetModel, UpdateUserDto, UserModel} from '@core/interfaces';
import {LoginResponse, ServerResponse} from '@core/interfaces';
import {CoreService, AuthService, CataloguesHttpService, MessageDialogService} from '@core/services';

@Injectable({
  providedIn: 'root'
})

export class AuthHttpService {
  API_URL: string = `${environment.API_URL}/auth`;
  private readonly httpClient = inject(HttpClient);
  private readonly authService = inject(AuthService);
  private readonly coreService = inject(CoreService);
  private readonly cataloguesHttpService = inject(CataloguesHttpService);
  private readonly router = inject(Router);
  private readonly messageDialogService = inject(MessageDialogService);

  constructor() {
  }

  changePassword(id: string, credentials: PasswordChangeModel): Observable<ServerResponse> {
    const url = `${this.API_URL}/${id}/change-password`;
    this.coreService.isProcessing = true;
    return this.httpClient.put<ServerResponse>(url, credentials)
      .pipe(
        map(response => {
          this.coreService.isProcessing = false;
          this.messageDialogService.successHttp(response);
          return response.data;
        })
      );
  }

  login(credentials: LoginModel): Observable<LoginResponse> {
    const url = `${this.API_URL}/login`;

    return this.httpClient.post<LoginResponse>(url, credentials)
      .pipe(
        map(response => {
          this.authService.accessToken = response.data.accessToken;
          this.authService.auth = response.data.auth;
          this.authService.roles = response.data.roles;
          return response;
        })
      );
  }

  signOut(): void {
    this.authService.removeLogin();
    this.messageDialogService.successCustom('Cerrar Sesión', 'Se cerró correctamente');
    this.router.navigate(['/login']);
  }

  resetPassword(credentials: PasswordResetModel): Observable<ServerResponse> {
    const url = `${this.API_URL}/reset-passwords`;
    return this.httpClient.patch<ServerResponse>(url, credentials)
      .pipe(
        map(response => {
          this.messageDialogService.successHttp(response);
          return response;
        })
      );
  }

  verifyUser(username: string): Observable<ServerResponse> {
    const url = `${this.API_URL}/verify-user/${username}`;
    return this.httpClient.get<ServerResponse>(url)
      .pipe(
        map(response => response),
        catchError(error => {
          return throwError(error);
        })
      );
  }

  verifyEmail(email: string): Observable<ServerResponse> {
    const url = `${this.API_URL}/verify-email/${email}`;
    return this.httpClient.get<ServerResponse>(url)
      .pipe(
        map(response => response),
        catchError(error => {
          return throwError(error);
        })
      );
  }

  verifyPhone(phone: string): Observable<ServerResponse> {
    const url = `${this.API_URL}/verify-phone/${phone}`;
    return this.httpClient.get<ServerResponse>(url)
      .pipe(
        map(response => response),
        catchError(error => {
          return throwError(error);
        })
      );
  }

  requestTransactionalCode(username: string): Observable<ServerResponse> {
    const url = `${this.API_URL}/transactional-codes/${username}/request`;
    return this.httpClient.get<ServerResponse>(url)
      .pipe(
        map(response => {
          this.messageDialogService.successHttp(response);
          return response.data;
        })
      );
  }

  verifyTransactionalCode(token: string, username: string): Observable<ServerResponse> {
    const url = `${this.API_URL}/transactional-codes/${token}/verify`;
    return this.httpClient.patch<ServerResponse>(url, {username})
      .pipe(
        map(response => {
          this.messageDialogService.successHttp(response);
          return response.data;
        })
      );
  }

  getProfile(): Observable<UserModel> {
    const url = `${this.API_URL}/profile`;

    return this.httpClient.get<ServerResponse>(url).pipe(
      map(response => {

        return response.data;
      })
    );
  }

  getUserInformation(): Observable<UserModel> {
    const url = `${this.API_URL}/user-information`;


    return this.httpClient.get<ServerResponse>(url).pipe(
      map(response => {

        return response.data;
      })
    );
  }

  updateProfile(payload: UpdateUserDto): Observable<UserModel> {
    const url = `${this.API_URL}/profile`;

    this.coreService.isProcessing = true;
    return this.httpClient.put<ServerResponse>(url, payload).pipe(
      map(response => {
        this.coreService.isProcessing = false;
        this.messageDialogService.successHttp(response);
        return response.data;
      })
    );
  }

  updateUserInformation(payload: UpdateUserDto): Observable<UserModel> {
    const url = `${this.API_URL}/user-information`;

    this.coreService.isProcessing = true;
    return this.httpClient.put<ServerResponse>(url, payload).pipe(
      map(response => {
        this.coreService.isProcessing = false;
        this.messageDialogService.successHttp(response);
        return response.data;
      })
    );
  }

  uploadAvatar(id: string, payload: FormData): Observable<UserModel> {
    const url = `${this.API_URL}/${id}/avatar`;

    this.coreService.isProcessing = true;
    return this.httpClient.post<ServerResponse>(url, payload).pipe(
      map((response) => {
        this.coreService.isProcessing = false;
        this.messageDialogService.successHttp(response);
        return response.data;
      })
    );
  }
}
