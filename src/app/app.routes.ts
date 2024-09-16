import { Routes } from '@angular/router';
import { AuthComponent } from './components/auth/auth/auth.component';
import { ForumComponent } from './components/forum/forum.component';
import { AuthGuard } from './guards/auth.guard';

export const routes: Routes = [
    { path: 'auth', component: AuthComponent },
    { path: 'forum', component: ForumComponent, canActivate: [AuthGuard] },
    { path: '', redirectTo: 'auth', pathMatch: 'full' },
    { path: '**', redirectTo: 'auth' }
  ];
  
