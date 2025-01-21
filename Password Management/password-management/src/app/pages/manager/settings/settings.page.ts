import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
    IonButton,
    IonButtons,
    IonContent,
    IonHeader,
    IonIcon,
    IonMenuButton,
    IonSearchbar,
    IonTitle,
    IonToggle,
    IonToolbar,
} from '@ionic/angular/standalone';
import { RouterLink } from '@angular/router';
import { addIcons } from 'ionicons';
import { arrowBackOutline } from 'ionicons/icons';
import { ThemeService } from '../theme.service';

@Component({
    selector: 'app-settings',
    templateUrl: './settings.page.html',
    styleUrls: ['./settings.page.scss'],
    standalone: true,
    imports: [
        IonContent,
        IonHeader,
        IonTitle,
        IonToolbar,
        CommonModule,
        FormsModule,
        IonButtons,
        IonMenuButton,
        IonButton,
        RouterLink,
        IonIcon,
        IonToggle,
    ],
})
export class SettingsPage implements OnInit {
    themes: any = [];

    constructor(private themeService: ThemeService) {
        addIcons({ arrowBackOutline });
    }

    async ngOnInit() {
        const theme = await this.themeService.getTheme();
        this.themes = [
            {
                name: ThemeService.LIGHT,
                activate: theme === ThemeService.LIGHT,
                color: 'warning',
            },
            {
                name: ThemeService.DARK,
                activate: theme === ThemeService.DARK,
                color: 'dark',
            },
        ];
    }

    async onToggleChange(index: number, event: any, name: string) {
        await this.setTheme(name);

        const isCurrentlyActive = this.themes[index].activate; // Trạng thái hiện tại của toggle được nhấn
        const activeCount = this.themes.filter(
            (item: any) => item.activate
        ).length; // Số toggle đang active

        // Không cho phép tắt toggle nếu chỉ còn một toggle đang bật
        if (isCurrentlyActive && activeCount === 1) {
            event.target.checked = true; // Đặt lại trạng thái của toggle trong giao diện
            return;
        }

        // Cập nhật trạng thái: Chỉ bật toggle được nhấn
        this.themes = this.themes.map((item: any, i: any) => ({
            ...item,
            activate: i === index ? !isCurrentlyActive : false, // Toggle được nhấn thay đổi trạng thái
        }));
    }

    async setTheme(theme: string) {
        await this.themeService.setTheme(theme);
    }
}
