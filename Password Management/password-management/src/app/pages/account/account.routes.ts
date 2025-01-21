import { Routes } from '@angular/router';
import { LoginPage } from './login/login.page';
import { AccountPage } from './account.page';
import { SetPasswordPage } from './set-password/set-password.page';
import { loginGuard } from 'src/app/guards/login.guard';
import { ResetPasswordPage } from './reset-password/reset-password.page';
import { authGuard } from 'src/app/guards/auth.guard';

export const accountRoutes: Routes = [
    {
        path: '',
        component: AccountPage,

        children: [
            { path: '', redirectTo: 'login', pathMatch: 'full' },
            { path: 'login', component: LoginPage, canActivate: [loginGuard] },
            {
                path: 'set-password',
                component: SetPasswordPage,
                canActivate: [loginGuard],
            },
           
        ],
    },
];
