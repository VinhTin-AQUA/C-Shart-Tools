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
    IonButtons,
    IonContent,
    IonHeader,
    IonMenuButton,
    IonTitle,
    IonToolbar,
    IonIcon,
} from '@ionic/angular/standalone';
import { Router, RouterLink } from '@angular/router';
import { addIcons } from 'ionicons';
import { arrowBackOutline } from 'ionicons/icons';
import { FirestoreService } from '../firestore.service';
import { LoaderStore } from 'src/app/stores/loader.store';
import { CryptoService } from '../crypto.service';
import { icons } from '../utils/icon';
import { InputPasswordComponent } from '../../components/input-password/input-password.component';

@Component({
    selector: 'app-add-account',
    templateUrl: './add-account.page.html',
    styleUrls: ['./add-account.page.scss'],
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
        IonIcon,
        RouterLink,
        ReactiveFormsModule,
        InputPasswordComponent,
    ],
})
export class AddAccountPage implements OnInit {
    form!: FormGroup;
    submitted: boolean = false;
    icons = icons;
    selectedIconUrl: string =
        'https://cdn-icons-png.flaticon.com/512/1198/1198298.png';

    loader = inject(LoaderStore);

    constructor(
        private formBuilder: FormBuilder,
        private router: Router,
        private firestoreService: FirestoreService,
        private cryptoService: CryptoService
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

        const r = await this.firestoreService.addData(
            FirestoreService.passCollectionName,
            { data: encryptData }
        );

        if (!r) {
            alert('Error when save');
            this.loader.setShow(false);
            return;
        }
        this.router.navigateByUrl('/manager/home');
    }
}
