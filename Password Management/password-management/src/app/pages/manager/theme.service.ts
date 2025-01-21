import { Injectable } from '@angular/core';
import { Preferences } from '@capacitor/preferences';

@Injectable({
    providedIn: 'root',
})
export class ThemeService {
    static readonly DARK = 'Dark';
    static readonly LIGHT = 'Light';
    private readonly keyTheme = 'theme';

    static readonly LIGHT_THEME_VAL = 'theme-light';
    static readonly DARK_THEME_VAL = 'theme-dark';

    async getTheme() {
        let { value } = await Preferences.get({ key: this.keyTheme });
        if (!value) {
            value = ThemeService.LIGHT;
            await Preferences.set({ key: this.keyTheme, value: value });
        }
        return value;
    }

    async loadTheme() {
        const theme = await this.getTheme();
        if (theme === ThemeService.DARK) {
            document.body.classList.remove(ThemeService.LIGHT_THEME_VAL);
            document.body.classList.add(ThemeService.DARK_THEME_VAL);
        } else if (theme === ThemeService.LIGHT) {
            document.body.classList.remove(ThemeService.DARK_THEME_VAL);
            document.body.classList.add(ThemeService.LIGHT_THEME_VAL);
        }
    }

    async setTheme(theme: string) {
        if (theme === ThemeService.DARK) {
            document.body.classList.remove(ThemeService.LIGHT_THEME_VAL);
            document.body.classList.add(ThemeService.DARK_THEME_VAL);
        } else if (theme === ThemeService.LIGHT) {
            document.body.classList.remove(ThemeService.DARK_THEME_VAL);
            document.body.classList.add(ThemeService.LIGHT_THEME_VAL);
        }

        await Preferences.set({ key: this.keyTheme, value: theme });
    }
}
