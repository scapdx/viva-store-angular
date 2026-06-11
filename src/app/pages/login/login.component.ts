import { Component, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './login.component.html',
})
export class LoginComponent {
  username = 'mor_2314';
  password = '83r5^_';
  readonly loading = signal(false);
  readonly error = signal('');

  constructor(
    private readonly authService: AuthService,
    private readonly router: Router,
  ) {}

  login(): void {
    this.error.set('');
    this.loading.set(true);

    this.authService.login(this.username, this.password).subscribe({
      next: () => {
        this.loading.set(false);
        void this.router.navigateByUrl('/minha-conta');
      },
      error: () => {
        this.error.set('Usuario ou senha invalidos. Confira os dados e tente novamente.');
        this.loading.set(false);
      },
    });
  }
}
