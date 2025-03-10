import {Component, inject, OnInit, ViewEncapsulation} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {PrimeIcons} from "primeng/api";
import {CustomValidators} from "@shared/validators";
import {CoreService, RoutesService, AuthHttpService, AuthService} from '@core/services';
import {LoginFormEnum} from "@core/enums";

@Component({
  selector: 'app-password-reset',
  templateUrl: './password-reset.component.html',
  styleUrls: ['./password-reset.component.scss'],
  standalone:false,
  encapsulation: ViewEncapsulation.None
})
export class PasswordResetComponent implements OnInit {
  //Services
  protected readonly coreService = inject(CoreService);
  private readonly formBuilder = inject(FormBuilder);
  private readonly authHttpService = inject(AuthHttpService);
  protected readonly authService = inject(AuthService);
  protected readonly routesService = inject(RoutesService);

  //Form
  protected form!: FormGroup;

  //Enums
  protected readonly PrimeIcons = PrimeIcons;

  //Flags
  protected isValidTransactionalCode: boolean = false;
  protected isRequestTransactionalCode: boolean = false;

  constructor() {
    this.buildForm();
  }

  ngOnInit(): void {
  }

  buildForm(): void {
    this.form = this.formBuilder.group({
      transactionalCode: [null, [Validators.required, Validators.minLength(6)]],
      passwordNew: [null, [Validators.required, Validators.minLength(8)]],
      passwordConfirmation: [null, [Validators.required]],
      username: [null, [Validators.required]],
    }, {validators: CustomValidators.passwordMatchValidator});
  }

  onSubmit() {
    if (this.form.valid) {
      this.resetPassword();
    } else {
      this.form.markAllAsTouched();
    }
  }

  resetPassword() {
    this.authHttpService.resetPassword(this.form.value).subscribe(() => this.routesService.login());
  }

  requestTransactionalCode() {
    if (this.usernameField.valid) {
      this.isRequestTransactionalCode = false;
      this.transactionalCodeField.reset();
      this.authHttpService.requestTransactionalCode(this.usernameField.value).subscribe(
        () => this.isRequestTransactionalCode = true);
    } else {
      this.usernameField.markAsTouched();
    }
  }

  verifyTransactionalCode() {
    if (this.usernameField.valid) {
      this.isValidTransactionalCode = false;
      this.authHttpService.verifyTransactionalCode(this.transactionalCodeField.value, this.usernameField.value).subscribe(
        () => this.isValidTransactionalCode = true);
    } else {
      this.transactionalCodeField.markAsTouched();
    }
  }

  redirectLogin() {
    this.routesService.login();
  }

  get usernameField() {
    return this.form.controls['username'];
  }

  get transactionalCodeField() {
    return this.form.controls['transactionalCode'];
  }

  get passwordNewField() {
    return this.form.controls['passwordNew'];
  }

  get passwordConfirmationField() {
    return this.form.controls['passwordConfirmation'];
  }

  protected readonly LoginFormEnum = LoginFormEnum;
}
