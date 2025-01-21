import { patchState, signalStore, withMethods, withState } from '@ngrx/signals';

type LoaderState = {
    isShow: boolean;
};

const initialState: LoaderState = {
    isShow: false,
};

export const LoaderStore = signalStore(
    { providedIn: 'root' },
    withState(initialState),
    withMethods((store) => ({
        setShow(flag: boolean) {
            patchState(store, (state) => ({
                isShow: flag,
            }));
        },
    }))
);
