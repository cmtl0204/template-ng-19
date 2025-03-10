import {Component, inject, ViewEncapsulation} from '@angular/core';
import {Subscription} from 'rxjs';
import {MenuItem, PrimeIcons} from 'primeng/api';
import {AuthHttpService, AuthService, BreadcrumbService, CoreService, RoutesService} from '@core/services';
import {environment} from "@env/environment";
import {Router} from "@angular/router";
import {Breadcrumb} from 'primeng/breadcrumb';
import {SharedModule} from '@shared/shared.module';

@Component({
  selector: 'app-breadcrumb',
  templateUrl: './breadcrumb.component.html',
  styleUrls: ['./breadcrumb.component.scss'],
  standalone: true,
  imports: [
    Breadcrumb,
    SharedModule
  ],
  encapsulation: ViewEncapsulation.None
})
export class BreadcrumbComponent {
  protected readonly PrimeIcons = PrimeIcons;
  protected readonly HOST_URL: string = environment.API_URL;
  protected subscription: Subscription;
  protected items: MenuItem[] = [];
  protected home: MenuItem;
  protected nickname!: string;

  protected readonly breadcrumbService = inject(BreadcrumbService);
  protected readonly coreService = inject(CoreService);
  private readonly authHttpService = inject(AuthHttpService);
  protected readonly authService = inject(AuthService);
  private readonly routesService = inject(RoutesService);
  private readonly router = inject(Router);

  constructor() {
    if (this.authService.auth) {
      this.nickname = `${this.authService.auth.username} - ${this.authService.role.name}`;
    }

    this.subscription = this.breadcrumbService.itemsHandler.subscribe(response => {
      this.items = response as MenuItem[];
    });

    // this.home = {icon: PrimeIcons.HOME, routerLink: `/core/dashboards/${this.authService.role?.code}`};
    this.home = {icon: PrimeIcons.HOME};
  }


  redirectProfile() {
    this.router.navigate([this.routesService.profile]);
  }

  updateSystem() {
    this.coreService.updateSystem();
  }
}
