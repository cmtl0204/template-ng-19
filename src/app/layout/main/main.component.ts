import {Component, inject} from '@angular/core';
import {AuthService} from "@core/services";
import {RouterOutlet} from '@angular/router';
import {TopbarComponent} from '../topbar/topbar.component';
import {BreadcrumbComponent} from '../breadcrumb/breadcrumb.component';
import {FooterComponent} from '../footer/footer.component';
import {SidebarComponent} from '../sidebar/sidebar.component';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
  standalone: true,
  imports: [
    RouterOutlet,
    TopbarComponent,
    SidebarComponent,
    BreadcrumbComponent,
    FooterComponent
  ]
})
export class MainComponent {
  private readonly authService = inject(AuthService);

  constructor() {
    // this.authService.selectDashboard();
  }

}
