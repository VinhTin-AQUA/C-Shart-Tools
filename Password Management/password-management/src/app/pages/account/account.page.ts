import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonRouterOutlet } from '@ionic/angular/standalone';
import { AccountService } from './account.service';
import { Router } from '@angular/router';

@Component({
    selector: 'app-account',
    templateUrl: './account.page.html',
    styleUrls: ['./account.page.scss'],
    standalone: true,
    imports: [IonContent, CommonModule, FormsModule, IonRouterOutlet],
})
export class AccountPage implements OnInit {
    constructor(
        private accountService: AccountService,
        private router: Router
    ) {}

    async ngOnInit() {
  
    }
}
