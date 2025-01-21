import { inject, Injectable } from '@angular/core';
import { Preferences } from '@capacitor/preferences';
import * as bcrypt from 'bcrypt';

@Injectable({
    providedIn: 'root',
})
export class AccountService {
    private readonly setPasswordKey = 'pass-key';
    private readonly isLoginKey = 'is-login-key';

    constructor() {}

    async checkSettedPassword() {
        const r = await Preferences.get({ key: this.setPasswordKey });
        if (!r.value) {
            return false;
        }
        return true;
    }

    async setPassword(pass: string) {
        await Preferences.set({
            key: this.setPasswordKey,
            value: pass,
        });
    }

    async verifyPassword(verifyPass: string) {
        const passHash = await Preferences.get({ key: this.setPasswordKey });
        if (!passHash || !passHash.value) {
            return false;
        }

        if (verifyPass !== passHash.value) {
            return false;
        }

        await this.saveAuthToken();

        return true;
    }

    async saveAuthToken() {
        await Preferences.set({
            key: this.isLoginKey,
            value: 'true',
        });
    }

    async removeAuthToken() {
        await Preferences.remove({ key: this.isLoginKey });
    }

    async isLoggedIn() {
        const r = await Preferences.get({ key: this.isLoginKey });
        if (!r.value) {
            return false;
        }
        return true;
    }
}
