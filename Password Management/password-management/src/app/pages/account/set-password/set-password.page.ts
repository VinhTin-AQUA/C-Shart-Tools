import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent } from '@ionic/angular/standalone';
import { AccountService } from '../account.service';
import { Router } from '@angular/router';
import { BiometricService } from 'src/app/biometric.service';

@Component({
    selector: 'app-set-password',
    templateUrl: './set-password.page.html',
    styleUrls: ['./set-password.page.scss'],
    standalone: true,
    imports: [IonContent, CommonModule, FormsModule],
})
export class SetPasswordPage implements OnInit {
    newPassword: string = '';
    confirmPassword: string = '';
    submitted: boolean = false;

    constructor(
        private accountService: AccountService,
        private router: Router,
        private biometricService: BiometricService
    ) {}

    async ngOnInit() {}

    async setNewPassword() {
        this.submitted = true;

        if (
            !this.newPassword ||
            !this.confirmPassword ||
            this.newPassword.length < 8 ||
            this.newPassword !== this.confirmPassword
        ) {
            return;
        }

        const result = await this.biometricService.verifyIdentity();
        if (!result) {
            alert('You can not set new Password. Please verify again.');
            return;
        }

        await this.accountService.setPassword(this.newPassword);
        this.router.navigateByUrl('/login');
    }
}
