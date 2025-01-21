import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
    FormBuilder,
    FormGroup,
    FormsModule,
    ReactiveFormsModule,
    Validators,
} from '@angular/forms';
import {
    IonButton,
    IonButtons,
    IonContent,
    IonHeader,
    IonIcon,
    IonMenuButton,
    IonTitle,
    IonToolbar,
} from '@ionic/angular/standalone';
import { LoaderStore } from 'src/app/stores/loader.store';
import { FirestoreService } from '../firestore.service';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { CryptoService } from '../crypto.service';
import { addIcons } from 'ionicons';
import { arrowBackOutline } from 'ionicons/icons';
import { icons } from '../utils/icon';
import { NoticeStore } from 'src/app/stores/notice.store';
import { InputPasswordComponent } from '../../components/input-password/input-password.component';

@Component({
    selector: 'app-edit-account',
    templateUrl: './edit-account.page.html',
    styleUrls: ['./edit-account.page.scss'],
    standalone: true,
    imports: [
        IonContent,
        IonHeader,
        IonTitle,
        IonToolbar,
        CommonModule,
        FormsModule,
        IonButtons,
        IonButton,
        IonIcon,
        IonMenuButton,
        RouterLink,
        ReactiveFormsModule,
        InputPasswordComponent,
    ],
})
export class EditAccountPage implements OnInit {
    form!: FormGroup;
    submitted: boolean = false;
    selectedIconUrl: string =
        'https://cdn-icons-png.flaticon.com/512/1198/1198298.png';
    loader = inject(LoaderStore);
    icons = icons;
    notice = inject(NoticeStore);

    accountId: string = '';
    showRemoveModal: boolean = false;

    constructor(
        private formBuilder: FormBuilder,
        private router: Router,
        private firestoreService: FirestoreService,
        private cryptoService: CryptoService,
        private activatedRoute: ActivatedRoute
    ) {
        addIcons({ arrowBackOutline });
    }

    ngOnInit() {
        this.form = this.formBuilder.group({
            name: ['', [Validators.required]],
            userName: ['', [Validators.required]],
            password: ['', [Validators.required]],
            confirmPassword: ['', [Validators.required]],
            note: [''],
        });

        this.activatedRoute.params.subscribe({
            next: async (params: any) => {
                // console.log(params.id); // {id: '2', name: 'hoc'}
                this.accountId = params.id;

                await this.getData();
            },
        });
    }

    private async getData() {
        this.loader.setShow(true);
        const r = (await this.firestoreService.getDataById(
            FirestoreService.passCollectionName,
            this.accountId
        )) as any;

        const encryptData = r.data;
        const decryptData = this.cryptoService.decryptObject(encryptData);

        this.form.controls['name'].setValue(decryptData.name);
        this.form.controls['userName'].setValue(decryptData.userName);
        this.form.controls['password'].setValue(decryptData.password);
        this.form.controls['confirmPassword'].setValue(decryptData.password);
        this.form.controls['note'].setValue(decryptData.note);
        this.selectedIconUrl = decryptData.icon;

        this.loader.setShow(false);
    }

    onChangeSelectedUrl(url: string) {
        this.selectedIconUrl = url;
    }

    async save() {
        this.submitted = true;

        if (
            this.form.valid === false ||
            this.form.controls['password'].value !==
                this.form.controls['confirmPassword'].value
        ) {
            return;
        }

        const data = {
            icon: this.selectedIconUrl,
            name: this.form.controls['name'].value,
            userName: this.form.controls['userName'].value,
            password: this.form.controls['password'].value,
            note: this.form.controls['note'].value,
        };

        const encryptData = this.cryptoService.encryptObject(data);

        this.loader.setShow(true);

        await this.firestoreService.updateData(
            FirestoreService.passCollectionName,
            this.accountId,
            { data: encryptData }
        );
        this.loader.setShow(false);
        this.notice.setShow(true, '', true);
    }

    async onShowRemoveModal(flag: boolean) {
        this.showRemoveModal = flag;
    }

    async onRemove() {
        this.loader.setShow(true);
        await this.firestoreService.deleteData(
            FirestoreService.passCollectionName,
            this.accountId
        );
        this.loader.setShow(false);
        this.showRemoveModal = false;
        this.notice.setShow(true, 'Delete successfully', true);
        this.router.navigateByUrl('/manager/home');
    }
}
