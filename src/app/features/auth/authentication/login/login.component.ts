import {Component, inject, ViewEncapsulation} from '@angular/core';
import {AbstractControl, FormBuilder, FormGroup, Validators} from '@angular/forms';

import {PrimeIcons} from "primeng/api";

import {CoreService, RoutesService, AuthHttpService, AuthService, MessageDialogService} from '@core/services';
import {LoginFormEnum} from "@core/enums";
import {environment} from "@env/environment";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  standalone:false,
})

export class LoginComponent {
  //Services
  protected readonly authService = inject(AuthService);
  private readonly authHttpService = inject(AuthHttpService);
  protected readonly coreService = inject(CoreService);
  private readonly formBuilder = inject(FormBuilder);
  private readonly routesService = inject(RoutesService);
  protected readonly messageDialogService = inject(MessageDialogService);

  //Form
  protected form!: FormGroup;
  protected formErrors: string[] = [];

  //Enums
  protected readonly PrimeIcons = PrimeIcons;
  protected readonly LoginFormEnum = LoginFormEnum;
  protected readonly environment = environment;

  constructor() {
    this.authService.removeLogin();
    this.buildForm();
  }

  buildForm() {
    this.form = this.formBuilder.group({
      // username: ['juan.perez', [Validators.required,Validators.pattern(userName())]],
      username: [null, [Validators.required]],
      // password: ['123', [Validators.required]],
      password: [null, [Validators.required]],
    });

    this.checkValueChanges();
  }

  checkValueChanges() {

  }

  onSubmit() {
    if (this.usernameField.value) this.usernameField.patchValue(this.usernameField.value.trim());

    if (this.form.valid) {
      this.login();
    } else {
      this.form.markAllAsTouched();
      this.messageDialogService.fieldErrors(this.formErrors);
    }
  }

  login() {
    this.authService.removeLogin();

    this.authHttpService.login(this.form.value)
      .subscribe(
        response => {
          if (this.authService.roles.length === 0) {
            this.messageDialogService.errorCustom('Sin Rol', 'No cuenta con un rol asignado');
            this.authService.removeLogin();
            return;
          }

          this.routesService.roleSelect();
        });
  }

  validateForm() {
    this.formErrors = [];

    if (this.usernameField.invalid) this.formErrors.push(LoginFormEnum.username);

    if (this.passwordField.invalid) this.formErrors.push(LoginFormEnum.password);
  }

  /** Getters **/
  get usernameField(): AbstractControl {
    return this.form.controls['username'];
  }

  get passwordField(): AbstractControl {
    return this.form.controls['password'];
  }
}
