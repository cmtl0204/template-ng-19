import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ActivatedRoute} from "@angular/router";
import {PrimeIcons} from "primeng/api";
import {CustomValidators} from "@shared/validators";
import {CoreService, MessageDialogService,AuthHttpService, AuthService} from '@core/services';

@Component({
  selector: 'app-password-change',
  templateUrl: './password-change.component.html',
  styleUrls: ['./password-change.component.scss'],
  standalone:false,
})
export class PasswordChangeComponent implements OnInit {
  protected readonly PrimeIcons = PrimeIcons;
  form: FormGroup;

  constructor(
    private authHttpService: AuthHttpService,
    private authService: AuthService,
    private activatedRoute: ActivatedRoute,
    protected coreService: CoreService,
    private formBuilder: FormBuilder,
    public messageDialogService: MessageDialogService,
  ) {
    this.form = this.newForm();
  }

  ngOnInit(): void {

  }

  newForm(): FormGroup {
    return this.formBuilder.group({
      passwordConfirmation: [null, [Validators.required]],
      passwordNew: [null, [Validators.required, Validators.minLength(8)]],
      passwordOld: [null, [Validators.required]],
    }, {validators: CustomValidators.passwordMatchValidator});
  }

  onSubmit() {
    if (this.form.valid) {
      this.changePassword();
    } else {
      this.form.markAllAsTouched();
      // this.messageDialogService.fieldErrors();
    }
  }

  changePassword() {
    this.authHttpService.changePassword(this.authService.auth.id, this.form.value).subscribe((_) => {
    });
  }

  get passwordConfirmationField() {
    return this.form.controls['passwordConfirmation'];
  }

  get passwordNewField() {
    return this.form.controls['passwordNew'];
  }

  get passwordOldField() {
    return this.form.controls['passwordOld'];
  }
}
