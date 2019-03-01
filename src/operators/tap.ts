import { Observable, Observer } from 'rxjs';

export const myTap = <T>(
    nextFn: (n: T) => void,
    errorFn: (err: any) => void,
    completeFn: () => void
) => (source: Observable<T>) => {
    return new Observable((observer: Observer<T>) => {
        const subscription = source.subscribe(
            (next: T) => {
                nextFn(next);
                observer.next(next);
            },
            (err: any) => {
                errorFn(err);
                observer.error(err);
            },
            () => {
                completeFn();
                observer.complete();
            }
        );

        return subscription;
    });
};

