import { Observable, Observer } from 'rxjs';

export const myTakeUntil = <T>(source: Observable<T>) => {
    return new Observable((observer: Observer<T>) => {
        const subscription = source.subscribe(
            (next: T) => {},
            (err: any) => {},
            () => {}
        );

        return subscription;
    });
};



