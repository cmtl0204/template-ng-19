import {Component} from '@angular/core';
import {RouterOutlet} from '@angular/router';

@Component({
  selector: 'app-blank',
  templateUrl: './blank.component.html',
  styleUrls: ['./blank.component.scss'],
  standalone: true,
  imports: [
    RouterOutlet
  ]
})
export class BlankComponent {
}
