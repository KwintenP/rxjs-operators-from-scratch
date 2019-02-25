// operator -> function that takes an Observable and returns an Observable

import { Observable, Observer } from 'rxjs';

export const myTake = (quantity: number) => <T>(source: Observable<T>) => {
    return new Observable((observer: Observer<T>) => {
        let count = 0;
        const subscription = source.subscribe(
            (next: T) => {
                observer.next(next);
                if(quantity === ++count) {
                    observer.complete();
                    subscription.unsubscribe();
                }
            },
            (err: any) => observer.error(err),
            () => observer.complete()
        );
    });
};

