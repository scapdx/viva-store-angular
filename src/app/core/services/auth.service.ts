import { HttpClient } from '@angular/common/http';
import { Injectable, signal } from '@angular/core';
import { Observable, map, switchMap, tap } from 'rxjs';
import { Session } from '../models/session';
import { UserService } from './user.service';

interface LoginResponse {
  token: string;
}

@Injectable({ providedIn: 'root' })
export class AuthService {
  private readonly apiUrl = 'https://fakestoreapi.com/auth/login';
  private readonly storageKey = 'vivaStoreSession';
  readonly session = signal<Session | null>(this.loadSession());

  constructor(
    private readonly http: HttpClient,
    private readonly userService: UserService,
  ) {}

  login(username: string, password: string): Observable<Session> {
    return this.http.post<LoginResponse>(this.apiUrl, { username, password }).pipe(
      switchMap((auth) =>
        this.userService.getUsers().pipe(
          map((users) => {
            const user = users.find((item) => item.username === username) ?? users[0];
            return {
              token: auth.token,
              userId: user.id,
              username: user.username,
            };
          }),
        ),
      ),
      tap((session) => this.saveSession(session)),
    );
  }

  logout(): void {
    localStorage.removeItem(this.storageKey);
    this.session.set(null);
  }

  private saveSession(session: Session): void {
    localStorage.setItem(this.storageKey, JSON.stringify(session));
    this.session.set(session);
  }

  private loadSession(): Session | null {
    const storedSession = localStorage.getItem(this.storageKey);
    if (!storedSession) {
      return null;
    }

    try {
      return JSON.parse(storedSession) as Session;
    } catch {
      localStorage.removeItem(this.storageKey);
      return null;
    }
  }
}
