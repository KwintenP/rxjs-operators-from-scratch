// operator -> function that takes an Observable and returns an Observable

import { Observable, Observer, Subscription } from 'rxjs';

export const myTakeUntil = (trigger$: Observable<any>) => <T>(source: Observable<T>) => {
    return new Observable((observer: Observer<T>) => {
        const subscription = new Subscription();
        subscription.add(trigger$.subscribe(
            (next: any) => {
                observer.complete();
                outerSubscription.unsubscribe();
            }
        ));
        const outerSubscription = source.subscribe(
            (next: T) => {
                observer.next(next);
            },
            (err: any) => observer.error(err),
            () => observer.complete()
        );
        subscription.add(outerSubscription);

        return subscription;
    });
};

