import { Routes } from '@angular/router';
import { SettingsPage } from './settings/settings.page';
import { HomePage } from './home/home.page';
import { AddAccountPage } from './add-account/add-account.page';
import { ManagerPage } from './manager.page';
import { EditAccountPage } from './edit-account/edit-account.page';
import { AboutPage } from './about/about.page';
import { ResetPasswordPage } from './reset-password/reset-password.page';
import { authGuard } from 'src/app/guards/auth.guard';

export const managerRoutes: Routes = [
    {
        path: '',
        component: ManagerPage,
        children: [
            { path: '', redirectTo: 'home', pathMatch: 'full' },
            {
                path: 'home',
                component: HomePage,
                title: 'Home',
            },
            {
                path: 'settings',
                component: SettingsPage,
                title: 'Settings',
            },
            {
                path: 'add-account',
                component: AddAccountPage,
                title: 'Add account',
            },
            {
                path: 'edit-account/:id',
                component: EditAccountPage,
                title: 'Edit account',
            },
            {
                path: 'about',
                component: AboutPage,
                title: 'About',
            },
            {
                path: 'reset-password',
                component: ResetPasswordPage,
                title: 'Reset password',
                canActivate: [authGuard],
            },
        ],
    },
];
