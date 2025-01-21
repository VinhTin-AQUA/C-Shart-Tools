import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar } from '@ionic/angular/standalone';
import { AccountService } from '../../account/account.service';
import { BiometricService } from 'src/app/biometric.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.page.html',
  styleUrls: ['./reset-password.page.scss'],
  standalone: true,
  imports: [IonContent, CommonModule, FormsModule]
})
export class ResetPasswordPage implements OnInit {

  oldPassword: string = '';
      newPassword: string = '';
      confirmPassword: string = '';
      submitted: boolean = false;
      verifyPassword: boolean = true;
  
      constructor(
          private accountService: AccountService,
          private router: Router,
          private biometricService: BiometricService
      ) {}
  
      async ngOnInit() {}
  
      async setNewPassword() {
          this.submitted = true;
  
          const verifyPassword = await this.accountService.verifyPassword(
              this.oldPassword
          );
          if (!verifyPassword) {
              this.verifyPassword = false;
              return;
          }
  
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
