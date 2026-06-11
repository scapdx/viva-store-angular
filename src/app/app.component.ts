import { Component, computed } from '@angular/core';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { AuthService } from './core/services/auth.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterLink, RouterOutlet],
  templateUrl: './app.component.html',
})
export class AppComponent {
  readonly isLoggedIn = computed(() => Boolean(this.authService.session()));

  constructor(
    private readonly authService: AuthService,
    private readonly router: Router,
  ) {}

  logout(): void {
    this.authService.logout();
    void this.router.navigateByUrl('/');
  }
}
