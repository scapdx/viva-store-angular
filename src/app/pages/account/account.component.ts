import { Component, OnInit, signal } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { User } from '../../core/models/user';
import { AuthService } from '../../core/services/auth.service';
import { UserService } from '../../core/services/user.service';

@Component({
  selector: 'app-account',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './account.component.html',
})
export class AccountComponent implements OnInit {
  readonly user = signal<User | null>(null);
  readonly loading = signal(true);
  readonly error = signal('');

  constructor(
    private readonly authService: AuthService,
    private readonly userService: UserService,
    private readonly router: Router,
  ) {}

  ngOnInit(): void {
    const session = this.authService.session();
    if (!session) {
      void this.router.navigateByUrl('/login');
      return;
    }

    this.userService.getUser(session.userId).subscribe({
      next: (user) => {
        this.user.set(user);
        this.loading.set(false);
      },
      error: () => {
        this.error.set('Nao foi possivel carregar os dados da conta.');
        this.loading.set(false);
      },
    });
  }
}
