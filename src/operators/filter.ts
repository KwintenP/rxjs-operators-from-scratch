// operator -> function that takes an Observable and returns an Observable

import { Observable, Observer } from 'rxjs';

export const myFilter = <T>(filter: (n:T) => boolean) => (source: Observable<T>) => {
    return new Observable((observer: Observer<T>) => {
        const subscription = source.subscribe(
            (next: T) => {
                if(filter(next)) {
                    observer.next(next);
                }
            }
        );
        return subscription;
    });
};
