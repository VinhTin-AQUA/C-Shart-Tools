import { Injectable } from '@angular/core';
import { NativeBiometric } from 'capacitor-native-biometric';

@Injectable({
    providedIn: 'root',
})
export class BiometricService {
    constructor() {}

    async verifyIdentity(): Promise<boolean> {
        try {
            const isAvailable = await NativeBiometric.isAvailable();
            if (isAvailable) {
                try {
                     await NativeBiometric.verifyIdentity({
                        reason: 'For easy log in',
                        title: 'Log in',
                        subtitle: 'Authenticate',
                        description: 'Please authenticate to proceed',
                        maxAttempts: 2,
                        // useFallback: true,
                    });
                    return true; // Trả về true khi xác thực thành công
                } catch (error) {
                    return false; // Trả về false khi xác thực thất bại
                }
            } else {
                return false; // Trả về false khi thiết bị không hỗ trợ
            }
        } catch (error) {
            return false; // Trả về false nếu xảy ra lỗi
        }
    }
}
