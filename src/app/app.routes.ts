import {Routes} from '@angular/router';
import {MainComponent} from './layout/main/main.component';
import {BlankComponent} from './layout/blank/blank.component';
import {FooterComponent} from './layout/footer/footer.component';

export const routes: Routes = [
  {
    path: '',
    component: MainComponent,
    children: [
      {
        path: 'dashboards',
        loadChildren: () => import('./features/dashboard/dashboard.module').then(m => m.DashboardModule)
      }
    ]

  },

  {
    path: 'auth',
    component: BlankComponent,
    loadChildren: () => import('./features/auth/auth.module').then(m => m.AuthModule),
  },

  {
    path: 'login',
    redirectTo: '/auth/authentication/login',
  }
];
