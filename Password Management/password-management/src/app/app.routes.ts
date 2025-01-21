import { Routes } from '@angular/router';
import { authGuard } from './guards/auth.guard';
import { loginGuard } from './guards/login.guard';

export const routes: Routes = [
    {
        path: '',
        loadChildren: () =>
            import('./pages/account/account.routes').then(
                (r) => r.accountRoutes
            ),
        
    },
    {
        path: 'manager',
        loadChildren: () =>
            import('./pages/manager/manager.routes').then(
                (r) => r.managerRoutes
            ),
        canActivate: [authGuard],
    },
];
