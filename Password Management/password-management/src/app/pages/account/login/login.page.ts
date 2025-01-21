import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, NavController } from '@ionic/angular/standalone';
import { Router } from '@angular/router';
import { AccountService } from '../account.service';
import { BiometricService } from 'src/app/biometric.service';

@Component({
    selector: 'app-login',
    templateUrl: './login.page.html',
    styleUrls: ['./login.page.scss'],
    standalone: true,
    imports: [IonContent, CommonModule, FormsModule],
})
export class LoginPage implements OnInit {
    password: string = '';
    check: boolean = true;

    constructor(
        private router: Router,
        private accoutnService: AccountService,
        private biometricService: BiometricService
    ) {}

    async ngOnInit() {}

    async login() {
        const check2 = await this.accoutnService.verifyPassword(this.password);
        if (check2 === false) {
            this.check = false;
            return;
        }
        this.check = true;
        this.router.navigateByUrl('/manager/home');
    }

    async useFingerPrint() {
        const result = await this.biometricService.verifyIdentity();
        if (result === false) {
            return;
        }
        await this.accoutnService.saveAuthToken();
        this.router.navigateByUrl('/manager/home');
    }
}
