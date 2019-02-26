import { Observable, Observer } from 'rxjs';

export const myMap = <T>(map: (n: T) => T) => (source: Observable<T>) => {
    return new Observable((observer: Observer<T>) => {
        const subscription = source.subscribe(
            (next: T) => {
                // call our map function
                const mappedNext = map(next);
                observer.next(mappedNext);
            },
            (err: any) => observer.error(err),
            () => observer.complete()
        );

        return subscription;
    });
};