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
