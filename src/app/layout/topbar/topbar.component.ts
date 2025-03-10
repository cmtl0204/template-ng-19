import {Component, inject, ViewEncapsulation} from '@angular/core';
import {MenuItem, PrimeIcons, PrimeTemplate} from 'primeng/api';
import {AuthHttpService, AuthService, BreadcrumbService, CoreService, RoutesService} from '@core/services';
import {environment} from "@env/environment";
import {Menubar} from 'primeng/menubar';
import {Button} from 'primeng/button';
import {Tooltip} from 'primeng/tooltip';

@Component({
  selector: 'app-topbar',
  templateUrl: './topbar.component.html',
  styleUrls: ['./topbar.component.scss'],
  standalone: true,
  imports: [
    Menubar,
    Button,
    PrimeTemplate,
    Tooltip
  ],
  encapsulation: ViewEncapsulation.None
})
export class TopbarComponent {
  protected readonly PrimeIcons = PrimeIcons;
  protected items: MenuItem[] = [];
  protected home!: MenuItem;
  protected menu!: MenuItem;
  protected nickname!: string;

  protected readonly breadcrumbService = inject(BreadcrumbService);
  protected readonly coreService = inject(CoreService);
  private readonly authHttpService = inject(AuthHttpService);
  public readonly authService = inject(AuthService);
  private readonly routesService = inject(RoutesService);

  constructor() {
    if (this.authService.auth) {
      this.nickname = `${this.authService.auth.name} ${this.authService.auth.lastname}`;
    }

    this.home = {label: 'Home', icon: PrimeIcons.HOME, routerLink: `/core/dashboards/${this.authService.role?.code}`};

    this.menu = {label: 'Menú', icon: PrimeIcons.LIST, command: () => this.coreService.sidebarVisible = true};

    this.items.push(this.menu);
  }

  signOut() {
    this.authHttpService.signOut();
  }

  protected readonly environment = environment;
}
