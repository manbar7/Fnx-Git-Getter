import { Routes} from '@angular/router';
import { HomeComponent} from '../app/components/home/home.component'
import { LoginComponent } from './components/login/login.component';
import { AuthGuard } from './guard/auth-guard.service';

export const ROUTES :Routes = 
[
    {
        path: '',
        pathMatch: 'full',
        redirectTo: 'login',
    },
    {
        path: 'home',
         component: HomeComponent,canActivate: [AuthGuard]
    },
    {
        path: 'login',
         component: LoginComponent
    }
]