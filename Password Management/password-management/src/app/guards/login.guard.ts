import { CanActivateFn, Router } from '@angular/router';
import { AccountService } from '../pages/account/account.service';
import { inject } from '@angular/core';

export const loginGuard: CanActivateFn = async (route, state) => {
    const accountService = inject(AccountService);
    const router = inject(Router);

    const check = await accountService.isLoggedIn();

    if (check === true) {
        router.navigateByUrl('/manager');
    }

    return true;
};
