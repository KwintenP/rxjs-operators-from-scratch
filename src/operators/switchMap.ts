// operator -> function that takes an Observable and returns an Observable

import { Observable, Observer, Subscription } from 'rxjs';

export const mySwitchMap = (project: (n: T) => Observable<any>) => (source: Observable<T>) => {
    let innerSubscription: Subscription;
    return new Observable((observer: Observer<any>) => {
        source.subscribe(
            (next: T) => {
                innerSubscription && innerSubscription.unsubscribe();
                const innerObs$ = project(next);
                innerSubscription = innerObs$.subscribe(
                    (next: T) => {
                        observer.next(next);
                    },
                    (error: any) => observer.error(error),
                );
            },
            (err: any) => observer.error(err),
            () => observer.complete(),
        )
    });
};