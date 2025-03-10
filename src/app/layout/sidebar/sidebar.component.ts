import {Component, inject, OnInit} from '@angular/core';
import {MenuItem, PrimeIcons} from 'primeng/api';
import {
  CoreService,
  MessageDialogService,
  RoutesService,
  AuthHttpService,
  AuthService, MenusHttpService,
} from "@core/services";
import {format} from "date-fns";
import {Router} from "@angular/router";
import {Sidebar} from 'primeng/sidebar';
import {PanelMenu} from 'primeng/panelmenu';
import {Dialog} from 'primeng/dialog';
import {AboutComponent} from '../about/about.component';
import {environment} from '@env/environment';
import {Drawer} from 'primeng/drawer';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
  standalone: true,
  imports: [
    PanelMenu,
    Dialog,
    AboutComponent,
    Drawer
  ]
})
export class SidebarComponent implements OnInit {
  protected readonly PrimeIcons = PrimeIcons;
  protected menus: MenuItem[] = [];
  protected isVisibleAbout: boolean = false;

  protected readonly coreService = inject(CoreService);
  private readonly authHttpService = inject(AuthHttpService);
  protected readonly authService = inject(AuthService);
  protected readonly menusHttpService = inject(MenusHttpService);
  protected readonly messageDialogService = inject(MessageDialogService);
  protected readonly routesService = inject(RoutesService);
  protected readonly router = inject(Router);
  protected currentYear: string;
  protected appCompanyName: string;

  constructor() {
    this.currentYear = format(new Date(), 'yyyy');
    this.appCompanyName = environment.APP_COMPANY_NAME;
  }

  ngOnInit(): void {
    this.getMenus();
  }

  getMenus() {
    if (this.authService.role) {
      this.menusHttpService.getMenusByRole(this.authService.role.id!).subscribe(
        menus => {
          this.menus = menus.map(menu => {
            return {
              label: menu.label,
              icon: menu.icon,
              command: () => {
                this.coreService.sidebarVisible = false;
                this.router.navigate([menu.routerLink])
              }
            }
          });

          this.menus.push({
            label: 'Cerrar Sesión',
            icon: PrimeIcons.POWER_OFF,
            command: () => {
              this.coreService.sidebarVisible = false;
              this.authHttpService.signOut();
            }
          });

        }
      );
    }
  }

  signOut() {
    this.authHttpService.signOut();
  }

  about() {
    this.isVisibleAbout = true;
  }
}
