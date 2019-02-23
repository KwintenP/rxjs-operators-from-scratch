// operator -> function that takes an Observable and returns an Observable

import { Observable, Observer } from 'rxjs';

export const myMap = <T, E>(project: (n: T) => E) => (source: Observable<T>) => {
    return new Observable((observer: Observer<E>) => {
        const subscription = source.subscribe(
            (next: T) => observer.next(project(next)),
            (err: any) => observer.error(err),
            () => observer.complete(),
        );

        return subscription;
    });
};
