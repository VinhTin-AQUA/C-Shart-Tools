import { Component, inject, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
    IonContent,
    IonHeader,
    IonTitle,
    IonToolbar,
    IonButtons,
    IonMenuButton,
    IonSearchbar,
    IonItem,
    IonLabel,
    IonList,
    IonListHeader,
    IonIcon,
    IonModal,
    ActionSheetController,
    AnimationController,
} from '@ionic/angular/standalone';
import { RouterLink } from '@angular/router';
import { FirestoreService } from '../firestore.service';
import { addIcons } from 'ionicons';
import {
    addCircle,
    createOutline,
    ellipsisVerticalOutline,
    home,
    prism,
    settings,
    trashBinOutline,
} from 'ionicons/icons';
import { LoaderStore } from 'src/app/stores/loader.store';

@Component({
    selector: 'app-home',
    templateUrl: './home.page.html',
    styleUrls: ['./home.page.scss'],
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
        IonSearchbar,
        IonItem,
        IonLabel,
        IonList,
        IonListHeader,
        IonIcon,
        RouterLink,
    ],
})
export class HomePage implements OnInit {
    categories: any = [
        {
            url: 'https://cdn-icons-png.flaticon.com/512/808/808439.png',
            name: 'Game',
        },
        {
            url: 'https://cdn-icons-png.flaticon.com/512/1669/1669668.png ',
            name: 'Bank',
        },
        {
            url: 'https://cdn-icons-png.flaticon.com/512/2702/2702602.png',
            name: 'Google',
        },
        {
            url: 'https://cdn-icons-png.flaticon.com/512/808/808439.png',
            name: 'Game',
        },
        {
            url: 'https://cdn-icons-png.flaticon.com/512/1669/1669668.png ',
            name: 'Bank',
        },
        {
            url: 'https://cdn-icons-png.flaticon.com/512/2702/2702602.png',
            name: 'Google',
        },
        {
            url: 'https://cdn-icons-png.flaticon.com/512/808/808439.png',
            name: 'Game',
        },
        {
            url: 'https://cdn-icons-png.flaticon.com/512/1669/1669668.png ',
            name: 'Bank',
        },
        {
            url: 'https://cdn-icons-png.flaticon.com/512/2702/2702602.png',
            name: 'Google',
        },
        {
            url: 'https://cdn-icons-png.flaticon.com/512/808/808439.png',
            name: 'Game',
        },
        {
            url: 'https://cdn-icons-png.flaticon.com/512/1669/1669668.png ',
            name: 'Bank',
        },
        {
            url: 'https://cdn-icons-png.flaticon.com/512/2702/2702602.png',
            name: 'Google',
        },
    ];

    listAccounts: any = [];

    @ViewChild(IonModal) modal!: IonModal;
    presentingElement!: HTMLElement | null;
    icons: any = [];
    selectedIconUrl: string =
        'https://cdn-icons-png.flaticon.com/512/1198/1198298.png';
    loader = inject(LoaderStore);

    constructor(
        private actionSheetCtrl: ActionSheetController,
        private animationCtrl: AnimationController,
        private firestoreService: FirestoreService
    ) {
        addIcons({
            prism,
            addCircle,
            home,
            settings,
            ellipsisVerticalOutline,
            createOutline,
            trashBinOutline,
        });
    }

    async ngOnInit() {
        this.presentingElement = document.querySelector('.ion-page');
        this.loader.setShow(true);
        await this.getDatas();
        this.loader.setShow(false);
    }

    async ionViewWillEnter() {
        this.presentingElement = document.querySelector('.ion-page');
        this.loader.setShow(true);
        await this.getDatas();
        this.loader.setShow(false);
    }

    canDismiss = async () => {
        const actionSheet = await this.actionSheetCtrl.create({
            header: 'Are you sure?',
            buttons: [
                {
                    text: 'Yes',
                    role: 'confirm',
                    handler: () => {},
                },
                {
                    text: 'No',
                    role: 'cancel',
                },
            ],
        });

        actionSheet.present();

        const { role } = await actionSheet.onWillDismiss();

        return role === 'confirm';
    };

    enterAnimation = (baseEl: HTMLElement) => {
        const root = baseEl.shadowRoot;

        const backdropAnimation = this.animationCtrl
            .create()
            .addElement(root!.querySelector('ion-backdrop')!)
            .fromTo('opacity', '0.01', 'var(--backdrop-opacity)');

        const wrapperAnimation = this.animationCtrl
            .create()
            .addElement(root!.querySelector('.modal-wrapper')!)
            .keyframes([
                { offset: 0, opacity: '0', transform: 'translateY(100%)' },
                { offset: 1, opacity: '0.99', transform: 'translateY(0%)' },
            ]);

        return this.animationCtrl
            .create()
            .addElement(baseEl)
            .easing('ease-out')
            .duration(400)
            .addAnimation([backdropAnimation, wrapperAnimation]);
    };

    leaveAnimation = (baseEl: HTMLElement) => {
        return this.enterAnimation(baseEl).direction('reverse');
    };

    onChangeSelectedUrl(url: string) {
        this.selectedIconUrl = url;
    }

    async getDatas() {
        const data = await this.firestoreService.getDatas(
            FirestoreService.passCollectionName
        );
        this.listAccounts = data;
    }
}
