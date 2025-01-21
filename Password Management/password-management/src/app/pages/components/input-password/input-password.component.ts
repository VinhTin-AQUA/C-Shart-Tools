import { Component, forwardRef, OnInit } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
    selector: 'app-input-password',
    templateUrl: './input-password.component.html',
    styleUrls: ['./input-password.component.scss'],
    standalone: true,
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => InputPasswordComponent),
            multi: true,
        },
    ],
})
export class InputPasswordComponent implements ControlValueAccessor {
    value: string = ''; // Giá trị của input
    isDisabled: boolean = false;
    isPasswordVisible: boolean = false;

    constructor() {}

    ngOnInit() {}

    // Hàm được gọi khi giá trị thay đổi
    onChange: (value: string) => void = () => {};
    // Hàm được gọi khi input được touch
    onTouched: () => void = () => {};

    // Ghi giá trị từ bên ngoài vào component
    writeValue(value: string): void {
        this.value = value;
    }

    // Đăng ký hàm gọi khi giá trị thay đổi
    registerOnChange(fn: any): void {
        this.onChange = fn;
    }

    // Đăng ký hàm gọi khi touch
    registerOnTouched(fn: any): void {
        this.onTouched = fn;
    }

    // Kích hoạt/disable input
    setDisabledState?(isDisabled: boolean): void {
        this.isDisabled = isDisabled;
    }

    // Xử lý khi người dùng nhập giá trị mới
    onInput(event: Event) {
        const inputElement = event.target as HTMLInputElement; // Ép kiểu event.target thành HTMLInputElement
        this.value = inputElement.value; // Lấy giá trị từ input
        this.onChange(this.value); // Thông báo giá trị mới cho form control
        this.onTouched(); // Đánh dấu control đã được touch
    }

    togglePasswordVisibility() {
        this.isPasswordVisible = !this.isPasswordVisible
    }
}
