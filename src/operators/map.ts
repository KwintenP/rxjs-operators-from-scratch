import { Observable, Observer } from 'rxjs';

export const myMap = <T, E>(map: (n: T) => E) => (source: Observable<T>) => {
    return new Observable((observer: Observer<E>) => {
        const subscription = source.subscribe(
            (next: T) => observer.next(map(next)),
            (err: any) => observer.error(err),
            () => observer.complete(),
        );

        return subscription;
    });
};
