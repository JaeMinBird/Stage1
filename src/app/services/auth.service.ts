import { Injectable } from '@angular/core';
import { createClient, SupabaseClient, User } from '@supabase/supabase-js';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private supabase: SupabaseClient;
  private currentUserSubject = new BehaviorSubject<User | null>(null);
  public currentUser$: Observable<User | null> = this.currentUserSubject.asObservable();

  constructor(private router: Router) {
    this.supabase = createClient(environment.supabaseUrl, environment.supabaseKey);
    
    // Try to recover session on init
    this.loadUser();
    
    // Set up auth state change listener
    this.supabase.auth.onAuthStateChange((event, session) => {
      if (session) {
        this.currentUserSubject.next(session.user);
      } else {
        this.currentUserSubject.next(null);
      }
    });
  }

  private async loadUser() {
    const { data } = await this.supabase.auth.getSession();
    this.currentUserSubject.next(data.session?.user || null);
  }

  async signUp(email: string, password: string) {
    const { data, error } = await this.supabase.auth.signUp({
      email,
      password
    });
    
    if (error) {
      throw error;
    }
    
    if (data?.user) {
      this.currentUserSubject.next(data.user);
      this.router.navigate(['/dashboard']);
    }
    
    return data;
  }

  async signIn(email: string, password: string) {
    const { data, error } = await this.supabase.auth.signInWithPassword({
      email,
      password
    });
    
    if (error) {
      throw error;
    }
    
    if (data?.user) {
      this.currentUserSubject.next(data.user);
      this.router.navigate(['/dashboard']);
    }
    
    return data;
  }

  async signOut() {
    await this.supabase.auth.signOut();
    this.currentUserSubject.next(null);
    this.router.navigate(['/']);
  }

  get currentUser(): User | null {
    return this.currentUserSubject.value;
  }

  get isAuthenticated(): boolean {
    return !!this.currentUserSubject.value;
  }
}
