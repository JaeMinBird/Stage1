# LycheeLock Stage 1 -- Auth App

This is an Angular application with Supabase authentication. It includes email/password authentication, protected routes, and user session management.

## Features

- Email/password authentication using Supabase
- Login and signup forms
- Protected dashboard route
- Authentication state management
- User session persistence

## Setup

1. Clone this repository
2. Install dependencies:
   ```
   npm install
   ```
3. Update your Supabase credentials in `src/environments/environment.ts`:
   ```typescript
   export const environment = {
     production: false,
     supabaseUrl: 'YOUR_SUPABASE_URL',
     supabaseKey: 'YOUR_SUPABASE_ANON_KEY'
   };
   ```
4. Run the development server:
   ```
   npm start
   ```

## Application Structure

- **Auth Component (`/`)**: Login and signup forms
- **Dashboard Component (`/dashboard`)**: Protected page only accessible after authentication
- **AuthService**: Manages Supabase authentication (sign in, sign up, sign out)
- **AuthGuard**: Protects routes from unauthorized access

## How It Works

1. Users can sign up or log in from the root route (`/`)
2. Upon successful authentication, they are redirected to the dashboard (`/dashboard`)
3. The dashboard is protected and only accessible to authenticated users
4. If a user tries to access the dashboard without authentication, they are redirected to the login page
5. The auth state is persisted across the application using the Supabase client

## Technologies Used

- Angular
- Supabase (Authentication)
- RxJS (Observable state management)

## Supabase SQL Setup
- Default settings

# LycheeLock Stage 2 -- TOTP Enabled