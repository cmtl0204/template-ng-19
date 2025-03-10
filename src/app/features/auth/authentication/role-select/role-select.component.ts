import {Component, inject, OnInit, ViewEncapsulation} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {PrimeIcons} from "primeng/api";
import {RoleModel} from "@core/interfaces";
import {AuthService,CoreService, MessageDialogService, RoutesService} from '@core/services';
import {LoginFormEnum} from "@core/enums";

@Component({
  selector: 'app-role-select',
  templateUrl: './role-select.component.html',
  styleUrls: ['./role-select.component.scss'],
  standalone:false,
  encapsulation: ViewEncapsulation.None
})
export class RoleSelectComponent implements OnInit {
  //Services
  protected readonly coreService = inject(CoreService);
  private readonly formBuilder = inject(FormBuilder);
  public readonly messageDialogService = inject(MessageDialogService);
  protected readonly authService = inject(AuthService);
  protected readonly routesService = inject(RoutesService);

  //Form
  protected form!: FormGroup;
  protected roles: RoleModel[] = [];

  //Enums
  protected readonly LoginFormEnum = LoginFormEnum;
  protected readonly PrimeIcons = PrimeIcons;

  constructor() {
    this.buildForm();
  }

  ngOnInit(): void {
    this.roles = this.authService.roles;
  }

  buildForm(): void {
    this.form = this.formBuilder.group({
        role: [null, [Validators.required]]
      }
    );
  }

  onSubmit() {
    if (this.form.valid) {
      this.selectRole();
    } else {
      this.form.markAllAsTouched();
    }
  }

  selectRole() {
    this.authService.role = this.roleField.value;

    this.authService.selectDashboard();
  }

  redirectLogin() {
    this.routesService.login();
  }

  get roleField() {
    return this.form.controls['role'];
  }
}
