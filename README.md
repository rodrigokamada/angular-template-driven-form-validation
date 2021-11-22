# Angular Validation


Application example built with [Angular 13](https://angular.io/) and adding form validation.

This tutorial was posted on my [blog](https://rodrigo.kamada.com.br/blog/adicionando-validacao-no-formulario-em-uma-aplicacao-angular) in portuguese and on the [DEV Community]() in english.



[![Website](https://shields.braskam.com/v1/shields?name=website&format=rectangle&size=small&radius=5)](https://rodrigo.kamada.com.br)
[![LinkedIn](https://shields.braskam.com/v1/shields?name=linkedin&format=rectangle&size=small&radius=5)](https://www.linkedin.com/in/rodrigokamada)
[![Twitter](https://shields.braskam.com/v1/shields?name=twitter&format=rectangle&size=small&radius=5&socialAccount=rodrigokamada)](https://twitter.com/rodrigokamada)



## Prerequisites


Before you start, you need to install and configure the tools:

* [git](https://git-scm.com/)
* [Node.js and npm](https://nodejs.org/)
* [Angular CLI](https://angular.io/cli)
* IDE (e.g. [Visual Studio Code](https://code.visualstudio.com/))



## Getting started


### Create the Angular application


**1.** Let's create the application with the Angular base structure using the `@angular/cli` with the route file and the SCSS style format.

```powershell
ng new angular-validation --routing true --style scss
CREATE angular-validation/README.md (1063 bytes)
CREATE angular-validation/.editorconfig (274 bytes)
CREATE angular-validation/.gitignore (620 bytes)
CREATE angular-validation/angular.json (3279 bytes)
CREATE angular-validation/package.json (1082 bytes)
CREATE angular-validation/tsconfig.json (863 bytes)
CREATE angular-validation/.browserslistrc (600 bytes)
CREATE angular-validation/karma.conf.js (1435 bytes)
CREATE angular-validation/tsconfig.app.json (287 bytes)
CREATE angular-validation/tsconfig.spec.json (333 bytes)
CREATE angular-validation/src/favicon.ico (948 bytes)
CREATE angular-validation/src/index.html (303 bytes)
CREATE angular-validation/src/main.ts (372 bytes)
CREATE angular-validation/src/polyfills.ts (2338 bytes)
CREATE angular-validation/src/styles.scss (80 bytes)
CREATE angular-validation/src/test.ts (745 bytes)
CREATE angular-validation/src/assets/.gitkeep (0 bytes)
CREATE angular-validation/src/environments/environment.prod.ts (51 bytes)
CREATE angular-validation/src/environments/environment.ts (658 bytes)
CREATE angular-validation/src/app/app-routing.module.ts (245 bytes)
CREATE angular-validation/src/app/app.module.ts (393 bytes)
CREATE angular-validation/src/app/app.component.scss (0 bytes)
CREATE angular-validation/src/app/app.component.html (23364 bytes)
CREATE angular-validation/src/app/app.component.spec.ts (1109 bytes)
CREATE angular-validation/src/app/app.component.ts (223 bytes)
✔ Packages installed successfully.
    Successfully initialized git.
```

**2.** Install and configure the Bootstrap CSS framework. Do steps 2 and 3 of the post *[Adding the Bootstrap CSS framework to an Angular application](https://github.com/rodrigokamada/angular-bootstrap)*.

**3.** Create the `EmailValidatorDirective` directive.

```powershell
ng generate directive email-validator --skip-tests=true
CREATE src/app/email-validator.directive.ts (157 bytes)
UPDATE src/app/app.module.ts (592 bytes)
```

**4.** Change the `src/app/email-validator.directive.ts` file. Implement the `Validator` interface as below.

```typescript
import { Directive } from '@angular/core';
import { NG_VALIDATORS, AbstractControl, Validator, ValidationErrors } from '@angular/forms';

@Directive({
  selector: '[appEmailValidator]',
  providers: [{
    provide: NG_VALIDATORS,
    useExisting: EmailValidatorDirective,
    multi: true,
  }],
})
export class EmailValidatorDirective implements Validator {

  private EMAIL_REGEXP = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;

  constructor() {
  }

  public validate(control: AbstractControl): ValidationErrors | null {
    const isValid = this.EMAIL_REGEXP.test(control.value);

    if (isValid) {
      return null;
    } else {
      return {
        emailValidator: {
          valid: false,
        },
      };
    }
  }

}
```

**5.** Change the `src/app/app.component.ts` file. Import the `NgForm` service, create the `User` interface and create the `validate` method as below.

```typescript
import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';

interface User {
  name: string;
  nickname: string;
  email: string;
  password: string;
  showPassword: boolean
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {

  user: User;

  constructor() {
    this.user = {} as User;
  }

  public validate(form: NgForm): void {
    if (form.invalid) {
      for (const control of Object.keys(form.controls)) {
        form.controls[control].markAsTouched();
      }
      return;
    }
  }

}
```

**6.** Change the `src/app/app.component.html` file and add the menu as below.

```html
<div class="container-fluid py-3">
  <h1>Angular Validation</h1>

  <div class="row justify-content-center my-5">
    <div class="col-4">
      <form #form="ngForm">
        <div class="row">
          <div class="col mb-2">
            <label for="name" class="form-label">Name:</label>
            <input type="text" id="name" name="name" #name="ngModel" [(ngModel)]="user.name" placeholder="Your name" required minlength="1" maxlength="250" emailValidator class="form-control form-control-sm" [class.is-invalid]="name.invalid && (name.dirty || name.touched)">
            <div *ngIf="name.invalid && (name.dirty || name.touched)" class="invalid-feedback">
              <div *ngIf="name.errors?.['required']">
                This field is required.
              </div>
              <div *ngIf="name.errors?.['minlength']">
                This field must have at least 1 character.
              </div>
              <div *ngIf="name.errors?.['maxlength']">
                This field must have at most 250 characters.
              </div>
            </div>
          </div>
        </div>
        <div class="row">
          <div class="col mb-2">
            <label for="nickname" class="form-label">Nickname:</label>
            <input type="text" id="nickname" name="nickname" #nickname="ngModel" [(ngModel)]="user.nickname" placeholder="Your nickname" maxlength="150" class="form-control form-control-sm" [class.is-invalid]="nickname.invalid && (nickname.dirty || nickname.touched)">
            <div *ngIf="name.invalid && (name.dirty || name.touched)" class="invalid-feedback">
              <div *ngIf="name.errors?.['maxlength']">
                This field must have at most 150 characters.
              </div>
            </div>
          </div>
        </div>
        <div class="row">
          <div class="col mb-2">
            <label for="email" class="form-label">Email:</label>
            <input type="email" id="email" name="email" #email="ngModel" [(ngModel)]="user.email" placeholder="your-name@provider.com" required minlength="1" maxlength="250" appEmailValidator class="form-control form-control-sm" [class.is-invalid]="email.invalid && (email.dirty || email.touched)">
            <div *ngIf="email.invalid && (email.dirty || email.touched)" class="invalid-feedback">
              <div *ngIf="email.errors?.['required']">
                This field is required.
              </div>
              <div *ngIf="email.errors?.['minlength']">
                This field must have at least 1 character.
              </div>
              <div *ngIf="email.errors?.['maxlength']">
                This field must have at most 250 characters.
              </div>
              <div *ngIf="!email.errors?.['required'] && !email.errors?.['minlength'] && !email.errors?.['maxlength'] && email.errors?.['emailValidator']">
                Invalid email format.
              </div>
            </div>
          </div>
        </div>
        <div class="row">
          <div class="col mb-2">
            <label for="password" class="form-label">Password:</label>
            <div class="input-group input-group-sm has-validation">
              <input [type]="user.showPassword ? 'text' : 'password'" id="password" name="password" #password="ngModel" [(ngModel)]="user.password" required minlength="15" class="form-control form-control-sm" [class.is-invalid]="password.invalid && (password.dirty || password.touched)">
              <button type="button" class="btn btn-outline-secondary" (click)="user.showPassword = !user.showPassword">
                <i class="bi" [ngClass]="{'bi-eye-fill': !user.showPassword, 'bi-eye-slash-fill': user.showPassword}"></i>
              </button>
              <div *ngIf="password.invalid && (password.dirty || password.touched)" class="invalid-feedback">
                <div *ngIf="password.errors?.['required']">
                  This field is required.
                </div>
                <div *ngIf="password.errors?.['minlength']">
                  This field must have at least 15 characters.
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="row">
          <div class="col mb-2 d-grid">
            <button type="button" class="btn btn-sm btn-primary" (click)="validate(form)">Validate</button>
          </div>
        </div>
      </form>
    </div>
  </div>
</div>
```

**7.** Import the `FormsModule` module and the `EmailValidatorDirective` directive. Change the `app.module.ts` file and add the lines as below.

```typescript
import { FormsModule } from '@angular/forms';

import { EmailValidatorDirective } from './email-validator.directive';

declarations: [
  AppComponent,
  EmailValidatorDirective,
],
imports: [
  BrowserModule,
  FormsModule,
  AppRoutingModule,
],
```

**8.** Run the application with the command below.

```powershell
npm start

> angular-validation@1.0.0 start
> ng serve

✔ Browser application bundle generation complete.

Initial Chunk Files   | Names         |      Size
vendor.js             | vendor        |   2.38 MB
styles.css, styles.js | styles        | 486.75 kB
polyfills.js          | polyfills     | 339.09 kB
scripts.js            | scripts       |  76.33 kB
main.js               | main          |  29.11 kB
runtime.js            | runtime       |   6.87 kB

                      | Initial Total |   3.30 MB

Build at: 2021-11-22T16:32:20.056Z - Hash: 1789217f1a21bafa - Time: 3632ms

** Angular Live Development Server is listening on localhost:4200, open your browser on http://localhost:4200/ **


✔ Compiled successfully.
```

**19** Ready! Access the URL `http://localhost:4200/` and check if the application is working. See the application working on [GitHub Pages](https://rodrigokamada.github.io/angular-validation/) and [Stackblitz](https://stackblitz.com/edit/angular13-validation).

![Angular Validation](https://res.cloudinary.com/rodrigokamada/image/upload/v1637606970/Blog/angular-validation/angular-validation.png)



## Cloning the application

**1.** Clone the repository.

```powershell
git clone git@github.com:rodrigokamada/angular-validation.git
```

**2.** Install the dependencies.

```powershell
npm ci
```

**3.** Run the application.

```powershell
npm start
```