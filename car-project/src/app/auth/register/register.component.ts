import { Component } from '@angular/core';
import { AuthService } from 'src/app/shared/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  token = !!localStorage.getItem('token');

  email: string = '';
  password: string = '';
  rePassword: string = '';

  constructor(private auth: AuthService) {}

  register() {
    if (this.email === '') {
      alert('Please enter email!');
      return;
    }

    if (this.password == '') {
      alert('Please enter password!');
      return;
    }

    if(this.rePassword !== this.password) {
      alert('Password doesn\'t match!');
      return;
    }

    this.auth.register(this.email, this.password);
    
    this.email = '';
    this.password = '';
    this.rePassword = '';
    
  }
}
