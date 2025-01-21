import { Component, inject, OnInit } from '@angular/core';
import { IonIcon } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { checkmarkCircleOutline } from 'ionicons/icons';
import { NoticeStore } from 'src/app/stores/notice.store';

@Component({
    selector: 'app-notice',
    templateUrl: './notice.component.html',
    styleUrls: ['./notice.component.scss'],
    standalone: true,
    imports: [IonIcon],
})
export class NoticeComponent implements OnInit {
    noticeStore = inject(NoticeStore);

    constructor() {
        addIcons({ checkmarkCircleOutline });
    }

    ngOnInit() {}

    onClose() {
        this.noticeStore.setShow(false, '', true);
    }
}
