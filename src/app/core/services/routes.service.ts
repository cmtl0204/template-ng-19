import {inject, Injectable} from '@angular/core';
import {Router} from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class RoutesService {
  private readonly router = inject(Router);

  constructor() {
  }

  login() {
    this.router.navigateByUrl(`/login`);
  }

  get admin(): string {
    return '/admin/';
  }

  get users(): string {
    return this.admin + 'users';
  }

  roleSelect() {
    this.router.navigateByUrl(`/auth/authentication/role-select`);
  }

  get profile() {
    return '/profile';
  }

  /** Dashboards **/
  dashboardAdmin() {
    this.router.navigateByUrl(`/core/dashboards/admin`);
  }

  dashboardAdministrator() {
    this.router.navigateByUrl(`/core/agreement-administrator/agreement-list`);
  }

  dashboardNationalSupervisor() {
    // this.router.navigateByUrl(`/core/dashboards/national-supervisor`);
    this.router.navigateByUrl(`/core/national-supervisor/agreement-list`);
  }

  dashboardInternationalSupervisor() {
    // this.router.navigateByUrl(`/core/dashboards/international-supervisor`);
    this.router.navigateByUrl(`/core/international-supervisor/agreement-list`);
  }

  dashboardNationalManager() {
    this.router.navigateByUrl(`/core/national-manager/agreement-list`);
  }

  dashboardInternationalManager() {
    this.router.navigateByUrl(`/core/international-manager/agreement-list`);
  }

  passwordReset() {
    this.router.navigateByUrl(`/password-reset`);
  }
}
