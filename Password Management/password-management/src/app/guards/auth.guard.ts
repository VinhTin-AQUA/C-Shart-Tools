import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import {  AccountService } from '../pages/account/account.service';

export  const authGuard: CanActivateFn = async (route, state) => {
    const accountService = inject(AccountService)
    const router = inject(Router);
    const check = await accountService.isLoggedIn();

    if(check === false) {
        router.navigateByUrl('/login')
    }
    return true;
};
