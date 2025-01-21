import { Injectable } from '@angular/core';
import * as CryptoJS from 'crypto-js';
import { environment } from 'src/environments/environment';

@Injectable({
    providedIn: 'root',
})
export class CryptoService {
    constructor() {}

    // Hàm mã hóa
    encrypt(data: string): string {
        return CryptoJS.AES.encrypt(data, environment.AESKey).toString();
    }

    // Hàm giải mã
    decrypt(cipherText: string): string {
        const bytes = CryptoJS.AES.decrypt(cipherText, environment.AESKey);
        return bytes.toString(CryptoJS.enc.Utf8);
    }

    encryptObject(data: any): string {
        try {
            const jsonString = JSON.stringify(data);
            return this.encrypt(jsonString);
        } catch (e) {
            console.error('Lỗi khi mã hóa object:', e);
            throw e;
        }
    }

    // Giải mã object
    decryptObject(encryptedData: string) {
        try {
            const decryptedString = this.decrypt(encryptedData);
            return JSON.parse(decryptedString);
        } catch (e) {
            console.error('Lỗi khi giải mã object:', e);
            throw e;
        }
    }
}
