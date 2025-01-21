import { patchState, signalStore, withMethods, withState } from '@ngrx/signals';

type NoticeState = {
    isShow: boolean;
    message: string;
    success: boolean;
};

const initialState: NoticeState = {
    isShow: false,
    message: '',
    success: true,
};

export const NoticeStore = signalStore(
    { providedIn: 'root' },
    withState(initialState),
    withMethods((store) => ({
        setShow(show: boolean, message: string, success: boolean) {
            patchState(store, (state) => ({
                isShow: show,
                message: message,
                success: success,
            }));
        },
    }))
);
