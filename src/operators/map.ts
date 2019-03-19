import { Observable, Observer } from 'rxjs';

export const myMap = <T>(mapFn: (n: T) => T) => (source: Observable<T>) => {
    return new Observable((observer: Observer<T>) => {
        const subscription = source.subscribe(
            (next: T) => {
                observer.next(mapFn(next));
            },
            (err: any) => {
                observer.error(err);
            },
            () => {
                observer.complete();
            }
        );

        return subscription;
    });
};
