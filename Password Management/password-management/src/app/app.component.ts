import { Component, inject } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import {
    IonApp,
    IonSplitPane,
    IonMenu,
    IonContent,
    IonList,
    IonListHeader,
    IonNote,
    IonMenuToggle,
    IonItem,
    IonIcon,
    IonLabel,
    IonRouterOutlet,
    IonRouterLink,
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import {
    keypadOutline,
    informationCircleOutline,
    homeOutline,
} from 'ionicons/icons';

import { Platform } from '@ionic/angular';
import { App } from '@capacitor/app';
import { AccountService } from './pages/account/account.service';
import { LoaderComponent } from './pages/components/loader/loader.component';
import { LoaderStore } from './stores/loader.store';
import { NoticeComponent } from './pages/components/notice/notice.component';
import { NoticeStore } from './stores/notice.store';
import { ThemeService } from './pages/manager/theme.service';

@Component({
    selector: 'app-root',
    templateUrl: 'app.component.html',
    styleUrls: ['app.component.scss'],
    standalone: true,
    imports: [
        RouterLink,
        RouterLinkActive,
        IonApp,
        IonSplitPane,
        IonMenu,
        IonContent,
        IonList,
        IonListHeader,
        IonNote,
        IonMenuToggle,
        IonItem,
        IonIcon,
        IonLabel,
        IonRouterLink,
        IonRouterOutlet,
        LoaderComponent,
        NoticeComponent,
    ],
})
export class AppComponent {
    public appPages: any = [
        { title: 'Home', url: '#', icon: 'home' },
        { title: 'Change Password', url: 'manager/reset-password', icon: 'keypad' },
        {
            title: 'About',
            url: 'manager/about',
            icon: 'information-circle',
        },
    ];

    loaderStore = inject(LoaderStore);
    noticeStore = inject(NoticeStore);

    constructor(
        private platform: Platform,
        private accountService: AccountService,
        private router: Router,
        private themeService: ThemeService
    ) {
        addIcons({
            keypadOutline,
            informationCircleOutline,
            homeOutline,
        });

        this.initializeApp();
    }

    async ngOnInit() {
        const checkLogin = await this.accountService.checkSettedPassword();
        if (checkLogin === true) {
            this.router.navigateByUrl('/login');
        } else {
            this.router.navigateByUrl('/set-password');
        }

        await this.themeService.loadTheme();
    }

    initializeApp() {
        this.platform.ready().then(() => {
            // Lắng nghe sự kiện thoát hoàn toàn ứng dụng
            App.addListener('appStateChange', async (state) => {
                if (!state.isActive) {
                    await this.accountService.removeAuthToken();
                }
            });
        });
    }
}
