import { Injectable } from '@angular/core';
import {
    Firestore,
    collection,
    addDoc,
    getDocs,
    getDoc,
    doc,
    updateDoc,
    deleteDoc,
} from '@angular/fire/firestore';
import { CryptoService } from './crypto.service';

@Injectable({
    providedIn: 'root',
})
export class FirestoreService {
    static passCollectionName = 'Passwords';

    constructor(
        private firestore: Firestore,
        private cryptoService: CryptoService
    ) {}

    async addData(collectionName: string, data: any) {
        const ref = collection(this.firestore, collectionName);
        const r = await addDoc(ref, data);
        return r;
    }

    // Hàm để lấy dữ liệu
    async getDatas(collectionName: string) {
        const ref = collection(this.firestore, collectionName); // Tạo tham chiếu tới collection
        const r = await getDocs(ref);

        const data = r.docs.map((d) => {
            const decryptData = this.cryptoService.decryptObject(d.get('data'));
            return {
                id: d.id,
                ...decryptData,
            };
        });
        return data;
    }

    // Hàm để lấy thông tin cụ thể của một document theo id
    async getDataById(collectionName: string, documentId: string) {
        const docRef = doc(this.firestore, collectionName, documentId); // Tạo tham chiếu tới document
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
            return { id: documentId, ...docSnap.data() }; // Trả về dữ liệu cùng với id của document
        } else {
            throw new Error('Document không tồn tại');
        }
    }

    // Hàm để cập nhật dữ liệu của một document
    async updateData(collectionName: string, documentId: string, data: any) {
        const docRef = doc(this.firestore, collectionName, documentId); // Tạo tham chiếu tới document cụ thể
        await updateDoc(docRef, data); // Cập nhật document với dữ liệu mới
    }

    async deleteData(collectionName: string, documentId: string) {
        const docRef = doc(this.firestore, collectionName, documentId); // Tạo tham chiếu tới document cụ thể
        await deleteDoc(docRef); // Xóa document
    }
}
